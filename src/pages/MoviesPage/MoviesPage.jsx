import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ImSearch } from 'react-icons/im';

import MovieList from '../../components/MovieList/MovieList.jsx';

import { fetchMoviesSearch } from '../../API/requests-api.js';

import css from './MoviesPage.module.css';
import Loader from '../../components/Loader/Loader.jsx';
import { MdExpandMore } from 'react-icons/md';
import ScrollToTop from 'react-scroll-up';

const Movies = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [foundMovies, setFoundMovies] = useState([]);
  const [loader, setLoader] = useState(false);
  const [pages, setPages] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();

  const searchWord = searchParams.get('query');

  useEffect(() => {
    const fetchSearch = async () => {
      if (searchWord === null) {
        return;
      }
      try {
        setLoader(true);
        setErrorMessage(null);
        const data = await fetchMoviesSearch(searchWord, 1);
        setFoundMovies(data.results);
        setTotalPages(data.total_pages);
        setPages(2);
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
    setSearchTerm('');
    setSearchParams({ query: searchTerm });
  };

  const handleClick = async () => {
    try {
      setLoader(true);
      setErrorMessage(null);
      setPages(pages + 1);
      const data = await fetchMoviesSearch(searchWord, pages);
      setFoundMovies([...foundMovies, ...data.results]);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoader(false);
    }
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

      {errorMessage === null && <MovieList movies={foundMovies} />}

      {loader && <Loader />}

      {pages < totalPages && errorMessage === null && (
        <div className={css.btnLoadMoreWrapper}>
          <button
            className={css.btnLoadMore}
            type="submit"
            onClick={handleClick}
          >
            <MdExpandMore className={css.iconLoadMore} />
            Load more
          </button>
        </div>
      )}

      <ScrollToTop showUnder={160}>
        <span className={css.up}>UP</span>
      </ScrollToTop>
    </div>
  );
};

export default Movies;
