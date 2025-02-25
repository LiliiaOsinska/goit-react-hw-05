import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMoviesCast } from "../../api";
import s from "../MovieCast/MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const defaultImg =
    "https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster";
  const [casts, setCasts] = useState([]);

  useEffect(() => {
    if (!movieId) return;
    const getMovieCast = async () => {
      try {
        const cast = await fetchMoviesCast(movieId);
        // console.log(cast); //витягуємо масив з фото
        setCasts(cast);
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
      }
    };
    getMovieCast();
  }, [movieId]);
  return (
    <>
      <div className={s.section}>
        <div>
          <h2>Actors:</h2>
          <ul className={s.actors_gallery}>
            {casts.map((item) => (
              <li key={item.cast_id}>
                <img
                  src={
                    item.profile_path
                      ? `https://image.tmdb.org/t/p/w500/${item.profile_path}`
                      : defaultImg
                  }
                  alt={item.name}
                  width="300"
                  height="400"
                />
                <h3>{item.name}</h3>
                <p></p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default MovieCast;
