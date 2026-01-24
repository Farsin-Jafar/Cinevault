import api from "./api";

export const getPopularMovies = async () => {
  const response = await api.get("/movie/popular");
  console.log(response.data.results);
  return response.data.results;
};

export const searchMovie = async (query) => {
  const response = await api.get("/search/movie", {
    params: {
      query,
    },
  });
  return response.data.results;
};
