import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Routes, Route, Link, useLocation } from "react-router-dom";
import { collection, getDocs, doc, getDoc, setDoc } from "firebase/firestore";
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import { db } from "../../firebase/config";
import { FaSignOutAlt, FaTachometerAlt, FaCar, FaBook, FaImages, FaPlus, FaTrash, FaShieldAlt, FaEye, FaEyeSlash, FaBus } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";

export default function Dashboard() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!currentUser || !currentUser.emailVerified) {
      navigate("/admin");
    }
  }, [currentUser, navigate]);

  const handleLogout = async () => {
    await logout();
    localStorage.removeItem('adminLoginTime');
    navigate("/admin");
  };

  if (!currentUser) return null;

  const NavLink = ({ to, icon, label }) => {
    const isActive = location.pathname === to;
    return (
      <Link to={to} className={`flex items-center p-4 rounded-2xl transition-all duration-300 font-medium ${isActive ? 'bg-gradient-to-r from-brand-accent/20 to-transparent text-brand-accent border-l-4 border-brand-accent shadow-[inset_0_0_20px_rgba(212,175,55,0.05)]' : 'text-brand-metallic hover:bg-white/5 hover:text-white'}`}>
        <span className="text-xl mr-4">{icon}</span> {label}
      </Link>
    );
  };

  return (
    <div className="bg-[#020617] min-h-screen flex pt-20 relative z-20">
      {/* Sidebar */}
      <div className="w-80 bg-white/5 backdrop-blur-2xl border-r border-white/10 p-8 flex flex-col hidden md:flex shadow-[5px_0_30px_rgba(0,0,0,0.5)] z-20">
        <h2 className="text-2xl font-black text-white mb-10 tracking-widest uppercase flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-brand-accent flex items-center justify-center text-black text-sm">GM</div>
          Admin
        </h2>
        <nav className="flex-grow space-y-3">
          <NavLink to="/admin/dashboard" icon={<FaTachometerAlt />} label="Overview" />
          <NavLink to="/admin/dashboard/images" icon={<FaImages />} label="Manage Images" />
          <NavLink to="/admin/dashboard/vehicles" icon={<FaCar />} label="Manage Vehicles" />
          <NavLink to="/admin/dashboard/bookings" icon={<FaBook />} label="Bookings" />
          <NavLink to="/admin/dashboard/security" icon={<FaShieldAlt />} label="Security" />
        </nav>
        <button onClick={handleLogout} className="flex items-center justify-center p-4 text-red-400 hover:bg-red-500 hover:text-white border border-red-500/20 rounded-2xl mt-auto transition-all duration-300 font-bold tracking-wider">
          <FaSignOutAlt className="mr-3" /> LOGOUT
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-10 overflow-y-auto relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-6xl mx-auto"
          >
            <Routes>
              <Route path="/" element={<Overview />} />
              <Route path="/images" element={<ImageManager />} />
              <Route path="/vehicles" element={<VehicleManager />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/security" element={<Security currentUser={currentUser} />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function VehicleManager() {
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="text-4xl font-bold text-white mb-10 tracking-tight">Manage <span className="text-brand-accent">Vehicles</span></h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all hover:scale-105 shadow-xl">
          <FaBus className="text-5xl text-brand-accent mb-6" />
          <h2 className="text-2xl font-bold text-white mb-2">NB 8087</h2>
          <p className="text-brand-metallic mb-6">Premium 54-Seater Bus</p>
          <button onClick={() => navigate('/admin/dashboard/images')} className="w-full py-3 bg-[#020617] text-white border border-brand-accent/30 rounded-xl hover:bg-brand-accent hover:text-black transition-colors font-bold shadow-lg">Manage Gallery</button>
        </div>
        
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all hover:scale-105 shadow-xl">
          <FaBus className="text-5xl text-brand-accent mb-6" />
          <h2 className="text-2xl font-bold text-white mb-2">NC 7573</h2>
          <p className="text-brand-metallic mb-6">Luxury Bus</p>
          <button onClick={() => navigate('/admin/dashboard/images')} className="w-full py-3 bg-[#020617] text-white border border-brand-accent/30 rounded-xl hover:bg-brand-accent hover:text-black transition-colors font-bold shadow-lg">Manage Gallery</button>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all hover:scale-105 shadow-xl">
          <FaCar className="text-5xl text-brand-accent mb-6" />
          <h2 className="text-2xl font-bold text-white mb-2">KX 2422</h2>
          <p className="text-brand-metallic mb-6">Wedding & Rent Car</p>
          <button onClick={() => navigate('/admin/dashboard/images')} className="w-full py-3 bg-[#020617] text-white border border-brand-accent/30 rounded-xl hover:bg-brand-accent hover:text-black transition-colors font-bold shadow-lg">Manage Gallery</button>
        </div>
      </div>
      
      <div className="mt-10 bg-brand-accent/5 border border-brand-accent/20 rounded-3xl p-8 text-center shadow-inner">
        <p className="text-brand-metallic text-lg leading-relaxed">
          The core vehicle structures (layouts, features, and routing) are built directly into the website code for maximum performance.<br/>
          To update a vehicle's photos, click <strong>Manage Gallery</strong> above to go to the Image Manager.
        </p>
      </div>
    </div>
  );
}

