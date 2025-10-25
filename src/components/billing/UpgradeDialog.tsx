// src/components/billing/UpgradeDialog.tsx
// Modal prompting user to upgrade to Premium. Calls backend demo upgrade.
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles } from 'lucide-react';
import { usePlan } from '@/contexts/PlanContext';
import { useNavigate } from 'react-router-dom';

interface UpgradeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDemo?: () => void;
}

const UpgradeDialog: React.FC<UpgradeDialogProps> = ({ open, onOpenChange, onDemo }) => {
  const { upgrade, loading, hasDemoPass } = usePlan();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleUpgrade = async () => {
    setError(null);
    try {
      await upgrade();
      onOpenChange(false);
    } catch (e) {
      setError('Failed to upgrade. Ensure backend is running and service account env is set, then try again.');
    }
  };

  const handleDemo = () => {
    setError(null);
    if (!hasDemoPass) {
      onOpenChange(false);
      navigate('/pricing');
      return;
    }
    try {
      localStorage.setItem('demo_session', 'true');
    } catch {}
    onOpenChange(false);
    onDemo?.();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-500" /> Upgrade to Premium
          </DialogTitle>
          <DialogDescription>
            Unlock <Badge variant="secondary">Multi-layer Security</Badge> and all premium features.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>Premium enables AES + RSA + Image Steganography combined workflow.</p>
          <p>For demo/testing, you can use a one-time free trial to access the feature once.</p>
          {error && <p className="text-red-500">{error}</p>}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>Not now</Button>
          <Button variant="secondary" onClick={handleDemo} disabled={loading}>{hasDemoPass ? 'Try once (Demo)' : 'View Plans'}</Button>
          <Button onClick={handleUpgrade} disabled={loading}>
            {loading ? 'Upgrading...' : 'Upgrade'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpgradeDialog;
