import express from 'express';
import { readFile } from 'fs/promises';

const app = express();
const port = process.env.PORT || process.argv[2] || 8080;


const photos = JSON.parse(
    await readFile(
        new URL('../data/photos.json', import.meta.url)
    )
);

const photoRoutes = express.Router();

photoRoutes.get('/photos', (req, res) => {
    res.json(photos);
});

app.use('/api', photoRoutes);

app.listen(port, () => console.log(`Listening on ${port}`));