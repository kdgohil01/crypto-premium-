import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Shield, Eye, Lock, Key, Database, Layers, Mail, User as UserIcon } from "lucide-react";
import { isFirebaseConfigured } from "@/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AuthLanding = () => {
  const { signInWithGoogle, signInWithEmail, registerWithEmail } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  
  // Register form state
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Google Sign-In error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signInWithEmail(loginEmail, loginPassword);
    } catch (error) {
      console.error("Email login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await registerWithEmail(registerName, registerEmail, registerPassword);
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center relative overflow-hidden py-12">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-hero opacity-10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 -top-48 -left-48 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-6xl px-6 w-full">
        {/* Logo/Icon */}
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-primary mb-6 float-animation shadow-glow-primary">
          <Shield className="h-12 w-12 text-white" />
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-bold text-gradient mb-4 leading-tight pb-2">
          Crypto Stego Lab
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Advanced Security & Data Processing Platform
        </p>

        {/* Auth Card */}
        <div className="max-w-md mx-auto mb-12">
          <Card className="card-glow border-primary/20">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Welcome</CardTitle>
              <CardDescription className="text-center">
                Sign in to access cryptography and steganography tools
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="login">Sign In</TabsTrigger>
                  <TabsTrigger value="register">Sign Up</TabsTrigger>
                </TabsList>
                
                <TabsContent value="login">
                  <form onSubmit={handleEmailLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="login-email"
                          type="email"
                          placeholder="your@email.com"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          className="pl-10"
                          required
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="login-password"
                          type="password"
                          placeholder="••••••••"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          className="pl-10"
                          required
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                      disabled={isLoading}
                    >
                      {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="register">
                  <form onSubmit={handleEmailRegister} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-name">Name</Label>
                      <div className="relative">
                        <UserIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="register-name"
                          type="text"
                          placeholder="Your Name"
                          value={registerName}
                          onChange={(e) => setRegisterName(e.target.value)}
                          className="pl-10"
                          required
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="register-email"
                          type="email"
                          placeholder="your@email.com"
                          value={registerEmail}
                          onChange={(e) => setRegisterEmail(e.target.value)}
                          className="pl-10"
                          required
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="register-password"
                          type="password"
                          placeholder="••••••••"
                          value={registerPassword}
                          onChange={(e) => setRegisterPassword(e.target.value)}
                          className="pl-10"
                          required
                          minLength={6}
                          disabled={isLoading}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Password must be at least 6 characters
                      </p>
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                      disabled={isLoading}
                    >
                      {isLoading ? "Creating account..." : "Create Account"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <Button
                onClick={handleGoogleSignIn}
                disabled={!isFirebaseConfigured || isLoading}
                variant="outline"
                className="w-full"
              >
                <img
                  src="https://developers.google.com/identity/images/g-logo.png"
                  alt="Google"
                  className="w-5 h-5 mr-2"
                />
                {isFirebaseConfigured ? "Continue with Google" : "Google auth unavailable"}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-12">
          <div className="card-glow rounded-lg p-4 group hover:scale-105 transition-all duration-300">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-3 group-hover:bg-primary/20 transition-colors">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-bold mb-1">Cryptography Tools</h3>
            <p className="text-xs text-muted-foreground">
              AES-256, RSA-2048, and classical ciphers
            </p>
          </div>

          <div className="card-glow rounded-lg p-4 group hover:scale-105 transition-all duration-300">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-secondary/10 mb-3 group-hover:bg-secondary/20 transition-colors">
              <Eye className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="text-lg font-bold mb-1">Steganography Tools</h3>
            <p className="text-xs text-muted-foreground">
              Hide messages in images, audio, and video
            </p>
          </div>

          <div className="card-glow rounded-lg p-4 group hover:scale-105 transition-all duration-300">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10 mb-3 group-hover:bg-accent/20 transition-colors">
              <Layers className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-lg font-bold mb-1">Multilayered Security</h3>
            <p className="text-xs text-muted-foreground">
              Military-grade protection with multiple layers
            </p>
          </div>

          <div className="card-glow rounded-lg p-4 group hover:scale-105 transition-all duration-300">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-purple-500/10 mb-3 group-hover:bg-purple-500/20 transition-colors">
              <Database className="w-6 h-6 text-purple-500" />
            </div>
            <h3 className="text-lg font-bold mb-1">Data Processing</h3>
            <p className="text-xs text-muted-foreground">
              URL encoding, Base64, hash generation
            </p>
          </div>
        </div>

        {/* Security Features */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
            <span>Client-side Processing</span>
          </div>
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4 text-secondary" />
            <span>Zero-Knowledge Architecture</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-accent" />
            <span>End-to-End Encryption</span>
          </div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
};

export default AuthLanding;
