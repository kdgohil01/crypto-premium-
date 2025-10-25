import { useCallback, useEffect, useMemo, useState } from 'react';
import { apiGet, apiPost } from '@/lib/api';

export type PremiumStatus = {
  plan: 'free' | 'premium';
  oneTimeTrialAvailable: boolean;
  oneTimeTrialUsedAt?: string | null;
  processingDelaySeconds?: number; // base delay for free users
  securityPotential?: number; // 0-100 provided by backend
};

export function usePremium() {
  const [status, setStatus] = useState<PremiumStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiGet<PremiumStatus>('/api/user-premium-status');
      setStatus(res);
    } catch (e) {
      setError('Failed to load premium status');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const claimTrialAfterVideo = useCallback(async (percentWatched: number, watchSessionId?: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiPost<{ success: boolean; oneTimeTrialAvailable: boolean }>(
        '/api/video-watched',
        { percentWatched, watchSessionId }
      );
      await refresh();
      return res;
    } catch (e) {
      setError('Failed to claim trial');
      throw e;
    } finally {
      setLoading(false);
    }
  }, [refresh]);

  const consumeTrial = useCallback(async (feature: 'multiLayer') => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiPost<{ allowed: boolean; reason?: string; trialConsumed?: boolean }>(
        '/api/consume-trial',
        { feature }
      );
      await refresh();
      return res;
    } catch (e) {
      setError('Failed to consume trial');
      throw e;
    } finally {
      setLoading(false);
    }
  }, [refresh]);

  const isPremium = status?.plan === 'premium';

  return {
    status,
    isPremium,
    loading,
    error,
    refresh,
    claimTrialAfterVideo,
    consumeTrial,
  };
}
