import { Routes, Route } from "react-router-dom";
// import HomePage from "./pages/HomePage/HomePage.jsx";
// import MoviesPage from "./pages/MoviesPage/MoviesPage.jsx";
// import MovieDetailsPage from "./pages/MovieDetailsPage/MovieDetailsPage.jsx";
// import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.jsx";
import Navigation from "./components/Navigation/Navigation.jsx";
// import MovieCast from "./components/MovieCast/MovieCast.jsx";
// import MovieReviews from "./components/MovieReviews/MovieReviews.jsx";
import { lazy } from "react";
import { Suspense } from "react";

//оптимізація
const HomePage = lazy(() => import("./pages/HomePage/HomePage.jsx"));
const MoviesPage = lazy(() => import("./pages/MoviesPage/MoviesPage.jsx"));
const MovieDetailsPage = lazy(() =>
  import("./pages/MovieDetailsPage/MovieDetailsPage.jsx")
);
const NotFoundPage = lazy(() =>
  import("./pages/NotFoundPage/NotFoundPage.jsx")
);
const MovieCast = lazy(() => import("./components/MovieCast/MovieCast.jsx"));
const MovieReviews = lazy(() =>
  import("./components/MovieReviews/MovieReviews.jsx")
);

const App = () => {
  return (
    <main>
      <Navigation />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </main>
  );
};

export default App;
