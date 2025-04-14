import { useEffect } from "react";
import { useMovies, useUpcomingMovies } from "../Hooks/useMovies";
import useEmblaCarousel from "embla-carousel-react";
import {
  ChevronLeft,
  ChevronRight,
  Info,
  MapPin,
  Phone,
  Star,
  Ticket,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "../Components/ui/utils";
import PropTypes from "prop-types";

// Componente para mostrar información de una película sin opción de compra
const SimplifiedMovieCard = ({ movie }) => {
  if (!movie) {
    return (
      <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 h-full animate-pulse">
        <div className="aspect-[2/3] bg-zinc-800 rounded-lg" />
        <div className="p-4">
          <div className="h-6 w-3/4 bg-zinc-700 rounded mb-2" />
          <div className="h-4 w-1/2 bg-zinc-700 rounded" />
        </div>
      </div>
    );
  }

  const ratingMap = {
    G: "A",
    PG: "A",
    "PG-13": "B",
    R: "C",
    "NC-17": "D",
  };

  const {
    title = "Título no disponible",
    imageUrl = "/placeholder-movie.jpg",
    classification = "G",
    releaseDate = new Date().toISOString(),
    duration = "120",
    genre = "Sin género",
    format = ["2D"],
  } = movie;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group relative overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 transition-all hover:border-blue-500"
    >
      <div className="aspect-[2/3] overflow-hidden relative">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            e.target.src = "/placeholder-movie.jpg";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent" />

        <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
          {ratingMap[classification] || "A"}
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold text-white truncate">{title}</h3>

        <div className="flex flex-wrap gap-2 mt-3 text-zinc-400 text-sm">
          <div className="flex items-center gap-1">
            <span>
              {new Date(releaseDate).toLocaleDateString("es-ES", {
                day: "numeric",
                month: "short",
              })}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span>{duration} min</span>
          </div>
          <div className="flex items-center gap-1">
            <span>{genre}</span>
          </div>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <div className="flex gap-1">
            {format.map((f, i) => (
              <span
                key={i}
                className="text-xs bg-zinc-800 text-blue-400 px-2 py-1 rounded"
              >
                {f}
              </span>
            ))}
          </div>

          <button className="text-blue-400 hover:text-blue-300 flex items-center gap-1 text-sm">
            <Info className="h-4 w-4" />
            <span>Detalles</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
SimplifiedMovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string,
    imageUrl: PropTypes.string, // Add this line
    classification: PropTypes.string,
    releaseDate: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date),
    ]),
    duration: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    genre: PropTypes.string,
    format: PropTypes.arrayOf(PropTypes.string),
  }),
};

SimplifiedMovieCard.defaultProps = {
  movie: {
    imageUrl: "/placeholder-movie.jpg", // Add this line
  },
};

// Componente para próximos estrenos

