import React from "react";

function Cast({ cast }) {
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

  return (
    <div className="mt-8">
      {/* Cast list */}
      <div className="flex gap-4 overflow-x-auto pb-2">
        {cast.map((actor) => (
          <div key={actor.id} className="min-w-30 sm:min-w-37.5 text-center">
            {actor.profile_path ? (
              <img
                src={`${IMAGE_BASE_URL}/w185${actor.profile_path}`}
                alt={actor.name}
                className="w-24 h-32 sm:w-28 sm:h-36 object-cover rounded-xl mx-auto shadow-md"
              />
            ) : (
              <div className="w-24 h-32 sm:w-28 sm:h-36 bg-gray-700 rounded-xl mx-auto" />
            )}

            <p className="text-sm font-medium text-black mt-2 truncate w-full">
              {actor.name}
            </p>

            <p className="text-xs text-gray-600 truncate w-full mb-4">
              {actor.character}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cast;
