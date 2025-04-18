import { motion } from "framer-motion";
import { CalendarRange } from "lucide-react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// Validación de la URL
const getValidImageUrl = (url) => {
  if (!url) return "/placeholder-movie.jpg";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${import.meta.env.VITE_BACKEND_URL}${url}`;
};

const UpcomingMoviesCard = ({ movie }) => {
  if (!movie) {
    return (
      <div className="w-[300px] h-[500px] bg-zinc-800 rounded-lg animate-pulse" />
    );
  }

  const {
    title = "Próximamente",
    imageUrl = "",
    releaseDate = new Date().toISOString(),
  } = movie;

  const image = getValidImageUrl(imageUrl);
  const formattedDate = new Date(releaseDate).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="group relative h-[500px] w-[300px] rounded-lg border border-zinc-800 bg-zinc-900 overflow-hidden transition-all hover:border-blue-500"
    >
      <Link to={`/movie/${encodeURIComponent(title)}`}>
        <div className="h-full w-full relative">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              e.target.src = "/placeholder-movie.jpg";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-xl font-bold text-white uppercase">{title}</h3>
            <div className="flex items-center gap-2 mt-4 text-zinc-300">
              <CalendarRange className="h-5 w-5 text-blue-400" />
              <span>{formattedDate}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

UpcomingMoviesCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    imageUrl: PropTypes.string,
    releaseDate: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date),
    ]),
  }),
};

UpcomingMoviesCard.defaultProps = {
  movie: null,
};

export default UpcomingMoviesCard;
