import { Link } from "react-router-dom";
import s from "../MovieList/MovieList.module.css";

const MovieList = ({ movies }) => {
  const defaultImg =
    "https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster";

  return (
    <>
      <div>
        <ul className={s.gallery}>
          {movies.map((item, index) => (
            <li key={`${item.id}-${index}`}>
              <Link to={`/movies/${item.id}`}>
                <img
                  src={
                    item.poster_path
                      ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                      : defaultImg
                  }
                  alt={item.title}
                  width="300"
                  height="400"
                />
                {/* <h3>{item.title}</h3> */}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default MovieList;
