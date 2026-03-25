import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

export default function SignUp() {
  const navigate = useNavigate();

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

    // simulate success (UX improvement)
    setTimeout(() => {
      navigate("/"); // go back to SignIn page
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="w-full max-w-[400px] bg-[#1a1a1a] p-8 rounded-2xl shadow-xl border border-red-900/30">

        {/* TITLE */}
        <h2 className="text-2xl font-bold text-red-500 mb-6 text-center">
          Create Account
        </h2>

        {error && (
          <div className="mb-4 text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* FULL NAME */}
          <div className="relative">
            <User className="absolute left-3 top-3 h-5 w-5 text-red-400/70" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-black border border-red-900/40 text-white text-sm"
            />
          </div>

          {/* EMAIL */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-red-400/70" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-black border border-red-900/40 text-white text-sm"
            />
          </div>

          {/* PASSWORD */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-red-400/70" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full pl-10 pr-10 py-3 rounded-lg bg-black border border-red-900/40 text-white text-sm"
            />
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-red-400/70" />
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full pl-10 pr-10 py-3 rounded-lg bg-black border border-red-900/40 text-white text-sm"
            />

            {/* TOGGLE */}
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

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-red-600 to-red-800 text-white py-3 rounded-lg flex justify-between items-center px-5 mt-2"
          >
            <span>{loading ? "Creating..." : "Register"}</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          {/* SIGN IN LINK */}
          <p className="text-xs text-center text-red-300 mt-3">
            Already have an account?
            <Link to="/" className="ml-1 text-red-500 hover:underline">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}