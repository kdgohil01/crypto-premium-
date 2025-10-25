// src/contexts/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import { auth, googleProvider } from "@/firebase";
import { onAuthStateChanged, signInWithPopup, signOut as firebaseSignOut, User as FirebaseUser } from "firebase/auth";
import { authAPI, setToken, removeToken } from "@/lib/mongoApi";
import { toast } from "sonner";

interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
  plan?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  registerWithEmail: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('authToken');
      const savedUser = localStorage.getItem('user');
      
      if (token && savedUser) {
        try {
          // Verify token is still valid
          const response: any = await authAPI.getMe();
          if (response.success && response.user) {
            setUser(response.user);
          } else {
            // Token invalid, clear storage
            removeToken();
            localStorage.removeItem('user');
            setUser(null);
          }
        } catch (error) {
          // Token invalid or expired
          removeToken();
          localStorage.removeItem('user');
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const signInWithGoogle = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;
      
      // Send to MongoDB backend
      const response: any = await authAPI.googleAuth(
        firebaseUser.email || '',
        firebaseUser.displayName || '',
        firebaseUser.photoURL || '',
        firebaseUser.uid
      );
      
      if (response.success && response.token && response.user) {
        setToken(response.token);
        setUser(response.user);
        localStorage.setItem('user', JSON.stringify(response.user));
        toast.success('Signed in with Google successfully!');
      }
    } catch (error: any) {
      console.error("Google Sign-in failed:", error);
      
      // Handle specific Firebase Auth errors
      if (error.code === 'auth/popup-closed-by-user') {
        toast.error('Sign-in cancelled');
      } else if (error.code === 'auth/popup-blocked') {
        toast.error('Popup blocked. Please allow popups for this site.');
      } else if (error.code === 'auth/unauthorized-domain') {
        toast.error('This domain is not authorized for Google Sign-in. Please contact support.');
      } else if (error.code === 'auth/operation-not-allowed') {
        toast.error('Google Sign-in is not enabled. Please contact support.');
      } else if (error.code === 'auth/invalid-api-key') {
        toast.error('Firebase configuration error. Please contact support.');
      } else if (error.message.includes('Cannot connect to server')) {
        toast.error('Cannot connect to server. Please check if backend is running.');
      } else if (error.code && error.code.startsWith('auth/')) {
        toast.error(`Google sign-in failed: ${error.message}`);
      } else {
        toast.error(error.message || 'Failed to sign in with Google');
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithEmail = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      const response: any = await authAPI.login(email, password);
      
      if (response.success && response.token && response.user) {
        setToken(response.token);
        setUser(response.user);
        localStorage.setItem('user', JSON.stringify(response.user));
        toast.success('Signed in successfully!');
      }
    } catch (error: any) {
      console.error("Email Sign-in failed:", error);
      // Show specific error messages
      if (error.message.includes('Invalid credentials')) {
        toast.error('Invalid email or password');
      } else if (error.message.includes('User already exists') || error.message.includes('not found')) {
        toast.error('Account not found. Please sign up first.');
      } else if (error.message.includes('Cannot connect to server')) {
        toast.error('Cannot connect to server. Please check if backend is running.');
      } else {
        toast.error(error.message || 'Failed to sign in');
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const registerWithEmail = async (name: string, email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      const response: any = await authAPI.register(name, email, password);
      
      if (response.success && response.token && response.user) {
        setToken(response.token);
        setUser(response.user);
        localStorage.setItem('user', JSON.stringify(response.user));
        toast.success('Account created successfully!');
      }
    } catch (error: any) {
      console.error("Registration failed:", error);
      // Show specific error messages
      if (error.message.includes('already exists')) {
        toast.error('User already registered. Please sign in instead.');
      } else if (error.message.includes('Cannot connect to server')) {
        toast.error('Cannot connect to server. Please check if backend is running.');
      } else if (error.message.includes('provide all required fields')) {
        toast.error('Please fill in all fields');
      } else {
        toast.error(error.message || 'Failed to create account');
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      // Call backend to invalidate session
      await authAPI.logout();
    } catch (error) {
      console.error("Logout API failed:", error);
    } finally {
      // Clear local state regardless of API call result
      try {
        await firebaseSignOut(auth);
      } catch (error) {
        // Ignore Firebase signout errors
      }
      removeToken();
      setUser(null);
      localStorage.removeItem("user");
      toast.success('Signed out successfully');
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    signInWithGoogle,
    signInWithEmail,
    registerWithEmail,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
