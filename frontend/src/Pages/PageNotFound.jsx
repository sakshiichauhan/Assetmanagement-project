import React from 'react';
import { Link } from 'react-router-dom';
import pageNotFoundImage from '../assets/404-animates.svg'; 

const PageNotFound = () => {
    return (
        <div className="font-mono flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 to-gray-300">
            {/* Image Section */}
            <img
                src={pageNotFoundImage}
                alt="Page Not Found"
                className="w-2/3 md:w-1/3 mb-8"
            />

            <p className="text-2xl md:text-xl text-gray-600 text-center mb-6">
                Oops! The page you’re looking for doesn’t exist.
            </p>

            
            <button
                className="px-6 py-3 bg-purple-900 rounded-full text-white text-lg font-semibold shadow-lg hover:text-purple-900 hover:bg-white transition duration-300"
            >
            <Link to="/">
                Go Back Home
            </Link>
            </button>
        </div>
    );
};
export default PageNotFound;
