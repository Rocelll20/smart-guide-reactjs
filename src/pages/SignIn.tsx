import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Lock, EyeOff, Eye, ArrowRight, Diamond } from "lucide-react";

// IMPORT THESE
import { useDarkMode } from "../context/DarkModeContext";
import DarkModeToggle from "../components/DarkModeToggle";

interface SignInForm {
  email: string;
  password: string;
}

export default function SignIn() {
  const navigate = useNavigate();

  // USE GLOBAL DARK MODE
  const { darkMode } = useDarkMode();

  const [form, setForm] = useState<SignInForm>({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("All fields are required.");
      return;
    }
    setError("");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <div
      style={{ fontFamily: "'Montserrat', sans-serif" }}
      className={`min-h-screen flex items-center justify-center relative overflow-hidden transition-colors duration-500 ${
        darkMode ? "bg-black" : "bg-white"
      }`}
    >
      {/* Ambient glow (dark mode only) */}
      {darkMode && (
        <>
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-red-700 rounded-full blur-[120px] opacity-40 mix-blend-screen pointer-events-none"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-red-900 rounded-full blur-[120px] opacity-40 mix-blend-screen pointer-events-none"></div>
        </>
      )}

      {/* GLOBAL TOGGLE */}
      <div className="absolute top-5 right-5 z-20">
        <DarkModeToggle />
      </div>

      <div
        className={`relative flex flex-col md:flex-row w-full max-w-[800px] min-h-[460px] mx-4 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl border border-red-900/30 transition-colors duration-500 ${
          darkMode ? "bg-[#1a1a1a]/80" : "bg-gray-50"
        }`}
      >
        {/* LEFT SIDE */}
        <div
          className={`w-full md:w-5/12 p-10 flex flex-col justify-between border-r border-red-900/30 ${
            darkMode
              ? "bg-gradient-to-br from-red-600/20 to-black/40 text-red-100"
              : "bg-gradient-to-br from-red-50 to-white text-red-700"
          }`}
        >
          <div className="flex flex-col h-full">
            <div>
              <p className={`text-sm mb-1 ${darkMode ? "text-red-300" : "text-red-500"}`}>
                Welcome to
              </p>
              <h1 className={`text-2xl font-bold mb-8 ${darkMode ? "text-red-500" : "text-red-600"}`}>
                SmartGuide IoT
              </h1>
              <p className={`text-sm max-w-[220px] ${darkMode ? "text-red-200" : "text-red-600"}`}>
                "Turning care into independence. Technology that sees, guiding every step with trust."
              </p>
            </div>

            <div className="mt-16">
              <Diamond className={`w-8 h-8 ${darkMode ? "text-red-500" : "text-red-600"}`} />
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full md:w-7/12 p-10 flex flex-col justify-center">
          <h2 className={`text-xl font-bold mb-8 ${darkMode ? "text-red-500" : "text-red-600"}`}>
            Log In
          </h2>

          {error && <div className="mb-4 text-red-400 text-sm">{error}</div>}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* EMAIL */}
            <div className="relative">
              <User className={`absolute left-3 top-3 h-5 w-5 ${darkMode ? "text-red-400/70" : "text-red-500/70"}`} />
              <input
                type="text"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
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
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
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
                {showPassword ? (
                  <Eye className="h-4 w-4 text-red-400" />
                ) : (
                  <EyeOff className="h-4 w-4 text-red-400" />
                )}
              </button>
            </div>

            {/* REMEMBER */}
            <label className={`text-xs flex items-center gap-2 ${darkMode ? "text-red-300" : "text-red-600"}`}>
              <input type="checkbox" />
              Remember Login Details
            </label>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-600 to-red-800 text-white py-3 rounded-lg flex justify-between items-center px-5"
            >
              <span>{loading ? "Signing In..." : "Log In"}</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            {/* REGISTER */}
            

            <p className={`text-xs text-center mt-3 ${darkMode ? "text-red-300" : "text-red-600"}`}>
  Don’t have an account?
  <Link
    to="/signup"
    className="ml-1 font-semibold text-red-500 hover:text-red-400 underline"
  >
    Register
  </Link>
</p>

          </form>
        </div>
      </div>

      {/* FOOTER */}
      <div className="absolute bottom-8 text-xs text-red-400 w-full text-center">
        © SmartGuide IoT 2026
      </div>
    </div>
  );
}