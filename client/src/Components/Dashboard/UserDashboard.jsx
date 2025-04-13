import { useEffect } from "react";
import { motion } from "framer-motion";
import Movies from "../../Components/Home/Movies";
import UpcomingMovies from "../../Components/Home/UpcomingMovies";
import { Navbar } from "../../Components/Navbar";
import { Footer } from "../../Components/Footer";

export const UserDashboard = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Navbar />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <section className="py-12 px-4">
          <h1 className="text-3xl font-bold text-center mb-6">
            🎬 Bienvenido al Panel del Usuario
          </h1>
          <Movies />
        </section>

        <section className="py-12 px-4 bg-zinc-900/50">
          <UpcomingMovies />
        </section>
      </motion.main>

      <Footer />
    </div>
  );
};

export default UserDashboard;