const UpcomingMoviesCard = ({ movie }) => {
  if (!movie) return null;

  const {
    title = "Próximamente",
    imageUrl = "/placeholder-movie.jpg",
    releaseDate = new Date().toISOString(),
  } = movie;

  const formattedDate = new Date(releaseDate).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 h-full">
      <div className="aspect-[2/3] overflow-hidden relative">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover"
          loading="lazy"
          onError={(e) => {
            e.target.src = "/placeholder-movie.jpg";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <p className="mt-2 text-blue-400 font-medium">
            Estreno: {formattedDate}
          </p>
        </div>
      </div>
    </div>
  );
};

// Hero promocional para la landing
UpcomingMoviesCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string,
    imageUrl: PropTypes.string,
    releaseDate: PropTypes.string, // Add this line
  }),
};
const HeroSection = () => {
  return (
    <div className="relative h-[70vh] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-cinema.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/70 via-zinc-950/50 to-zinc-950" />
      </div>

      <div className="container relative z-10 h-full flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            La mejor experiencia cinematográfica
          </h1>
          <p className="text-lg md:text-xl text-zinc-300 mb-8">
            Disfruta de las últimas películas en nuestras salas con la mejor
            tecnología y comodidad
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/login"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Iniciar Sesión
            </Link>
            <Link
              to="/register"
              className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Registrarse
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Componente para promociones
const PromotionsSection = () => {
  const promotions = [
    {
      id: 1,
      title: "2x1 en entradas los Martes",
      description:
        "Disfruta de cualquier película con un acompañante pagando solo una entrada todos los martes.",
      icon: <Ticket className="h-8 w-8" />,
      color: "bg-blue-600",
    },
    {
      id: 2,
      title: "Descuento para Estudiantes",
      description:
        "Presenta tu carnet estudiantil y obtén un 25% de descuento en cualquier función.",
      icon: <Users className="h-8 w-8" />,
      color: "bg-purple-600",
    },
    {
      id: 3,
      title: "Combo Familiar",
      description:
        "Entradas para 4 personas + palomitas y refrescos con un 20% de descuento.",
      icon: <Star className="h-8 w-8" />,
      color: "bg-amber-600",
    },
  ];

  return (
    <section className="py-16 bg-zinc-900/50">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-10 text-white">
          Promociones Especiales
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {promotions.map((promo) => (
            <motion.div
              key={promo.id}
              whileHover={{ y: -5 }}
              className="bg-zinc-800 p-6 rounded-lg border border-zinc-700"
            >
              <div className={cn("p-3 rounded-full w-fit mb-4", promo.color)}>
                {promo.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {promo.title}
              </h3>
              <p className="text-zinc-400">{promo.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Componente para información del cine
const CinemaInfoSection = () => {
  return (
    <section className="py-16">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-10 text-white">
          Nuestro Cine
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <img
              src="/cinema-interior.jpg"
              alt="Interior del cine"
              className="rounded-lg shadow-lg w-full h-auto object-cover"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/800x500?text=Cinema+Interior";
              }}
            />
          </div>

          <div className="flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              La mejor experiencia audiovisual
            </h3>
            <p className="text-zinc-400 mb-6">
              Contamos con la última tecnología en proyección digital y sonido
              envolvente para que disfrutes de una experiencia cinematográfica
              inigualable.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="text-blue-500 h-6 w-6 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-white">Ubicación</h4>
                  <p className="text-zinc-400">Av. Principal 123, Ciudad</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="text-blue-500 h-6 w-6 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-white">Contacto</h4>
                  <p className="text-zinc-400">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  to="/login"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors inline-flex items-center gap-2"
                >
                  <Ticket className="h-5 w-5" />
                  <span>Acceder para comprar entradas</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Componente principal de la landing
const Landing = () => {
  const movies = useMovies();
  const { data: upcomingMovies, isLoading: upcomingLoading } =
    useUpcomingMovies();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    dragFree: true,
  });

  // Añade el efecto para el carrusel de próximos estrenos
  useEffect(() => {
    if (!emblaApi || !upcomingMovies) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 6000);
    return () => clearInterval(interval);
  }, [emblaApi, upcomingMovies]);

  // Renderizado de películas en cartelera
  const renderCurrentMovies = () => {
    if (movies.isLoading) {
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
        </div>
      );
    }

    if (!Array.isArray(movies.data)) {
      return <p>No se encontraron películas.</p>;
    }

    return (
      <div className="grid grid-cols-2 lg:grid-cols-3 justify-items-center gap-3 sm:gap-6 py-3 md:py-5">
        {movies.data.map((movie) => (
          <SimplifiedMovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    );
  };

  // Renderizado de próximos estrenos
  const renderUpcomingMovies = () => {
    if (upcomingLoading) {
      return (
        <div className="flex gap-6 overflow-hidden">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[300px] h-[500px] bg-zinc-800 rounded-lg animate-pulse"
            />
          ))}
        </div>
      );
    }

    if (!upcomingMovies) {
      return (
        <p className="text-center text-red-400">
          Error al cargar próximos estrenos
        </p>
      );
    }

    return (
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
    );
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <HeroSection />

      <section id="Cartelera" className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">
          Películas en Cartelera
        </h2>
        {renderCurrentMovies()}
      </section>

      <PromotionsSection />

      <section
        id="proximosEstrenos"
        className="container mx-auto px-4 py-16 bg-zinc-900/50"
      >
        <h2 className="text-3xl font-bold text-center mb-8">
          Próximos Estrenos
        </h2>
        {renderUpcomingMovies()}
      </section>

      <CinemaInfoSection />

      <footer className="bg-zinc-900 py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <img src="/Logo.png" alt="Cine Logo" className="h-12 w-auto" />
            </div>
            <div className="flex flex-col md:flex-row gap-8">
              <Link to="/login" className="text-zinc-400 hover:text-white">
                Iniciar Sesión
              </Link>
              <Link to="/register" className="text-zinc-400 hover:text-white">
                Registrarse
              </Link>
              <a href="#Cartelera" className="text-zinc-400 hover:text-white">
                Cartelera
              </a>
              <a
                href="#proximosEstrenos"
                className="text-zinc-400 hover:text-white"
              >
                Próximos Estrenos
              </a>
            </div>
          </div>
          <div className="mt-8 text-center text-zinc-500 text-sm">
            <p>
              © {new Date().getFullYear()} CinePlex. Todos los derechos
              reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
