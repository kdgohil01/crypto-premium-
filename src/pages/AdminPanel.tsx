// src/pages/AdminPanel.tsx
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const AdminPanel = () => {
  const [email, setEmail] = useState("");
  const [plan, setPlan] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [adminKey, setAdminKey] = useState("");

  const updateUserPlan = async () => {
    if (!email || !plan || !adminKey) {
      toast.error("Please fill all fields");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5050/api/admin/users/${email}/plan`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': adminKey,
        },
        body: JSON.stringify({ plan }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        setEmail("");
        setPlan("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to update user plan");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Admin Panel - Update User Plan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="admin-key">Admin Key</Label>
            <Input
              id="admin-key"
              type="password"
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
              placeholder="Enter admin key"
            />
          </div>
          
          <div>
            <Label htmlFor="email">User Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
            />
          </div>

          <div>
            <Label htmlFor="plan">Plan</Label>
            <Select value={plan} onValueChange={setPlan}>
              <SelectTrigger>
                <SelectValue placeholder="Select plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="pro">Pro</SelectItem>
                <SelectItem value="researcher">Researcher</SelectItem>
                <SelectItem value="enterprise">Enterprise</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            onClick={updateUserPlan} 
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? "Updating..." : "Update Plan"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPanel;