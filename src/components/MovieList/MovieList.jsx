import { Link, useLocation } from 'react-router-dom';

import css from './MovieList.module.css';

const MovieList = ({ movies }) => {
  const location = useLocation();

  const defaultImg =
    'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';

  return (
    <ul className={css.movieList}>
      {movies.map(movie => {
        return (
          <li key={movie.id} className={css.movieListItem}>
            <Link to={`/movies/${movie.id}`} state={location}>
              <div className={css.itemLinkWrapper}>
                <img
                  className={css.imgMovie}
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                      : defaultImg
                  }
                  width={500}
                  alt="poster"
                />

                <h2 className={css.titleMovie}>{movie.title}</h2>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default MovieList;
