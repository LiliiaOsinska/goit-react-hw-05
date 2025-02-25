import { useState } from "react";
import { useEffect } from "react";
import { fetchHomePage } from "../../api.js";
import MovieList from "../../components/MovieList/MovieList.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import s from "../HomePage/HomePage.module.css";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const { results } = await fetchHomePage(page);
        setMovies((prev) => [...prev, ...results]);
        console.log(results); //повертається запит масив об'єктів
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [page]);

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <>
      <div className={s.section}>
        <div>
          <h1>Trending Movies</h1>
          <MovieList movies={movies} />
          {isLoading && <Loader />}
          <button
            className={s.load_btn}
            onClick={loadMore}
            disabled={isLoading}
          >
            Load More
          </button>
        </div>
      </div>
    </>
  );
};

export default HomePage;
