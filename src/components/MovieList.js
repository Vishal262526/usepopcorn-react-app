import Movie from "./Movie";

const MovieList = ({ onMovieSelect, movies }) => {
  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <Movie
          key={movie.imdbID}
          onClick={() => onMovieSelect(movie.imdbID)}
          imgUrl={movie.Poster}
          name={movie.Title}
          description={movie.Year}
        />
      ))}
    </div>
  );
};

export default MovieList;
