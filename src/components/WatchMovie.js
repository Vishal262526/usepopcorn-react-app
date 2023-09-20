const WatchMovie = ({ onDeleteWatchMovie, movie }) => {
  return (
    <div
      onClick={() => onDeleteWatchMovie(movie.imdbID)}
      className="watch-movie"
    >
      <div className="watch-movie-img">
        <img src={movie.poster} alt="Movie Poster" />
      </div>
      <div className="watch-movie-detail">
        <div className="watch-movie-name">
          <p>{movie.title}</p>
        </div>
        <div className="watch-movie-description">
          <p>⭐ {movie.imdbRating}</p>
          <p>☀️ {movie.userRating}</p>
          <p>{movie.runtime} Min</p>
        </div>
      </div>
    </div>
  );
};

export default WatchMovie;
