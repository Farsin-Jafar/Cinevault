import api from "./api";

export const discoverMovies = async (filters) => {
  const params = {
    sort_by: filters.sortBy,
    "vote_average.gte": filters.minRating,
    "vote_count.gte": filters.minVotes,
  };

  if (filters.genres.length) {
    params.with_genres = filters.genres.join(",");
  }

  if (filters.yearFrom) {
    params["primary_release_date.gte"] = `${filters.yearFrom}-01-01`;
  }

  if (filters.yearTo) {
    params["primary_release_date.lte"] = `${filters.yearTo}-12-31`;
  }

  const res = await api.get("/discover/movie", { params });
  return res.data.results;
};
