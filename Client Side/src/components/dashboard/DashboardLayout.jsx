import { Outlet, NavLink, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Home, Menu, X, Sun, Moon } from "lucide-react";

const navLinks = [
  { to: "", label: "Overview" },
  { to: "all-items", label: "All Items" },
  { to: "add-item", label: "Add Item" },
  { to: "my-items", label: "My Items" },
];

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState(
    () =>
      localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div className="min-h-screen flex bg-zinc-50 dark:bg-[#18181b] transition-colors">
      {/* Sidebar */}
      <aside
        className={`
          fixed z-30 top-0 left-0 h-full w-64 bg-white dark:bg-[#101014] border-r border-zinc-200 dark:border-zinc-700
          flex flex-col px-6 py-8 gap-6
          transition-transform duration-200
          md:static md:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="flex items-center justify-between mb-8">
          <span className="font-bold text-2xl text-primary">Dashboard</span>
          <button
            className="md:hidden p-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="flex-1">
          <ul className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === ""}
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded font-medium transition
                    ${
                      isActive
                        ? "bg-primary text-white"
                        : "text-zinc-800 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    }`
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-8 flex flex-col gap-3">
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 px-4 py-2 rounded bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition"
          >
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </button>
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2 rounded bg-primary text-white hover:bg-primary/90 transition"
          >
            <Home className="w-5 h-5" /> Home
          </Link>
        </div>
      </aside>

      {/* Sidebar overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="flex-1 min-h-screen px-4 py-8 md:px-12 md:py-10 transition-colors">
        {/* Mobile sidebar toggle button */}
        <button
          className="md:hidden mb-6 p-2 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar"
        >
          <Menu className="w-6 h-6" />
        </button>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;