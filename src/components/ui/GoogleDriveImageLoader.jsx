import { useState } from "react";
import { motion } from "framer-motion";

export const getDriveDirectLink = (urlOrId) => {
  if (!urlOrId) return "";
  
  // If the user provides a link from another service (like ImgBB or Imgur), use it directly
  if (urlOrId.startsWith("http") && !urlOrId.includes("drive.google.com")) {
    return urlOrId;
  }

  if (urlOrId.includes("export=view") || urlOrId.includes("export=download")) return urlOrId;
  
  const matchId = urlOrId.match(/(?:id=|\/d\/)([\w-]+)/);
  const id = matchId ? matchId[1] : urlOrId;
  
  // As a final workaround for 2024 Google Drive restrictions, we force a direct file download 
  // instead of a preview, which often bypasses the HTML wrapper block.
  return `https://drive.google.com/uc?export=download&id=${id}`;
};

export default function GoogleDriveImageLoader({ images = [], altText = "Vehicle Image" }) {

  if (!images || images.length === 0) {
    return <div className="h-64 flex items-center justify-center bg-brand-darkgray text-brand-metallic rounded-lg">No images available</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {images.map((img, index) => {
        return (
          <ImageCard key={index} src={getDriveDirectLink(img)} altText={`${altText} ${index + 1}`} index={index} />
        );
      })}
    </div>
  );
}

function ImageCard({ src, altText, index }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative overflow-hidden rounded-xl aspect-video group bg-brand-darkgray"
    >
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center text-brand-metallic animate-pulse">
          Loading...
        </div>
      )}
      <img
        src={src}
        alt={altText}
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
}
