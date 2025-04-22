import { motion as _motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const TransitionWrapper = ({ children }) => {
  const [showTransition, setShowTransition] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowTransition(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <AnimatePresence>
        {showTransition && (
          <_motion.div
            initial={{ x: 0, y: 0 }}
            animate={{ x: "100%", y: "-100%" }} // move diagonally to top-right
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-800 to-purple-600 z-50"
          />
        )}
      </AnimatePresence>
      <div
        className={`w-full h-full transition-opacity duration-700 ${
          showTransition ? "opacity-0" : "opacity-100"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default TransitionWrapper;
