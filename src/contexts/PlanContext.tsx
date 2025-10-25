// src/contexts/PlanContext.tsx
// Manages Free vs Premium plan using backend verification with Firebase ID token
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useAuth } from './AuthContext';
import { apiGet, apiPost } from '@/lib/api';

export type Plan = 'free' | 'premium';

interface PlanContextType {
  plan: Plan;
  loading: boolean;
  refresh: () => Promise<void>;
  upgrade: () => Promise<void>;
  hasDemoPass: boolean;
  consumeDemoPass: () => boolean;
  grantDemoPass: () => void;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export const usePlan = (): PlanContextType => {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error('usePlan must be used within PlanProvider');
  return ctx;
};

export const PlanProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();
  const [plan, setPlan] = useState<Plan>('free');
  const [loading, setLoading] = useState<boolean>(false);
  const [hasDemoPass, setHasDemoPass] = useState<boolean>(() => {
    const v = localStorage.getItem('demo_pass_available');
    // default: offer one-time pass if key missing
    return v === null ? true : v === 'true';
  });

  const fetchPlan = async () => {
    if (!user) {
      setPlan('free');
      return;
    }
    setLoading(true);
    try {
      const res = await apiGet<{ plan: Plan }>('/api/user-status');
      setPlan(res.plan);
    } catch (e) {
      // On error, default to free for safety
      setPlan('free');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoading) {
      // fetch when auth state determined
      void fetchPlan();
    }
  }, [user?.id, isLoading]);

  const upgrade = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await apiPost<{ plan: Plan }>('/api/upgrade');
      setPlan(res.plan);
    } finally {
      setLoading(false);
    }
  };

  const consumeDemoPass = (): boolean => {
    if (!hasDemoPass) return false;
    setHasDemoPass(false);
    localStorage.setItem('demo_pass_available', 'false');
    return true;
  };

  const grantDemoPass = () => {
    setHasDemoPass(true);
    localStorage.setItem('demo_pass_available', 'true');
  };

  const value = useMemo<PlanContextType>(
    () => ({ plan, loading, refresh: fetchPlan, upgrade, hasDemoPass, consumeDemoPass, grantDemoPass }),
    [plan, loading, hasDemoPass]
  );

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
};
