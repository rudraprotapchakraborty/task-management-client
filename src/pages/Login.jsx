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
    <div className="hero min-h-screen px-4 sm:px-6 lg:px-8">
      <div className="hero-content flex flex-col-reverse lg:flex-row items-center justify-between gap-8">
        <div className="card w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-sm p-6 shadow-2xl bg-white dark:bg-gray-800 transition-colors duration-300">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-center lg:text-left text-gray-900 dark:text-white transition-colors duration-300">
            Login now!
          </h1>
          <form onSubmit={handleLogin} className="card-body p-0">
            <div className="form-control mb-4">
              <label className="label text-gray-900 dark:text-white transition-colors duration-300">
                <span className="label-text text-gray-800 dark:text-white">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="input input-bordered bg-white text-gray-900 dark:bg-gray-700 dark:text-white transition-colors duration-300"
                required
              />
            </div>
            <div className="form-control mb-6">
              <label className="label text-gray-900 dark:text-white transition-colors duration-300">
                <span className="label-text text-gray-800 dark:text-white">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="input input-bordered bg-white text-gray-900 dark:bg-gray-700 dark:text-white transition-colors duration-300"
                required
              />
            </div>
            <div className="form-control">
              <button className="btn border-none bg-purple-400 dark:bg-purple-600 text-white w-full transition-colors duration-300">
                Login
              </button>
            </div>
            <SocialLogin />
          </form>
          <p className="mt-4 text-center lg:text-left text-gray-900 dark:text-white transition-colors duration-300">
            Don’t have an account? <NavLink to="/signup" className="text-purple-600 font-semibold">Sign Up.</NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
