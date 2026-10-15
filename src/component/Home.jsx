import { useEffect, useState } from "react";

const API_URL = "https://backendusingprisma.onrender.com/api/movie";


function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(API_URL, {
          method: "GET",
          credentials: "include",
        });
        console.log(response);

        const text = await response.text();

        let data;
        try {
          data = JSON.parse(text);
        } catch {
          throw new Error(`Invalid API response: ${text}`);
        }

        if (!response.ok) {
          throw new Error(
            data.message || `Request failed: ${response.status}`
          );
        }

        const movieList = Array.isArray(data)
          ? data
          : data.movies;

        if (!Array.isArray(movieList)) {
          throw new Error("API did not return a movie array.");
        }

        setMovies(movieList);
      } catch (err) {
        console.error("Movie fetch error:", err);
        setError(err.message || "Unable to fetch movies.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <p>Loading movies...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Movies</h1>

      {movies.length === 0 ? (
        <p>No movies found.</p>
      ) : (
        movies.map((movie, index) => (
          <div key={movie.id ?? `${movie.title}-${index}`}>
            <h2>{movie.title}</h2>
            <p>{movie.overview}</p>
            <p>Release Year: {movie.releaseYear}</p>
            <p>
              Genres: {Array.isArray(movie.genres)
                ? movie.genres.join(", ")
                : movie.genres ?? "N/A"}
            </p>
            <p>Runtime: {movie.runtime ?? "N/A"} minutes</p>

            {movie.posterUrl && (
              <img
                src={movie.posterUrl}
                alt={`${movie.title} poster`}
                width="150"
              />
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Home;