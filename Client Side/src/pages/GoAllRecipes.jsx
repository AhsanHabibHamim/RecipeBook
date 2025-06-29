import React from "react";
import { Link } from "react-router-dom";

const GoAllRecipes = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <h1 className="text-2xl font-bold mb-4">Explore All The Recipes</h1>
      <p className="mb-6 text-gray-700 dark:text-gray-300 text-center max-w-md">
        Discover a wide variety of delicious recipes from different cuisines. Click
        below to browse all available recipes and find your next favorite dish!
      </p>
      <Link
        to="/recipes"
        className="btn btn-primary px-6 py-3 text-lg font-semibold rounded shadow hover:bg-primary/90 transition-colors"
      >
        See All Recipes
      </Link>
    </div>
  );
};

export default GoAllRecipes;
