import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getDriveDirectLink } from "./GoogleDriveImageLoader";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Carousel({ driveIds = [], autoPlay = true, interval = 5000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay || driveIds.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % driveIds.length);
    }, interval);
    return () => clearInterval(timer);
  }, [autoPlay, driveIds.length, interval]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % driveIds.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? driveIds.length - 1 : prev - 1));
  };

  if (!driveIds || driveIds.length === 0) {
    return (
      <div className="w-full aspect-[16/9] lg:aspect-[21/9] glassmorphism flex items-center justify-center rounded-[3rem] border border-white/5">
        <p className="text-brand-metallic">No images available</p>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-[16/9] lg:aspect-[21/9] rounded-[3rem] overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 bg-brand-darkgray">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <img 
            src={getDriveDirectLink(driveIds[currentIndex])} 
            alt={`Slide ${currentIndex + 1}`} 
            className="w-full h-full object-cover" 
          />
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      {driveIds.length > 1 && (
        <>
          <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button 
              onClick={prevSlide}
              className="w-12 h-12 rounded-full glassmorphism flex items-center justify-center text-white hover:bg-brand-accent hover:text-black transition-all hover:scale-110 ml-4"
            >
              <FaChevronLeft />
            </button>
            <button 
              onClick={nextSlide}
              className="w-12 h-12 rounded-full glassmorphism flex items-center justify-center text-white hover:bg-brand-accent hover:text-black transition-all hover:scale-110 mr-4"
            >
              <FaChevronRight />
            </button>
          </div>

          {/* Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
            {driveIds.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-500 ${
                  idx === currentIndex ? "w-8 bg-brand-accent shadow-[0_0_10px_rgba(212,175,55,0.8)]" : "w-2 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
