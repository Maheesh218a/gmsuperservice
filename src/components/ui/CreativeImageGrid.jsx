import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getDriveDirectLink } from "./GoogleDriveImageLoader";
import { FaTimes, FaDownload } from "react-icons/fa";

export default function CreativeImageGrid({ images = [] }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const forceDownload = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();

    const imageUrl = getDriveDirectLink(id);
    
    try {
      // Try to fetch as blob to force a local download with exact filename
      const response = await fetch(imageUrl, { mode: 'cors' });
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `GM-Super-Service-${id}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      // Fallback for CORS: use an invisible iframe to trigger the browser's download prompt
      // Google Drive's export=download usually forces Content-Disposition: attachment
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.src = imageUrl;
      document.body.appendChild(iframe);
      setTimeout(() => document.body.removeChild(iframe), 5000);
    }
  };
  if (!images || images.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:auto-rows-[300px]">
      {images.map((id, index) => {
        // Create dynamic span classes based on index to create a bento box effect
        let colSpan = "md:col-span-1";
        let rowSpan = "md:row-span-1";

        if (images.length === 1) {
            colSpan = "md:col-span-4";
            rowSpan = "md:row-span-2";
        } else if (index === 0) {
          colSpan = "md:col-span-2";
          rowSpan = "md:row-span-2";
        } else if (index === 1 || index === 2) {
          colSpan = "md:col-span-2";
          rowSpan = "md:row-span-1";
        } else if (index === 3) {
          colSpan = "md:col-span-2";
          rowSpan = "md:row-span-2";
        } else if (index === 4) {
          colSpan = "md:col-span-2";
          rowSpan = "md:row-span-1";
        } else if (index % 5 === 0) {
          colSpan = "md:col-span-3";
          rowSpan = "md:row-span-1";
        }

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (index % 4) * 0.1, duration: 0.6 }}
            onClick={() => setSelectedImage(id)}
            className={`relative overflow-hidden rounded-3xl group bg-brand-darkgray border border-white/5 shadow-lg cursor-pointer ${colSpan} ${rowSpan}`}
          >
            <img 
              src={getDriveDirectLink(id)} 
              alt={`Gallery image ${index + 1}`} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
               <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                 <div className="w-10 h-10 rounded-full glassmorphism-gold flex items-center justify-center text-brand-accent shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                   </svg>
                 </div>
               </div>
            </div>
          </motion.div>
        );
      })}
      
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-black/95 backdrop-blur-md"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white/50 hover:text-white text-4xl transition-colors z-50"
              onClick={() => setSelectedImage(null)}
            >
              <FaTimes />
            </button>
            
            <motion.img 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={getDriveDirectLink(selectedImage)} 
              alt="Fullscreen view" 
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.8)]"
              onClick={(e) => e.stopPropagation()} 
            />
            
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
              <button 
                onClick={(e) => forceDownload(e, selectedImage)}
                className="flex items-center px-8 py-4 bg-brand-accent text-black font-bold tracking-widest uppercase rounded-full hover:bg-white transition-all shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:scale-105"
              >
                <FaDownload className="mr-3 text-xl" /> Download Image
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
