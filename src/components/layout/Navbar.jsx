import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaFacebook, FaTiktok, FaWhatsapp, FaBars, FaTimes, FaChevronDown, FaCrown } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [vehiclesOpen, setVehiclesOpen] = useState(false);
  const location = useLocation();

  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const vehiclesLinks = [
    { name: "NB 8087 (Premium Bus)", path: "/vehicles/NB8087" },
    { name: "NC 7573 (Luxury Bus)", path: "/vehicles/NC7573" },
    { name: "KX 2422 (Rental Car)", path: "/vehicles/KX2422" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed w-full z-40 transition-all duration-500 ${
        scrolled ? "bg-black/60 backdrop-blur-xl border-b border-white/5 py-3 shadow-2xl" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center group">
          <img 
            src="https://i.ibb.co/nqNX7GjJ/LOGO.png" 
            alt="GM Super Service Logo" 
            className="h-14 w-auto group-hover:scale-105 transition-transform duration-300" 
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          <NavLink to="/" currentPath={location.pathname}>Home</NavLink>
          
          <div className="relative group py-2">
            <button className={`text-sm uppercase tracking-wider transition-all duration-300 hover:text-brand-accent flex items-center font-medium ${location.pathname.includes("/vehicles/") ? "text-brand-accent" : "text-brand-light"}`}>
              Vehicles <FaChevronDown className="ml-1 text-xs opacity-70 transition-transform duration-300 group-hover:rotate-180" />
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-64 bg-brand-darkgray/90 backdrop-blur-xl border border-brand-accent/20 rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 flex flex-col overflow-hidden shadow-[0_0_30px_rgba(212,175,55,0.1)] translate-y-4 group-hover:translate-y-0">
              {vehiclesLinks.map((v) => (
                <Link key={v.name} to={v.path} className="px-6 py-4 text-brand-light hover:text-black hover:bg-brand-accent transition-colors font-medium border-b border-white/5 last:border-0 relative overflow-hidden group/link">
                  <span className="relative z-10">{v.name}</span>
                </Link>
              ))}
            </div>
          </div>

          <NavLink to="/about" currentPath={location.pathname}>About</NavLink>
          <NavLink to="/contact" currentPath={location.pathname}>Contact</NavLink>
        </div>

        {/* Social */}
        <div className="hidden md:flex items-center space-x-5">
          <SocialLink href="https://web.facebook.com/gmsuperservice" icon={<FaFacebook />} />
          <SocialLink href="https://www.tiktok.com/@gm.super.service" icon={<FaTiktok />} />
          <SocialLink href="https://wa.me/94773181037" icon={<FaWhatsapp />} />
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-2xl text-brand-accent" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl flex flex-col items-center py-8 space-y-6 shadow-2xl border-t border-brand-accent/20 overflow-hidden"
          >
            <Link to="/" onClick={() => setIsOpen(false)} className="text-xl tracking-widest uppercase hover:text-brand-accent transition-colors text-white">Home</Link>
            
            <div className="flex flex-col items-center w-full">
              <button onClick={() => setVehiclesOpen(!vehiclesOpen)} className="text-xl tracking-widest uppercase hover:text-brand-accent transition-colors flex items-center mb-4 text-white">
                Vehicles <FaChevronDown className={`ml-2 text-sm transition-transform duration-300 ${vehiclesOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {vehiclesOpen && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex flex-col items-center w-full bg-white/5 py-4 space-y-4 overflow-hidden"
                  >
                    {vehiclesLinks.map((v) => (
                      <Link key={v.name} to={v.path} onClick={() => setIsOpen(false)} className="text-brand-metallic hover:text-brand-accent">
                        {v.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/about" onClick={() => setIsOpen(false)} className="text-xl tracking-widest uppercase hover:text-brand-accent transition-colors text-white">About</Link>
            <Link to="/contact" onClick={() => setIsOpen(false)} className="text-xl tracking-widest uppercase hover:text-brand-accent transition-colors text-white">Contact</Link>
            
            <div className="flex space-x-6 pt-6 border-t border-white/10 w-3/4 justify-center">
              <a href="https://web.facebook.com/gmsuperservice" target="_blank" rel="noreferrer" className="text-2xl text-brand-metallic hover:text-brand-accent transition-colors"><FaFacebook /></a>
              <a href="https://www.tiktok.com/@gm.super.service" target="_blank" rel="noreferrer" className="text-2xl text-brand-metallic hover:text-brand-accent transition-colors"><FaTiktok /></a>
              <a href="https://wa.me/94773181037" target="_blank" rel="noreferrer" className="text-2xl text-brand-metallic hover:text-brand-accent transition-colors"><FaWhatsapp /></a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

function NavLink({ to, currentPath, children }) {
  const isActive = currentPath === to;
  return (
    <Link to={to} className="relative group text-sm uppercase tracking-wider font-medium text-brand-light hover:text-brand-accent transition-colors py-2">
      {children}
      <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-brand-accent transform origin-left transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
    </Link>
  );
}

function SocialLink({ href, icon }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-lg text-white hover:border-brand-accent hover:text-brand-accent hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all duration-300 hover:-translate-y-1">
      {icon}
    </a>
  );
}
