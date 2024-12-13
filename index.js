import express from "express";
import tagRoutes from "./routes/tags.js"; 
import photoRoutes from "./routes/photos.js";
import cors from "cors"

const app = express();
const port = process.env.PORT || process.argv[2] || 8080;

app.use(express.static("public"));
app.use(express.json());
app.use(cors());

app.get("/favicon.ico", (req, res) => {
  res.status(204).end();
});

app.use('/api', tagRoutes);

app.use('/api', photoRoutes);

app.listen(port, () => console.log(`Listening on ${port}`));
