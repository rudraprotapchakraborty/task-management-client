import AuthContext from "../context/AuthContext/AuthContext";
import { useContext } from "react";
import SocialLogin from "../pages/SocialLogin";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const { signInUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInUser(email, password)
      .then(() => {
        toast.success("Login successful!");
        navigate(from);
      })
      .catch((error) => {
        if (error.message.includes("user-not-found")) {
          toast.error("No user found with this email.");
        } else if (error.message.includes("wrong-password")) {
          toast.error("Incorrect password. Please try again.");
        } else {
          toast.error("Login failed. Please check your credentials.");
        }
      });
  };

  return (
    <div className="hero min-h-screen flex justify-center items-center px-4 sm:px-6 lg:px-8">
    <div className="card w-full max-w-lg p-8 shadow-2xl dark:bg-gray-800 rounded-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
            Login Now!
        </h1>
        <form onSubmit={handleLogin} className="space-y-4">
            <div className="form-control">
                <label className="label">
                    <span className="label-text text-gray-800 dark:text-white">Email</span>
                </label>
                <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="input input-bordered w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                />
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text text-gray-800 dark:text-white">Password</span>
                </label>
                <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    className="input input-bordered w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                />
            </div>
            <button className="btn w-full bg-purple-600 text-white hover:bg-purple-700">
                Login
            </button>
            <SocialLogin />
        </form>
        <p className="mt-4 text-center text-gray-700 dark:text-white">
            Don’t have an account?{" "}
            <NavLink to="/signup" className="font-semibold text-purple-600 hover:text-purple-700">
                Sign Up.
            </NavLink>
        </p>
    </div>
</div>

  );
};

export default Login;
