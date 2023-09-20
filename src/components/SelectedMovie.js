import { useEffect, useRef, useState } from "react";
import StarRating from "./StarRating";
import WatchMovieList from "./WatchMovieList";
import { useKey } from "../hooks/useKey";

const SelectedMvoie = ({
  onCloseMovie,
  watchMovielist,
  selectedMovieId,
  onAddWatchMovie,
}) => {
  const [selectedMovie, setSelectedMovie] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [userRating, setUserRating] = useState(0);
  const countRef = useRef(0);

  useEffect(() => {
    if (userRating) countRef.current++;
  }, [setUserRating, userRating]);

  useKey("escape", onCloseMovie);

  const isWatched = watchMovielist
    .map((movie) => movie.imdbID)
    .includes(selectedMovieId);

  const watchUserRating = watchMovielist.find(
    (movie) => movie.imdbID === selectedMovieId
  )?.userRating;

  const {
    imdbID,
    Poster: poster,
    Title: title,
    Released: released,
    Runtime: runtime,
    Genre: genre,
    imdbRating,
  } = selectedMovie;

  /* eslint-disable*/
  // if (imdbRating > 8) [isTop, setIsTop] = useState(true);

  const handleAddWatchMovie = () => {
    const newWatchMovie = {
      imdbID,
      poster,
      title,
      imdbRating: Number(imdbRating),
      genre,
      runtime: runtime.split(" ").at(0),
      userRating,
      count: countRef.current,
    };
    onAddWatchMovie(newWatchMovie);
  };

  const handleSetRating = (rating) => {
    setUserRating(rating);
  };

  useEffect(() => {
    const fetchMoviesData = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=a0943622&i=${selectedMovieId}`
        );
        if (!res.ok) {
          throw new Error("Something went wrong");
        }
        const data = await res.json();
        setSelectedMovie(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMoviesData();
  }, [selectedMovieId]);

  useEffect(() => {
    console.log("Component is mounted");
    if (!title) {
      return;
    }
    document.title = `Movie : ${title}`;

    return () => {
      document.title = "usePopcorn";
      console.log(`Clean up Movie: ${title}`);
    };
  }, [title]);

  return (
    <>
      <div className="selected-movie">
        {error && (
          <p style={{ color: "white", textAlign: "center" }}> {error}</p>
        )}
        {loading && (
          <p
            style={{
              color: "white",
              textAlign: "center",
              padding: "20px",
            }}
          >
            Loading....
          </p>
        )}
        {!error && !loading && selectedMovie && (
          <>
            <div className="selected-movie-img">
              <img src={poster} alt="Movie Poster" />
            </div>
            <div className="selected-movie-detail">
              <p className="selected-movie-title">{title}</p>
              <p className="selected-movie-runtime">
                {released} - {runtime}
              </p>
              <p className="selected-movie-genre">{genre}</p>
              <p className="selected-movie-rating">⭐ {imdbRating}</p>
            </div>
          </>
        )}
      </div>

      <div className="selected-movie-footer">
        {!isWatched ? (
          <StarRating onSetRating={handleSetRating} maxRating={10} size={20} />
        ) : (
          <p style={{ color: "white" }}>
            You Already Rated this movie <span>⭐</span> {watchUserRating}
          </p>
        )}
        {userRating > 0 && (
          <button
            onClick={handleAddWatchMovie}
            className="add-to-watch-list-button"
          >
            Add to Watch List
          </button>
        )}
      </div>
    </>
  );
};

export default SelectedMvoie;
