import { motion } from "framer-motion";

export default function SplashScreen() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#020617] overflow-hidden">
      {/* Ambient background glows */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-accent/10 rounded-full blur-[120px] pointer-events-none"
      />

      <div className="relative z-10 flex flex-col items-center">
        {/* Logo Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-10 relative"
        >
          <img 
            src="https://i.ibb.co/nqNX7GjJ/LOGO.png" 
            alt="GM Super Service" 
            className="w-48 md:w-64 h-auto drop-shadow-[0_0_40px_rgba(212,175,55,0.4)]"
          />
        </motion.div>

        {/* Loading Spinner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="relative flex items-center justify-center"
        >
          <svg className="w-16 h-16 animate-spin text-brand-accent/20" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" strokeWidth="3" stroke="currentColor" />
            <motion.circle 
              cx="50" cy="50" r="45" 
              fill="none" 
              strokeWidth="3" 
              stroke="#d4af37" 
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              strokeDasharray="283"
              strokeDashoffset="70"
            />
          </svg>
          
          <motion.div 
            animate={{ opacity: [0.5, 1, 0.5], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-3 h-3 bg-brand-accent rounded-full shadow-[0_0_15px_rgba(212,175,55,0.9)]"
          />
        </motion.div>

        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-8 text-center"
        >
          <h2 className="text-brand-accent uppercase tracking-[0.3em] text-xs font-bold mb-3 drop-shadow-md">
            Elevating Your Journey
          </h2>
          <div className="flex justify-center space-x-1.5">
            <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} className="w-1.5 h-1.5 rounded-full bg-brand-metallic" />
            <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-brand-metallic" />
            <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-brand-metallic" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
