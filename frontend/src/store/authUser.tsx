import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

// Define the Project interface
interface Project {
  id: string;
  name: string;
  description: string;
  // Add more project-specific fields as needed
}

// Define the User interface
interface User {
  _id?:string;
  name: string;
  role: string;
  projects?: Project[];
}

// Define the AuthState interface for Zustand store
interface AuthState {
  user: User | null;
  isSigningUp: boolean;
  isCheckingAuth: boolean;
  isLoggingOut: boolean;
  isLoggingIn: boolean;
  signup: (credentials: { username: string; password: string; role: string }) => Promise<void>;
  login: (credentials: { username: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  authCheck: () => Promise<void>;
}

// Zustand store for authentication management
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isSigningUp: false,
  isCheckingAuth: true,
  isLoggingOut: false,
  isLoggingIn: false,

  // Signup function
  signup: async (credentials) => {
    set({ isSigningUp: true });
    try {
      const response = await axios.post("http://localhost:5000/api/v1/auth/signup", credentials);

      const token = response.data.tok;//undfined
      document.cookie = `user-jwt=${token}; path=/; max-age=${15 * 24 * 60 * 60}; SameSite=Lax`;

      set({ user: response.data.user, isSigningUp: false });
      toast.success("Account created successfully");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || "Signup failed");
      } else {
        toast.error("An unexpected error occurred during signup");
      }
      set({ isSigningUp: false, user: null });
    }
  },

  // Login function
  login: async (credentials) => {
    set({ isLoggingIn: true });
    try {
      const response = await axios.post("http://localhost:5000/api/v1/auth/login", credentials);
  
      const token = response.data.tok;
      document.cookie = `user-jwt=${token}; path=/; max-age=${15 * 24 * 60 * 60}; SameSite=Lax`;
  
      // Destructure the necessary fields (username, role, and projects if available) from response.data.user
      const { _id,name, role, projects } = response.data.user;
  // console.log("authUser says",name,role,projects)
      // Set the full user object in the state (including optional projects)
      set({ user: {_id, name, role, projects: projects  }, isLoggingIn: false });
  
      console.log("store says", { _id,name, role, projects }); // Correct logging
  
      toast.success("Login successful");
    } catch (error: unknown) {
      set({ isLoggingIn: false, user: null });
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || "Login failed");
      } else {
        toast.error("An unexpected error occurred during login");
      }
    }
  },
  

  // Logout function
  logout: async () => {
    set({ isLoggingOut: true });
    try {

      console.log("Before",document.cookie);
      // Clear cookie by setting it with an expired date
document.cookie = "user-jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
console.log("After",document.cookie);

      await axios.post("http://localhost:5000/api/v1/auth/logout");
      set({ user: null, isLoggingOut: false });
      toast.success("Logged out successfully");
    } catch (error: unknown) {
      set({ isLoggingOut: false });
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || "Logout failed");
      } else {
        toast.error("An unexpected error occurred during logout");
      }
    }
  },

  // Authentication check function (e.g., to verify session)
  authCheck: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axios.get("http://localhost:5000/api/v1/auth/authCheck",{  withCredentials: true });
      set({ user: response.data.user, isCheckingAuth: false });
    } catch (error: unknown) {
      set({ isCheckingAuth: false, user: null });
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || "Authentication check failed");
      } else {
        toast.error("An unexpected error occurred during auth check");
      }
    }
  },
}));
