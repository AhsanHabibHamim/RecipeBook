require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB URI
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nfwtcj8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Token validation middleware
function validateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  // For demo, we'll mock decoding. Use Firebase Admin or JWT verification in production
  try {
    const base64Payload = token.split(".")[1];
    const payload = JSON.parse(Buffer.from(base64Payload, "base64").toString());
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

// Main function
async function run() {
  try {
    await client.connect();
    const db = client.db("recipe-book");
    const collection = db.collection("recipes");

    console.log("Connected to MongoDB Atlas");

    // Routes
    app.get("/", (req, res) => {
      res.send("Welcome to the Recipe Book API");
    });

    app.get("/health", (req, res) => {
      res.status(200).json({ status: "ok" });
    });

    app.get("/auth-check", (req, res) => {
      const authHeader = req.headers["authorization"];
      if (authHeader) {
        res.status(200).json({
          message: "Auth header received",
          headerLength: authHeader.length,
        });
      } else {
        res.status(200).json({ message: "No auth header received" });
      }
    });

    // Recipes routes
    app.get("/api/recipes", async (req, res) => {
      try {
        const { cuisine } = req.query;
        const query = cuisine ? { cuisine } : {};
        const recipes = await collection
          .find(query)
          .sort({ createdAt: -1 })
          .toArray();
        res.status(200).json(recipes);
      } catch (error) {
        res
          .status(500)
          .json({ message: "Failed to fetch recipes", error: error.message });
      }
    });

    app.get("/api/recipes/top", async (req, res) => {
      try {
        const limit = parseInt(req.query.limit) || 6;
        const recipes = await collection
          .find()
          .sort({ likes: -1 })
          .limit(limit)
          .toArray();
        res.status(200).json(recipes);
      } catch (error) {
        res.status(500).json({
          message: "Failed to fetch top recipes",
          error: error.message,
        });
      }
    });

    app.get("/api/recipes/user/:userId", async (req, res) => {
      try {
        const recipes = await collection
          .find({ userId: req.params.userId })
          .toArray();
        res.status(200).json(recipes);
      } catch (error) {
        res.status(500).json({
          message: "Failed to fetch user recipes",
          error: error.message,
        });
      }
    });

    app.get("/api/recipes/:id", async (req, res) => {
      const { id } = req.params;
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid recipe ID format" });
      }

      try {
        const recipe = await collection.findOne({ _id: new ObjectId(id) });
        if (!recipe)
          return res.status(404).json({ message: "Recipe not found" });
        res.status(200).json(recipe);
      } catch (error) {
        res
          .status(500)
          .json({ message: "Failed to fetch recipe", error: error.message });
      }
    });

    app.post("/api/recipes", validateToken, async (req, res) => {
      try {
        const newRecipe = {
          ...req.body,
          userId: req.user.uid,
          userName: req.user.email.split("@")[0],
          likes: 0,
          likedBy: [],
          createdAt: new Date(),
        };

        const result = await collection.insertOne(newRecipe);
        res.status(201).json({ ...newRecipe, _id: result.insertedId });
      } catch (error) {
        res
          .status(400)
          .json({ message: "Failed to create recipe", error: error.message });
      }
    });

    app.put("/api/recipes/:id", async (req, res) => {
      try {
        const id = new ObjectId(req.params.id);
        const recipe = await collection.findOne({ _id: id });

        if (!recipe) {
          return res.status(404).json({ message: "Recipe not found" });
        }

        if (
          !req.body.userId ||
          String(recipe.userId) !== String(req.body.userId)
        ) {
          return res.status(403).json({ message: "Not authorized" });
        }

        if (req.body._id) delete req.body._id;

        const result = await collection.findOneAndUpdate(
          { _id: id },
          { $set: req.body },
          { returnDocument: "after" }
        );

        if (!result) {
          return res.status(400).json({ message: "Failed to update recipe" });
        }

        res.status(200).json(result.value);
      } catch (error) {
        res
          .status(400)
          .json({ message: "Failed to update recipe", error: error.message });
      }
    });

    app.delete("/api/recipes/:id", async (req, res) => {
      try {
        const id = new ObjectId(req.params.id);
        const recipe = await collection.findOne({ _id: id });

        if (!recipe)
          return res.status(404).json({ message: "Recipe not found" });
        if (!req.body.userId || recipe.userId !== req.body.userId) {
          return res.status(403).json({ message: "Not authorized" });
        }

        await collection.deleteOne({ _id: id });
        res.status(200).json({ message: "Recipe deleted successfully" });
      } catch (error) {
        res
          .status(400)
          .json({ message: "Failed to delete recipe", error: error.message });
      }
    });

    app.post("/api/recipes/:id/like", async (req, res) => {
      const recipeId = req.params.id;
      const { userId } = req.body;

      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }

      try {
        const recipe = await collection.findOne({
          _id: new ObjectId(recipeId),
        });
        if (!recipe)
          return res.status(404).json({ message: "Recipe not found" });

        if (recipe.userId === userId) {
          return res
            .status(403)
            .json({ message: "You can't like your own recipe" });
        }

        await collection.updateOne(
          { _id: new ObjectId(recipeId) },
          {
            $inc: { likes: 1 },
            $addToSet: { likedBy: userId },
          }
        );

        res.status(200).json({ message: "Liked successfully" });
      } catch (error) {
        res
          .status(500)
          .json({ message: "Failed to like recipe", error: error.message });
      }
    });

    
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
  }
}

run();



