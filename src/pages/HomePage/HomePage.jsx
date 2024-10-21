import { useEffect, useState } from 'react';

import MovieList from '../../components/MovieList/MovieList.jsx';

import { fetchMoviesTrending } from '../../API/requests-api.js';

import css from './HomePage.module.css';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setErrorMessage(null);
        const data = await fetchMoviesTrending();

        setMovies(data);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };
    fetchMovies();
  }, []);

  return (
    <main>
      <h1 className={css.title}>Trending today movies</h1>
      {errorMessage && (
        <p className={css.error}>
          Whoops, something went wrong! Please try reloading this page! <br />
          <span>{errorMessage}</span>
        </p>
      )}
      <MovieList movies={movies} />
    </main>
  );
};

export default Home;
