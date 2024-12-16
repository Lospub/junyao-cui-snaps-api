import express from 'express';
import fs from "fs";
import { readFile } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

// Load the photos JSON data
const photos = JSON.parse(
    await readFile(
        new URL('../data/photos.json', import.meta.url)
    )
);

const photoRoutes = express.Router();

// Get all photos
photoRoutes.get('/photos', (req, res) => {
    try {
        const filteredPhotos = photos.map(photo => ({
            id: photo.id,
            photo: photo.photo,
            photoDescription: photo.photoDescription,
            photographer: photo.photographer,
            tags: photo.tags,
        }));
        res.status(200).json(filteredPhotos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching photos" });
    }
});

// Get a specific photo by ID
photoRoutes.get('/photos/:id', (req, res) => {
    try {
        const photo = photos.find(photo => photo.id === req.params.id);
        if (!photo) {
            return res.status(404).json({ message: "Photo not found" });
        }
        const filteredPhoto = {
            id: photo.id,
            photo: photo.photo,
            photoDescription: photo.photoDescription,
            photographer: photo.photographer,
            likes: photo.likes,
            timestamp: photo.timestamp,
            tags: photo.tags,
        };
        res.status(200).json(filteredPhoto);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching the photo" });
    }
});

// Get comments for a specific photo
photoRoutes.get('/photos/:id/comments', (req, res) => {
    try {
        const photo = photos.find(photo => photo.id === req.params.id);
        if (!photo) {
            return res.status(404).json({ message: "Photo not found" });
        }
        const comments = photo.comments;
        res.status(200).json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching comments" });
    }
});

// Add a comment to a specific photo
photoRoutes.post('/photos/:id/comments', (req, res) => {
    try {
        const photo = photos.find(photo => photo.id === req.params.id);
        if (!photo) {
            return res.status(404).json({ message: "Photo not found" });
        }
        if (!req.body.name || !req.body.comment) {
            return res.status(400).json({ message: "Name and comment are required" });
        }

        const newComment = {
            name: req.body.name,
            comment: req.body.comment,
            id: uuidv4(),
            timestamp: Date.now(),
        };

        photo.comments.push(newComment);

        // Save to the file
        const stringPhotos = JSON.stringify(photos, null, 2);
        fs.writeFileSync("./data/photos.json", stringPhotos);

        res.status(201).json(newComment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error adding comment" });
    }
});

export default photoRoutes;