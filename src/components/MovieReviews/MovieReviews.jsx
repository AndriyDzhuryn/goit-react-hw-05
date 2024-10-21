import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { fetchMovieSearchReviews } from '../../API/requests-api.js';

import css from './MovieReviews.module.css';

const MovieReviews = () => {
  const [movieReviews, setMovieReviews] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const { movieId } = useParams();

  useEffect(() => {
    const fetchMovieCast = async () => {
      try {
        setErrorMessage(null);
        const results = await fetchMovieSearchReviews(movieId);
        setMovieReviews(results);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };
    fetchMovieCast();
  }, [movieId]);

  console.log(movieReviews);

  return (
    <div className={css.reviewsWrapper}>
      {movieReviews?.length > 0 &&
        movieReviews.map(review => {
          return (
            <div className={css.reviewWrapper} key={review.id}>
              <h3 className={css.reviewAuthor}>Author: {review.author}</h3>
              <p className={css.descriptionReview}>{review.content}</p>
            </div>
          );
        })}
      {movieReviews?.length === 0 && (
        <p className={css.notReviews}>
          We don&apos;t have any reviews for this movie!
        </p>
      )}
      {errorMessage && (
        <p className={css.error}>
          Whoops, something went wrong! Please try reloading this page! <br />
          <span>{errorMessage}</span>
        </p>
      )}
    </div>
  );
};

export default MovieReviews;
