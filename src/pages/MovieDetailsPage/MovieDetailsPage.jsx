import { Suspense, useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io';

import { fetchMovieDetails } from '../../API/requests-api.js';

import css from './MovieDetailsPage.module.css';
import Loader from '../../components/Loader/Loader.jsx';

const MovieDetailsPage = () => {
  const [movieDetails, setMovieDetails] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loader, setLoader] = useState(false);

  const { movieId } = useParams();

  const location = useLocation();
  const backLinkHref = location.state ?? '/movies';

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
        <Link to={backLinkHref}>
          <IoMdArrowRoundBack />
          Go back
        </Link>
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
          src={`https://image.tmdb.org/t/p/w500/${movieDetails.backdrop_path}`}
          alt={movieDetails.title}
        />
        <div className={css.descriptionMovieWrapper}>
          <h2 className={css.title}>{movieDetails.title}</h2>
          <p className={css.descriptionPopulation}>
            Popularity: {movieDetails.popularity}
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
            <Link to="cast" state={backLinkHref}>
              Cast
            </Link>
          </li>
          <li className={css.edditionalInformationListItem}>
            <Link to="reviews" state={backLinkHref}>
              Reviews
            </Link>
          </li>
        </ul>

        <Suspense fallback={<div>Loading subpage...</div>}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
