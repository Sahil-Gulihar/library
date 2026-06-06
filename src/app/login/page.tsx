"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";
import { Flower2, Phone, Lock, User, KeyRound } from "lucide-react";

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const { login, signup } = useAuth();
  const [activeTab, setActiveTab] = useState("login");

  // Login Form States
  const [loginPhone, setLoginPhone] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // Signup Form States
  const [signupName, setSignupName] = useState("");
  const [signupPhone, setSignupPhone] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
  const [signupLoading, setSignupLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginPhone || !loginPassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoginLoading(true);
    // Mimic slight network latency for premium micro-interaction feel
    setTimeout(() => {
      const res = login(loginPhone, loginPassword);
      setLoginLoading(false);
      if (res.success) {
        toast.success(res.message);
        // If logged in as admin, redirect to admin panel, else home
        if (loginPhone.replace(/\D/g, "").slice(-10) === "9811062348") {
          router.push("/admin");
        } else {
          router.push(redirect);
        }
      } else {
        toast.error(res.message);
      }
    }, 800);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupName || !signupPhone || !signupPassword || !signupConfirmPassword) {
      toast.error("All fields are required.");
      return;
    }

    if (signupPassword !== signupConfirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (signupPassword.length < 4) {
      toast.error("Password must be at least 4 characters long.");
      return;
    }

    setSignupLoading(true);
    setTimeout(() => {
      const res = signup(signupName, signupPhone, signupPassword);
      setSignupLoading(false);
      if (res.success) {
        toast.success(res.message);
        router.push(redirect);
      } else {
        toast.error(res.message);
      }
    }, 800);
  };

  return (
    <Card className="w-full max-w-md bg-card/90 backdrop-blur-md border border-gold/20 shadow-2xl rounded-2xl overflow-hidden">
      <div className="paisley-bg h-28 relative flex items-center justify-center border-b border-gold/15">
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 to-background/90" />
        <div className="relative z-10 flex flex-col items-center gap-1.5 pt-2">
          <div className="bg-background/90 p-2 rounded-full border border-gold/30 shadow-sm">
            <Flower2 className="w-6 h-6 text-gold animate-spin-slow" />
          </div>
          <h2 className="text-xl font-bold tracking-wider text-foreground">Darshan Library</h2>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 w-full h-12 bg-muted/40 p-0 rounded-none border-b border-gold/10">
          <TabsTrigger
            value="login"
            className="rounded-none text-xs font-semibold uppercase tracking-widest text-muted-foreground data-[state=active]:bg-background data-[state=active]:text-gold data-[state=active]:border-b-2 data-[state=active]:border-gold h-full"
          >
            Sign In
          </TabsTrigger>
          <TabsTrigger
            value="signup"
            className="rounded-none text-xs font-semibold uppercase tracking-widest text-muted-foreground data-[state=active]:bg-background data-[state=active]:text-gold data-[state=active]:border-b-2 data-[state=active]:border-gold h-full"
          >
            Create Account
          </TabsTrigger>
        </TabsList>

        <CardContent className="pt-6 px-6 pb-6">
          {/* LOGIN CONTENT */}
          <TabsContent value="login" className="mt-0 space-y-4 outline-none">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="login-phone" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Phone Number
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-muted-foreground/60" />
                  <Input
                    id="login-phone"
                    placeholder="Enter phone number (+91...)"
                    value={loginPhone}
                    onChange={(e) => setLoginPhone(e.target.value)}
                    className="pl-11 h-12 border-border/60 focus-visible:ring-gold"
                    type="tel"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="login-pass" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Password
                  </Label>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-muted-foreground/60" />
                  <Input
                    id="login-pass"
                    type="password"
                    placeholder="Enter password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="pl-11 h-12 border-border/60 focus-visible:ring-gold"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loginLoading}
                className="w-full h-12 mt-6 bg-foreground hover:bg-foreground/90 text-background uppercase tracking-widest font-bold text-xs shadow-md transition-all duration-300"
              >
                {loginLoading ? (
                  <div className="w-5 h-5 rounded-full border-2 border-background border-t-transparent animate-spin" />
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
            <div className="pt-4 text-center">
              <p className="text-[10px] text-muted-foreground/80 italic">
                Tip: Admin login uses hardcoded admin credentials.
              </p>
            </div>
          </TabsContent>

          {/* SIGNUP CONTENT */}
          <TabsContent value="signup" className="mt-0 space-y-4 outline-none">
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="signup-name" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-muted-foreground/60" />
                  <Input
                    id="signup-name"
                    placeholder="e.g., Arjun Singh"
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    className="pl-11 h-12 border-border/60 focus-visible:ring-gold"
                    type="text"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="signup-phone" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Phone Number
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-muted-foreground/60" />
                  <Input
                    id="signup-phone"
                    placeholder="Enter phone number (+91...)"
                    value={signupPhone}
                    onChange={(e) => setSignupPhone(e.target.value)}
                    className="pl-11 h-12 border-border/60 focus-visible:ring-gold"
                    type="tel"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="signup-pass" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Create Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-muted-foreground/60" />
                  <Input
                    id="signup-pass"
                    type="password"
                    placeholder="Password (min 4 chars)"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    className="pl-11 h-12 border-border/60 focus-visible:ring-gold"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="signup-confirm" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Confirm Password
                </Label>
                <div className="relative">
                  <KeyRound className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-muted-foreground/60" />
                  <Input
                    id="signup-confirm"
                    type="password"
                    placeholder="Confirm password"
                    value={signupConfirmPassword}
                    onChange={(e) => setSignupConfirmPassword(e.target.value)}
                    className="pl-11 h-12 border-border/60 focus-visible:ring-gold"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={signupLoading}
                className="w-full h-12 mt-6 bg-foreground hover:bg-foreground/90 text-background uppercase tracking-widest font-bold text-xs shadow-md transition-all duration-300"
              >
                {signupLoading ? (
                  <div className="w-5 h-5 rounded-full border-2 border-background border-t-transparent animate-spin" />
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-muted/20 relative overflow-hidden">
      {/* Decorative patterns */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-gold/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-gold/5 rounded-full blur-[120px]" />

      <Suspense fallback={
        <div className="min-h-[400px] flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-gold border-t-transparent animate-spin" />
        </div>
      }>
        <LoginFormContent />
      </Suspense>
    </div>
  );
}
