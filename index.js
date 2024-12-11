import express from "express";
import tagRoutes from "./routes/tags.js"; 

const app = express();
const port = process.env.PORT || process.argv[2] || 8080;

app.use(express.json());

app.get("/favicon.ico", (req, res) => {
  res.status(204).end();
});

app.use('/api', tagRoutes);

app.listen(port, () => console.log(`Listening on ${port}`));
