import { useState, useEffect } from "react";
import PageTransition from "../../components/layout/PageTransition";
import VehicleCard from "../../components/vehicles/VehicleCard";
import CreativeImageGrid from "../../components/ui/CreativeImageGrid";
import { FaPhoneAlt, FaWhatsapp, FaCheckCircle, FaUsers } from "react-icons/fa";
import { motion } from "framer-motion";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

export default function NB8087() {
  const facilities = [
    "🔊 Outdoor DJ Facilities",
    "🎵 Indoor Sound System",
    "💡 Indoor & Outdoor Light System",
    "🔌 Phone Charging Facilities",
    "💧 Water Tank"
  ];

  const otherVehicles = [
    { name: "NC 7573", type: "Luxury Bus", link: "/vehicles/NC7573" },
    { name: "KX 2422", type: "Rental Car", link: "/vehicles/KX2422" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const docRef = await getDoc(doc(db, "site_content", "vehicles"));
        if (docRef.exists()) {
          setImages(docRef.data().nb8087_images || []);
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };
    fetchImages();
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen pt-32 pb-20 relative z-10">
        <div className="container mx-auto px-6 max-w-7xl">
          
          {/* Header */}
          <motion.div initial="hidden" animate="visible" variants={containerVariants} className="mb-20 border-b border-white/10 pb-12 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10">
            <div>
              <motion.div variants={itemVariants} className="inline-flex items-center px-4 py-2 rounded-full glassmorphism-gold text-brand-accent text-sm font-semibold tracking-widest uppercase mb-6 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                <FaUsers className="mr-2" /> 54 Seats
              </motion.div>
              <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl font-black text-white mb-4 tracking-tighter">
                NB <span className="text-gradient-gold">8087</span>
              </motion.h1>
              <motion.p variants={itemVariants} className="text-2xl text-brand-metallic font-light">
                Flagship Premium Bus
              </motion.p>
            </div>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <a href="tel:0773181037" className="px-8 py-4 bg-brand-darkgray border border-white/10 rounded-full hover:border-brand-accent transition-colors flex items-center justify-center group text-white">
                <FaPhoneAlt className="text-brand-accent mr-3 group-hover:scale-125 transition-transform" /> Call Now
              </a>
              <a href="https://wa.me/94773181037" target="_blank" rel="noreferrer" className="px-8 py-4 bg-[#25D366]/10 border border-[#25D366]/30 rounded-full hover:bg-[#25D366]/20 transition-colors flex items-center justify-center group text-white">
                <FaWhatsapp className="text-[#25D366] mr-3 group-hover:scale-125 transition-transform" /> WhatsApp
              </a>
            </motion.div>
          </motion.div>

          {images.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mb-24">
              <CreativeImageGrid images={images} />
            </motion.div>
          )}

          {/* Info Section */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={containerVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32">
            <motion.div variants={itemVariants}>
              <h2 className="text-sm uppercase tracking-widest text-brand-accent font-bold mb-6 flex items-center">
                <span className="w-8 h-[2px] bg-brand-accent mr-4"></span> Vehicle Details
              </h2>
              <p className="text-brand-light leading-relaxed text-xl font-light mb-8">
                The NB 8087 is our flagship 54-seater luxury bus, designed to provide the ultimate travel experience for large groups. 
                Whether it is a long tour across the country or a special event, this vehicle ensures maximum comfort, safety, and entertainment.
              </p>
              <p className="text-brand-metallic leading-relaxed text-lg">
                Equipped with top-tier sound and lighting systems, your journey will be as exciting as the destination itself. Experience travel redefined.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="glassmorphism-dark p-10 md:p-14 rounded-[3rem] border border-brand-accent/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/5 rounded-full blur-[80px] -z-10" />
              <h2 className="text-3xl font-bold text-white mb-10 tracking-tight">Premium Facilities</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {facilities.map((fac, idx) => (
                  <li key={idx} className="flex items-center text-brand-light text-lg p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                    <FaCheckCircle className="text-brand-accent mr-4 flex-shrink-0 text-xl" />
                    <span>{fac}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Cross Navigation */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl font-bold text-white tracking-tight">Explore Fleet</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {otherVehicles.map((v, i) => (
                <motion.div variants={itemVariants} key={i}>
                  <VehicleCard vehicle={v} />
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </PageTransition>
  );
}
