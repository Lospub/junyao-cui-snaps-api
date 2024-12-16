import express from 'express';
import { readFile } from 'fs/promises';

const tags = JSON.parse(
    await readFile(
        new URL('../data/tags.json', import.meta.url)
    )
);

const tagRoutes = express.Router();

tagRoutes.get('/tags', (req, res) => {
    res.json(tags);
});

export default tagRoutes;