// src/components/FirebaseDebug.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { isFirebaseConfigured } from "@/firebase";

const FirebaseDebug = () => {
  const config = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  };

  const currentDomain = window.location.origin;
  const isProduction = import.meta.env.PROD;

  return (
    <Card className="max-w-2xl mx-auto mt-8">
      <CardHeader>
        <CardTitle>Firebase Configuration Debug</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold mb-2">Environment</h3>
          <Badge variant={isProduction ? "default" : "secondary"}>
            {isProduction ? "Production" : "Development"}
          </Badge>
          <p className="text-sm text-muted-foreground mt-1">
            Current Domain: {currentDomain}
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Firebase Status</h3>
          <Badge variant={isFirebaseConfigured ? "default" : "destructive"}>
            {isFirebaseConfigured ? "Configured" : "Not Configured"}
          </Badge>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Configuration Values</h3>
          <div className="space-y-2 text-sm">
            {Object.entries(config).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <span className="font-mono">{key}:</span>
                <Badge variant={value ? "default" : "destructive"}>
                  {value ? "✓" : "Missing"}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Required Firebase Setup</h3>
          <div className="text-sm space-y-1 text-muted-foreground">
            <p>1. Add {currentDomain} to Firebase authorized domains</p>
            <p>2. Add {currentDomain} to Google Cloud Console OAuth settings</p>
            <p>3. Ensure all environment variables are set in Vercel</p>
          </div>
        </div>

        {!isFirebaseConfigured && (
          <div className="p-4 bg-destructive/10 rounded-lg">
            <p className="text-sm text-destructive">
              Firebase is not properly configured. Google Sign-in will not work.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FirebaseDebug;