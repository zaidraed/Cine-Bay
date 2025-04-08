import { motion } from "framer-motion";
import { CalendarRange, Clock, Film, Ticket } from "lucide-react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export const MovieCard = ({ movie }) => {
  // Validación inicial del objeto movie
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

  // Valores por defecto para propiedades críticas
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
      <Link to={`/movie/${encodeURIComponent(title)}`}>
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
              <CalendarRange className="h-4 w-4 text-blue-400" />
              <span>
                {new Date(releaseDate).toLocaleDateString("es-ES", {
                  day: "numeric",
                  month: "short",
                })}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-blue-400" />
              <span>{duration} min</span>
            </div>
            <div className="flex items-center gap-1">
              <Film className="h-4 w-4 text-blue-400" />
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
              <Ticket className="h-4 w-4" />
              <span>Horarios</span>
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    imageUrl: PropTypes.string,
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

MovieCard.defaultProps = {
  movie: null,
};
