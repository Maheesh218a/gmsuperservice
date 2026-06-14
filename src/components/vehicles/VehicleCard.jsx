import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

export default function VehicleCard({ vehicle }) {
  return (
    <div className="glassmorphism-dark p-10 rounded-[2.5rem] border border-white/10 group hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:border-brand-accent/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/0 to-brand-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <h3 className="text-4xl font-bold text-white mb-2 relative z-10">{vehicle.name}</h3>
      <p className="text-brand-metallic text-lg mb-10 uppercase tracking-widest font-semibold relative z-10">{vehicle.type}</p>
      
      <Link 
        to={vehicle.link} 
        className="inline-flex items-center text-white font-bold group-hover:text-brand-accent transition-colors relative z-10 uppercase tracking-wider text-sm"
      >
        <span className="relative">
          View Details
          <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-brand-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
        </span>
        <FaArrowRight className="ml-4 transform group-hover:translate-x-2 transition-transform duration-300" />
      </Link>
    </div>
  );
}
