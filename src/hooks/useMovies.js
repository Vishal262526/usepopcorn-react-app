import { useState, useEffect } from "react";

const api_key = "a0943622";

const useMovies = (query) => {
  const [movies, setMovies] = useState([]);
  const [loaidng, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const fetchMoviesData = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${api_key}&s=${query}`,
          { signal: controller.signal }
        );
        if (!res.ok) {
          throw new Error("Something went wrong");
        }

        const data = await res.json();
        if (data.Response === "False") {
          throw new Error(data.Error);
        }
        setMovies(data.Search);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    if (query.length < 3) {
      setMovies([]);
      setError("");
      setLoading(false);
      return;
    }
    // handleCloseMovie();
    fetchMoviesData();

    return () => controller.abort();
  }, [query]);

  return { movies, loaidng, error };
};

export { useMovies };
