import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface SoftLockModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  canTryOnce: boolean;
  onTryOnce: () => void;
  onWatchIntro: () => void;
  onUpgrade: () => void;
}

const SoftLockModal: React.FC<SoftLockModalProps> = ({ open, onOpenChange, canTryOnce, onTryOnce, onWatchIntro, onUpgrade }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Multi-layer Security (Premium)</DialogTitle>
          <DialogDescription>
            This feature combines AES + RSA + Image Steganography for layered protection.
          </DialogDescription>
        </DialogHeader>
        <div className="text-sm text-muted-foreground space-y-2">
          <p>Try it once — use a single free multi-layer operation to see the difference. Or upgrade to Premium for unlimited access.</p>
        </div>
        <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-3">
          {canTryOnce && (
            <Button variant="secondary" onClick={onTryOnce}>Try once for free</Button>
          )}
          {!canTryOnce && (
            <Button variant="outline" onClick={onWatchIntro}>Watch intro to unlock trial</Button>
          )}
          <Button onClick={onUpgrade}>Upgrade to Premium</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SoftLockModal;
