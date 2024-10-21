import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ImSearch } from 'react-icons/im';

import MovieList from '../../components/MovieList/MovieList.jsx';

import { fetchMoviesSearch } from '../../API/requests-api.js';

import css from './MoviesPage.module.css';
import Loader from '../../components/Loader/Loader.jsx';

const Movies = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [foundMovies, setFoundMovies] = useState(null);
  const [loader, setLoader] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const searchWord = searchParams.get('searchTerm');

  useEffect(() => {
    const fetchSearch = async () => {
      if (searchWord === null) {
        return;
      }

      try {
        setLoader(true);
        setErrorMessage(null);
        const data = await fetchMoviesSearch(searchWord);
        setFoundMovies(data);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setLoader(false);
      }
    };
    fetchSearch();
  }, [searchWord]);

  const onHandleChange = e => {
    setSearchTerm(e.target.value);
  };

  const onHandleSubmit = e => {
    e.preventDefault();
    if (searchTerm === '') {
      return;
    }
    setSearchParams({ searchTerm });
  };

  return (
    <div className={css.searchMovieWrapper}>
      <form className={css.searchMovieForm} onSubmit={onHandleSubmit}>
        <input
          className={css.searchInput}
          type="text"
          name="searchMovie"
          value={searchTerm}
          onChange={onHandleChange}
        />
        <button className={css.searchBtn} type="submit">
          <ImSearch className={css.svgSearch} />
          Search
        </button>
      </form>

      {errorMessage && (
        <p className={css.error}>
          Whoops, something went wrong! Please try reloading this page! <br />
          <span>{errorMessage}</span>
        </p>
      )}

      {loader && <Loader />}

      {foundMovies && <MovieList movies={foundMovies} />}
    </div>
  );
};

export default Movies;
