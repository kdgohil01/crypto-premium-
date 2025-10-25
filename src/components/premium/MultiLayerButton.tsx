import React, { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { usePremium } from '@/hooks/usePremium';
import SoftLockModal from './SoftLockModal';
import VideoIntroModal from './VideoIntroModal';

interface MultiLayerButtonProps {
  className?: string;
  children?: React.ReactNode;
}

const MultiLayerButton: React.FC<MultiLayerButtonProps> = ({ className, children }) => {
  const navigate = useNavigate();
  const { status, isPremium, consumeTrial, refresh } = usePremium();
  const [openSoftLock, setOpenSoftLock] = useState(false);
  const [openVideo, setOpenVideo] = useState(false);

  const canTryOnce = useMemo(() => {
    if (!status) return false;
    return status.oneTimeTrialAvailable && !status.oneTimeTrialUsedAt;
  }, [status]);

  const onClick = async () => {
    // Always navigate to Guardian Layer - it handles its own trial/premium logic
    navigate('/multilayered-security/guardian-layer');
  };

  const handleTryOnce = async () => {
    const res = await consumeTrial('multiLayer');
    await refresh();
    if (res.allowed) {
      navigate('/multilayered-security/guardian-layer');
    } else {
      setOpenSoftLock(false);
      navigate('/pricing');
    }
  };

  return (
    <>
      <Button className={className} onClick={onClick}>
        {children ?? 'Access Guardian Layer'}
      </Button>
      <SoftLockModal
        open={openSoftLock}
        onOpenChange={setOpenSoftLock}
        canTryOnce={!!canTryOnce}
        onTryOnce={handleTryOnce}
        onWatchIntro={() => {
          setOpenSoftLock(false);
          setOpenVideo(true);
        }}
        onUpgrade={() => {
          setOpenSoftLock(false);
          navigate('/pricing');
        }}
      />
      <VideoIntroModal
        open={openVideo}
        onOpenChange={(o) => {
          setOpenVideo(o);
          if (!o) {
            void refresh();
            setOpenSoftLock(true);
          }
        }}
      />
    </>
  );
};

export default MultiLayerButton;
