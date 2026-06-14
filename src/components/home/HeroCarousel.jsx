import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function HeroCarousel({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Helper to convert typical drive share link or ID to a direct image link
  const getDirectLink = (urlOrId) => {
    if (!urlOrId) return "";
    if (urlOrId.includes("export=view")) return urlOrId;
    const matchId = urlOrId.match(/(?:id=|\/d\/)([\w-]+)/);
    const id = matchId ? matchId[1] : urlOrId;
    return `https://drive.google.com/uc?export=view&id=${id}`;
  };

  useEffect(() => {
    if (!images || images.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 15000); // 15 seconds
    return () => clearInterval(interval);
  }, [images]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!images || images.length === 0) {
    return <div className="h-screen flex items-center justify-center bg-brand-darkgray">Loading Hero...</div>;
  }

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <img
            src={getDirectLink(images[currentIndex])}
            alt="Hero Carousel"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" /> {/* Dark overlay */}
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4">
        <motion.h1 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold text-gradient-gold mb-6"
        >
          Travel is Ultimate Power
        </motion.h1>
        <motion.p 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-xl md:text-3xl text-brand-light"
        >
          Experience luxury transportation with GM Super Service Matale
        </motion.p>
      </div>

      <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full glassmorphism hover:bg-brand-accent/20 transition-colors">
        <FaChevronLeft className="text-2xl" />
      </button>
      <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full glassmorphism hover:bg-brand-accent/20 transition-colors">
        <FaChevronRight className="text-2xl" />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-3 h-3 rounded-full transition-all ${idx === currentIndex ? 'bg-brand-accent scale-125' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
}
