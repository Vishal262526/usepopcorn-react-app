const Movie = ({ onClick, imgUrl, name, description }) => {
  return (
    <div onClick={onClick} className="movie">
      <div className="movie-img">
        <img src={imgUrl} alt="Movie" />
      </div>
      <div className="movie-detail">
        <p className="movie-name">{name}</p>
        <p className="movie-description">{description}</p>
      </div>
    </div>
  );
};

export default Movie;
