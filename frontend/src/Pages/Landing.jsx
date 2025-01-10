import React, { useState } from 'react';
import poster from "../assets/kkk.png";
import { toast } from "sonner";
import { Link } from 'react-router-dom';
import Typewriter from 'typewriter-effect';

const Landing = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const closePopover = () => {
    setIsPopoverOpen(false);
  }

  const handleGetStarted = () => {
    toast.success("Redirecting to SignUp Page")
  }
  return (
    <>
      {/* <div className="absolute top-4 left-4 md:left-12 md:top-12 z-10">
        <img src={logo} alt="Logo" className="w-26 h-auto md:w-32" />
      </div> */}

      <div className="relative grid grid-cols-1 md:grid-cols-2 min-h-screen bg-gradient-to-r from-purple-300 via-purple-500 to-purple-700 text-white">

        {/* Image Section */}
        <div className="flex items-center justify-center p-4">
          <img
            src={poster}
            alt="Poster"
            className="w-full h-full object-cover rounded-lg "
          />
        </div>

        {/* Text Section */}
        <div className="flex flex-col justify-center items-center text-center md:text-left px-6 md:px-16">
          {/* Heading */}
          <div className='text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-6 font-mono'>
            <Typewriter
              options={{
                strings: ["AssetFlow!", "Streamlining Assets, Empowering Efficiency!"],
                autoStart: true,
                loop: true,
                delay: 75, // Adjust typing speed if needed
                deleteSpeed: 50, // Adjust delete speed if needed
              }}
            />
          </div>

          {/* Paragraph */}
          <p className="text-lg md:text-xl text-white font-light tracking-wide mb-8 opacity-80 font-mono">
            Empower your organization with streamlined asset management. Track, maintain, and optimize assets seamlessly.
          </p>
          {/* Button */}
          <Link to="/signup"> <button
            className="font-mono py-3 px-8 bg-purple-900 rounded-full text-white text-lg font-semibold shadow-lg hover:text-purple-900 hover:bg-white"
            onClick={() => { handleGetStarted(); }}
          >
            Get Started
          </button></Link>
        </div>
      </div>
    </>
  );
};

export default Landing;


