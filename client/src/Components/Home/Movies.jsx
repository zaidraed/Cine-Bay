import { useNowPlayingMovies } from "../../Hooks/useNowPlayingMovies";
import { MovieCard } from "./MovieCard";

const Movies = () => {
  const {
    data: movies,
    isLoading,
    isError,
    error,
    refetch,
  } = useNowPlayingMovies();

  if (isLoading) {
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

  if (isError) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">
          Error al cargar películas: {error.message}
        </p>
        <button
          onClick={() => refetch()}
          className="mt-4 px-4 py-2 bg-blue-600 rounded"
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (!Array.isArray(movies)) {
    return (
      <p className="text-center py-10">No hay películas en cartelera hoy</p>
    );
  }

  return (
    <section id="Cartelera" className="container mx-auto px-2">
      <h1 className="text-3xl font-bold text-center mb-8">
        Películas en Cartelera (Hoy)
      </h1>

      <div className="grid grid-cols-2 lg:grid-cols-3 justify-items-center gap-3 sm:gap-6 py-3 md:py-5 lg:px-20 lg:py-14">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
};

export default Movies;
