import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NB8087 from "./pages/vehicles/NB8087";
import NC7573 from "./pages/vehicles/NC7573";
import KX2422 from "./pages/vehicles/KX2422";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import SplashScreen from "./components/common/SplashScreen";
import { useState, useEffect } from "react";

function AnimatedRoutes() {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/vehicles/NB8087" element={<NB8087 />} />
        <Route path="/vehicles/NC7573" element={<NC7573 />} />
        <Route path="/vehicles/KX2422" element={<KX2422 />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard/*" element={<AdminDashboard />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen relative bg-brand-black overflow-hidden">
          {/* Ambient Background Orbs */}
          <div className="bg-orb w-[600px] h-[600px] bg-brand-accent/20 top-[-10%] left-[-10%]" />
          <div className="bg-orb w-[500px] h-[500px] bg-blue-900/30 bottom-[10%] right-[-5%]" style={{ animationDelay: "2s" }} />
          <div className="bg-orb w-[400px] h-[400px] bg-purple-900/20 top-[40%] left-[30%]" style={{ animationDelay: "5s" }} />

          <Navbar />
          <main className="flex-grow z-10 relative">
            <AnimatedRoutes />
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
