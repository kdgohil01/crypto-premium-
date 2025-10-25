import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Lock, Unlock, Copy, Shield, AlertCircle } from "lucide-react";
import { CryptoUtils } from "@/lib/crypto-utils";
import { useToast } from "@/hooks/use-toast";

export const AESEncryption = () => {
  const [inputText, setInputText] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [mode, setMode] = useState<"encrypt" | "decrypt">("encrypt");

  const resetForm = () => {
    setInputText("");
    setPassword("");
    setResult("");
  };
  const { toast } = useToast();

  const handleEncrypt = async () => {
    if (!inputText || !password) {
      toast({
        title: "Missing Information",
        description: "Please provide both text and password.",
        variant: "destructive",
      });
      return;
    }

    setIsEncrypting(true);
    try {
      const encrypted = await CryptoUtils.encryptAES(inputText, password);
      setResult(encrypted);
      toast({
        title: "Encryption Successful",
        description: "Your text has been encrypted with AES-256.",
      });
    } catch (error) {
      toast({
        title: "Encryption Failed",
        description: "An error occurred during encryption.",
        variant: "destructive",
      });
    } finally {
      setIsEncrypting(false);
    }
  };

  const handleDecrypt = async () => {
    if (!inputText || !password) {
      toast({
        title: "Missing Information",
        description: "Please provide both encrypted text and password.",
        variant: "destructive",
      });
      return;
    }

    setIsEncrypting(true);
    try {
      const decrypted = await CryptoUtils.decryptAES(inputText, password);
      setResult(decrypted);
      toast({
        title: "Decryption Successful",
        description: "Your text has been decrypted successfully.",
      });
    } catch (error) {
      toast({
        title: "Decryption Failed",
        description: "Invalid password or corrupted data.",
        variant: "destructive",
      });
    } finally {
      setIsEncrypting(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    toast({
      title: "Copied to Clipboard",
      description: "Result has been copied to your clipboard.",
    });
  };

  const getPasswordStrength = () => {
    if (password.length < 8) return { level: "weak", score: 25 };
    if (password.length < 12) return { level: "medium", score: 60 };
    if (password.length >= 16 && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) {
      return { level: "strong", score: 100 };
    }
    return { level: "good", score: 80 };
  };

  const strengthInfo = getPasswordStrength();

  return (
    <div className="container mx-auto py-4 sm:py-6 md:py-8 px-4 sm:px-6 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
        {/* Input Section */}
        <Card className="card-glow">
          <CardHeader>
            <CardTitle className="flex flex-wrap items-center gap-2">
              <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              <span className="text-lg sm:text-xl">AES-256 Encryption</span>
              <Badge className="text-white bg-green-500 text-xs">Intermediate</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6">
            {/* Mode Toggle */}
            <div className="flex gap-2">
              <Button
                variant={mode === "encrypt" ? "default" : "outline"}
                onClick={() => {
                  setMode("encrypt");
                  resetForm();
                }}
                className={`flex-1 sm:flex-none ${mode === "encrypt" ? "btn-hero" : ""}`}
              >
                <Lock className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="text-sm sm:text-base">Encrypt</span>
              </Button>
              <Button
                variant={mode === "decrypt" ? "default" : "outline"}
                onClick={() => {
                  setMode("decrypt");
                  resetForm();
                }}
                className={`flex-1 sm:flex-none ${mode === "decrypt" ? "btn-hero" : ""}`}
              >
                <Unlock className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="text-sm sm:text-base">Decrypt</span>
              </Button>
            </div>

            {/* Text Input */}
            <div className="space-y-2">
              <Label htmlFor="text-input" className="text-sm sm:text-base">
                {mode === "encrypt" ? "Text to Encrypt" : "Encrypted Text"}
              </Label>
              <Textarea
                id="text-input"
                placeholder={mode === "encrypt" ? "Enter your secret message..." : "Paste encrypted data..."}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                rows={6}
                className="bg-muted border-border text-sm sm:text-base"
              />
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <Label htmlFor="password-input" className="text-sm sm:text-base">Encryption Password</Label>
              <Input
                id="password-input"
                type="password"
                placeholder={mode === "encrypt" ? "Enter a strong password..." : "Enter your password..."}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-muted border-border text-sm sm:text-base"
              />
            {password && mode === "encrypt" && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Password Strength</span>
                  <span className={`font-medium ${
                    strengthInfo.level === "strong" ? "text-green-500" :
                    strengthInfo.level === "good" ? "text-yellow-500" :
                    strengthInfo.level === "medium" ? "text-orange-500" : "text-red-500"
                  }`}>
                    {strengthInfo.level.toUpperCase()}
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      strengthInfo.level === "strong" ? "bg-green-500" :
                      strengthInfo.level === "good" ? "bg-yellow-500" :
                      strengthInfo.level === "medium" ? "bg-orange-500" : "bg-red-500"
                    }`}
                    style={{ width: `${strengthInfo.score}%` }}
                  />
                </div>
              </div>
            )}
          </div>

            {/* Action Button */}
            <Button
              onClick={mode === "encrypt" ? handleEncrypt : handleDecrypt}
              disabled={isEncrypting || !inputText || !password}
              className="w-full btn-hero text-sm sm:text-base"
            >
            {isEncrypting ? (
              <div className="flex items-center space-x-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                <span>Processing...</span>
              </div>
            ) : (
              <>
                {mode === "encrypt" ? <Lock className="h-4 w-4 mr-2" /> : <Unlock className="h-4 w-4 mr-2" />}
                {mode === "encrypt" ? "Encrypt with AES-256" : "Decrypt with AES-256"}
              </>
            )}
          </Button>

            {/* Security Notice */}
            <div className="flex items-start gap-2 p-2 sm:p-3 bg-muted/50 rounded-lg">
              <AlertCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <div className="text-xs sm:text-sm text-muted-foreground">
                <p className="font-medium">Security Note:</p>
                <p>
                  This tool demonstrates AES-256-GCM with password-based key derivation. For files, a common educational
                  format is: [8B MAGIC][1B VER][16B SALT][12B NONCE][ciphertext||16B TAG], with keys derived using scrypt.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Result Section */}
        <Card className="card-glow">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-lg sm:text-xl">
              <span>Result</span>
              {result && (
                <Button variant="outline" size="sm" onClick={copyToClipboard} className="text-xs sm:text-sm">
                  <Copy className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Copy</span>
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
          {result ? (
            <div className="space-y-4">
              <Textarea
                value={result}
                readOnly
                rows={12}
                className="bg-muted border-border font-mono text-xs sm:text-sm"
              />
              <div className="flex items-center justify-between text-xs sm:text-sm text-muted-foreground">
                <span>Length: {result.length} characters</span>
                <Badge variant="secondary" className="bg-secondary/20 text-secondary text-xs">
                  {mode === "encrypt" ? "Encrypted" : "Decrypted"}
                </Badge>
              </div>
            </div>
          ) : (
            <div className="h-48 flex items-center justify-center text-muted-foreground border-2 border-dashed border-border rounded-lg">
              <div className="text-center px-4">
                <Lock className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 mx-auto mb-2 opacity-50" />
                <p className="text-xs sm:text-sm">Result will appear here after {mode === "encrypt" ? "encryption" : "decryption"}</p>
              </div>
            </div>
          )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
