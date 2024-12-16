import express from "express";
import tagRoutes from "./routes/tags.js"; 
import photoRoutes from "./routes/photos.js";
import cors from "cors";
import "dotenv/config";

const app = express();
const port = process.env.PORT || process.argv[2] || 8080;

// Middleware
app.use(express.static("public")); 
app.use(express.json());           
app.use(cors());                   

// Handle favicon requests (avoids unnecessary errors in logs)
app.get("/favicon.ico", (req, res) => {
  res.status(204).end();
});

// API routes
app.use('/api/', tagRoutes);
app.use('/api/', photoRoutes);

// 404 handler for unknown endpoints
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found." });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at ${process.env.BACKEND_URL || "http://localhost:"}${port}`);
});
