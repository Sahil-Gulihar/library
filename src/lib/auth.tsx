"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface User {
  name: string;
  phone: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (phone: string, password: string) => { success: boolean; message: string };
  signup: (name: string, phone: string, password: string) => { success: boolean; message: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Normalizes phone by removing non-digits
export function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, "");
}

// Compares phone numbers by checking their last 10 digits
export function comparePhones(p1: string, p2: string): boolean {
  const n1 = normalizePhone(p1);
  const n2 = normalizePhone(p2);
  if (n1.length >= 10 && n2.length >= 10) {
    return n1.slice(-10) === n2.slice(-10);
  }
  return n1 === n2 && n1 !== "";
}

const ADMIN_PHONE = "+91 98110 62348";
const ADMIN_PASSWORD = "meditation";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("current_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem("current_user");
      }
    }
    setLoading(false);
  }, []);

  const login = (phone: string, password: string) => {
    // 1. Check Admin Credentials
    if (comparePhones(phone, ADMIN_PHONE)) {
      if (password === ADMIN_PASSWORD) {
        const adminUser: User = {
          name: "Admin",
          phone: ADMIN_PHONE,
          isAdmin: true,
        };
        setUser(adminUser);
        localStorage.setItem("current_user", JSON.stringify(adminUser));
        return { success: true, message: "Logged in successfully as Admin!" };
      } else {
        return { success: false, message: "Incorrect password for admin." };
      }
    }

    // 2. Check User Credentials in LocalStorage
    const savedUsersStr = localStorage.getItem("registered_users");
    if (savedUsersStr) {
      try {
        const users = JSON.parse(savedUsersStr);
        const foundUser = users.find((u: any) => comparePhones(u.phone, phone));
        if (foundUser) {
          if (foundUser.password === password) {
            const regularUser: User = {
              name: foundUser.name,
              phone: foundUser.phone,
              isAdmin: false,
            };
            setUser(regularUser);
            localStorage.setItem("current_user", JSON.stringify(regularUser));
            return { success: true, message: `Welcome back, ${foundUser.name}!` };
          } else {
            return { success: false, message: "Incorrect password." };
          }
        }
      } catch (e) {
        console.error("Failed to parse registered users", e);
      }
    }

    return { success: false, message: "Phone number not registered." };
  };

  const signup = (name: string, phone: string, password: string) => {
    if (!name.trim() || !phone.trim() || !password.trim()) {
      return { success: false, message: "All fields are required." };
    }

    // Block registering with admin phone number
    if (comparePhones(phone, ADMIN_PHONE)) {
      return { success: false, message: "This number is reserved for admin login." };
    }

    // Load and check if already exists
    const savedUsersStr = localStorage.getItem("registered_users") || "[]";
    try {
      const users = JSON.parse(savedUsersStr);
      const exists = users.some((u: any) => comparePhones(u.phone, phone));
      if (exists) {
        return { success: false, message: "Phone number is already registered." };
      }

      // Add new user
      const newUser = { name, phone, password };
      users.push(newUser);
      localStorage.setItem("registered_users", JSON.stringify(users));

      // Auto log in as the signed-up user
      const regularUser: User = {
        name,
        phone,
        isAdmin: false,
      };
      setUser(regularUser);
      localStorage.setItem("current_user", JSON.stringify(regularUser));

      return { success: true, message: `Account created! Welcome, ${name}.` };
    } catch (e) {
      return { success: false, message: "Failed to create account. Please try again." };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("current_user");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
