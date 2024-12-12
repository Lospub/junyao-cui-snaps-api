import express from 'express';
import fs from "fs";
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
    const filteredPhotos = photos.map(photo => ({
        id:photo.id,
        photo:photo.photo,
        photoDescription:photo.photoDescription,
        photographer:photo.photographer,
        tags:photo.tags,
    }))
    res.json(filteredPhotos)
});

photoRoutes.get('/photos/:id', (req, res) => {
    const photo = photos.find(photo => photo.id === req.params.id);
    const filteredPhoto = {
        id: photo.id,
        photo: photo.photo,
        photoDescription: photo.photoDescription,
        photographer: photo.photographer,
        likes: photo.likes,
        timestamp: photo.timestamp,
        tags: photo.tags,
    };
    res.json(filteredPhoto)
});

photoRoutes.get('/photos/:id/comments', (req, res) => {
    const photo = photos.find(photo => photo.id === req.params.id);
    const comments = photo.comments;
    res.json(comments);
});

app.use('/api', photoRoutes);

app.listen(port, () => console.log(`Listening on ${port}`));