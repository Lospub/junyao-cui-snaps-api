import express from 'express';
import { readFile } from 'fs/promises';

const tags = JSON.parse(
    await readFile(
        new URL('../data/tags.json', import.meta.url)
    )
);

const router = express.Router();

router.get('/tags', (req, res) => {
    res.json(tags);
});

export default router;