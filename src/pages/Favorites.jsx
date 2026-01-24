import React from "react";
import { useMovieContext } from "../context/MovieContext";
import MovieCard from "../components/MovieCard";

function Favorites() {
  const { favorites } = useMovieContext();

  return (
    <>
      {favorites.length > 0 ? (
        <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="text-center mt-10 text-gray-500">
          NO FAVORITE MOVIES YET
        </div>
      )}
    </>
  );
}

export default Favorites;
