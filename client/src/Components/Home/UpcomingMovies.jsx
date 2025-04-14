import useEmblaCarousel from "embla-carousel-react";
import { useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import UpcomingMoviesCard from "./UpcomingMoviesCard";
import { useUpcomingMovies } from "../../Hooks/useUpcomingMovies";

const UpcomingMovies = () => {
  const { data: upcomingMovies, isLoading, isError } = useUpcomingMovies();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    dragFree: true,
  });

  useEffect(() => {
    if (!emblaApi || !upcomingMovies) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 6000);
    return () => clearInterval(interval);
  }, [emblaApi, upcomingMovies]);

  if (isLoading) {
    return (
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">
          Próximos Estrenos
        </h2>
        <div className="flex gap-6 overflow-hidden">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[300px] h-[500px] bg-zinc-800 rounded-lg animate-pulse"
            />
          ))}
        </div>
      </section>
    );
  }

  if (isError || !upcomingMovies) {
    return (
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">
          Próximos Estrenos
        </h2>
        <p className="text-center text-red-400">
          Error al cargar próximos estrenos
        </p>
      </section>
    );
  }

  return (
    <section
      id="proximosEstrenos"
      className="container mx-auto px-4 py-12 bg-zinc-900/50"
    >
      <h2 className="text-3xl font-bold text-center mb-8 text-white">
        Próximos Estrenos
      </h2>

      <div className="relative max-w-7xl mx-auto">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {upcomingMovies.map((movie) => (
              <div key={movie.id} className="flex-shrink-0 w-[300px]">
                <UpcomingMoviesCard movie={movie} />
              </div>
            ))}
          </div>
        </div>

        <button
          className="absolute top-1/2 left-4 -translate-y-1/2 bg-zinc-800/80 hover:bg-zinc-700/80 p-2 rounded-full z-10 transition-colors"
          onClick={() => emblaApi?.scrollPrev()}
        >
          <ChevronLeft className="text-white size-6" />
        </button>

        <button
          className="absolute top-1/2 right-4 -translate-y-1/2 bg-zinc-800/80 hover:bg-zinc-700/80 p-2 rounded-full z-10 transition-colors"
          onClick={() => emblaApi?.scrollNext()}
        >
          <ChevronRight className="text-white size-6" />
        </button>
      </div>
    </section>
  );
};

export default UpcomingMovies;
