import { Link, useLocation } from "react-router-dom";
import { FaCrown, FaPhoneAlt, FaMapMarkerAlt, FaFacebook, FaTiktok, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  const location = useLocation();

  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="relative bg-black pt-20 pb-10 border-t border-white/10 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-brand-accent to-transparent opacity-50" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Col */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6 group">
              <img 
                src="https://i.ibb.co/nqNX7GjJ/LOGO.png" 
                alt="GM Super Service Logo" 
                className="h-20 w-auto group-hover:scale-105 transition-transform duration-300" 
              />
            </Link>
            <p className="text-brand-metallic mb-6 leading-relaxed">
              Travel is Ultimate Power. Redefining luxury transportation and ensuring every journey is memorable.
            </p>
            <div className="flex space-x-4">
              <a href="https://web.facebook.com/gmsuperservice" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-brand-light hover:bg-brand-accent hover:text-black transition-all">
                <FaFacebook />
              </a>
              <a href="https://www.tiktok.com/@gm.super.service" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-brand-light hover:bg-brand-accent hover:text-black transition-all">
                <FaTiktok />
              </a>
              <a href="https://wa.me/94773181037" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-brand-light hover:bg-brand-accent hover:text-black transition-all">
                <FaWhatsapp />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-4">
              <li><Link to="/" className="text-brand-metallic hover:text-brand-accent transition-colors flex items-center before:content-[''] before:w-2 before:h-[2px] before:bg-brand-accent before:mr-3 before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:origin-left">Home</Link></li>
              <li><Link to="/about" className="text-brand-metallic hover:text-brand-accent transition-colors flex items-center before:content-[''] before:w-2 before:h-[2px] before:bg-brand-accent before:mr-3 before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:origin-left">About Us</Link></li>
              <li><Link to="/contact" className="text-brand-metallic hover:text-brand-accent transition-colors flex items-center before:content-[''] before:w-2 before:h-[2px] before:bg-brand-accent before:mr-3 before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:origin-left">Book a Vehicle</Link></li>
              <li><Link to="/vehicles/NB8087" className="text-brand-metallic hover:text-brand-accent transition-colors flex items-center before:content-[''] before:w-2 before:h-[2px] before:bg-brand-accent before:mr-3 before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:origin-left">Our Fleet</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-wider">Contact Us</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center flex-shrink-0 text-brand-accent">
                  <FaPhoneAlt />
                </div>
                <div>
                  <p className="text-brand-light font-bold mb-1">Call & WhatsApp</p>
                  <a href="tel:+94773181037" className="block text-brand-metallic hover:text-brand-accent transition-colors">077 318 1037</a>
                  <a href="tel:+94767900101" className="block text-brand-metallic hover:text-brand-accent transition-colors">076 790 0101</a>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center flex-shrink-0 text-brand-accent">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <p className="text-brand-light font-bold mb-1">Location</p>
                  <a href="https://www.google.com/maps/search/GM+Super+Service+Matale,+Sri+Lanka" target="_blank" rel="noreferrer" className="block text-brand-metallic hover:text-brand-accent transition-colors">
                    GM Super Service<br/>Matale, Sri Lanka
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-brand-metallic">
          <p className="mb-4 md:mb-0 text-center md:text-left">
            &copy; {new Date().getFullYear()} GM Super Service Matale. All Rights Reserved. <span className="hidden md:inline">|</span> <br className="md:hidden" />
            <span className="md:ml-1">Developed by <a href="https://maheesha-portfilo-react.vercel.app/" target="_blank" rel="noreferrer" className="text-brand-accent hover:text-white transition-colors font-semibold">Maheesha Udalagama</a></span>
          </p>
          <div className="flex items-center space-x-6 flex-wrap justify-center">
            <Link to="/admin" target="_blank" className="hover:text-brand-accent transition-colors uppercase tracking-wider text-xs border border-white/10 hover:border-brand-accent/50 px-3 py-1 rounded-full">
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
