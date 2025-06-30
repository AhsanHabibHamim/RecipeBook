import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import Layout from "./components/layout/Layout";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Import pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AllRecipes from "./pages/AllRecipes";
import AddRecipe from "./pages/AddRecipe";
import NotFound from "./pages/NotFound";
import RecipeDetail from "./pages/RecipeDetail";
import MyRecipe from "./pages/MyRecipe";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import DashboardLayout from "./components/dashboard/DashboardLayout";
import DashboardOverview from "./pages/dashboard/DashboardOverview";
import AllItems from "./pages/dashboard/AllItems";
import AddItem from "./pages/dashboard/AddItem";
import MyItems from "./pages/dashboard/MyItems";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ToastContainer />
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="recipes" element={<AllRecipes />} />
              
              {/* Protected routes */}
              <Route path="add-recipe" element={
                <ProtectedRoute>
                  <AddRecipe />
                </ProtectedRoute>
              } />
              <Route path="my-recipes" element={
                <ProtectedRoute>
                  <MyRecipe />
                </ProtectedRoute>
              } />
              <Route path="recipes/:id" element={
                <ProtectedRoute>
                  <RecipeDetail />
                </ProtectedRoute>
              } />
            </Route>

            {/* Dashboard Private Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }>
              <Route index element={<DashboardOverview />} />
              <Route path="all-items" element={<AllItems />} />
              <Route path="add-item" element={<AddItem />} />
              <Route path="my-items" element={<MyItems />} />
            </Route>

            {/* 404 page - no layout */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
