

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, Sparkles, Shield, Zap, Cpu, Brain, ChevronRight } from "lucide-react";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return "";
  };

  const validatePasswordStrength = (password) => {
    const checks = {
      length: password.length >= 12,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[@$!%*?&]/.test(password),
    };
    
    const passedChecks = Object.values(checks).filter(Boolean).length;
    const strength = passedChecks === 5 ? "strong" : passedChecks >= 3 ? "medium" : "weak";
    
    return { checks, strength };
  };

  const handleLogin = async () => {
    setEmailError("");
    setPasswordError("");
    
    const emailValidationError = validateEmail(email);
    if (emailValidationError) {
      setEmailError(emailValidationError);
      return;
    }
    
    const { checks, strength } = validatePasswordStrength(password);
    if (!checks.length || strength === "weak") {
      setPasswordError(
        "Password must contain:\n• Minimum 12 characters\n• Uppercase letter\n• Lowercase letter\n• Number\n• Special character (@$!%*?&)"
      );
      return;
    }
    
    setIsLoading(true);
    
    try {
      const res = await fetch("https://mavx-production.up.railway.app/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await res.json();
      
      if (data.success) {
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("user", JSON.stringify(data));
        if (data.role === "manager") {

  navigate("/manager-dashboard");

} else if (data.role === "trainer") {

  navigate("/trainer-dashboard");

} else {

  navigate("/admin-dashboard");
}
      } else {
        setPasswordError(data.message || "Invalid credentials");
      }
    } catch (err) {
      setPasswordError("Server Error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
      
      {/* Animated Gradient Orbs */}
      <div className="absolute top-0 -left-40 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-pulse"></div>
      <div className="absolute top-40 -right-40 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-pulse animation-delay-2000"></div>
      <div className="absolute -bottom-40 left-1/2 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-pulse animation-delay-4000"></div>
      
      {/* Mouse-following light effect */}
      <div 
        className="absolute w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full filter blur-[100px] pointer-events-none transition-all duration-300"
        style={{
          left: mousePosition.x - 200,
          top: mousePosition.y - 200,
        }}
      ></div>

      <div className="flex w-full relative z-10 min-h-screen">
        {/* Left Side - Brand Section with Image */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-black via-slate-900 to-black flex-col justify-between p-12 relative overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 opacity-30">
            <img 
              src="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1932&auto=format&fit=crop"
              alt="AI Neural Network"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center space-x-3 mb-16">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2.5 rounded-xl shadow-lg shadow-purple-500/30">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                MavX 
              </span>
            </div>
            
            <div className="space-y-6">
              <h1 className="text-6xl font-bold leading-tight">
                <span className="text-white">Train Smarter</span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  with AI Power
                </span>
              </h1>
              
              <p className="text-gray-400 text-lg leading-relaxed">
                Transform your training programs with AI analytics and
                real-time insights.
              </p>
              
              <div className="space-y-4 pt-4">
                <div className="flex items-center space-x-3 text-gray-300 group hover:text-white transition-colors">
                  <div className="p-1.5 rounded-lg bg-blue-500/20 group-hover:bg-blue-500/30 transition-colors">
                    <Shield className="w-5 h-5 text-blue-400" />
                  </div>
                  <span>Bank-grade security & encryption</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300 group hover:text-white transition-colors">
                  <div className="p-1.5 rounded-lg bg-purple-500/20 group-hover:bg-purple-500/30 transition-colors">
                    <Zap className="w-5 h-5 text-purple-400" />
                  </div>
                  <span>Real-time performance analytics</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300 group hover:text-white transition-colors">
                  <div className="p-1.5 rounded-lg bg-pink-500/20 group-hover:bg-pink-500/30 transition-colors">
                    <Cpu className="w-5 h-5 text-pink-400" />
                  </div>
                  <span>AI-powered insights & predictions</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Stats Section */}
          <div className="relative z-10 grid grid-cols-3 gap-4 pt-12 border-t border-white/10">
            <div>
              <div className="text-2xl font-bold text-white">98%</div>
              <div className="text-xs text-gray-500">Accuracy Rate</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">10K+</div>
              <div className="text-xs text-gray-500">Active Users</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">24/7</div>
              <div className="text-xs text-gray-500">Support</div>
            </div>
          </div>
        </div>
        
        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md">
            <div className="bg-black/60 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 p-8">
              {/* Mobile Logo */}
              <div className="lg:hidden flex flex-col items-center mb-8">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg shadow-lg shadow-purple-500/30">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    MavX 
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
                <p className="text-gray-400 text-sm mt-1">Sign in to access your dashboard</p>
              </div>
              
              <div className="hidden lg:block text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
                <p className="text-gray-400">Sign in to continue to your dashboard</p>
              </div>
              
              <div className="space-y-6">
                {/* Email Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                    <input
                      type="email"
                      placeholder="you@company.com"
                      className={`w-full pl-10 pr-4 py-3 bg-white/5 border ${
                        emailError ? "border-red-500/50" : "border-white/10"
                      } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all`}
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setEmailError("");
                      }}
                      onKeyPress={handleKeyPress}
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-focus-within:from-blue-500/10 group-focus-within:to-purple-500/10 transition-all pointer-events-none"></div>
                  </div>
                  {emailError && (
                    <p className="mt-2 text-sm text-red-400 animate-shake">{emailError}</p>
                  )}
                </div>
                
                {/* Password Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Password
                  </label>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className={`w-full pl-10 pr-12 py-3 bg-white/5 border ${
                        passwordError ? "border-red-500/50" : "border-white/10"
                      } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all`}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setPasswordError("");
                      }}
                      onKeyPress={handleKeyPress}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-focus-within:from-blue-500/10 group-focus-within:to-purple-500/10 transition-all pointer-events-none"></div>
                  </div>
                  {passwordError && (
                    <p className="mt-2 text-sm text-red-400 whitespace-pre-line animate-shake">{passwordError}</p>
                  )}
                </div>
                
                {/* Password strength indicator */}
                {password && !passwordError && (
                  <div className="space-y-2">
                    <div className="flex gap-1">
                      {['length', 'uppercase', 'lowercase', 'number', 'special'].map((criteria, idx) => {
                        const checks = validatePasswordStrength(password).checks;
                        const isMet = checks[criteria];
                        return (
                          <div
                            key={idx}
                            className={`h-1 flex-1 rounded-full transition-all ${
                              isMet ? 'bg-green-500' : 'bg-gray-600'
                            }`}
                          ></div>
                        );
                      })}
                    </div>
                    <p className="text-xs text-gray-500">
                      {validatePasswordStrength(password).strength === 'strong' 
                        ? '✓ Strong password' 
                        : 'Use 12+ chars with uppercase, number & special char'}
                    </p>
                  </div>
                )}
                
                {/* Forgot Password Link */}
                <div className="text-right">
                  <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                    
                  </button>
                </div>
                
                {/* Login Button */}
                <button
                  onClick={handleLogin}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all p-3 rounded-xl text-white font-semibold text-lg relative overflow-hidden group shadow-lg shadow-purple-500/25"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Authenticating...</span>
                      </>
                    ) : (
                      <>
                        <span>Sign In</span>
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                </button>
                
                {/* Sign Up Link */}
                <div className="text-center">
                  <p className="text-gray-500">
                    {" "}
                    <button className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
                     
                    </button>
                  </p>
                </div>

                {/* Demo credentials hint */}
                <div className="mt-6 pt-4 border-t border-white/10">
                  <p className="text-xs text-center text-gray-600">
                    Demo: demo@maxxai.com / Demo@123456789
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;