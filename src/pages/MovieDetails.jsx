import { useParams } from "react-router-dom";
import api from "../services/api";
import { useState, useEffect } from "react";
import { useMovieContext } from "../context/MovieContext";
import DialogBox from "../components/DialogBox";
import MovieDetailsSkeleton from "../skeleton/MovieDetailsSkeleton";
import CastSkeleton from "../skeleton/CastSkeleton";
import Cast from "../components/Cast";
import LoadProduction from "../components/LoadProduction";
import SimilarMovies from "../components/SimilarMovies";
import Icon from "../components/Icons";

function MovieDetails() {
  // hooks
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [director, setDirector] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isFav, addToFav } = useMovieContext();
  const [castLoading, setCastLoading] = useState(true);

  // variables
  const { id } = useParams();
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

  // fetch movie
  const getMovie = async () => {
    const response = await api.get(`/movie/${id}`);
    return response.data;
  };

  // fetch movie cast
  const getMovieCast = async () => {
    const res = await api.get(`/movie/${id}/credits`);
    return res.data;
  };

  // load movie
  const loadMovie = async () => {
    try {
      setLoading(true);
      const data = await getMovie();
      setMovie(data);
      setCompanies(data.production_companies || []);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Cannot load movie...");
    } finally {
      setLoading(false);
    }
  };
  //load similarMovies
  const loadSimilarMovies = async () => {
    try {
      const res = await api.get(`/movie/${id}/similar`);
      setSimilarMovies(res.data.results.slice(0, 10));
    } catch (err) {
      console.log(err);
    }
  };

  // load cast and productions
  const loadMovieCast = async () => {
    try {
      setCastLoading(true);
      const data = await getMovieCast();
      setCast(data.cast.slice(0, 10));
      //load director
      const directorData = data.crew.find(
        (person) => person.job === "Director",
      );
      setDirector(directorData?.name || "Unknown");
    } catch (err) {
      console.log(err);
    } finally {
      setCastLoading(false);
    }
  };
  //use effect to load all automatically
  useEffect(() => {
    window.scrollTo(0, 0);
    loadMovie();
    loadMovieCast();
    loadSimilarMovies();
  }, [id]);

  if (loading) {
    return <MovieDetailsSkeleton />;
  }

  if (error) {
    return <div className="text-xl text-red-400 ml-5 mt-5">{error}</div>;
  }

  const {
    title,
    poster_path,
    backdrop_path,
    vote_average,
    release_date,
    overview,
    genres = [],
  } = movie;

  const formattedDate = new Date(release_date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  // favorites
  const favorite = isFav(movie.id);
  const handleFavoriteClick = () => {
    setIsOpen(true);
    if (!favorite) addToFav(movie);
  };

  // trailer
  const handleWatchTrailer = async () => {
    const res = await api.get(`/movie/${id}/videos`);
    const trailer = res.data.results.find(
      (vid) => vid.site === "YouTube" && vid.type === "Trailer",
    );
    if (!trailer) return alert("Trailer not available");

    window.open(
      `https://www.youtube.com/watch?v=${trailer.key}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <>
      {/* error handling */}
      {error && <div className="text-xl ml-5 mt-5">{error}</div>}
      {/* open the dialog box for add to fav */}
      <DialogBox isOpen={isOpen} setIsOpen={setIsOpen} />

      {/*------------------------------------Hero section -------------------------------*/}

      <div className="w-full min-h-screen">
        <div
          className="relative w-full sm:h-[90vh] bg-black bg-cover bg-top"
          style={{
            backgroundImage: backdrop_path
              ? `url(${IMAGE_BASE_URL}/original${backdrop_path})`
              : "none",
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60"></div>

          {/* Main Content */}
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
            {/* Poster */}
            {poster_path && (
              <img
                src={`${IMAGE_BASE_URL}/w500${poster_path}`}
                alt={title}
                className="
                  w-36 sm:w-44 lg:w-64
                  rounded-lg
                  shadow-xl
                  self-center lg:self-auto
                "
              />
            )}

            {/* Movie Info */}
            <div className="text-white max-w-2xl">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">
                {title}
              </h1>

              <p className="text-sm sm:text-base mb-1">
                ⭐ {vote_average.toFixed(1)} / 10
              </p>

              <p className="text-sm text-gray-300 mb-3">{formattedDate}</p>

              <p className="text-sm sm:text-base lg:text-lg leading-relaxed">
                {overview}
              </p>

              <div className="flex gap-2 flex-wrap mt-3">
                {genres.map((g) => (
                  <span
                    key={g.id}
                    className="border border-white/60 px-3 py-1 rounded-full text-xs sm:text-sm"
                  >
                    {g.name}
                  </span>
                ))}
              </div>
              <div className="mt-4">
                {/* Runtime */}
                <div className="flex items-center gap-2 text-sm text-gray-300 mb-1">
                  <Icon name="clock" />
                  <span>{movie.runtime} min</span>
                </div>

                {/* Languages */}
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Icon name="menu" />
                  <span>
                    {movie.spoken_languages
                      ?.map((lang) => lang.english_name)
                      .join(", ")}
                  </span>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div
              className="
                flex flex-col sm:flex-row
                gap-3
                mb-3
                lg:self-end
                lg:mb-10
                w-full sm:w-auto
              "
            >
              <button
                className="
                  border-2 border-yellow-300 bg-yellow-300
                  px-4 py-2
                  rounded-2xl
                  hover:bg-yellow-400
                  shadow-2xl
                  text-sm
                "
                onClick={handleFavoriteClick}
              >
                Add to Favorites
              </button>

              <button
                className="
                  border-2 border-white text-white
                  px-4 py-2
                  rounded-2xl
                  hover:bg-gray-700
                  shadow-2xl
                  text-sm
                "
                onClick={handleWatchTrailer}
              >
                Watch Trailer
              </button>
            </div>
          </div>
        </div>
        {/* ----------------------------------------------------------------------- */}

        {/* CAST SECTION */}
        <div className="mt-2">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1 h-px bg-gray-600/60" />
            <h2 className="text-xl font-semibold text-black whitespace-nowrap">
              Cast
            </h2>
            <div className="flex-1 h-px bg-gray-600/60" />
          </div>

          {castLoading && <CastSkeleton />}

          {!castLoading && cast.length === 0 && (
            <p className="text-center text-gray-500">No available cast info</p>
          )}

          {!castLoading && cast.length > 0 && <Cast cast={cast} />}
        </div>
        {/* director and production */}
        <div>
          <LoadProduction director={director} companies={companies} />
        </div>
        <div>
          <SimilarMovies similarMovies={similarMovies} />
        </div>
      </div>
    </>
  );
}

export default MovieDetails;
