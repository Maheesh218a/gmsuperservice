import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaLock, FaEye, FaEyeSlash, FaShieldAlt } from "react-icons/fa";

export default function Login() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [verificationCode, setVerificationCode] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Generate 6 digit code
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedCode(code);

      // Send Email via Backend
      const response = await fetch("http://localhost:5000/send-2fa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email, code })
      });

      if (!response.ok) {
        throw new Error("Failed to send 2FA email");
      }

      setStep(2); // Show 2FA input
      Swal.fire({
        title: "Check Your Email",
        text: "A 6-digit verification code has been sent to your email address.",
        icon: "info",
        background: "#0f172a",
        color: "#fff",
        confirmButtonColor: "#d4af37"
      });
      
    } catch (error) {
      console.error(error);
      
      let errorMessage = "Invalid email or password.";
      let errorTitle = "Access Denied";

      if (error.code === "auth/too-many-requests") {
        errorTitle = "Account Temporarily Locked";
        errorMessage = "Access to this account has been temporarily disabled due to many failed login attempts.";
      }

      Swal.fire({
        title: errorTitle,
        text: errorMessage,
        icon: "error",
        background: "#0f172a",
        color: "#fff",
        confirmButtonColor: "#d4af37"
      });
      auth.signOut();
    }
    setLoading(false);
  };

  const handleVerify = (e) => {
    e.preventDefault();
    if (verificationCode === generatedCode) {
      localStorage.setItem('adminLoginTime', Date.now().toString());
      navigate("/admin/dashboard");
    } else {
      Swal.fire({
        title: "Invalid Code",
        text: "The verification code you entered is incorrect.",
        icon: "error",
        background: "#0f172a",
        color: "#fff",
        confirmButtonColor: "#d4af37"
      });
    }
  };

  const handleCancel = () => {
    auth.signOut();
    setStep(1);
    setVerificationCode("");
    setGeneratedCode("");
    setPassword("");
  };

  return (
    <div className="bg-[#020617] min-h-screen pt-32 pb-20 flex items-center justify-center">
      <div className="bg-white/5 backdrop-blur-xl p-8 md:p-12 rounded-2xl border border-white/10 w-full max-w-md shadow-[0_0_50px_rgba(212,175,55,0.05)]">
        
        {step === 1 ? (
          <>
            <div className="text-center mb-8">
              <FaLock className="text-4xl text-brand-accent mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white tracking-tight">Admin Login</h2>
              <p className="text-brand-metallic mt-2">Secure Dashboard Access</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-brand-metallic mb-2 text-sm font-medium">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0f172a] border border-white/10 rounded-xl p-3.5 text-white focus:outline-none focus:border-brand-accent transition-colors"
                />
              </div>
              <div className="relative">
                <label className="block text-brand-metallic mb-2 text-sm font-medium">Password</label>
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#0f172a] border border-white/10 rounded-xl p-3.5 pr-12 text-white focus:outline-none focus:border-brand-accent transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-[44px] text-brand-metallic hover:text-white transition-colors"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-brand-accent text-black font-bold py-4 rounded-xl hover:bg-yellow-500 transition-all duration-300 mt-8 text-lg disabled:opacity-50 shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
              >
                {loading ? "Authenticating..." : "Login"}
              </button>
            </form>
          </>
        ) : (
          <>
            <div className="text-center mb-8">
              <FaShieldAlt className="text-5xl text-brand-accent mx-auto mb-4 animate-pulse" />
              <h2 className="text-3xl font-bold text-white tracking-tight">2FA Verification</h2>
              <p className="text-brand-metallic mt-2 leading-relaxed">
                We've sent a 6-digit code to<br/>
                <strong className="text-white">{email}</strong>
              </p>
            </div>

            <form onSubmit={handleVerify} className="space-y-6">
              <div>
                <input 
                  type="text" 
                  required
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/[^0-9]/g, ''))}
                  className="w-full bg-[#0f172a] border border-white/10 rounded-xl p-4 text-center text-3xl font-bold tracking-[0.5em] text-white focus:outline-none focus:border-brand-accent transition-colors"
                />
              </div>
              <div className="flex gap-4 mt-8">
                <button 
                  type="button"
                  onClick={handleCancel}
                  className="w-1/3 bg-transparent border border-white/20 text-white font-bold py-4 rounded-xl hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="w-2/3 bg-brand-accent text-black font-bold py-4 rounded-xl hover:bg-yellow-500 transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
                >
                  Verify
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
