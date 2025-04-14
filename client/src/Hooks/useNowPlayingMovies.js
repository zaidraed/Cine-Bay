import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../utils/fetchData";

export const useNowPlayingMovies = () => {
  return useQuery({
    queryKey: ["now-playing-movies"],
    queryFn: async () => {
      const response = await fetchData("/movies/now-playing", "GET");
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      return response.json();
    },
    staleTime: 1000 * 60 * 30, // 30 minutos
  });
};
