import { Link } from "react-router-dom";
import { Shield, Lock, Unlock, Key, Zap, Columns3 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const tools = [
  {
    title: "Caesar Cipher",
    description: "The classic substitution cipher used by Julius Caesar. Each letter is shifted by a fixed number of positions.",
    icon: Lock,
    path: "/cryptography/caesar",
    difficulty: "Beginner",
    color: "text-white",
    bgColor: "bg-blue-500",
  },
  {
    title: "Vigenère Cipher",
    description: "A polyalphabetic cipher using a keyword. Much more secure than simple substitution ciphers.",
    icon: Unlock,
    path: "/cryptography/vigenere",
    difficulty: "Beginner",
    color: "text-white",
    bgColor: "bg-blue-500",
  },
  {
    title: "Transport Cipher",
    description: "A transposition cipher that rearranges the positions of characters in the plaintext according to a system.",
    icon: Columns3,
    path: "/cryptography/transport",
    difficulty: "Beginner",
    color: "text-white",
    bgColor: "bg-blue-500",
  },
  {
    title: "AES-256",
    description: "AES-256-GCM text encryption/decryption with password-based key derivation.",
    icon: Shield,
    path: "/cryptography/aes",
    difficulty: "Intermediate",
    color: "text-white",
    bgColor: "bg-green-500",
  },
  {
    title: "RSA-2048",
    description: "Asymmetric encryption with 2048-bit keys. Generate key pairs for secure public-key cryptography.",
    icon: Key,
    path: "/cryptography/rsa",
    difficulty: "Advanced",
    color: "text-white",
    bgColor: "bg-red-500",
  },
];

export default function Cryptography() {
  return (
    <div className="container mx-auto py-4 sm:py-6 md:py-8 px-4 sm:px-6 max-w-6xl">
      {/* Hero Section */}
      <div className="text-center mb-8 sm:mb-10 md:mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-full bg-gradient-primary mb-4 sm:mb-5 md:mb-6 float-animation">
          <Shield className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 text-white" />
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gradient mb-4 sm:mb-5 md:mb-6 leading-tight pb-2">Cryptography Playground</h1>
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Explore the world of encryption and decryption. Transform readable text into secret codes using classic and modern cryptographic techniques.
        </p>
      </div>

      {/* Tools Grid */}
      <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 md:grid-cols-2 mb-8 sm:mb-10 md:mb-12">
        {tools.map((tool) => (
          <Card key={tool.title} className="card-glow group hover:scale-105 transition-transform duration-300">
            <CardHeader>
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className={`inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-lg ${tool.bgColor}`}>
                  <tool.icon className={`h-5 w-5 sm:h-5.5 sm:w-5.5 md:h-6 md:w-6 ${tool.color}`} />
                </div>
                <span className={`px-2 sm:px-2.5 md:px-3 py-1 rounded-full text-xs font-medium text-white ${tool.difficulty === 'Beginner' ? 'bg-blue-500' : tool.difficulty === 'Intermediate' ? 'bg-green-500' : 'bg-red-500'}`}>
                  {tool.difficulty}
                </span>
              </div>
              <CardTitle className="text-xl sm:text-xl md:text-2xl">{tool.title}</CardTitle>
              <CardDescription className="text-sm sm:text-base">{tool.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className={`w-full ${tool.difficulty === 'Beginner' ? 'bg-blue-500 hover:bg-blue-600' : tool.difficulty === 'Intermediate' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}>
                <Link to={tool.path}>Try {tool.title}</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Info Section */}
      <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mb-8 sm:mb-10 md:mb-12">
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Key className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              Encryption
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Convert plaintext into ciphertext using mathematical algorithms and secret keys to protect information from unauthorized access.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-secondary/5 to-secondary/10 border-secondary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Unlock className="h-4 w-4 sm:h-5 sm:w-5 text-secondary" />
              Decryption
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Reverse the encryption process to convert ciphertext back to plaintext using the correct key and algorithm.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
              Security
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs sm:text-sm text-muted-foreground">
              The strength of cryptography relies on the secrecy of keys and the computational difficulty of breaking the algorithm.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Getting Started */}
      <Card className="card-glow">
        <CardHeader className="text-center">
          <CardTitle className="text-xl sm:text-2xl">Getting Started</CardTitle>
          <CardDescription className="text-sm sm:text-base">
            New to cryptography? Start with these simple steps
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:gap-5 md:gap-4 grid-cols-1 sm:grid-cols-3">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary text-primary-foreground font-bold mb-2 text-sm sm:text-base">
                1
              </div>
              <h3 className="font-semibold mb-2 text-sm sm:text-base">Choose a Cipher</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">Start with Caesar cipher for simplicity</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary text-primary-foreground font-bold mb-2 text-sm sm:text-base">
                2
              </div>
              <h3 className="font-semibold mb-2 text-sm sm:text-base">Enter Your Text</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">Type the message you want to encrypt</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary text-primary-foreground font-bold mb-2 text-sm sm:text-base">
                3
              </div>
              <h3 className="font-semibold mb-2 text-sm sm:text-base">Set Parameters</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">Configure shift value or keyword</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}