import { Suspense, useEffect, useRef, useState } from 'react';
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io';

import { fetchMovieDetails } from '../../API/requests-api.js';

import css from './MovieDetailsPage.module.css';
import Loader from '../../components/Loader/Loader.jsx';
import ScrollToTop from 'react-scroll-up';

const MovieDetailsPage = () => {
  const [movieDetails, setMovieDetails] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loader, setLoader] = useState(false);

  const { movieId } = useParams();

  const navigate = useNavigate();

  const location = useLocation();
  const backLink = useRef(location.state ?? '/movies');

  const goBack = () => {
    navigate(backLink.current);
  };

  const defaultImg =
    'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoader(true);
        setErrorMessage(null);
        const results = await fetchMovieDetails(movieId);
        setMovieDetails(results);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setLoader(false);
      }
    };
    fetchMovie();
  }, [movieId]);

  return (
    <div className={css.movieWrapper}>
      <div className={css.btnGoBackWrapper}>
        <button type="submit" onClick={goBack}>
          <IoMdArrowRoundBack />
          Go back
        </button>
      </div>

      {errorMessage && (
        <p className={css.error}>
          Whoops, something went wrong! Please try reloading this page! <br />
          <span>{errorMessage}</span>
        </p>
      )}

      {loader && <Loader />}

      <div className={css.dataMovieWrapper}>
        <img
          className={css.movieImg}
          src={
            movieDetails.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`
              : defaultImg
          }
          width={500}
          alt={movieDetails.title}
        />
        <div className={css.descriptionMovieWrapper}>
          <h2 className={css.title}>{movieDetails.title}</h2>
          <p className={css.descriptionPopulation}>
            Rating: {movieDetails.vote_average}
          </p>
          <p className={css.overvewTitle}>Overview</p>
          <p className={css.descriptionOvervew}>{movieDetails.overview}</p>
          {movieDetails.genres?.length !== 0 && (
            <p className={css.genresTitle}>Genres</p>
          )}
          <div className={css.genresWrapper}>
            {movieDetails.genres?.map(genre => {
              return (
                <p key={genre.id} className={css.genre}>
                  {genre.name}
                </p>
              );
            })}
          </div>
        </div>
      </div>

      <div className={css.edditionalInformationWrapper}>
        <p className={css.edditionalInformationTitle}>Edditional information</p>

        <ul className={css.edditionalInformationList}>
          <li className={css.edditionalInformationListItem}>
            <Link to="cast" state={{ from: backLink.current.from }}>
              Cast
            </Link>
          </li>
          <li className={css.edditionalInformationListItem}>
            <Link to="reviews" state={{ from: backLink.current.from }}>
              Reviews
            </Link>
          </li>
        </ul>

        <Suspense fallback={<div>Loading subpage...</div>}>
          <Outlet />
        </Suspense>
      </div>

      <ScrollToTop showUnder={160}>
        <span className={css.up}>UP</span>
      </ScrollToTop>
    </div>
  );
};

export default MovieDetailsPage;
