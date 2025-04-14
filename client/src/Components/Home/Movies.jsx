import { useEffect, useState } from "react";
import { useMovies, useScreenings } from "../../Hooks/useMovies";
import { MovieCard } from "./MovieCard";

const Movies = () => {
  const movies = useMovies();
  const screenings = useScreenings(); // No se pasa ningún screeningId
  const [moviesWithTimes, setMoviesWithTimes] = useState([]);

  useEffect(() => {
    if (movies.data && screenings.data) {
      // Procesar las películas y sus horarios
      const processedMovies = movies.data.map((movie) => {
        // Filtrar las funciones para esta película
        const movieScreenings = screenings.data.filter(
          (screening) => screening.movieId === movie.id
        );

        // Obtener la fecha actual para filtrar solo horarios futuros
        const now = new Date();

        // Filtrar solo horarios futuros y formatearlos
        const formattedTimes = movieScreenings
          .filter((screening) => {
            const screeningDate = new Date(screening.schedule);
            return screeningDate > now;
          })
          .map((screening) => {
            const screeningDate = new Date(screening.schedule);
            return screeningDate.toLocaleTimeString("es-ES", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            });
          })
          // Ordenar los horarios
          .sort();

        // Devolver la película con sus horarios formateados
        return {
          ...movie,
          formattedTimes,
        };
      });

      setMoviesWithTimes(processedMovies);
    }
  }, [movies.data, screenings.data]);

  if (movies.isLoading || screenings.isLoading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-[400px] bg-zinc-800 rounded-lg animate-pulse"
          />
        ))}
      </div>
    );
  }
  if (movies.isError) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">
          Error al cargar películas: {movies.error.message}
        </p>
        <button
          onClick={() => movies.refetch()}
          className="mt-4 px-4 py-2 bg-blue-600 rounded"
        >
          Reintentar
        </button>
      </div>
    );
  }
  if (screenings.isError) return <p>Error al cargar los horarios</p>;

  if (!Array.isArray(movies.data)) {
    return <p>No se encontraron películas.</p>;
  }

  return (
    <section id="Cartelera" className="container mx-auto px-2">
      <h1 className="text-center">Películas en Cartelera</h1>

      <div className="grid grid-cols-2 lg:grid-cols-3 justify-items-center gap-3 sm:gap-6 py-3 md:py-5 lg:px-20 lg:py-14">
        {moviesWithTimes.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie} // Pasa el objeto completo
          />
        ))}
      </div>
    </section>
  );
};

export default Movies;
