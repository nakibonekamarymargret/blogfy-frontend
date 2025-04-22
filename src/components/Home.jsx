import React from "react";
import { motion as _motion } from "framer-motion";

function Home() {
  return (
    <div className="relative min-h-screen w-full grid grid-cols-12 items-center justify-center overflow-hidden">
      {/* Background Image */}
      <img
        src="/bg5.jpg"
        alt="Background"
        className="absolute inset-0 -z-10 w-full h-full object-cover "
        loading="eager"
        fetchPriority="high"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/70 to-black/20 justify-center" />

      {/* Foreground Animated Content */}
      <_motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="col-span-12 md:col-span-6 lg:col-span-5 p-6 md:p-10 bg-slate bg-opacity-50 rounded-xl shadow-xl backdrop-blur-md z-10 m-4 mx-auto"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-wide">
          <span className="text-fuchsia-500 hover:scale-125 transition-transform duration-300">
            B
          </span>
          <span className="text-yellow-400 font-serif">L</span>
          <span className="text-green-400">o</span>
          <span className="text-blue-400">G</span>
          <span className="text-purple-500">f</span>
          <span className="text-rose-400">Y</span>
        </h1>
        <h1 className="text-white text-3xl md:text-4xl font-bold mb-4 tracking-wide ">
          <span className="text-fuchsia-600 font-roboto">B</span>
          <span className="text-yellow-400  italic font-serif">L</span>
          <span className="bg-gradient-to-r from-pink-400 via-yellow-300 to-green-600 bg-clip-text text-transparent text-5xl font-mono">
            o
          </span>
          <span className="text-blue-300 font-sans">G</span>
          <span className="text-purple-300 italic">f</span>
          <span className="text-orange-400">Y</span>
        </h1>

        <p className="text-pink-500 text-4xl md:text-3xl mb-2 font-roboto">
          A space where you write your heart out
        </p>
        <div className="text-white space-y-1 mt-4 mb-6 font-mono">
          <p>Your Thoughts Matter — Share Them</p>
          <p>Compose. Express. Inspire.</p>
          <p>Turn Ideas into Posts</p>
          <p>Start Your Story</p>
        </div>

        {/* Get Started Button */}
        <div className="register">
          <_motion.a
            href="/register"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-6 py-3 bg-white text-black font-semibold text-xl rounded-full shadow-md hover:bg-gray-200 transition font-serif"
          >
            Register To get started
          </_motion.a>
        </div>
      </_motion.div>
    </div>
  );
}

export default Home;
