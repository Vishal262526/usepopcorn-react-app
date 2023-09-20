const NumResult = ({ numOfMovies }) => {
  return (
    <nav className="menu">
      <p>
        Found <strong>{numOfMovies}</strong> Result
      </p>
    </nav>
  );
};

export default NumResult;
