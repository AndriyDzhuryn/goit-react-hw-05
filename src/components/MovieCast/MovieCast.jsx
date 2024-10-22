import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { fetchMovieSearchCredits } from '../../API/requests-api.js';

import css from './MovieCast.module.css';
import Loader from '../Loader/Loader.jsx';

const MovieCast = () => {
  const [movieCasts, setMovieCasts] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loader, setLoader] = useState(false);

  const { movieId } = useParams();

  const defaultImg =
    'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';

  useEffect(() => {
    const fetchMovieCast = async () => {
      try {
        setLoader(true);
        setErrorMessage(null);
        const results = await fetchMovieSearchCredits(movieId);
        setMovieCasts(results);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setLoader(false);
      }
    };
    fetchMovieCast();
  }, [movieId]);

  return (
    <div>
      {errorMessage && (
        <p className={css.error}>
          Whoops, something went wrong! Please try reloading this page! <br />
          <span>{errorMessage}</span>
        </p>
      )}

      {loader && <Loader />}

      <ul className={css.castList}>
        {movieCasts.map(cast => {
          return (
            <li className={css.castListItem} key={cast.id}>
              {
                <img
                  className={css.fotoActor}
                  src={
                    cast.profile_path
                      ? `https://image.tmdb.org/t/p/w500/${cast.profile_path}`
                      : defaultImg
                  }
                  alt="Foto"
                />
              }
              <h3 className={css.actorName}>{cast.name}</h3>
              {cast.character && (
                <p className={css.actorCharacter}>
                  Character: {cast.character}
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MovieCast;
