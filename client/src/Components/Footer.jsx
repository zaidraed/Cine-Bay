import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { Instagram, Twitter } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-900/50">
      <div className="container py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo />
            <p className="text-zinc-400">
              La mejor experiencia cinematográfica en tu ciudad.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-white">Explorar</h3>
            <nav className="space-y-2">
              <Link
                to="/"
                className="block text-zinc-400 hover:text-blue-400 transition-colors"
              >
                Cartelera
              </Link>
              <Link
                to="/proximos"
                className="block text-zinc-400 hover:text-blue-400 transition-colors"
              >
                Próximos estrenos
              </Link>
              <Link
                to="/promociones"
                className="block text-zinc-400 hover:text-blue-400 transition-colors"
              >
                Promociones
              </Link>
            </nav>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-white">Información</h3>
            <nav className="space-y-2">
              <Link
                to="/contacto"
                className="block text-zinc-400 hover:text-blue-400 transition-colors"
              >
                Contacto
              </Link>
              <Link
                to="/terminos"
                className="block text-zinc-400 hover:text-blue-400 transition-colors"
              >
                Términos
              </Link>
              <Link
                to="/privacidad"
                className="block text-zinc-400 hover:text-blue-400 transition-colors"
              >
                Privacidad
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Síguenos</h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-zinc-400 hover:text-blue-400 transition-colors"
              >
                <Twitter className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-zinc-400 hover:text-blue-400 transition-colors"
              >
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-800 mt-8 pt-8 text-center text-zinc-500 text-sm">
          <p>
            © {new Date().getFullYear()} CINE-BAY. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
