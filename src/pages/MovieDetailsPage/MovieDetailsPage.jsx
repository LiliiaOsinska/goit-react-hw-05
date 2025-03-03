import clsx from "clsx";
import s from "../MovieDetailsPage/MovieDetailsPage.module.css";
import { NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { fetchMovieDetails } from "../../api";
import { Link } from "react-router-dom";
const buildLinkClass = ({ isActive }) => {
  return clsx(s.link, isActive && s.active);
};

const MovieDetailsPage = () => {
  // const params = useParams();
  const { movieId } = useParams();
  // console.log(params); id фільма
  const [movie, setMovie] = useState(null);
  const location = useLocation(); //фікуємо локацію
  // console.log(location); //витягуємо локацію
  const goBackUrl = useRef(location?.state ?? "/movies"); //зберігаємо локацію

  useEffect(() => {
    if (!movieId) return;
    const getDataDetails = async () => {
      try {
        const data = await fetchMovieDetails(movieId);
        // console.log(data); //витягнули значення потрібного фільма
        setMovie(data);
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
      }
    };
    getDataDetails();
  }, [movieId]);

  return (
    <>
      <div className={s.section}>
        <Link className={s.link} to={goBackUrl.current}>
          Go Back
        </Link>
        <div>
          {movie ? (
            <>
              <h1 className={s.details_title}>{movie.title}</h1>
              <div className={s.details_container}>
                <div>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                  />
                </div>
                <div className={s.details}>
                  <h2>{movie.release_date}</h2>
                  <h2>Vote average : {movie.vote_average}</h2>
                  <h2>Overview</h2>
                  <p>{movie.overview}</p>
                  <h2>Genres</h2>
                  <p>
                    {`${movie?.genres.map((gen) => {
                      return " " + gen.name;
                    })}`}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div>
          <nav className={s.nav_details}>
            <NavLink to="cast" className={buildLinkClass}>
              Cast
            </NavLink>
            <NavLink to="reviews" className={buildLinkClass}>
              Reviews
            </NavLink>
          </nav>
          <Outlet className={s.outlet} />
        </div>
      </div>
    </>
  );
};

export default MovieDetailsPage;
