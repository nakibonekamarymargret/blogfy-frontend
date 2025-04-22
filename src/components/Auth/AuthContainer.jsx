import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { motion as _motion } from "framer-motion";
import Login from "./Login";
import Register from "./Register";

const transitionScreen = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.8, ease: "easeInOut" } },
  exit: { scaleX: 0, transition: { duration: 0.6, ease: "easeInOut" } },
};

const AuthContainer = () => {
  const [currentForm, setCurrentForm] = useState("loading");

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentForm("login"); // or "register" if default
    }, 2000); // Purple screen delay
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        {currentForm === "loading" && (
          <motion.div
            key="loading"
            className="absolute inset-0 bg-gradient-to-br from-purple-800 to-purple-600 z-50"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={transitionScreen}
            style={{ originX: 0 }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {currentForm === "login" && (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10"
          >
            <Login switchToRegister={() => setCurrentForm("register")} />
          </motion.div>
        )}
        {currentForm === "register" && (
          <_motion.div
            key="register"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10"
          >
            <Register switchToLogin={() => setCurrentForm("login")} />
          </_motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AuthContainer;
