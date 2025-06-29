// API utility functions for making requests to the backend
const API_BASE_URL ="https://recipe-ahsan-habib-hamims-projects.vercel.app/api";

/**
 * Gets the current user's authentication token
 * @returns {Promise<string|null>} The token or null if not available
 */
const getAuthToken = async () => {
  if (!window.firebase?.auth) return null;

  const currentUser = window.firebase.auth().currentUser;
  if (!currentUser) return null;

  try {
    return await currentUser.getIdToken(true);
  } catch (error) {
    console.error("Error getting auth token:", error);
    return null;
  }
};

/**
 * API utility object with methods for different endpoints
 */
export const api = {
  recipes: {
    /**
     * Get all recipes
     * @returns {Promise} Promise object representing the recipes
     */
    getAll: async (cuisine = "") => {
      try {
        const query = cuisine ? `?cuisine=${encodeURIComponent(cuisine)}` : "";
        const response = await fetch(`${API_BASE_URL}/recipes${query}`);
        if (!response.ok) throw new Error("Failed to fetch recipes");
        return await response.json();
      } catch (error) {
        console.error("API error:", error);
        return { error: error.message };
      }
    },

    /**
     * Get a single recipe by ID
     * @param {string} id - Recipe ID
     * @returns {Promise} Promise object representing the recipe
     */
    getById: async (id) => {
      try {
        const response = await fetch(`${API_BASE_URL}/recipes/${id}`);
        if (!response.ok) throw new Error("Failed to fetch recipe");
        return await response.json();
      } catch (error) {
        console.error("API error:", error);
        return { error: error.message };
      }
    },

    /**
     * Create a new recipe
     * @param {Object} recipeData - Recipe data object
     * @param {string} token - User authentication token
     * @returns {Promise} Promise object representing the created recipe
     */
    create: async (recipeData, token) => {
      try {
        if (!token) {
          const currentToken = await getAuthToken();
          if (!currentToken) throw new Error("User not authenticated");
          token = currentToken;
        }

        console.log(
          "Creating recipe with token:",
          token ? "Token present" : "No token"
        );

        const response = await fetch(`${API_BASE_URL}/recipes`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(recipeData),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || "Failed to create recipe");
        }

        return await response.json();
      } catch (error) {
        console.error("API error:", error);
        throw error;
      }
    },

    /**
     * Get top recipes
     * @param {number} limit - Number of recipes to return
     * @returns {Promise} Promise object representing the top recipes
     */
    getTop: async (limit = 6) => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/recipes/top?limit=${limit}`
        );
        if (!response.ok) throw new Error("Failed to fetch top recipes");
        return await response.json();
      } catch (error) {
        console.error("API error:", error);
        return { error: error.message };
      }
    },

    /**
     * Get recipes by user ID
     * @param {string} userId - User ID
     * @param {string} token - User authentication token
     * @returns {Promise} Promise object representing the user's recipes
     */
    getByUser: async (userId) => {
      try {
        const response = await fetch(`${API_BASE_URL}/recipes/user/${userId}`);
        if (!response.ok) throw new Error("Failed to fetch user recipes");
        return await response.json();
      } catch (error) {
        console.error("API error:", error);
        return { error: error.message };
      }
    },

    /**
     * Like a recipe
     * @param {string} id - Recipe ID
     * @returns {Promise} Promise object representing the like action result
     */
    like: async (id, userId) => {
      const res = await fetch(`${API_BASE_URL}/recipes/${id}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }), // ✅ Make sure userId is defined
      });

      if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error.message || "Failed to like recipe");
      }

      return res.json();
    },

    /**
     * Delete a recipe
     * @param {string} id - Recipe ID
     * @returns {Promise} Promise object representing the delete action result
     */
    delete: async (id, userId) => {
      try {
        const response = await fetch(`${API_BASE_URL}/recipes/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }), // <-- send userId in body
        });
        if (!response.ok) throw new Error("Failed to delete recipe");
        return await response.json();
      } catch (error) {
        console.error("API error:", error);
        throw error;
      }
    },

    /**
     * Update a recipe
     * @param {string} id - Recipe ID
     * @param {Object} data - Updated recipe data
     * @returns {Promise} Promise object representing the updated recipe
     */
    update: async (id, data) => {
      try {
        const response = await fetch(`${API_BASE_URL}/recipes/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || "Failed to update recipe");
        }

        return await response.json();
      } catch (error) {
        console.error("API error:", error);
        throw error;
      }
    },
  },

  auth: {
    /**
     * Check if authentication is working
     * @param {string} token - User authentication token
     * @returns {Promise} Promise object representing the auth check result
     */
    check: async (token) => {
      try {
        if (!token) {
          const currentToken = await getAuthToken();
          if (!currentToken) throw new Error("User not authenticated");
          token = currentToken;
        }

        const response = await fetch(
          `${API_BASE_URL.replace("/api", "")}/auth-check`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to check authentication");
        return await response.json();
      } catch (error) {
        console.error("API error:", error);
        return { error: error.message };
      }
    },
  },
};
