import GENRE_MAP from "../services/genreMap";
import { useMovieContext } from "../context/MovieContext";
import { useNavigate } from "react-router-dom";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieCard = ({ movie ,query, movies}) => {
  const { isFav, addToFav, removeFav } = useMovieContext();
  const navigate = useNavigate();
  const favorite = isFav(movie.id);

  function onFavClick(e) {
    e.preventDefault();
    e.stopPropagation();
    favorite ? removeFav(movie.id) : addToFav(movie);
  }

  const { title, poster_path, vote_average, release_date, genre_ids = [] } =
    movie;

  const genres = genre_ids
    .map((id) => GENRE_MAP[id])
    .filter(Boolean)
    .join(", ");

  return (
    <div
      onClick={() =>
  navigate(`/movie/${movie.id}`, {
    state: {
      query,
      movies,
      isSearching: query?.trim().length > 0,
    },
  })
}

      className="relative group bg-white rounded-xl shadow-md overflow-hidden hover:scale-[1.03] transition-all duration-300 cursor-pointer"
    >
      <div className="relative w-full aspect-2/3 bg-gray-200">
        {poster_path ? (
          <img
            src={`${IMAGE_BASE_URL}${poster_path}`}
            alt={title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-500 font-semibold">
            No Image
          </div>
        )}

        <div className="absolute inset-0 bg-linear-to-b from-black/10 to-black/80 opacity-0 transition-opacity duration-200 flex flex-col justify-start p-4 group-hover:opacity-100">
          <button
            onClick={onFavClick}
            className={`text-2xl self-end ${
              favorite ? "text-red-500" : "text-white"
            }`}
          >
            ♥
          </button>
        </div>
      </div>

      <div className="p-4 space-y-1">
        <h3 className="font-semibold text-lg sm:text-xl truncate">{title}</h3>
        <p className="text-sm text-gray-500">
          {release_date?.slice(0, 4) || "N/A"}
        </p>
        <p className="text-sm text-gray-600">{genres || "Unknown genre"}</p>
        <p className="text-sm sm:text-md font-medium">
          ⭐ {vote_average?.toFixed(1)}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
