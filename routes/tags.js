import express from 'express';
import { readFile } from 'fs/promises';

// Load the tags JSON data
const tags = JSON.parse(
    await readFile(
        new URL('../data/tags.json', import.meta.url)
    )
);

const tagRoutes = express.Router();

// Get all tags
tagRoutes.get('/tags', (req, res) => {
    try {
        if (!tags || tags.length === 0) {
            return res.status(404).json({ message: "Tags not found" });
        }
        res.status(200).json(tags);
    } catch (error) {
        console.error("Error fetching tags:", error);
        res.status(500).json({ message: "Error fetching tags" });
    }
});

export default tagRoutes;