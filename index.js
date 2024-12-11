import express from "express";

const app = express();
const port = process.env.PORT || process.argv[2] || 8080;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ name: "Eden" });
});

app.listen(port, () => console.log(`Listening on ${port}`));
