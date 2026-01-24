import React from "react";
import { useNavigate } from "react-router-dom";

function SimilarMovies({ similarMovies }) {
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";
  const navigate = useNavigate();

  return (
    <div className="mt-10 px-4">
      {/* Title */}
      <div className="flex items-center gap-2 mb-4">
        <span className="w-1 h-6 bg-yellow-400 rounded-sm" />
        <h2 className="text-lg sm:text-xl font-semibold">
          Similar Movies
        </h2>
      </div>

      {similarMovies.length === 0 && (
        <p className="text-gray-500">No similar movies found</p>
      )}

      {similarMovies.length > 0 && (
        <div className="flex gap-4 overflow-x-auto pb-2">
          {similarMovies.map((movie) => (
            <div
              key={movie.id}
              onClick={() => navigate(`/movie/${movie.id}`)}
              className="
                group
                min-w-35
                cursor-pointer
                transition-transform duration-300
                hover:scale-105
              "
            >
              {/* Poster */}
              <div className="relative overflow-hidden rounded-lg shadow-md">
                {movie.poster_path ? (
                  <img
                    src={`${IMAGE_BASE_URL}/w185${movie.poster_path}`}
                    alt={movie.title}
                    className="
                      w-36
                      h-52
                      rounded-lg
                      transition-transform duration-300
                      group-hover:scale-110
                    "
                  />
                ) : (
                  <div className="w-36 h-52 bg-gray-300 rounded-lg" />
                )}

                {/* Overlay */}
                <div
                  className="
                    absolute inset-0
                    bg-linear-to-t
                    from-black/60 via-black/20 to-transparent
                    opacity-0
                    group-hover:opacity-100
                    transition-opacity duration-300
                  "
                />
              </div>

              {/* Title */}
              <p
                className="
                  mt-2
                  text-sm
                  font-medium
                  truncate
                  text-center
                  text-gray-800
                  group-hover:text-black
                  transition-colors
                "
              >
                {movie.title}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SimilarMovies;
