import { useEffect, useState } from "react";
import { fetchMoviesPage } from "../../api";
import Loader from "../../components/Loader/Loader.jsx";
import toast from "react-hot-toast";
import MovieList from "../../components/MovieList/MovieList";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import s from "../MoviesPage/MoviesPage.module.css";
import { useSearchParams } from "react-router-dom";
// import toast from "react-hot-toast";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams(); // використовуємо useSearchParams для роботи з
  const query = searchParams.get("query") || ""; //зчитуємо query з URL

  useEffect(() => {
    if (!query) return;

    const getDataMovies = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const results = await fetchMoviesPage(page, query);
        // console.log(results); //витягує масив по запиту з інпута
        setMovies((prev) => (page === 1 ? results : [...prev, ...results]));
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getDataMovies();
  }, [page, query]);

  const handleSetQuery = (value) => {
    searchParams.set("query", value);
    setSearchParams(searchParams);
    setMovies([]); // при новому запиті видаляє дані старого
    setPage(1); // починає новий запит з 1 стр.
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) {
      toast.error("Please enter the text to search!");
      return;
    }
    handleSetQuery(value);
    setValue(""); // Очищення поля після пошуку
  };

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };
  // useEffect(() => {
  //   setValue(query);
  // }, [query]);

  return (
    <>
      <div className={s.section}>
        <div className={s.input_container}>
          <form onSubmit={handleSubmit}>
            <input
              onChange={(e) => setValue(e.target.value)}
              type="text"
              value={value}
              className={s.input}
              placeholder="Search movies"
              aria-label="Search input"
            />
            <button className={s.btn} type="submit">
              Search
            </button>
          </form>
        </div>
        <MovieList movies={movies} />
        {isLoading && <Loader />}
        {isError && <ErrorMessage />}
        {movies.length > 0 && !isLoading && (
          <button
            className={s.load_btn}
            onClick={loadMore}
            disabled={isLoading}
          >
            Load More
          </button>
        )}
      </div>
    </>
  );
};

export default MoviesPage;
