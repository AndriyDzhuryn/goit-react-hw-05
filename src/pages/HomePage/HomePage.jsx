import { useEffect, useState } from 'react';

import MovieList from '../../components/MovieList/MovieList.jsx';
import Loader from '../../components/Loader/Loader.jsx';

import { fetchMoviesTrending } from '../../API/requests-api.js';

import css from './HomePage.module.css';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoader(true);
        setErrorMessage(null);
        const data = await fetchMoviesTrending();

        setMovies(data);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setLoader(false);
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
      {loader && <Loader />}
      <MovieList movies={movies} />
    </main>
  );
};

export default Home;
