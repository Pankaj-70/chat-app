import React, { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  MessageSquare,
  User,
  Mail,
  Lock,
  Eye,
  Loader2,
  EyeOff,
} from "lucide-react";
import Pattern from "../components/Pattern";
const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const { isSigningUp, signup } = useAuthStore();
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const validateForm = () => {
    if (!formData.fullName.trim() || !formData.email.trim()) {
      return toast.error("Enter all details", {
        position: "top-left",
        duration: 1000,
      });
    }
    if (!regex.test(formData.email)) {
      return toast.error("Invalid email, please recheck", {
        position: "top-left",
        duration: 1000,
      });
    }
    if (formData.password.trim().length < 6) {
      return toast.error("Password length must be at least 6", {
        position: "top-left",
        duration: 1000,
      });
    }
    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success) signup({ formData });
    console.log(success);
  };
  return (
    <div className="min-h-screen grid lg:grid-cols-2 items-center">
      <div className="w-full flex items-center bg-primary/[0.04] h-screen justify-around">
        <div className="text-center mb-8">
          <div className="flex flex-col items-center gap-2 group">
            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <MessageSquare className="size-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold mt-2">Create Account</h1>
            <p className="text-base-content/60">
              Get started with your free account
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col gap-4 max-w-md"
          >
            <div className="flex flex-col items-start">
              <div className="">
                <label className="font-bold text-gray-400">Full Name</label>
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="John Doe"
                  required
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className="text-base-content pl-9 pr-32 py-2 rounded-lg input-bordered outline-none border-gray-600 border-2"
                />
                <User className="absolute top-[14px] size-4 text-gray-500 left-3" />
              </div>
            </div>
            <div className="flex flex-col items-start">
              <div className="">
                <label className="font-bold text-gray-400">Email</label>
              </div>
              <div className="relative">
                <input
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="text-base-content pl-9 pr-32 py-2 rounded-lg input-bordered outline-none border-gray-600 border-2"
                />
                <Mail className="absolute top-[15px] size-4	text-gray-500 left-3" />
              </div>
            </div>
            <div className="flex flex-col items-start">
              <div className="">
                <label className="font-bold text-gray-400">Password</label>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="•••••••••"
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="text-base-content pl-9 pr-32 py-2 rounded-lg input-bordered outline-none border-gray-600 border-2"
                />
                <Lock className="absolute top-[14px] size-4	text-gray-500 left-3" />
                {!showPassword ? (
                  <Eye
                    className="absolute size-4 right-2 top-[15px]"
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  />
                ) : (
                  <EyeOff
                    className="absolute size-4 right-2 top-[15px]"
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  />
                )}
              </div>
            </div>
            <button
              type="submit"
              className="mt-2 px-34 bg-primary/40 font-bold rounded-lg text-gray-400"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <div className="flex items-center gap-2 py-2 justify-center animate-pulse">
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </div>
              ) : (
                <div className="hover:bg-primary/20 w-full py-2 h-[100%]">
                  Create Account
                </div>
              )}
            </button>
          </form>
          <div className="mt-3 text-white/40">
            Already have an account?{" "}
            <Link
              className="text-blue-400 underline underline-offset-2"
              to="/login"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-around items-center h-screen bg-primary/[0.0001">
        <Pattern />
      </div>
    </div>
  );
};

export default Signup;
