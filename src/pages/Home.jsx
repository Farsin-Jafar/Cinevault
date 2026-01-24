import { useEffect, useState } from "react";
import { getPopularMovies, searchMovie } from "../services/movies";
import { FunnelIcon } from "@heroicons/react/24/outline";
import MovieCard from "../components/MovieCard";
import { useSearchParams } from "react-router-dom";
import LoadMovieSkeleton from "../skeleton/LoadMovieSkeleton";
import Filter from "../components/Filter";
import { discoverMovies } from "../services/filter";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [filters, setFilters] = useState(null);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const urlQuery = searchParams.get("search") || "";

  /* ----------------------------
     Sync input with URL
  -----------------------------*/
  useEffect(() => {
    setQuery(urlQuery);
  }, [urlQuery]);

  /* ----------------------------
     Fetch movies based on URL
  -----------------------------*/
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        if (!urlQuery.trim()) {
          const popular = await getPopularMovies();
          setMovies(popular);
        } else {
          const results = await searchMovie(urlQuery);
          setMovies(results);
        }
      } catch (err) {
        setError("Failed to load movies");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [urlQuery]);

  /* ----------------------------
     Handle typing (debounced)
  -----------------------------*/
  useEffect(() => {
    if (filters) return;
    const timeout = setTimeout(() => {
      if (query.trim()) {
        try {
          setLoading(true);
          setSearchParams({ search: query });
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      } else {
        setSearchParams({});
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [query]);

  /* ----------------------------
     Clear search
  -----------------------------*/
  const handleClear = () => {
    setQuery("");
    setSearchParams({});
    setFilters(null);
  };

  const isSearching = query.trim().length > 0;

  const handleApplyFilters = async (appliedFilters) => {
    setLoading(true);
    setIsFilterOpen(false);

    try {
      const results = await discoverMovies(appliedFilters);
      setMovies(results);
      setFilters(appliedFilters);
      setError(null);
    } catch (err) {
      setError("Failed to apply filters");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Search Bar */}
      <div className="relative mx-2 sm:w-1/2 sm:m-auto mt-3 sm:mt-2 flex items-center gap-2">
        {/* Search Input */}
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search for movies"
            className="text-sm w-full px-4 py-1.5 pr-20 border-2 border-gray-500 rounded-2xl focus:outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          {/* Clear / Search icon */}
          <button
            className="absolute right-10 top-1/2 -translate-y-1/2 cursor-pointer"
            onClick={handleClear}
            type="button"
          >
            {isSearching ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg>
            )}
          </button>
        </div>

        {/* Filter Button */}
        <button
          className="p-2 rounded-xl border-2 border-gray-500 hover:bg-gray-100 cursor-pointer"
          type="button"
          aria-label="Open filters"
          onClick={() => setIsFilterOpen(true)}
        >
          <FunnelIcon className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div>
          <LoadMovieSkeleton />
        </div>
      ) : error ? (
        <div className="text-2xl ml-5 mt-5">{error}</div>
      ) : movies.length === 0 && isSearching ? (
        <div className="text-2xl ml-5 mt-5">No movies found</div>
      ) : (
        <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
      {/* filter search */}
      {isFilterOpen && (
        <Filter
          onApply={handleApplyFilters}
          onClose={() => setIsFilterOpen(false)}
        />
      )}
    </>
  );
};

export default Home;
