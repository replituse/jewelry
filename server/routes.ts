import type { Express } from "express";
import { createServer, type Server } from "http";
import { getStorage } from "./storage";
import { connectToMongoDB } from "./mongodb";
import {
  insertCategorySchema,
  insertProductSchema,
  insertCarouselImageSchema,
  insertShopInfoSchema,
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Connect to MongoDB before registering routes
  try {
    await connectToMongoDB();
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }

  // Categories endpoints
  app.get("/api/categories", async (_req, res) => {
    try {
      const categories = await getStorage().getCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  app.get("/api/categories/:slug", async (req, res) => {
    try {
      const category = await getStorage().getCategoryBySlug(req.params.slug);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.json(category);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch category" });
    }
  });

  app.post("/api/categories", async (req, res) => {
    try {
      const validatedData = insertCategorySchema.parse(req.body);
      const category = await getStorage().createCategory(validatedData);
      res.status(201).json(category);
    } catch (error) {
      res.status(400).json({ message: "Invalid category data" });
    }
  });

  app.patch("/api/categories/:slug", async (req, res) => {
    try {
      const category = await getStorage().updateCategory(req.params.slug, req.body);
      res.json(category);
    } catch (error) {
      res.status(400).json({ message: "Failed to update category" });
    }
  });

  // Products endpoints
  app.get("/api/products", async (req, res) => {
    try {
      const category = req.query.category as string | undefined;
      const products = await getStorage().getProducts(category);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const product = await getStorage().getProductById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  app.post("/api/products", async (req, res) => {
    try {
      const validatedData = insertProductSchema.parse(req.body);
      const product = await getStorage().createProduct(validatedData);
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ message: "Invalid product data" });
    }
  });

  // Carousel images endpoints
  app.get("/api/carousel", async (_req, res) => {
    try {
      const images = await getStorage().getCarouselImages();
      res.json(images);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch carousel images" });
    }
  });

  app.post("/api/carousel", async (req, res) => {
    try {
      const validatedData = insertCarouselImageSchema.parse(req.body);
      const image = await getStorage().createCarouselImage(validatedData);
      res.status(201).json(image);
    } catch (error) {
      res.status(400).json({ message: "Invalid carousel image data" });
    }
  });

  // Shop info endpoints
  app.get("/api/shop-info", async (_req, res) => {
    try {
      const info = await getStorage().getShopInfo();
      if (!info) {
        return res.status(404).json({ message: "Shop info not found" });
      }
      res.json(info);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch shop info" });
    }
  });

  app.post("/api/shop-info", async (req, res) => {
    try {
      const validatedData = insertShopInfoSchema.parse(req.body);
      const info = await getStorage().createOrUpdateShopInfo(validatedData);
      res.status(200).json(info);
    } catch (error) {
      res.status(400).json({ message: "Invalid shop info data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
