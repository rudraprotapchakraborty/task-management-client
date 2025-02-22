import { useContext, useState } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext/AuthContext";
import SocialLogin from "../pages/SocialLogin";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
    const { createUser } = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state || "/";

    const handleSignup = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const photoURL = e.target.photo.value;
        const password = e.target.password.value;

        // Password validation
        if (!/[A-Z]/.test(password)) {
            setErrorMessage("Password must contain at least one uppercase letter.");
            toast.error("Password must contain at least one uppercase letter.");
            return;
        }
        if (!/[a-z]/.test(password)) {
            setErrorMessage("Password must contain at least one lowercase letter.");
            toast.error("Password must contain at least one lowercase letter.");
            return;
        }
        if (password.length < 6) {
            setErrorMessage("Password must be at least 6 characters long.");
            toast.error("Password must be at least 6 characters long.");
            return;
        }

        setErrorMessage(""); // Clear error if all validations pass

        try {
            // Create user in Firebase
            const result = await createUser(email, password, name, photoURL);
            const user = result.user;
            console.log("User Created:", user);

            // Send user info to backend for MongoDB storage
            await axios.post("https://task-management-server-production-c1e0.up.railway.app/users", {
                uid: user.uid,
                email: user.email,
                displayName: name,
                photoURL: photoURL,
                createdAt: new Date(),
            });

            toast.success("Sign up successful!");
            navigate(from);
        } catch (error) {
            toast.error("Sign up failed: " + error.message);
        }
    };

    return (
        <div className="hero min-h-screen flex justify-center items-center px-4 sm:px-6 lg:px-8">
    <div className="card w-full max-w-lg p-8 shadow-2xl dark:bg-gray-800 rounded-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
            Sign Up Now!
        </h1>
        <form onSubmit={handleSignup} className="space-y-4">
            <div className="form-control">
                <label className="label">
                    <span className="label-text text-gray-800 dark:text-white">Name</span>
                </label>
                <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    className="input input-bordered w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                />
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text text-gray-800 dark:text-white">Email</span>
                </label>
                <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    className="input input-bordered w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                />
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text text-gray-800 dark:text-white">Photo URL</span>
                </label>
                <input
                    type="url"
                    name="photo"
                    placeholder="Profile Photo URL"
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
                    placeholder="Enter Password"
                    className="input input-bordered w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                />
            </div>
            {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
            <button className="btn w-full bg-purple-600 text-white hover:bg-purple-700">
                Sign Up
            </button>
            <SocialLogin />
        </form>
        <p className="mt-4 text-center text-gray-700 dark:text-white">
            Already have an account?{" "}
            <NavLink to="/login" className="font-semibold text-purple-600 hover:text-purple-700">
                Login.
            </NavLink>
        </p>
    </div>
</div>

    );
};

export default Signup;