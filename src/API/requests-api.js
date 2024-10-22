import axios from 'axios';

const tokenTMDB =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMWNiZTcwODE1MWY2MjZhMjAzNWI0YjYzYzM5ZDJlYiIsIm5iZiI6MTcyOTE3MzQxNi4wMzI1OTgsInN1YiI6IjY3MTExMjdkNmY3NzA3YWY0MGZhYTEzOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zwCJESOjGF91lc-txyGK6lS_SakrcdvAANQrmDlzfTI';

const movieInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${tokenTMDB}`,
  },
  params: {
    language: 'en-US',
  },
});

export const fetchMoviesTrending = async () => {
  const { data } = await movieInstance.get('/trending/movie/day');
  return data.results;
};

export const fetchMoviesSearch = async (searchWord, page) => {
  const options = {
    params: { query: `${searchWord}`, include_adult: false, page: page },
  };
  const { data } = await movieInstance.get('/search/movie', options);
  return data;
};

//
export const fetchMovieDetails = async id => {
  const { data } = await movieInstance.get(`/movie/${id}`);
  return data;
};
//

export const fetchMovieSearchCredits = async id => {
  const { data } = await movieInstance.get(`/movie/${id}/credits`);
  return data.cast;
};

export const fetchMovieSearchReviews = async id => {
  const { data } = await movieInstance.get(`/movie/${id}/reviews`);
  return data.results;
};
