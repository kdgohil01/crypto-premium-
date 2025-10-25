// src/hooks/useFileValidation.ts
import { usePremium } from './usePremium';
import { toast } from 'sonner';

// File size limits in MB
const FREE_FILE_SIZE_LIMIT_MB = 5;
const PREMIUM_FILE_SIZE_LIMIT_MB = 50;

export const useFileValidation = () => {
  const { isPremium } = usePremium();

  const maxFileSizeMB = isPremium ? PREMIUM_FILE_SIZE_LIMIT_MB : FREE_FILE_SIZE_LIMIT_MB;
  const maxFileSizeBytes = maxFileSizeMB * 1024 * 1024;

  const validateFile = (file: File | null): boolean => {
    if (!file) {
      toast.error('Please select a file');
      return false;
    }

    if (file.size > maxFileSizeBytes) {
      if (isPremium) {
        toast.error(`File size exceeds ${maxFileSizeMB}MB limit`);
      } else {
        toast.error(
          `File size exceeds ${maxFileSizeMB}MB limit for free users. Upgrade to Premium for ${PREMIUM_FILE_SIZE_LIMIT_MB}MB limit.`,
          {
            action: {
              label: 'Upgrade',
              onClick: () => {
                window.location.href = '/pricing';
              },
            },
          }
        );
      }
      return false;
    }

    return true;
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return {
    validateFile,
    maxFileSizeMB,
    maxFileSizeBytes,
    formatFileSize,
    isPremium,
  };
};
