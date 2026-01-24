import React from "react";

function LoadProduction({ director, companies }) {
  return (
    <>
      {/* Director */}
      <div className="mt-6 px-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-1 h-6 bg-yellow-400 rounded-sm" />
          <h2 className="text-lg sm:text-xl font-semibold">
            Director
          </h2>
        </div>

        <p className="text-gray-700 text-base sm:text-lg">
          {director}
        </p>
      </div>

      {/* Production Companies */}
      <div className="mt-8 px-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-1 h-6 bg-yellow-400 rounded-sm" />
          <h2 className="text-lg sm:text-xl font-semibold">
            Production Companies
          </h2>
        </div>

        <div className="flex flex-wrap gap-3">
          {companies.slice(0, 5).map((company) => (
            <span
              key={company.id}
              className="px-3 py-1 bg-gray-200 rounded-full text-sm sm:text-base"
            >
              {company.name}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

export default LoadProduction;
 