function MovieDetailsSkeleton() {
  return (
      <div className="relative w-full min-h-screen lg:h-[90vh]">
      {/* Backdrop skeleton */}
      <div className="absolute inset-0 bg-gray-800 animate-pulse" />

      <div
        className="
          relative z-10
          flex flex-col lg:flex-row
          items-start lg:items-center
          h-full
          px-4 sm:px-6 lg:px-10
          gap-6 lg:gap-10
          pt-20 lg:pt-0
        "
      >
        {/* Poster skeleton */}
        <div className="w-36 sm:w-44 lg:w-64 h-55 lg:h-95 bg-gray-700 rounded-lg animate-pulse self-center lg:self-auto" />

        {/* Text skeleton */}
        <div className="flex-1 max-w-2xl space-y-4">
          <div className="h-8 w-3/4 bg-gray-700 rounded animate-pulse" />
          <div className="h-4 w-1/3 bg-gray-700 rounded animate-pulse" />
          <div className="h-4 w-1/4 bg-gray-700 rounded animate-pulse" />

          <div className="space-y-2 mt-4">
            <div className="h-4 w-full bg-gray-700 rounded animate-pulse" />
            <div className="h-4 w-full bg-gray-700 rounded animate-pulse" />
            <div className="h-4 w-5/6 bg-gray-700 rounded animate-pulse" />
          </div>

          {/* Genre pills skeleton */}
          <div className="flex gap-2 mt-4">
            <div className="h-6 w-16 bg-gray-700 rounded-full animate-pulse" />
            <div className="h-6 w-20 bg-gray-700 rounded-full animate-pulse" />
            <div className="h-6 w-14 bg-gray-700 rounded-full animate-pulse" />
          </div>
        </div>

        {/* Buttons skeleton */}
        <div className="flex flex-col sm:flex-row gap-3 lg:self-end lg:mb-10 w-full sm:w-auto">
          <div className="h-10 w-full sm:w-40 bg-gray-700 rounded-2xl animate-pulse" />
          <div className="h-10 w-full sm:w-40 bg-gray-700 rounded-2xl animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export default MovieDetailsSkeleton;
