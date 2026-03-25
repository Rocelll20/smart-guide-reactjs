import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, Diamond } from "lucide-react";
import { useDarkMode } from "../context/DarkModeContext";
import DarkModeToggle from "../components/DarkModeToggle";

export default function SignUp() {
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    setLoading(true);

    setTimeout(() => {
      navigate("/");
    }, 800);
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center relative overflow-hidden transition-colors duration-500 ${
        darkMode ? "bg-black" : "bg-white"
      }`}
    >
      {/* Ambient Glow */}
      {darkMode && (
        <>
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-red-700 blur-[120px] opacity-40 rounded-full"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-red-900 blur-[120px] opacity-40 rounded-full"></div>
        </>
      )}

      {/* Toggle */}
      <div className="absolute top-5 right-5 z-20">
        <DarkModeToggle />
      </div>

      <div
        className={`relative flex flex-col md:flex-row w-full max-w-[850px] min-h-[500px] mx-4 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl border border-red-900/30 ${
          darkMode ? "bg-[#1a1a1a]/80" : "bg-gray-50"
        }`}
      >
        {/* LEFT PANEL */}
        <div
          className={`w-full md:w-5/12 p-10 flex flex-col justify-between border-r border-red-900/30 ${
            darkMode
              ? "bg-gradient-to-br from-red-600/20 to-black/40 text-red-100"
              : "bg-gradient-to-br from-red-50 to-white text-red-700"
          }`}
        >
          <div>
        
            <h1 className={`text-2xl font-bold mb-6 ${darkMode ? "text-red-500" : "text-red-600"}`}>
              SmartGuide IoT
            </h1>
            <p className={`text-sm ${darkMode ? "text-red-200" : "text-red-600"}`}>
              "Empowering independence through intelligent guidance."
            </p>
          </div>

          <Diamond className={`w-8 h-8 ${darkMode ? "text-red-500" : "text-red-600"}`} />
        </div>

        {/* RIGHT PANEL */}
        <div className="w-full md:w-7/12 p-10 flex flex-col justify-center">
          <h2 className={`text-xl font-bold mb-6 ${darkMode ? "text-red-500" : "text-red-600"}`}>
            Create Account
          </h2>

          {error && <div className="mb-4 text-red-400 text-sm">{error}</div>}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* NAME */}
            <div className="relative">
              <User className={`absolute left-3 top-3 h-5 w-5 ${darkMode ? "text-red-400/70" : "text-red-500/70"}`} />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-3 rounded-lg text-sm ${
                  darkMode
                    ? "bg-black/70 border border-red-900/40 text-white"
                    : "bg-white border border-red-200 text-[#7a1f1f]"
                }`}
              />
            </div>

            {/* EMAIL */}
            <div className="relative">
              <Mail className={`absolute left-3 top-3 h-5 w-5 ${darkMode ? "text-red-400/70" : "text-red-500/70"}`} />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-3 rounded-lg text-sm ${
                  darkMode
                    ? "bg-black/70 border border-red-900/40 text-white"
                    : "bg-white border border-red-200 text-[#7a1f1f]"
                }`}
              />
            </div>

            {/* PASSWORD */}
            <div className="relative">
              <Lock className={`absolute left-3 top-3 h-5 w-5 ${darkMode ? "text-red-400/70" : "text-red-500/70"}`} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className={`w-full pl-10 pr-10 py-3 rounded-lg text-sm ${
                  darkMode
                    ? "bg-black/70 border border-red-900/40 text-white"
                    : "bg-white border border-red-200 text-[#7a1f1f]"
                }`}
              />
            </div>

            {/* CONFIRM */}
            <div className="relative">
              <Lock className={`absolute left-3 top-3 h-5 w-5 ${darkMode ? "text-red-400/70" : "text-red-500/70"}`} />
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                className={`w-full pl-10 pr-10 py-3 rounded-lg text-sm ${
                  darkMode
                    ? "bg-black/70 border border-red-900/40 text-white"
                    : "bg-white border border-red-200 text-[#7a1f1f]"
                }`}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3"
              >
                {showPassword ? <Eye className="h-4 w-4 text-red-400" /> : <EyeOff className="h-4 w-4 text-red-400" />}
              </button>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-600 to-red-800 text-white py-3 rounded-lg flex justify-between items-center px-5"
            >
              <span>{loading ? "Creating..." : "Register"}</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            {/* LINK */}
            <p className={`text-xs text-center ${darkMode ? "text-red-300" : "text-red-600"}`}>
              Already have an account?
              <Link to="/" className="ml-1 text-red-500 hover:underline">
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}