import React from "react";

function LoadMovieSkeleton() {
  return (
    <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="animate-pulse">
          {/* Poster */}
          <div className="w-full aspect-2/3 bg-gray-300 rounded-xl mb-3" />

          {/* Title */}
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-2" />

          {/* Subtitle / rating */}
          <div className="h-3 bg-gray-200 rounded w-1/2" />
        </div>
      ))}
    </div>
  );
}

export default LoadMovieSkeleton;
