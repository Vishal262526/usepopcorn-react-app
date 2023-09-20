import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Logo from "./components/Logo";
import Search from "./components/Search";
import NumResult from "./components/NumResult";
import Box from "./components/Box";
import MovieList from "./components/MovieList";
import WatchMovieList from "./components/WatchMovieList";
import WatchMovieHeader from "./components/WatchMovieHeader";
import SelectedMovie from "./components/SelectedMovie";
import { useMovies } from "./hooks/useMovies";
import { useLocalStorageState } from "./hooks/useLocalStorageState";

function App() {
  const [query, setQuery] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const { movies, loaidng, error } = useMovies(query, handleCloseMovie);

  const [watchMovies, setWatchMovies] = useLocalStorageState([], "watchMovies");

  console.log(watchMovies);

  const handleSelectMovieId = (id) => {
    setSelectedMovieId(id);
  };

  const handleAddWatchMovie = (movie) => {
    setWatchMovies((prevMovies) => [...prevMovies, movie]);
    setSelectedMovieId(null);
  };

  function handleCloseMovie() {
    setSelectedMovieId(null);
  }

  const handleDeleteWatchMovie = (id) => {
    setWatchMovies((movies) => movies.filter((movie) => movie.imdbID !== id));
  };

  return (
    <div className="container">
      <Header>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResult numOfMovies={movies.length} />
      </Header>
      <Main>
        <Box>
          {loaidng && (
            <p style={{ color: "white", textAlign: "center" }}>Loading....</p>
          )}
          {error && (
            <p style={{ color: "white", textAlign: "center" }}>{error}</p>
          )}

          {!error && !loaidng && !movies.length && (
            <p style={{ color: "white", textAlign: "center" }}>
              Search your Favorite Movie
            </p>
          )}
          {!loaidng && !error && (
            <MovieList onMovieSelect={handleSelectMovieId} movies={movies} />
          )}
        </Box>
        <Box>
          {selectedMovieId ? (
            <SelectedMovie
              onCloseMovie={handleCloseMovie}
              onAddWatchMovie={handleAddWatchMovie}
              selectedMovieId={selectedMovieId}
              watchMovielist={watchMovies}
            />
          ) : (
            <>
              <WatchMovieHeader />
              <WatchMovieList
                onDeleteWatchMovie={handleDeleteWatchMovie}
                watchMovies={watchMovies}
              />
            </>
          )}
        </Box>
      </Main>
    </div>
  );
}

export default App;
