import { motion } from "framer-motion";
import { Button } from "../ui/button";

export const Hero = () => {
  return (
    <section className="relative h-[70vh] bg-zinc-900 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/90 via-zinc-950/50 to-zinc-950/90 z-10" />

      <video
        autoPlay
        muted
        loop
        className="absolute inset-0 w-full h-full object-cover opacity-50"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container relative z-20 text-center px-4"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            CINE-BAY
          </span>{" "}
          Premium
        </h1>
        <p className="text-xl text-zinc-300 max-w-2xl mx-auto mb-8">
          Experiencia cinematográfica de primera clase con la mejor tecnología
        </p>
        <div className="flex gap-4 justify-center">
          <Button className="bg-blue-600 hover:bg-blue-700 px-8 py-6 text-lg">
            Ver Cartelera
          </Button>
          <Button
            variant="outline"
            className="border-blue-400 text-blue-400 hover:bg-blue-500/10 px-8 py-6 text-lg"
          >
            Próximos Estrenos
          </Button>
        </div>
      </motion.div>
    </section>
  );
};
