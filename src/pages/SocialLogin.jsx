import { useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

const SocialLogin = () => {
    const { signInWithGoogle } = useContext(AuthContext);
    const { darkMode } = useContext(ThemeContext);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state || '/';

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithGoogle();
            const user = result.user;
            console.log("Google User:", user);

            // Send user info to backend for MongoDB storage
            await axios.post("http://localhost:5000/users", {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
            });

            console.log("✅ User registered in MongoDB");
            navigate(from);
        } catch (error) {
            console.error("Google Sign-In Error:", error.message);
        }
    };

    return (
        <div className="w-full">
            {/* Divider */}
            <div className={`divider ${darkMode ? 'text-white border-gray-600' : 'text-gray-800 border-gray-300'}`}>
                OR
            </div>

            {/* Google Sign In Button */}
            <button 
                onClick={handleGoogleSignIn} 
                className={`btn w-full mx-auto ${darkMode ? 'bg-gray-200 text-black' : 'bg-gray-100 text-black'}`}
            >
                Sign in with Google
            </button>
        </div>
    );
};

export default SocialLogin;
