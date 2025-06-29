import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { useAuthState } from "./../hooks/useAuthState";

const RecipeDetail = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { user } = useAuthState();

  const {
    data: recipe,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["recipe", id],
    queryFn: () => api.recipes.getById(id),
    enabled: !!id,
  });

  const likeMutation = useMutation({
    mutationFn: () => api.recipes.like(id, user.uid || user._id),
    onSuccess: () => {
      queryClient.invalidateQueries(["recipe", id]);
      toast("Recipe liked!");
    },
    onError: (err) => {
      toast(err?.message || "Could not like the recipe.");
    },
  });

  if (isLoading) {
    return <div className="container-custom py-12 text-center">Loading...</div>;
  }

  if (error || !recipe) {
    return (
      <div className="container-custom py-12 text-center text-red-500 dark:text-red-400">
        Recipe not found.
      </div>
    );
  }

  const isOwner =
    user && (user._id === recipe.userId || user.id === recipe.userId);

  const hasLiked =
    Array.isArray(recipe.likedBy) &&
    user &&
    recipe.likedBy.includes(user.uid || user._id);

  return (
    <div className="container-custom py-12 max-w-2xl mx-auto">
      <div className="mb-4 text-lg font-semibold text-center text-gray-800 dark:text-gray-100">
        {(recipe.likes ?? 0)} people interested in this recipe
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-64 object-cover rounded mb-4"
        />
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">{recipe.title}</h1>
        <div className="mb-2 text-gray-600 dark:text-gray-300">
          <span className="font-semibold">Cuisine:</span> {recipe.cuisine}
        </div>
        <div className="mb-2 text-gray-600 dark:text-gray-300">
          <span className="font-semibold">Preparation Time:</span>{" "}
          {recipe.preparationTime} min
        </div>
        <div className="mb-2 text-gray-600 dark:text-gray-300">
          <span className="font-semibold">Categories:</span>{" "}
          {Array.isArray(recipe.categories)
            ? recipe.categories.join(", ")
            : recipe.categories}
        </div>
        <div className="mb-4 text-gray-600 dark:text-gray-300">
          <span className="font-semibold">Ingredients:</span>
          <ul className="list-disc pl-5">
            {Array.isArray(recipe.ingredients)
              ? recipe.ingredients.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))
              : recipe.ingredients}
          </ul>
        </div>
        <div className="mb-4 text-gray-600 dark:text-gray-300">
          <span className="font-semibold">Instructions:</span>
          <ol className="list-decimal pl-5">
            {Array.isArray(recipe.instructions)
              ? recipe.instructions.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))
              : recipe.instructions}
          </ol>
        </div>
        <button
          className={`btn btn-primary w-full ${
            isOwner ? "btn-disabled opacity-60" : ""
          }`}
          onClick={() => likeMutation.mutate()}
          disabled={isOwner || likeMutation.isLoading}
        >
          {isOwner
            ? "You can't like your own recipe"
            : "Like"}
        </button>
      </div>
    </div>
  );
};

export default RecipeDetail;
