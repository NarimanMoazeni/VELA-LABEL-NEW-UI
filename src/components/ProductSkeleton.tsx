import React from 'react';

export const ProductSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col bg-[#181411] rounded-[22px] overflow-hidden border border-white/10 shadow-md select-none w-full">
      {/* 3:4 Aspect Image Skeleton */}
      <div className="relative aspect-[3/4] overflow-hidden skeleton-shimmer" />

      {/* Details Box Skeleton */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between space-y-3.5">
        <div className="space-y-2">
          {/* Category & Code line */}
          <div className="flex items-center justify-between">
            <div className="h-3 w-16 rounded-full skeleton-shimmer" />
            <div className="h-3 w-12 rounded-full skeleton-shimmer" />
          </div>

          {/* Title line */}
          <div className="h-5 w-3/4 rounded-md skeleton-shimmer" />
        </div>

        {/* Price & Action button */}
        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          <div className="h-5 w-24 rounded-md skeleton-shimmer" />
          <div className="w-9 h-9 rounded-full skeleton-shimmer" />
        </div>
      </div>
    </div>
  );
};
