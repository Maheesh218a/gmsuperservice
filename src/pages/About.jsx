import PageTransition from "../components/layout/PageTransition";
import { motion } from "framer-motion";
import { FaCrown, FaUsers, FaGlobeAsia } from "react-icons/fa";

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <PageTransition>
      <div className="min-h-screen pt-32 pb-20 relative z-10">
        <div className="container mx-auto px-6 max-w-6xl">
          
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center mb-24"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center justify-center w-20 h-20 rounded-full glassmorphism-gold mb-8">
              <FaCrown className="text-4xl text-brand-accent" />
            </motion.div>
            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
              OUR <span className="text-gradient-gold">LEGACY</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-xl md:text-2xl text-brand-metallic max-w-3xl mx-auto font-light leading-relaxed">
              We don't just provide transportation. We craft unforgettable journeys defined by luxury, precision, and absolute comfort.
            </motion.p>
          </motion.div>

          {/* Creative Editorial Section */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32"
          >
            {/* Overlapping Images Gallery */}
            <div className="relative h-[500px] md:h-[600px] w-full group">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-brand-accent/20 rounded-full blur-[100px] -z-10 transition-all duration-700 group-hover:bg-brand-accent/30 group-hover:scale-110" />
              
              <motion.div 
                variants={itemVariants} 
                className="absolute left-0 md:-left-8 top-0 md:top-8 w-[70%] h-[350px] md:h-[450px] rounded-3xl overflow-hidden bg-white/5 backdrop-blur-md border border-white/20 p-2 z-10 hover:z-30 transition-all duration-700 hover:scale-105 shadow-[0_0_40px_rgba(0,0,0,0.5)]"
              >
                <img src="https://i.ibb.co/JXwJ6gp/about-01.png" alt="GM Super Service History 1" className="w-full h-full object-cover rounded-2xl" />
              </motion.div>
              
              <motion.div 
                variants={itemVariants} 
                className="absolute right-0 md:-right-8 bottom-0 md:bottom-8 w-[65%] h-[300px] md:h-[400px] rounded-3xl overflow-hidden bg-white/5 backdrop-blur-md border border-brand-accent/30 p-2 z-20 hover:z-30 transition-all duration-700 hover:scale-105 shadow-[0_20px_50px_rgba(212,175,55,0.15)]"
              >
                <img src="https://i.ibb.co/8gCqSxPK/about-02.png" alt="GM Super Service History 2" className="w-full h-full object-cover rounded-2xl" />
              </motion.div>
            </div>
            
            <motion.div variants={itemVariants} className="space-y-8 lg:pl-10">
              <div className="inline-block px-4 py-1.5 rounded-full bg-brand-accent/10 border border-brand-accent/30 text-brand-accent text-sm font-bold tracking-widest uppercase mb-2">
                Since 2013
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight">
                Redefining Travel in <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-yellow-200 to-brand-accent animate-gradient bg-[length:200%_auto]">
                  Sri Lanka
                </span>
              </h2>
              <p className="text-lg md:text-xl text-brand-metallic leading-relaxed font-light">
                Founded with a vision to elevate the transportation industry, GM Super Service Matale has grown into a premier luxury fleet provider. Our commitment is simple: providing vehicles that aren't just a mode of transport, but a destination in themselves.
              </p>
              
              <div className="grid grid-cols-2 gap-10 pt-10 mt-6 border-t border-white/10 relative">
                <div className="absolute top-0 left-0 w-1/4 h-[1px] bg-gradient-to-r from-brand-accent to-transparent" />
                <div className="group">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-brand-accent/10 group-hover:border-brand-accent/30 transition-all duration-300">
                    <FaUsers className="text-2xl text-brand-accent" />
                  </div>
                  <h4 className="text-3xl font-black text-white mb-2">10,000+</h4>
                  <p className="text-brand-metallic text-sm uppercase tracking-widest font-medium">Happy Clients</p>
                </div>
                <div className="group">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-brand-accent/10 group-hover:border-brand-accent/30 transition-all duration-300">
                    <FaGlobeAsia className="text-2xl text-brand-accent" />
                  </div>
                  <h4 className="text-3xl font-black text-white mb-2">Island-wide</h4>
                  <p className="text-brand-metallic text-sm uppercase tracking-widest font-medium">Coverage</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </PageTransition>
  );
}
