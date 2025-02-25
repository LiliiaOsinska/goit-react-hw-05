import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMoviesReviews } from "../../api";
import s from "../MovieReviews/MovieReviews.module.css";
const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (!movieId) return;
    const getMovieReviews = async () => {
      try {
        const review = await fetchMoviesReviews(movieId);
        // console.log(review);//витягуємо масивз рев'ю
        setReviews(review);
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
      }
    };
    getMovieReviews();
  }, [movieId]);
  return (
    <>
      <div className={s.section}>
        <div>
          <h2>Reviews :</h2>
          {reviews.length > 0 ? (
            <ul>
              {reviews.map((item) => (
                <li key={item.id}>
                  <h3>{item.author}</h3>
                  <p>{item.content}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No reviews</p>
          )}
        </div>
      </div>
    </>
  );
};

export default MovieReviews;
