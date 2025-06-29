import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useAuthState } from "./../hooks/useAuthState";
import { toast } from "sonner";
import Swal from "sweetalert2"; // <-- Add this

const MyRecipe = () => {
  const { user } = useAuthState();
  const queryClient = useQueryClient();
  const [editingRecipe, setEditingRecipe] = useState(null);

  // Fetch all recipes for this user
  const { data, isLoading } = useQuery({
    queryKey: ["my-recipes", user?.uid || user?._id],
    queryFn: () => api.recipes.getByUser(user?.uid || user?._id),
    enabled: !!user,
  });

  const recipes = Array.isArray(data) ? data : [];

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: ({ id, userId }) => api.recipes.delete(id, userId),
    onSuccess: () => {
      queryClient.invalidateQueries(["my-recipes", user?.uid || user?._id]);
      toast("Recipe deleted!");
    },
    onError: () => toast("Failed to delete recipe."),
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => api.recipes.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["my-recipes", user?.uid || user?._id]);
      setEditingRecipe(null);
      toast("Recipe updated!");
    },
    onError: () => toast("Failed to update recipe."),
  });

  // Delete handler with confirmation
  const handleDelete = async (recipe) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      deleteMutation.mutate({
        id: recipe._id,
        userId: user.uid || user._id,
      });
      Swal.fire({
        title: "Deleted!",
        text: "Your recipe has been deleted.",
        icon: "success",
      });
    }
  };

  // Update handler with confirmation
  const handleUpdate = (recipe) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to update this recipe?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setEditingRecipe(recipe);
      }
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (!isLoading && !Array.isArray(data)) {
    return (
      <div className="text-red-500 dark:text-red-400">
        Failed to load recipes.
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        My Recipes
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.length === 0 && (
          <div className="text-gray-700 dark:text-gray-300">No recipes found.</div>
        )}
        {recipes.map((recipe) => (
          <div
            key={recipe._id}
            className="bg-white dark:bg-gray-800 rounded shadow p-4 text-gray-900 dark:text-gray-100"
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-40 object-cover rounded mb-2"
            />
            <h3 className="text-xl font-semibold">{recipe.title}</h3>
            <div>
              <b>Cuisine:</b> {recipe.cuisine}
            </div>
            <div>
              <b>Preparation Time:</b> {recipe.preparationTime} min
            </div>
            <div>
              <b>Categories:</b>{" "}
              {Array.isArray(recipe.categories)
                ? recipe.categories.join(", ")
                : recipe.categories}
            </div>
            <div>
              <b>Likes:</b> {recipe.likes}
            </div>
            <div className="mb-2">
              <b>Ingredients:</b>
              <ul className="list-disc pl-5">
                {Array.isArray(recipe.ingredients)
                  ? recipe.ingredients.map((i, idx) => <li key={idx}>{i}</li>)
                  : recipe.ingredients}
              </ul>
            </div>
            <div className="mb-2">
              <b>Instructions:</b>
              <ol className="list-decimal pl-5">
                {Array.isArray(recipe.instructions)
                  ? recipe.instructions.map((i, idx) => <li key={idx}>{i}</li>)
                  : recipe.instructions}
              </ol>
            </div>
            <div className="flex gap-2 mt-2">
              <button
                className="btn btn-secondary"
                onClick={() => handleUpdate(recipe)}
              >
                Update
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => handleDelete(recipe)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Update Modal */}
      {editingRecipe && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-xl p-8 border border-gray-200 dark:border-gray-800 relative">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-2xl"
              onClick={() => setEditingRecipe(null)}
              aria-label="Close"
              type="button"
            >
              &times;
            </button>
            <h3 className="text-2xl font-bold mb-6 text-center text-primary">
              Update Recipe
            </h3>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const result = await Swal.fire({
                  title: "Are you sure?",
                  text: "Do you want to update this recipe?",
                  icon: "question",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, update it!",
                });
                if (!result.isConfirmed) return;

                const formData = new FormData(e.target);
                const updated = Object.fromEntries(formData.entries());
                updated.userId = user.uid || user._id;

                // Parse fields into arrays
                updated.categories = updated.categories
                  .split(",")
                  .map((s) => s.trim());
                updated.ingredients = updated.ingredients
                  .split("\n")
                  .map((s) => s.trim());
                updated.instructions = updated.instructions
                  .split("\n")
                  .map((s) => s.trim());

                if (updated._id) delete updated._id;

                updateMutation.mutate({ id: editingRecipe._id, data: updated });
                Swal.fire({
                  title: "Updated!",
                  text: "Your recipe has been updated.",
                  icon: "success",
                });
              }}
              className="space-y-4"
            >
              <div>
                <label
                  className="block mb-1 font-medium"
                  htmlFor="title"
                >
                  Title
                </label>
                <input
                  id="title"
                  name="title"
                  defaultValue={editingRecipe.title}
                  className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  required
                />
              </div>
              <div>
                <label
                  className="block mb-1 font-medium"
                  htmlFor="image"
                >
                  Image URL
                </label>
                <input
                  id="image"
                  name="image"
                  defaultValue={editingRecipe.image}
                  className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  required
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label
                    className="block mb-1 font-medium"
                    htmlFor="cuisine"
                  >
                    Cuisine
                  </label>
                  <input
                    id="cuisine"
                    name="cuisine"
                    defaultValue={editingRecipe.cuisine}
                    className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label
                    className="block mb-1 font-medium"
                    htmlFor="preparationTime"
                  >
                    Prep Time (min)
                  </label>
                  <input
                    id="preparationTime"
                    name="preparationTime"
                    type="number"
                    min="1"
                    defaultValue={editingRecipe.preparationTime}
                    className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  className="block mb-1 font-medium"
                  htmlFor="categories"
                >
                  Categories (comma separated)
                </label>
                <input
                  id="categories"
                  name="categories"
                  defaultValue={
                    Array.isArray(editingRecipe.categories)
                      ? editingRecipe.categories.join(",")
                      : editingRecipe.categories
                  }
                  className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  required
                />
              </div>
              <div>
                <label
                  className="block mb-1 font-medium"
                  htmlFor="ingredients"
                >
                  Ingredients (one per line)
                </label>
                <textarea
                  id="ingredients"
                  name="ingredients"
                  defaultValue={
                    Array.isArray(editingRecipe.ingredients)
                      ? editingRecipe.ingredients.join("\n")
                      : editingRecipe.ingredients
                  }
                  className="textarea textarea-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  rows={3}
                  required
                />
              </div>
              <div>
                <label
                  className="block mb-1 font-medium"
                  htmlFor="instructions"
                >
                  Instructions (one per line)
                </label>
                <textarea
                  id="instructions"
                  name="instructions"
                  defaultValue={
                    Array.isArray(editingRecipe.instructions)
                      ? editingRecipe.instructions.join("\n")
                      : editingRecipe.instructions
                  }
                  className="textarea textarea-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  rows={3}
                  required
                />
              </div>
              <div className="flex gap-2 mt-4 justify-end">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={updateMutation.isLoading}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setEditingRecipe(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyRecipe;
