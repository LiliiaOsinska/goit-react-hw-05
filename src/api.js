import axios from "axios";

const API_KEY = "6398216b81a477742a8ea2afa48807d3";
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchHomePage = async (page) => {
  const { data } = await axios.get(`${BASE_URL}/trending/movie/day`, {
    params: {
      api_key: API_KEY,
      page: page,
    },
  });
  return data;
};

export const fetchMovieDetails = async (movieId) => {
  const { data } = await axios.get(`${BASE_URL}/movie/${movieId}`, {
    params: {
      api_key: API_KEY,
    },
  });
  return data;
};

export const fetchMoviesCast = async (movieId) => {
  const { data } = await axios.get(`${BASE_URL}/movie/${movieId}/credits`, {
    params: {
      api_key: API_KEY,
    },
  });
  return data.cast;
};

export const fetchMoviesReviews = async (movieId) => {
  const { data } = await axios.get(`${BASE_URL}/movie/${movieId}/reviews`, {
    params: {
      api_key: API_KEY,
    },
  });
  return data.results;
};

export const fetchMoviesPage = async (page, query) => {
  const { data } = await axios.get(`${BASE_URL}/search/movie`, {
    params: {
      api_key: API_KEY,
      page: page,
      query: query,
    },
  });
  return data.results;
};

// export const fetchMoviesPage = async (page) => {
//   const response = await axios.get(`${BASE_URL}/trending/movie/day`, {
//     params: {
//       api_key: API_KEY,
//       page: page,
//     },
//   });
//   return response.data;
// };
