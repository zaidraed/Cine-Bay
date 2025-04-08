import { motion } from "framer-motion";
import { Hero } from "../../Components/Home/Hero";
import Movies from "../../Components/Home/Movies";
import UpcomingMovies from "../../Components/Home/UpcomingMovies";
import { Footer } from "../../Components/Footer";
import { Navbar } from "../../Components/Navbar";

export const Home = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Navbar />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Hero />

        <section className="py-12">
          <Movies />
        </section>

        <section className="py-12 bg-zinc-900/50">
          <UpcomingMovies />
        </section>
      </motion.main>

      <Footer />
    </div>
  );
};
