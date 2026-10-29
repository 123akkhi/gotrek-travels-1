import React from 'react';

interface SectionSkeletonProps {
  type?: 'packages' | 'dark' | 'light' | 'map' | 'footer';
  className?: string;
}

export const SectionSkeleton: React.FC<SectionSkeletonProps> = ({ 
  type = 'light',
  className = '' 
}) => {
  if (type === 'packages') {
    return (
      <div className={`w-full py-12 px-4 sm:px-6 lg:px-8 bg-[#F4F6FA] ${className}`}>
        <div className="max-w-7xl mx-auto space-y-8 animate-pulse">
          {/* Header Skeleton */}
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <div className="h-4 w-32 bg-slate-300/80 rounded-full mx-auto" />
            <div className="h-8 w-64 bg-slate-300 rounded-xl mx-auto" />
            <div className="h-4 w-80 bg-slate-200 rounded mx-auto" />
          </div>

          {/* Quick Categories Bar Skeleton */}
          <div className="flex justify-center gap-2 overflow-hidden py-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-9 w-24 bg-slate-200/80 rounded-full shrink-0" />
            ))}
          </div>

          {/* Grid Cards Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm p-4 space-y-4">
                <div className="h-52 bg-slate-200 rounded-2xl w-full" />
                <div className="space-y-2">
                  <div className="h-5 w-3/4 bg-slate-200 rounded" />
                  <div className="h-4 w-1/2 bg-slate-100 rounded" />
                </div>
                <div className="flex justify-between pt-2">
                  <div className="h-6 w-20 bg-slate-200 rounded" />
                  <div className="h-8 w-28 bg-slate-300 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (type === 'dark') {
    return (
      <div className={`w-full py-16 px-4 sm:px-6 lg:px-8 bg-[#0B1120] text-white ${className}`}>
        <div className="max-w-7xl mx-auto space-y-6 animate-pulse">
          <div className="h-4 w-28 bg-slate-800 rounded-full" />
          <div className="h-8 w-72 bg-slate-800 rounded-xl" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3">
                <div className="h-5 w-1/3 bg-slate-800 rounded" />
                <div className="h-10 w-1/2 bg-slate-700 rounded" />
                <div className="h-4 w-full bg-slate-800/80 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (type === 'footer') {
    return (
      <footer className={`w-full py-12 px-4 sm:px-6 lg:px-8 bg-[#0A0F1D] border-t border-slate-800 ${className}`}>
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 animate-pulse">
          {[1, 2, 3, 4].map((col) => (
            <div key={col} className="space-y-3">
              <div className="h-4 w-24 bg-slate-800 rounded" />
              <div className="h-3 w-36 bg-slate-900 rounded" />
              <div className="h-3 w-32 bg-slate-900 rounded" />
              <div className="h-3 w-40 bg-slate-900 rounded" />
            </div>
          ))}
        </div>
      </footer>
    );
  }

  // Generic light section skeleton
  return (
    <div className={`w-full py-12 px-4 sm:px-6 lg:px-8 bg-[#FBF9F4] ${className}`}>
      <div className="max-w-6xl mx-auto space-y-6 animate-pulse">
        <div className="h-6 w-48 bg-amber-200/50 rounded-lg mx-auto" />
        <div className="h-4 w-72 bg-amber-100/60 rounded mx-auto" />
        <div className="h-56 bg-white/70 border border-amber-100/60 rounded-3xl" />
      </div>
    </div>
  );
};

export default SectionSkeleton;