function Overview() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-white mb-8 tracking-tight">Dashboard <span className="text-brand-accent">Overview</span></h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-full bg-gradient-to-br from-white/10 to-white/5 border border-white/10 p-8 rounded-3xl shadow-2xl backdrop-blur-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
          <h2 className="text-2xl font-bold text-white mb-2">Welcome back, Administrator.</h2>
          <p className="text-brand-metallic text-lg">Use the sidebar menu to manage your website content, update vehicle images, and track incoming bookings in real-time.</p>
        </div>
      </div>
    </div>
  );
}

function Security({ currentUser }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      return Swal.fire("Error", "New passwords do not match", "error");
    }

    setLoading(true);
    try {
      const credential = EmailAuthProvider.credential(currentUser.email, oldPassword);
      await reauthenticateWithCredential(currentUser, credential);
      await updatePassword(currentUser, newPassword);
      
      Swal.fire({
        title: "Success",
        text: "Password updated successfully!",
        icon: "success",
        background: "#0f172a",
        color: "#fff",
        confirmButtonColor: "#d4af37"
      });
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "Failed to update password. Please ensure your old password is correct.",
        icon: "error",
        background: "#0f172a",
        color: "#fff",
        confirmButtonColor: "#d4af37"
      });
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-4xl font-bold text-white mb-8 tracking-tight">Account <span className="text-brand-accent">Security</span></h1>
      
      <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-accent to-transparent opacity-50"></div>
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center"><FaShieldAlt className="mr-3 text-brand-accent" /> Change Password</h2>
        
        <form onSubmit={handlePasswordChange} className="space-y-6">
          <div className="relative">
            <label className="block text-brand-metallic mb-2 text-sm">Old Password</label>
            <input 
              type={showOldPassword ? "text" : "password"} 
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full bg-[#020617] border border-white/10 rounded-xl p-4 pr-12 text-white focus:outline-none focus:border-brand-accent transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowOldPassword(!showOldPassword)}
              className="absolute right-4 top-[48px] text-brand-metallic hover:text-white transition-colors"
            >
              {showOldPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="relative">
            <label className="block text-brand-metallic mb-2 text-sm">New Password</label>
            <input 
              type={showNewPassword ? "text" : "password"} 
              required
              minLength={6}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full bg-[#020617] border border-white/10 rounded-xl p-4 pr-12 text-white focus:outline-none focus:border-brand-accent transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-4 top-[48px] text-brand-metallic hover:text-white transition-colors"
            >
              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="relative">
            <label className="block text-brand-metallic mb-2 text-sm">Retype New Password</label>
            <input 
              type={showConfirmPassword ? "text" : "password"} 
              required
              minLength={6}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-[#020617] border border-white/10 rounded-xl p-4 pr-12 text-white focus:outline-none focus:border-brand-accent transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-[48px] text-brand-metallic hover:text-white transition-colors"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-brand-accent text-black font-bold py-4 rounded-xl hover:bg-yellow-500 transition-all duration-300 mt-4 disabled:opacity-50 shadow-[0_0_20px_rgba(212,175,55,0.2)]"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

function ImageManager() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [homeHero, setHomeHero] = useState("");
  const [homeCarouselImages, setHomeCarouselImages] = useState([]);
  const [nbImages, setNbImages] = useState([]);
  const [ncImages, setNcImages] = useState([]);
  const [kxImages, setKxImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const homeDoc = await getDoc(doc(db, "site_content", "home"));
        if (homeDoc.exists()) {
          setHomeHero(homeDoc.data().heroImageDriveId || "");
          setHomeCarouselImages(homeDoc.data().carouselImages || []);
        }

        const vehiclesDoc = await getDoc(doc(db, "site_content", "vehicles"));
        if (vehiclesDoc.exists()) {
          const data = vehiclesDoc.data();
          setNbImages(data.nb8087_images || []);
          setNcImages(data.nc7573_images || []);
          setKxImages(data.kx2422_images || []);
        }
      } catch (error) {
        console.error("Error fetching images", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const extractDriveId = (input) => {
    if (!input) return "";
    const match = input.match(/\/d\/(.+?)\//) || input.match(/id=(.+?)(&|$)/);
    if (match && match[1]) {
      return match[1];
    }
    return input.trim();
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, "site_content", "home"), { 
        heroImageDriveId: extractDriveId(homeHero),
        carouselImages: homeCarouselImages.map(extractDriveId).filter(id => id !== "")
      });
      await setDoc(doc(db, "site_content", "vehicles"), {
        nb8087_images: nbImages.map(extractDriveId).filter(id => id !== ""),
        nc7573_images: ncImages.map(extractDriveId).filter(id => id !== ""),
        kx2422_images: kxImages.map(extractDriveId).filter(id => id !== ""),
      });
      Swal.fire({ title: "Saved!", text: "Images updated successfully.", icon: "success", background: "#0f172a", color: "#fff", confirmButtonColor: "#d4af37" }).then(() => {
        window.location.reload();
      });
    } catch (error) {
      console.error(error);
      Swal.fire({ title: "Error", text: "Failed to save images.", icon: "error", background: "#0f172a" });
    } finally {
      setSaving(false);
    }
  };

  const ArrayInput = ({ title, state, setState }) => (
    <div className="bg-white/5 border border-white/10 p-8 rounded-3xl mb-8 shadow-xl relative overflow-hidden transition-all hover:bg-white/10 hover:border-white/20">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center">
        <div className="w-2 h-8 bg-brand-accent rounded-full mr-4"></div>
        {title}
      </h3>
      <div className="space-y-4">
        {state.map((id, index) => (
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} key={index} className="flex gap-4">
            <input 
              type="text" 
              placeholder="Google Drive File ID" 
              value={id}
              onChange={(e) => {
                const newState = [...state];
                newState[index] = e.target.value;
                setState(newState);
              }}
              className="flex-grow bg-[#020617] border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-brand-accent transition-colors"
            />
            <button 
              onClick={() => setState(state.filter((_, i) => i !== index))}
              className="px-6 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-lg"
            >
              <FaTrash />
            </button>
          </motion.div>
        ))}
      </div>
      <button 
        onClick={() => setState([...state, ""])}
        className="mt-6 flex items-center text-brand-accent hover:text-white border border-brand-accent/30 px-6 py-3 rounded-xl hover:bg-brand-accent/20 transition-all font-medium"
      >
        <FaPlus className="mr-3" /> Add New Image Link
      </button>
    </div>
  );

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-16 h-16 border-4 border-brand-accent border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-10 bg-[#020617]/80 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-xl relative z-30">
        <h1 className="text-3xl font-bold text-white">Manage <span className="text-brand-accent">Images</span></h1>
        <button onClick={handleSave} disabled={saving} className="px-8 py-4 bg-brand-accent text-black font-black tracking-widest uppercase rounded-xl hover:scale-105 transition-all disabled:opacity-50 shadow-[0_0_30px_rgba(212,175,55,0.3)]">
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <div className="space-y-8">
        <div className="bg-white/5 border border-white/10 p-8 rounded-3xl shadow-xl relative overflow-hidden transition-all hover:bg-white/10 hover:border-white/20">
          <h3 className="text-xl font-bold text-white mb-2 flex items-center">
            <div className="w-2 h-8 bg-brand-accent rounded-full mr-4"></div>
            Home Page Background
          </h3>
          <p className="text-sm text-brand-metallic mb-6 ml-6">Paste the direct image link for the massive hero image.</p>
          <input 
            type="text" 
            placeholder="https://..." 
            value={homeHero}
            onChange={(e) => setHomeHero(e.target.value)}
            className="w-full bg-[#020617] border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-brand-accent transition-colors"
          />
        </div>

        <ArrayInput title="Home Page Creative Gallery" state={homeCarouselImages} setState={setHomeCarouselImages} />
        <ArrayInput title="NB 8087 Carousel Images" state={nbImages} setState={setNbImages} />
        <ArrayInput title="NC 7573 Carousel Images" state={ncImages} setState={setNcImages} />
        <ArrayInput title="KX 2422 Carousel Images" state={kxImages} setState={setKxImages} />
      </div>
    </div>
  );
}

function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const querySnapshot = await getDocs(collection(db, "bookings"));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBookings(data);
    };
    fetchBookings();
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-bold text-white mb-10 tracking-tight">Recent <span className="text-brand-accent">Bookings</span></h1>
      <div className="bg-white/5 backdrop-blur-md rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
        <table className="w-full text-left text-white whitespace-nowrap">
          <thead className="bg-[#020617]/50 text-brand-accent border-b border-white/10">
            <tr>
              <th className="p-6 font-bold tracking-wider uppercase text-sm">Client Name</th>
              <th className="p-6 font-bold tracking-wider uppercase text-sm">Phone Number</th>
              <th className="p-6 font-bold tracking-wider uppercase text-sm">Route / Destinations</th>
              <th className="p-6 font-bold tracking-wider uppercase text-sm">Travel Dates</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b, idx) => (
              <tr key={idx} className="border-b border-white/5 hover:bg-brand-accent/5 transition-colors group">
                <td className="p-6 font-medium group-hover:text-brand-accent transition-colors">{b.name}</td>
                <td className="p-6 text-brand-metallic">{b.phone}</td>
                <td className="p-6 text-brand-metallic">
                  <span className="text-white font-medium">{b.startDestination}</span>
                  <span className="mx-3 text-brand-accent">➔</span>
                  <span className="text-white font-medium">{b.endDestination}</span>
                </td>
                <td className="p-6 text-brand-metallic">{b.startDate} <span className="text-white/30 mx-2">to</span> {b.endDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {bookings.length === 0 && (
          <div className="p-16 text-center">
            <FaBook className="text-6xl text-white/10 mx-auto mb-4" />
            <p className="text-brand-metallic text-lg">No recent bookings found in the database.</p>
          </div>
        )}
      </div>
    </div>
  );
}
