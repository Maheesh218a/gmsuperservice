import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PageTransition from "../components/layout/PageTransition";
import VehicleCard from "../components/vehicles/VehicleCard";
import { 
  FaBus, FaCarSide, FaStar, FaChevronRight, 
  FaQuoteLeft, FaPhoneAlt, FaWhatsapp, 
  FaHistory, FaMusic, FaLightbulb, FaPlug, FaTint,
  FaFacebook, FaTiktok
} from "react-icons/fa";
import { motion } from "framer-motion";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { getDriveDirectLink } from "../components/ui/GoogleDriveImageLoader";
import Carousel from "../components/ui/Carousel";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const [heroImage, setHeroImage] = useState("");
  const [carouselImages, setCarouselImages] = useState([]);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const homeDoc = await getDoc(doc(db, "site_content", "home"));
        if (homeDoc.exists()) {
          if (homeDoc.data().heroImageDriveId) setHeroImage(homeDoc.data().heroImageDriveId);
          if (homeDoc.data().carouselImages) setCarouselImages(homeDoc.data().carouselImages);
        }
      } catch (error) {
        console.error("Error fetching hero data:", error);
      }
    };
    fetchHero();
  }, []);

  const fleet = [
    { name: "NB 8087", type: "Premium 54-Seater Bus", link: "/vehicles/NB8087" },
    { name: "NC 7573", type: "Luxury Bus", link: "/vehicles/NC7573" },
    { name: "KX 2422", type: "Wedding & Rent Car", link: "/vehicles/KX2422" }
  ];

  const services = [
    { icon: <FaBus />, title: "Luxury Bus Hire", desc: "Premium travel for large groups across the island." },
    { icon: <FaCarSide />, title: "Wedding & Rent Cars", desc: "Arrive in style on your special day." },
    { icon: <FaMusic />, title: "DJ & Sound System", desc: "Outdoor DJ facilities and premium indoor audio." },
    { icon: <FaLightbulb />, title: "Lighting Systems", desc: "Dynamic indoor and outdoor light shows." },
    { icon: <FaPlug />, title: "Charging Facilities", desc: "Phone charging ports for every passenger." },
    { icon: <FaTint />, title: "Water Tank", desc: "On-board water facilities for long journeys." }
  ];

  const reviews = [
    {
      name: "Humaidh Naseem",
      time: "10 months ago",
      text: "Highly recommended piece of art from matale.especially the owner , drivers and conductors are well mannered and have a decent and honest full driving skills and flexible to any changes. Travel all over the island with a joy and comfort zone✨"
    },
    {
      name: "SL shadow",
      time: "a month ago",
      text: "Excellent service and a very comfortable journey. The vehicle was perfectly clean and the staff was extremely professional. Highly recommended for any trip in Sri Lanka!"
    }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-brand-black">
        
        {/* 1. Cinematic Hero */}
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-brand-black/40 via-brand-black/80 to-brand-black z-10" />
            {heroImage ? (
              <div className="absolute inset-0 opacity-30 animate-pulse-glow">
                <img src={getDriveDirectLink(heroImage)} alt="Hero" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat opacity-30 animate-pulse-glow" />
            )}
          </div>

          <div className="container mx-auto px-6 relative z-20 text-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants} className="max-w-5xl mx-auto flex flex-col items-center">
              <motion.div variants={itemVariants} className="mb-6 inline-flex items-center px-4 py-2 rounded-full glassmorphism-gold text-brand-accent text-sm font-semibold tracking-widest uppercase shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                <FaStar className="mr-2" /> Premium Travel Experience
              </motion.div>
              <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-6 leading-none tracking-tighter">
                ELEVATE YOUR <br /><span className="text-gradient-gold">JOURNEY</span>
              </motion.h1>
              <motion.p variants={itemVariants} className="text-xl md:text-2xl text-brand-metallic mb-12 max-w-3xl mx-auto font-light leading-relaxed">
                Experience Sri Lanka with unparalleled luxury, comfort, and safety. Your ultimate journey begins here.
              </motion.p>
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6">
                <a href="#book" className="px-8 py-4 bg-brand-accent text-black font-bold rounded-full hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.4)] flex items-center justify-center group uppercase tracking-wider text-sm">
                  Book Now <FaChevronRight className="ml-2 group-hover:translate-x-2 transition-transform" />
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* 2. Our Story */}
        <section className="py-24 relative z-10 border-b border-white/5">
          <div className="container mx-auto px-6 max-w-5xl text-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={containerVariants}>
              <motion.div variants={itemVariants} className="w-20 h-20 mx-auto rounded-full glassmorphism-gold flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                <FaHistory className="text-3xl text-brand-accent" />
              </motion.div>
              <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Our <span className="text-gradient-gold">Story</span></motion.h2>
              <motion.div variants={itemVariants} className="w-24 h-1 bg-brand-accent mx-auto rounded-full mb-10"></motion.div>
              <motion.p variants={itemVariants} className="text-xl text-brand-light font-light leading-relaxed mb-6">
                Established in <strong className="text-brand-accent font-bold">2013</strong>, GM Super Service has been redefining luxury travel in Sri Lanka. From a humble beginning, we have grown into one of the most trusted names in premium transportation.
              </motion.p>
              <motion.p variants={itemVariants} className="text-lg text-brand-metallic leading-relaxed mb-10">
                Our mission is simple: to provide an unforgettable, safe, and wildly entertaining journey. Whether it is a grand wedding, a corporate retreat, or a cross-country tour, our fleet and our professional crew ensure every mile is a masterpiece.
              </motion.p>
              <motion.div variants={itemVariants} className="flex justify-center space-x-6">
                <a href="https://web.facebook.com/gmsuperservice" target="_blank" rel="noreferrer" className="w-16 h-16 rounded-full glassmorphism flex items-center justify-center text-3xl text-brand-light hover:text-brand-accent hover:border-brand-accent hover:scale-110 transition-all duration-300 shadow-lg">
                  <FaFacebook />
                </a>
                <a href="https://www.tiktok.com/@gm.super.service" target="_blank" rel="noreferrer" className="w-16 h-16 rounded-full glassmorphism flex items-center justify-center text-3xl text-brand-light hover:text-brand-accent hover:border-brand-accent hover:scale-110 transition-all duration-300 shadow-lg">
                  <FaTiktok />
                </a>
                <a href="https://wa.me/94773181037" target="_blank" rel="noreferrer" className="w-16 h-16 rounded-full glassmorphism flex items-center justify-center text-3xl text-brand-light hover:text-brand-accent hover:border-brand-accent hover:scale-110 transition-all duration-300 shadow-lg">
                  <FaWhatsapp />
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* 3. Our Services & Facilities */}
        <section className="py-24 relative z-10">
          <div className="container mx-auto px-6 max-w-7xl">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={containerVariants} className="mb-16 text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Premium <span className="text-gradient-gold">Services & Facilities</span></h2>
              <div className="w-24 h-1 bg-brand-accent mx-auto rounded-full mb-6"></div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div key={index} variants={itemVariants} className="glassmorphism-dark p-8 rounded-3xl group hover:-translate-y-2 transition-transform duration-500 border border-white/5 hover:border-brand-accent/30">
                  <div className="w-16 h-16 rounded-2xl glassmorphism-gold flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_15px_rgba(212,175,55,0.1)] group-hover:shadow-[0_0_25px_rgba(212,175,55,0.3)]">
                    <div className="text-3xl text-brand-accent">{service.icon}</div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-brand-metallic">{service.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 4. Explore Our Fleet */}
        <section className="py-24 relative z-10 bg-brand-darkgray/30 border-y border-white/5">
          <div className="container mx-auto px-6 max-w-7xl">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={containerVariants} className="mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Explore Our <span className="text-gradient-gold">Fleet</span></h2>
                <div className="w-24 h-1 bg-brand-accent rounded-full"></div>
              </div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {fleet.map((v, i) => (
                <motion.div variants={itemVariants} key={i}>
                  <VehicleCard vehicle={v} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 5. Gallery */}
        {carouselImages.length > 0 && (
          <section className="py-24 relative z-10">
            <div className="container mx-auto px-6 max-w-7xl">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants} className="mb-16 text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Our <span className="text-gradient-gold">Gallery</span></h2>
                <div className="w-24 h-1 bg-brand-accent mx-auto rounded-full mb-6"></div>
              </motion.div>
              <Carousel driveIds={carouselImages} />
            </div>
          </section>
        )}

        {/* 6. Google Reviews */}
        <section className="py-24 relative z-10 bg-[url('https://i.ibb.co/S4FYFFbK/Home.png')] bg-cover bg-center bg-no-repeat bg-fixed">
          <div className="absolute inset-0 bg-brand-black/90 backdrop-blur-sm z-0" />
          <div className="container mx-auto px-6 max-w-7xl relative z-20">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants} className="mb-16 text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-white p-3 rounded-full shadow-lg">
                  <svg viewBox="0 0 24 24" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                </div>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Google <span className="text-gradient-gold">Reviews</span></h2>
              <div className="flex items-center justify-center text-brand-accent text-2xl mb-2">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
              </div>
              <p className="text-brand-light font-semibold">5.0 Star Rating</p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {reviews.map((review, index) => (
                <motion.div key={index} variants={itemVariants} className="glassmorphism p-8 rounded-3xl relative border border-white/10 hover:border-brand-accent/50 transition-colors">
                  <FaQuoteLeft className="absolute top-6 right-8 text-4xl text-brand-accent/20" />
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-accent to-yellow-600 flex items-center justify-center text-black font-bold text-xl mr-4">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-white font-bold">{review.name}</h4>
                      <p className="text-brand-metallic text-sm">{review.time}</p>
                    </div>
                  </div>
                  <div className="flex text-brand-accent text-sm mb-4">
                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                  </div>
                  <p className="text-brand-light leading-relaxed italic">"{review.text}"</p>
                </motion.div>
              ))}
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants} className="text-center mt-16">
              <a href="https://share.google/uZcHNuJLYBzM1n2Vq" target="_blank" rel="noreferrer" className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-md text-white font-bold rounded-full hover:bg-brand-accent hover:text-black hover:scale-105 transition-all duration-300 border border-white/20 hover:border-brand-accent shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                Write a Review <FaChevronRight className="ml-2" />
              </a>
            </motion.div>
          </div>
        </section>

        {/* 7. Final CTA */}
        <section id="book" className="py-32 relative z-10 bg-brand-darkgray text-center border-t border-brand-accent/20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-accent/10 via-brand-black to-brand-black z-0" />
          <div className="container mx-auto px-6 relative z-10">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants} className="max-w-4xl mx-auto">
              <motion.h2 variants={itemVariants} className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
                READY TO <span className="text-gradient-gold">RIDE?</span>
              </motion.h2>
              <motion.p variants={itemVariants} className="text-xl text-brand-metallic mb-12 font-light">
                Secure your booking today and experience the pinnacle of luxury travel. 
                Our team is available 24/7 to assist you.
              </motion.p>
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <a href="tel:0773181037" className="w-full sm:w-auto px-10 py-5 bg-brand-accent text-black font-black text-lg rounded-full hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(212,175,55,0.4)] flex items-center justify-center">
                  <FaPhoneAlt className="mr-3" /> Call 077 318 1037
                </a>
                <a href="https://wa.me/94773181037" target="_blank" rel="noreferrer" className="w-full sm:w-auto px-10 py-5 bg-[#25D366] text-white font-black text-lg rounded-full hover:bg-[#20bd5a] hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(37,211,102,0.4)] flex items-center justify-center">
                  <FaWhatsapp className="mr-3 text-2xl" /> WhatsApp Us
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>

      </div>
    </PageTransition>
  );
}
