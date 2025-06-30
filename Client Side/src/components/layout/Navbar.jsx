import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sun, Moon, Menu, X } from "lucide-react";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useAuthState } from "@/hooks/useAuthState";
import { toast } from "react-toastify";

const Navbar = ({ theme, setTheme }) => {
  const { user, loading } = useAuthState();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("recipe-theme", newTheme);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("You have successfully logged out.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      navigate("/");
    } catch (error) {
      toast.error(`Failed to logout: ${error.message}`, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container-custom flex h-16 items-center justify-between">
        {/* Left Logo */}
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
            <span className="text-primary text-2xl">🍲</span>
            <span className="font-heading font-bold text-xl">RecipeBook</span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 items-center">
          <Link
            to="/"
            className="font-medium hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link
            to="/recipes"
            className="font-medium hover:text-primary transition-colors"
          >
            All Recipes
          </Link>
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="font-medium hover:text-primary transition-colors"
              >
                Dashboard
              </Link>
              <Link
                to="/add-recipe"
                className="font-medium hover:text-primary transition-colors"
              >
                Add Recipe
              </Link>
              <Link
                to="/my-recipes"
                className="font-medium hover:text-primary transition-colors"
              >
                My Recipes
              </Link>
              <div className="relative">
                <button
                  className="ml-2 rounded-full border-2 border-primary w-9 h-9 flex items-center justify-center overflow-hidden"
                  onClick={() => setAvatarOpen((v) => !v)}
                  aria-label="User menu"
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="avatar"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-lg">
                      {user.displayName?.[0] || "U"}
                    </span>
                  )}
                </button>

                {avatarOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 shadow-lg rounded-lg py-2 z-50">
                    <div className="px-4 py-2 font-semibold border-b dark:border-gray-700">
                      {user.displayName || "User"}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-red-600 dark:text-red-400"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-primary">
                Login
              </Link>
              <Link to="/register" className="btn-secondary ml-2">
                Register
              </Link>
            </>
          )}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-muted transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </nav>

        {/* Mobile Nav Trigger */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-muted transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={toggleMenu}
            className="p-2 rounded-full hover:bg-muted transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-16 z-50 bg-background md:hidden animate-fade-in">
          <nav className="flex flex-col p-4">
            <Link
              to="/"
              className="p-4 text-center font-medium hover:bg-muted rounded-md"
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link
              to="/recipes"
              className="p-4 text-center font-medium hover:bg-muted rounded-md"
              onClick={closeMenu}
            >
              All Recipes
            </Link>
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="p-4 text-center font-medium hover:bg-muted rounded-md"
                  onClick={closeMenu}
                >
                  Dashboard
                </Link>
                <Link
                  to="/add-recipe"
                  className="p-4 text-center font-medium hover:bg-muted rounded-md"
                  onClick={closeMenu}
                >
                  Add Recipe
                </Link>
                <Link
                  to="/my-recipes"
                  className="p-4 text-center font-medium hover:bg-muted rounded-md"
                  onClick={closeMenu}
                >
                  My Recipes
                </Link>
                <div className="flex flex-col items-center mt-2">
                  <button
                    className="rounded-full border-2 border-primary w-12 h-12 flex items-center justify-center overflow-hidden mb-2"
                    onClick={() => setAvatarOpen((v) => !v)}
                    aria-label="User menu"
                  >
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="avatar"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-lg">
                        {user.displayName?.[0] || "U"}
                      </span>
                    )}
                  </button>
                  {avatarOpen && (
                    <div className="w-full bg-white dark:bg-gray-900 shadow-lg rounded-lg py-2 z-50">
                      <div className="px-4 py-2 font-semibold border-b dark:border-gray-700">
                        {user.displayName || "User"}
                      </div>
                      <button
                        onClick={() => {
                          handleLogout();
                          closeMenu();
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-red-600 dark:text-red-400"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="m-4 btn-primary"
                  onClick={closeMenu}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="m-4 btn-secondary"
                  onClick={closeMenu}
                >
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
