import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-center px-6">
      <h2 className="text-4xl lg:text-5xl font-bold text-gray-800">Oops! Page Not Found</h2>
      <p className="mt-4 text-lg text-gray-600">
        Sorry, the page you are looking for does not exist.
      </p>

      <Link 
        to="/" 
        className="mt-6 bg-purple-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-purple-700 transition duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
