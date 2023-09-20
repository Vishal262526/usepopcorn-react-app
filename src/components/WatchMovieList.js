import WatchMovie from "./WatchMovie";

const WatchMovieList = ({ onDeleteWatchMovie, watchMovies }) => {
  return (
    <div className="watch-movie-list">
      {watchMovies.map((movie) => (
        <WatchMovie
          onDeleteWatchMovie={onDeleteWatchMovie}
          key={movie.imdbID}
          movie={movie}
        />
      ))}
    </div>
  );
};

export default WatchMovieList;
