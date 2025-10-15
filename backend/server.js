import path, { dirname } from "path";
import { fileURLToPath } from "url";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

// Serve static files from React build folder (adjust path to your frontend directory)
if (process.env.NODE_ENV === "production") {
  // Path to React build folder
  const reactBuildPath = path.join(__dirname, "..", "frontend", "build");

  // Serve static files
  app.use(express.static(reactBuildPath));

  // Catch-all route to send React's index.html
  app.get(/^(?!\/api).*$/, (req, res) => {
    res.sendFile(path.join(reactBuildPath, "index.html"));
  });
} else {
  // In development
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

// Error handling
app.use(notFound);
app.use(errorHandler);

// Start server
app.listen(port, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
});
