import { Link } from "react-router-dom";
import { Database, Link as LinkIcon, Binary } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const tools = [
  {
    title: "Binary Converter",
    description: "Binary conversion and visualization tool with support for text and custom binary data.",
    icon: Binary,
    path: "/data-processing/binary-converter",
    difficulty: "Intermediate",
    color: "text-white",
    bgColor: "bg-green-500"
  },
  {
    title: "URL Processor",
    description: "Multi-level security encoding tool with URL encoding, Base64, and AES-256 encryption capabilities.",
    icon: LinkIcon,
    path: "/data-processing/url-processor",
    difficulty: "Advanced",
    color: "text-white",
    bgColor: "bg-red-500",
  },
];

export default function DataProcessing() {
  return (
    <div className="container mx-auto py-4 sm:py-6 md:py-8 px-4 sm:px-6 max-w-6xl">
      {/* Hero Section */}
      <div className="text-center mb-8 sm:mb-10 md:mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-full bg-gradient-secondary mb-4 sm:mb-5 md:mb-6 float-animation">
          <Database className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 text-white" />
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gradient mb-4 sm:mb-5 md:mb-6 leading-tight pb-2">Data Processing Tools</h1>
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Transform and process your data with powerful encoding, decoding, and conversion tools designed for various security levels and use cases.
        </p>
      </div>

      {/* Tools Grid */}
      <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-8 sm:mb-10 md:mb-12">
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
              <Button asChild className={`w-full h-10 ${tool.difficulty === 'Beginner' ? 'bg-blue-500 hover:bg-blue-600' : tool.difficulty === 'Intermediate' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}>
                <Link to={tool.path}>Try {tool.title}</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Coming Soon */}
      <Card className="bg-muted/20 border-border/30 mb-8 sm:mb-10 md:mb-12">
        <CardHeader className="text-center">
          <CardTitle className="text-lg sm:text-xl text-muted-foreground">Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-2xl mx-auto">
            <div className="text-center p-3 sm:p-4 rounded-lg bg-muted/10">
              <Database className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 mx-auto mb-2 text-muted-foreground" />
              <h3 className="font-semibold mb-1 text-sm sm:text-base text-muted-foreground">JSON Formatter</h3>
              <p className="text-xs text-muted-foreground">Format and validate JSON data</p>
            </div>
            <div className="text-center p-3 sm:p-4 rounded-lg bg-muted/10">
              <LinkIcon className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 mx-auto mb-2 text-muted-foreground" />
              <h3 className="font-semibold mb-1 text-sm sm:text-base text-muted-foreground">Hash Generator</h3>
              <p className="text-xs text-muted-foreground">Generate MD5, SHA-256 hashes</p>
            </div>
            <div className="text-center p-3 sm:p-4 rounded-lg bg-muted/10">
              <Database className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 mx-auto mb-2 text-muted-foreground" />
              <h3 className="font-semibold mb-1 text-sm sm:text-base text-muted-foreground">CSV/JSON Converter</h3>
              <p className="text-xs text-muted-foreground">Convert between CSV and JSON formats</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Info Section */}
      <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mb-8 sm:mb-10 md:mb-12">
        <Card className="bg-gradient-to-br from-secondary/5 to-secondary/10 border-secondary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <LinkIcon className="h-4 w-4 sm:h-5 sm:w-5 text-secondary" />
              Multi-Level Security
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Process data through multiple security levels from basic URL encoding to military-grade AES-256 encryption.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Database className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
              Data Transformation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Convert between different data formats and encodings for various applications and security requirements.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Database className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              Real-time Processing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Instant encoding, decoding, and encryption with automatic clipboard copying for seamless workflow.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* How It Works */}
      <Card className="card-glow">
        <CardHeader className="text-center">
          <CardTitle className="text-xl sm:text-2xl">How Data Processing Works</CardTitle>
          <CardDescription className="text-sm sm:text-base">
            The science of transforming data for security and compatibility
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-secondary text-secondary-foreground font-bold mb-3 sm:mb-4 text-sm sm:text-base">
                1
              </div>
              <h3 className="font-semibold mb-2 text-sm sm:text-base">Input Data</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">Enter your text or data that needs processing</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-secondary text-secondary-foreground font-bold mb-3 sm:mb-4 text-sm sm:text-base">
                2
              </div>
              <h3 className="font-semibold mb-2 text-sm sm:text-base">Choose Method</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">Select appropriate encoding or encryption level</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-secondary text-secondary-foreground font-bold mb-3 sm:mb-4 text-sm sm:text-base">
                3
              </div>
              <h3 className="font-semibold mb-2 text-sm sm:text-base">Process Data</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">Apply transformation using selected algorithm</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-secondary text-secondary-foreground font-bold mb-3 sm:mb-4 text-sm sm:text-base">
                4
              </div>
              <h3 className="font-semibold mb-2 text-sm sm:text-base">Get Result</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">Receive processed data with automatic clipboard copy</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
