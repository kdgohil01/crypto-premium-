import { Link } from "react-router-dom";
import { Shield, Eye, BookOpen, ArrowRight, Lock, Image, Brain, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SignOutButton from "../components/SignOutButton";
import { usePlan } from "@/contexts/PlanContext";
import { useState } from "react";
import UpgradeDialog from "@/components/billing/UpgradeDialog";
import { useNavigate } from "react-router-dom";


function Navbar() {
  return (
    <nav className="flex justify-between p-2 sm:p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
      <div className="relative"></div>
      <div className="relative">
        <SignOutButton />
      </div>
    </nav>
  );
}

const Index = () => {
  const { plan } = usePlan();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background">
      <Navbar /> {/* <-- Add this line */}
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
        <div className="container mx-auto px-4 sm:px-6 py-10 sm:py-16 md:py-20 text-center relative">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gradient mb-4 sm:mb-6 leading-tight">
              Master the Art of
              <br />
              Secret Communication
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
              Explore cryptography, steganography, and data processing with interactive tools. Learn to encrypt messages, hide secrets in images, and process data with multiple security levels.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6">
                <Link to="/cryptography" className="gap-2">
                  <Shield className="h-5 w-5" />
                  Try Cryptography
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6">
                <Link to="/steganography" className="gap-2">
                  <Eye className="h-5 w-5" />
                  Try Steganography
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              {plan === 'premium' ? (
                <Button asChild size="lg" className="bg-red-500 hover:bg-red-600 text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6">
                  <Link to="/multilayered-security" className="gap-2">
                    <Lock className="h-5 w-5" />
                    Try Multilayered Security
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              ) : (
                <Button size="lg" className="bg-red-500 hover:bg-red-600 text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6" onClick={() => setOpen(true)}>
                  <Lock className="h-5 w-5" />
                  Try Multilayered Security (Premium)
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}
              <Button asChild size="lg" className="bg-purple-500 hover:bg-purple-600 text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6">
                <Link to="/data-processing" className="gap-2">
                  <Database className="h-5 w-5" />
                  Data Processing
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-10 sm:py-16 md:py-20 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Choose Your Path</h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Dive into the fascinating worlds of encryption, hidden messages, and data processing
            </p>
          </div>

          <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
            {/* Cryptography */}
            <Card className="card-glow group hover:scale-105 transition-all duration-300 h-full flex flex-col border-primary/20">
              <CardHeader className="text-center pb-4 sm:pb-6 md:pb-8">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-gradient-primary mb-4 sm:mb-5 md:mb-6 group-hover:shadow-glow-primary transition-all duration-300">
                  <Shield className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white" />
                </div>
                <CardTitle className="text-lg sm:text-xl md:text-2xl mb-2">Cryptography</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Transform readable text into unbreakable codes using mathematical algorithms
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4 flex-1 flex flex-col">
                <div className="space-y-2 sm:space-y-3 flex-1">
                  <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                    <span>AES-256 & RSA-2048 Encryption</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                    <Lock className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                    <span>Real-time Encryption/Decryption</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                    <Lock className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                    <span>Interactive Learning Tools</span>
                  </div>
                </div>
                <Button asChild className="w-full bg-primary hover:bg-primary/90 mt-auto">
                  <Link to="/cryptography">Explore Cryptography</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="card-glow group hover:scale-105 transition-all duration-300 h-full flex flex-col border-secondary/20">
              <CardHeader className="text-center pb-4 sm:pb-6 md:pb-8">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-gradient-secondary mb-4 sm:mb-5 md:mb-6 group-hover:shadow-glow-secondary transition-all duration-300">
                  <Eye className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white" />
                </div>
                <CardTitle className="text-lg sm:text-xl md:text-2xl mb-2">Steganography</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Hide secret messages within innocent-looking files and images
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4 flex-1 flex flex-col">
                <div className="space-y-2 sm:space-y-3 flex-1">
                  <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                    <Image className="h-3 w-3 sm:h-4 sm:w-4 text-secondary" />
                    <span>Text-in-Image Hiding</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                    <Image className="h-3 w-3 sm:h-4 sm:w-4 text-secondary" />
                    <span>LSB Manipulation</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                    <Image className="h-3 w-3 sm:h-4 sm:w-4 text-secondary" />
                    <span>Invisible Message Extraction</span>
                  </div>
                </div>
                <Button asChild className="w-full bg-secondary hover:bg-secondary/90 mt-auto">
                  <Link to="/steganography">Explore Steganography</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="card-glow group hover:scale-105 transition-all duration-300 h-full flex flex-col">
              <CardHeader className="text-center pb-4 sm:pb-6 md:pb-8">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 mb-4 sm:mb-5 md:mb-6 group-hover:shadow-[0_0_20px_hsl(270_100%_50%/0.4)] transition-all duration-300">
                  <Database className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white" />
                </div>
                <CardTitle className="text-lg sm:text-xl md:text-2xl mb-2">Data Processing</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Transform and encode data with multi-level security processing tools
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4 flex-1 flex flex-col">
                <div className="space-y-2 sm:space-y-3 flex-1">
                  <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                    <Database className="h-3 w-3 sm:h-4 sm:w-4 text-purple-500" />
                    <span>URL Encoding/Decoding</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                    <Database className="h-3 w-3 sm:h-4 sm:w-4 text-purple-500" />
                    <span>Base64 Processing</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                    <Database className="h-3 w-3 sm:h-4 sm:w-4 text-purple-500" />
                    <span>AES-256 Encryption</span>
                  </div>
                </div>
                <Button asChild className="w-full bg-purple-500 hover:bg-purple-600 mt-auto">
                  <Link to="/data-processing">Explore Data Processing</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Learn */}
            <Card className="card-glow group hover:scale-105 transition-all duration-300 h-full flex flex-col">
              <CardHeader className="text-center pb-4 sm:pb-6 md:pb-8">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-r from-accent to-primary mb-4 sm:mb-5 md:mb-6 group-hover:shadow-[0_0_20px_hsl(180_100%_50%/0.4)] transition-all duration-300">
                  <BookOpen className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white" />
                </div>
                <CardTitle className="text-lg sm:text-xl md:text-2xl mb-2">Learn & Discover</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Understand the theory, history, and applications of secret communication
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4 flex-1 flex flex-col">
                <div className="space-y-2 sm:space-y-3 flex-1">
                  <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                    <Brain className="h-3 w-3 sm:h-4 sm:w-4 text-accent" />
                    <span>Historical Examples</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                    <Brain className="h-3 w-3 sm:h-4 sm:w-4 text-accent" />
                    <span>Modern Applications</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                    <Brain className="h-3 w-3 sm:h-4 sm:w-4 text-accent" />
                    <span>Theory & Concepts</span>
                  </div>
                </div>
                <Button asChild className="w-full btn-hero mt-auto">
                  <Link to="/learn">Start Learning</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Ready to Begin?</h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8">
              Join thousands of learners exploring the fascinating world of cryptography and steganography
            </p>
            <Button asChild size="lg" className="btn-hero text-base sm:text-lg px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6">
              <Link to="/learn" className="gap-2">
                Start Your Journey
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      <UpgradeDialog open={open} onOpenChange={setOpen} onDemo={() => navigate('/multilayered-security/guardian-layer')} />
    </div>
  );
};

export default Index;
