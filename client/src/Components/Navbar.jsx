import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Logo } from "./Logo";
import { Button } from "./ui/button";
import { Menu, X, User } from "lucide-react";
import useAuthStore from "../store/authStore";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const getFirstName = (fullName) => {
    return fullName?.split(" ")[0] || "Usuario";
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur">
      <nav className="container flex h-16 items-center justify-between px-4">
        <Link to="/">
          <Logo />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className="text-zinc-300 hover:text-blue-400 transition-colors"
          >
            Cartelera
          </Link>
          <Link
            to="/proximos"
            className="text-zinc-300 hover:text-blue-400 transition-colors"
          >
            Próximos
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <div className="hidden md:flex items-center gap-4">
              <span className="text-zinc-300">
                Hola, {getFirstName(user?.name)}
              </span>
              <Button
                variant="outline"
                className="border-blue-500 text-blue-500 hover:bg-blue-500/10"
                onClick={handleLogout}
              >
                Cerrar sesión
              </Button>
            </div>
          ) : (
            <Link to="/login" className="hidden md:block">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Ingresar
              </Button>
            </Link>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className="h-5 w-5 text-zinc-300" />
            ) : (
              <Menu className="h-5 w-5 text-zinc-300" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-16 left-0 right-0 bg-zinc-900 border-t border-zinc-800 p-4 space-y-4 md:hidden">
            <Link
              to="/"
              className="block text-zinc-300 hover:text-blue-400"
              onClick={() => setIsOpen(false)}
            >
              Cartelera
            </Link>
            <Link
              to="/proximos"
              className="block text-zinc-300 hover:text-blue-400"
              onClick={() => setIsOpen(false)}
            >
              Próximos
            </Link>
            <div className="pt-2 border-t border-zinc-800">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center gap-2 mb-4">
                    <User className="h-4 w-4 text-zinc-400" />
                    <span className="text-zinc-300">
                      {getFirstName(user?.name)}
                    </span>
                  </div>
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                  >
                    Cerrar sesión
                  </Button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="block"
                  onClick={() => setIsOpen(false)}
                >
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Ingresar
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
