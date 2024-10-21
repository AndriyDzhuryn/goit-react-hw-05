import { Link, useLocation } from 'react-router-dom';

import css from './MovieList.module.css';

const MovieList = ({ movies }) => {
  const location = useLocation();
  return (
    <ul className={css.movieList}>
      {movies.map(movie => {
        return (
          <li key={movie.id} className={css.movieListItem}>
            <Link to={`/movies/${movie.id}`} state={location}>
              <div className={css.itemLinkWrapper}>
                {movie.backdrop_path && (
                  <img
                    className={css.imgMovie}
                    src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
                    alt=""
                  />
                )}
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
