import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";
export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,

  checkAuth: async (state) => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.log("getUser: ", error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async ({ formData }) => {
    set({ isSigningUp: true });
    console.log(formData);
    try {
      const res = await axiosInstance.post("/auth/signup", formData);
      set({ authUser: res.data });
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.response.data.message);
      console.log("Signing up: ", error);
    } finally {
      set({ isSigningUp: false });
    }
  },

  logout: async () => {
    try {
      const res = await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error.response.data.message);
      console.log("Logout error: ", error);
    }
  },

  login: async ({ formData }) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", formData);
      set({ authUser: res.data });
      toast.success("Logged in successfully", {
        position: "top-left",
        duration: 1000,
      });
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-left",
        duration: 1000,
      });
      console.log("Logging in: ", error);
    } finally {
      set({ isLoggingIn: false });
    }
  },
}));
