import React from 'react';

interface PremiumProgressBarProps {
  percent: number; // 0-100
  label?: string;
}

const PremiumProgressBar: React.FC<PremiumProgressBarProps> = ({ percent, label }) => {
  const pct = Math.min(100, Math.max(0, Math.round(percent)));
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-1 text-sm">
        <span>{label ?? 'Your security potential'}</span>
        <span className="font-medium">{pct}%</span>
      </div>
      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-primary to-green-500 transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="mt-1 text-xs text-muted-foreground">
        Unlock 100% with Premium
      </div>
    </div>
  );
};

export default PremiumProgressBar;
