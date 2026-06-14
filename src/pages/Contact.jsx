import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";
import emailjs from "@emailjs/browser";
import { FaPhoneAlt, FaWhatsapp, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";
import PageTransition from "../components/layout/PageTransition";
import { motion } from "framer-motion";

export default function Contact() {
  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm();
  
  const startDate = watch("startDate");

  const getTodayStr = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const onSubmit = async (data) => {
    try {
      await addDoc(collection(db, "bookings"), {
        ...data,
        createdAt: serverTimestamp(),
      });

      const emailResponse = await fetch("http://localhost:5000/send-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          email: data.email || "N/A",
          startDest: data.startDestination,
          endDest: data.endDestination,
          startDate: data.startDate,
          endDate: data.endDate
        }),
      });

      if (!emailResponse.ok) {
        console.error("Failed to send booking email");
        // We still let it pass because it saved to Firebase successfully
      }

      Swal.fire({
        title: "Booking Submitted!",
        text: "We will contact you shortly.",
        icon: "success",
        background: "#0f172a",
        color: "#fff",
        confirmButtonColor: "#d4af37"
      });
      reset();
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "Could not submit booking. Please try again.",
        icon: "error",
        background: "#0f172a",
        color: "#fff",
        confirmButtonColor: "#d4af37"
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <PageTransition>
      <div className="min-h-screen pt-32 pb-20 relative z-10">
        <div className="container mx-auto px-6 max-w-6xl">
          
          <motion.div initial="hidden" animate="visible" variants={containerVariants} className="text-center mb-16">
            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
              LET'S <span className="text-gradient-gold">CONNECT</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-xl md:text-2xl text-brand-metallic font-light">
              Plan your ultimate journey with us
            </motion.p>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={containerVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Contact Info Cards */}
            <div className="space-y-6 lg:col-span-1">
              <motion.a variants={itemVariants} href="tel:0773181037" className="block glassmorphism p-8 rounded-3xl text-center group hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-brand-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <FaPhoneAlt className="text-4xl text-brand-accent mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold text-white mb-2">Call Us</h3>
                <p className="text-lg text-brand-metallic">077 318 1037</p>
                <p className="text-lg text-brand-metallic">076 790 0101</p>
              </motion.a>
              
              <motion.a variants={itemVariants} href="https://wa.me/94773181037" target="_blank" rel="noreferrer" className="block glassmorphism p-8 rounded-3xl text-center group hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-[#25D366]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <FaWhatsapp className="text-4xl text-[#25D366] mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold text-white mb-2">WhatsApp</h3>
                <p className="text-lg text-brand-metallic">077 318 1037</p>
              </motion.a>

              <motion.a variants={itemVariants} href="https://share.google/OG6fmXTD4UCVvFUvo" target="_blank" rel="noreferrer" className="block glassmorphism p-8 rounded-3xl text-center group hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-brand-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <FaMapMarkerAlt className="text-4xl text-brand-accent mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold text-white mb-2">Location</h3>
                <p className="text-brand-metallic">GM Super Service, Matale</p>
              </motion.a>
            </div>

            {/* Booking Form */}
            <motion.div variants={itemVariants} className="lg:col-span-2 glassmorphism-dark p-8 md:p-12 rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/10 rounded-full blur-[80px] -z-10" />
              
              <h2 className="text-3xl font-bold text-white mb-8">Book a Vehicle</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-brand-metallic mb-2 text-sm uppercase tracking-wider">Name *</label>
                    <input 
                      type="text" 
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-brand-accent focus:bg-white/10 transition-all"
                      {...register("name", { required: "Required", pattern: { value: /^[A-Za-z\s]+$/, message: "Invalid" } })}
                    />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                  </div>

                  <div>
                    <label className="block text-brand-metallic mb-2 text-sm uppercase tracking-wider">Phone *</label>
                    <input 
                      type="tel" 
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-brand-accent focus:bg-white/10 transition-all"
                      {...register("phone", { required: "Required", pattern: { value: /^[0-9+\-\s]+$/, message: "Invalid" } })}
                    />
                    {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-brand-metallic mb-2 text-sm uppercase tracking-wider">Email (Optional)</label>
                  <input 
                    type="email" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-brand-accent focus:bg-white/10 transition-all"
                    {...register("email", { pattern: { value: /^\S+@\S+$/i, message: "Invalid" } })}
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-brand-metallic mb-2 text-sm uppercase tracking-wider">Start Destination *</label>
                    <input 
                      type="text" 
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-brand-accent focus:bg-white/10 transition-all"
                      {...register("startDestination", { required: "Required" })}
                    />
                    {errors.startDestination && <p className="text-red-400 text-xs mt-1">{errors.startDestination.message}</p>}
                  </div>

                  <div>
                    <label className="block text-brand-metallic mb-2 text-sm uppercase tracking-wider">End Destination *</label>
                    <input 
                      type="text" 
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-brand-accent focus:bg-white/10 transition-all"
                      {...register("endDestination", { required: "Required" })}
                    />
                    {errors.endDestination && <p className="text-red-400 text-xs mt-1">{errors.endDestination.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-brand-metallic mb-2 text-sm uppercase tracking-wider">Start Date *</label>
                    <input 
                      type="date" 
                      min={getTodayStr()}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-brand-accent focus:bg-white/10 transition-all color-scheme-dark"
                      style={{colorScheme: 'dark'}}
                      {...register("startDate", { required: "Required" })}
                    />
                    {errors.startDate && <p className="text-red-400 text-xs mt-1">{errors.startDate.message}</p>}
                  </div>

                  <div>
                    <label className="block text-brand-metallic mb-2 text-sm uppercase tracking-wider">End Date *</label>
                    <input 
                      type="date" 
                      min={startDate || getTodayStr()}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-brand-accent focus:bg-white/10 transition-all"
                      style={{colorScheme: 'dark'}}
                      {...register("endDate", { required: "Required" })}
                    />
                    {errors.endDate && <p className="text-red-400 text-xs mt-1">{errors.endDate.message}</p>}
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-brand-accent to-yellow-600 text-black font-bold py-4 rounded-xl hover:scale-[1.02] transition-transform duration-300 mt-8 text-lg flex items-center justify-center uppercase tracking-widest shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                >
                  <FaPaperPlane className="mr-3" /> Send Request
                </button>
              </form>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </PageTransition>
  );
}
