import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../utils/fetchData";

// Hook personalizado para películas que se estrenan próximamente
export const useUpcomingMovies = () => {
  return useQuery({
    queryKey: ["upcoming-movies"],
    queryFn: async () => {
      const response = await fetchData("/movies", "GET");
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      const allMovies = await response.json();

      const now = new Date();

      const upcoming = allMovies.filter((movie) => {
        const release = new Date(movie.releaseDate);
        return release > now;
      });

      return upcoming;
    },
    staleTime: 1000 * 60 * 60, // 1 hora
  });
};
