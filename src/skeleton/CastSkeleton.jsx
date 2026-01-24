function CastSkeleton() {
  return (
    <div className="p-4">
      <div className="h-6 w-32 bg-gray-700 rounded animate-pulse mb-4" />

      <div className="flex gap-4 overflow-x-auto">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="min-w-30 text-center">
            <div className="w-24 h-32 bg-gray-700 rounded-lg mx-auto animate-pulse" />
            <div className="h-3 w-20 bg-gray-700 rounded mt-2 mx-auto animate-pulse" />
            <div className="h-3 w-16 bg-gray-700 rounded mt-1 mx-auto animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CastSkeleton;
