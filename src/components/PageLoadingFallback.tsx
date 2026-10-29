import React from 'react';
import { OmLightSymbol } from './OmLightMotif';

export const PageLoadingFallback: React.FC<{ message?: string }> = ({ 
  message = "Loading Sacred Details..." 
}) => {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 space-y-4 text-center gpu-smooth">
      <div className="relative">
        <OmLightSymbol size="lg" glowColor="gold" animated={true} />
        <div className="absolute inset-0 rounded-full bg-amber-400/20 animate-ping pointer-events-none" />
      </div>
      <div className="space-y-1">
        <p className="font-serif text-lg font-bold text-slate-800 tracking-wide">
          {message}
        </p>
        <p className="text-xs text-[#5A5A40] italic font-medium">
          GoTrek Travels Dharchula · Kumaon Uttarakhand
        </p>
      </div>
    </div>
  );
};

