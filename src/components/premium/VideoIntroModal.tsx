import React, { useEffect, useRef, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { usePremium } from '@/hooks/usePremium';

interface VideoIntroModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const VideoIntroModal: React.FC<VideoIntroModalProps> = ({ open, onOpenChange }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { claimTrialAfterVideo, loading } = usePremium();
  const [progress, setProgress] = useState(0);
  const [eligible, setEligible] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onTime = () => {
      const pct = v.duration ? v.currentTime / v.duration : 0;
      const p = Math.floor(pct * 100);
      setProgress(p);
      setEligible(p >= 90);
    };
    v.addEventListener('timeupdate', onTime);
    return () => v.removeEventListener('timeupdate', onTime);
  }, [open]);

  const handleClaim = async () => {
    await claimTrialAfterVideo(progress, crypto.randomUUID());
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Watch intro to unlock a free trial</DialogTitle>
          <DialogDescription>
            Watch at least 90% to unlock one free Multi-layer Security operation.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <video ref={videoRef} className="w-full rounded border" controls preload="metadata">
            <source src="https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
          </video>
          <div className="text-sm text-muted-foreground">Watched: {progress}%</div>
          <div className="text-xs text-muted-foreground">
            • No tracking — this video is an intro to features and does not collect personal data.
            <br />
            • Your trial status is stored only to prevent abuse and provide one sample experience.
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
          <Button onClick={handleClaim} disabled={!eligible || loading}>
            {eligible ? 'Claim Free Trial' : 'Watch 90% to Claim'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VideoIntroModal;
