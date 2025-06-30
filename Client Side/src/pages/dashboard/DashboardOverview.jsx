import { useQuery } from "@tanstack/react-query";
import { User, ListChecks, Home, Sun, Moon } from "lucide-react";
import { useAuthState } from "@/hooks/useAuthState";
import { API_BASE_URL } from "@/lib/api";
import { useState } from "react";
import { Link } from "react-router-dom";

// Stats fetcher
const fetchStats = async (userId) => {
  try {
    const totalRes = await fetch(`${API_BASE_URL}/recipes/count`);
    const totalText = await totalRes.text();
    if (totalRes.status === 304) return null;
    let total;
    try {
      total = JSON.parse(totalText);
    } catch {
      throw new Error("Total Items API did not return JSON");
    }

    let my = { count: 0 };
    if (userId) {
      const myRes = await fetch(`${API_BASE_URL}/recipes/my/count?userId=${userId}`);
      const myText = await myRes.text();
      if (myRes.status === 304) return null;
      try {
        my = JSON.parse(myText);
      } catch {
        throw new Error("My Items API did not return JSON");
      }
    }
    return { total: total.count, my: my.count };
  } catch (err) {
    throw err;
  }
};

// User info fetcher
const fetchUser = async (user) => {
  try {
    if (!user) return null;
    const params = new URLSearchParams({
      name: user.displayName || user.name || "",
      email: user.email || "",
      uid: user.uid || "",
    });
    const res = await fetch(`${API_BASE_URL}/auth/me?${params.toString()}`);
    const userText = await res.text();
    if (res.status === 304) return null;
    let data;
    try {
      data = JSON.parse(userText);
    } catch {
      throw new Error("User Info API did not return JSON");
    }
    return data;
  } catch (err) {
    throw err;
  }
};

const Sidebar = ({ theme, toggleTheme }) => (
  <aside
    className={`
      w-full md:w-56 px-4 py-8 flex flex-row md:flex-col gap-6 border-b md:border-b-0 md:border-r
      ${theme === "dark"
        ? "bg-[#101014] border-zinc-700 text-zinc-100"
        : "bg-white border-zinc-200 text-zinc-900"}
      fixed md:static top-0 left-0 z-20 md:z-auto
      md:min-h-screen
    `}
    style={{ minHeight: "unset" }}
  >
    <div className="flex items-center gap-2 mb-0 md:mb-8">
      <User className="w-7 h-7 text-primary" />
      <span className="font-bold text-xl">RecipeBook</span>
    </div>
    <nav className="flex flex-row md:flex-col gap-3 flex-1">
      <Link to="/dashboard" className="hover:text-primary font-medium flex items-center gap-2">
        <ListChecks className="w-5 h-5" /> Overview
      </Link>
      <Link to="/my-recipes" className="hover:text-primary font-medium flex items-center gap-2">
        <ListChecks className="w-5 h-5" /> My Recipes
      </Link>
      {/* Add more sidebar links here if needed */}
    </nav>
   
  </aside>
);

const DashboardOverview = () => {
  const { user, loading } = useAuthState();

  // Stats Query
  const {
    data: stats,
    isLoading: statsLoading,
    error: statsError,
  } = useQuery({
    queryKey: ["stats", user?.uid],
    queryFn: () => fetchStats(user?.uid),
    enabled: !!user?.uid,
  });

  // User Info Query
  const {
    data: userInfo,
    isLoading: userLoading,
    error: userError,
  } = useQuery({
    queryKey: ["user", user?.email, user?.uid],
    queryFn: () => fetchUser(user),
    enabled: !!user?.email && !!user?.uid,
    staleTime: 5 * 60 * 1000,
  });

  // Loading state for auth
  if (loading || !user) {
    return (
      <main className="flex-1 flex items-center justify-center bg-zinc-50 dark:bg-[#18181b] min-h-screen">
        <div className="text-center text-lg text-muted-foreground dark:text-zinc-400">Loading...</div>
      </main>
    );
  }

  return (
    <main className="flex-1 bg-zinc-50 dark:bg-[#18181b] transition-colors min-h-screen">
      <div className="max-w-4xl mx-auto py-8 px-2 sm:px-4">
        <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-zinc-900 dark:text-zinc-100">Dashboard Overview</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          {/* Total Items Card */}
          <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-5 sm:p-6 shadow flex flex-col items-center">
            <ListChecks className="w-9 h-9 sm:w-10 sm:h-10 text-blue-500 mb-2" />
            <h3 className="text-base sm:text-lg font-semibold mb-2 text-blue-800 dark:text-blue-200">Total Items</h3>
            {statsLoading ? (
              <div className="h-8 w-20 bg-blue-200 dark:bg-blue-800 rounded animate-pulse" />
            ) : statsError ? (
              <span className="text-red-500">Error: {statsError.message}</span>
            ) : !stats ? (
              <span className="text-muted-foreground dark:text-zinc-400">No data</span>
            ) : (
              <p className="text-3xl sm:text-4xl font-bold text-blue-900 dark:text-blue-100">{stats.total ?? 0}</p>
            )}
          </div>
          {/* My Items Card */}
          <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-lg p-5 sm:p-6 shadow flex flex-col items-center">
            <ListChecks className="w-9 h-9 sm:w-10 sm:h-10 text-yellow-500 mb-2" />
            <h3 className="text-base sm:text-lg font-semibold mb-2 text-yellow-800 dark:text-yellow-200">My Items</h3>
            {statsLoading ? (
              <div className="h-8 w-20 bg-yellow-200 dark:bg-yellow-800 rounded animate-pulse" />
            ) : statsError ? (
              <span className="text-red-500">Error: {statsError.message}</span>
            ) : !stats ? (
              <span className="text-muted-foreground dark:text-zinc-400">No data</span>
            ) : (
              <p className="text-3xl sm:text-4xl font-bold text-yellow-900 dark:text-yellow-100">{stats.my ?? 0}</p>
            )}
          </div>
        </div>
        {/* User Info Card */}
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-5 sm:p-6 max-w-md mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <User className="w-7 h-7 text-primary" />
            <h2 className="text-lg sm:text-xl font-semibold text-zinc-900 dark:text-zinc-100">Logged-in User</h2>
          </div>
          {userLoading ? (
            <div className="space-y-2">
              <div className="h-5 w-32 bg-muted dark:bg-zinc-800 rounded animate-pulse" />
              <div className="h-5 w-48 bg-muted dark:bg-zinc-800 rounded animate-pulse" />
            </div>
          ) : userError ? (
            <p className="text-red-500">Failed to load user info: {userError.message}</p>
          ) : userInfo ? (
            <ul className="space-y-1">
              <li>
                <span className="font-medium text-zinc-900 dark:text-zinc-100">Name:</span>{" "}
                <span className="text-zinc-800 dark:text-zinc-200">
                  {userInfo.name || <span className="text-muted-foreground dark:text-zinc-400">N/A</span>}
                </span>
              </li>
              <li>
                <span className="font-medium text-zinc-900 dark:text-zinc-100">Email:</span>{" "}
                <span className="text-zinc-800 dark:text-zinc-200">
                  {userInfo.email || <span className="text-muted-foreground dark:text-zinc-400">N/A</span>}
                </span>
              </li>
            </ul>
          ) : (
            <p className="text-muted-foreground dark:text-zinc-400">No user info found.</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default DashboardOverview;