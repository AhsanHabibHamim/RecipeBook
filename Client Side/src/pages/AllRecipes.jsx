import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import RecipeCard from "@/components/recipes/RecipeCard";
import { useTitle } from "@/hooks/useTitle";
import { Reveal } from "react-awesome-reveal";

const AllRecipes = () => {
  useTitle("RecipeBook - All Recipes");

  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const cuisineQueryParam = queryParams.get("cuisine") || "";

  const [selectedCuisine, setSelectedCuisine] = useState(cuisineQueryParam);

  // ✅ Fetch Recipes
  const {
    data: recipes = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["recipes", selectedCuisine],
    queryFn: () => api.recipes.getAll(selectedCuisine),
  });

  // ✅ Update URL and State together
  const handleCuisineChange = (newCuisine) => {
    setSelectedCuisine(newCuisine);
    const searchParams = new URLSearchParams(location.search);

    if (newCuisine) {
      searchParams.set("cuisine", newCuisine);
    } else {
      searchParams.delete("cuisine");
    }

    navigate({ search: searchParams.toString() });
  };

  // ✅ Keep state in sync with URL if user uses browser navigation
  useEffect(() => {
    const newQueryCuisine =
      new URLSearchParams(location.search).get("cuisine") || "";
    setSelectedCuisine(newQueryCuisine);
  }, [location.search]);

  const cuisines = [
    { label: "All Cuisines", value: "" },
    { label: "Italian", value: "Italian" },
    { label: "Mexican", value: "Mexican" },
    { label: "Indian", value: "Indian" },
    { label: "Chinese", value: "Chinese" },
    { label: "Japanese", value: "Japanese" },
    { label: "Thai", value: "Thai" },
    { label: "French", value: "French" },
    { label: "American", value: "American" },
    { label: "Mediterranean", value: "Mediterranean" },
    { label: "Greek", value: "Greek" },
    { label: "Spanish", value: "Spanish" },
    { label: "Korean", value: "Korean" },
    { label: "Vietnamese", value: "Vietnamese" },
  ];

  if (isLoading) {
    return (
      <div className="container-custom py-12">
        <h1 className="text-3xl font-bold mb-6">All Recipes</h1>
        <div className="w-48 h-10 bg-muted rounded animate-pulse mb-6"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="recipe-card animate-pulse">
              <div className="h-48 bg-muted rounded-t-lg"></div>
              <div className="p-4 space-y-2">
                <div className="h-6 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded w-1/3"></div>
                <div className="h-4 bg-muted rounded"></div>
                <div className="h-10 bg-muted rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-custom py-12">
        <h1 className="text-3xl font-bold mb-6">All Recipes</h1>
        <div className="bg-destructive/20 p-4 rounded-md text-destructive">
          Error loading recipes. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-12">
      <Reveal triggerOnce>
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-6">All Recipes</h1>

          {/* Cuisine Filter UI */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <label htmlFor="cuisine-filter" className="font-medium">
              Filter by Cuisine:
            </label>
            <select
              id="cuisine-filter"
              value={selectedCuisine}
              onChange={(e) => handleCuisineChange(e.target.value)}
              className="bg-background border border-input rounded-md p-2"
            >
              {cuisines.map((cuisine) => (
                <option key={cuisine.label} value={cuisine.value}>
                  {cuisine.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Recipes Display */}
        {recipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground mb-2">
              No recipes found.
            </p>
            <p className="text-muted-foreground">
              {selectedCuisine
                ? `Try selecting a different cuisine or add a new ${selectedCuisine} recipe.`
                : "Be the first to add a recipe!"}
            </p>
          </div>
        )}
      </Reveal>
    </div>
  );
};

export default AllRecipes;
