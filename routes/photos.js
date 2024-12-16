import express from 'express';
import fs from "fs";
import { readFile } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

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

photoRoutes.post('/photos/:id/comments', (req, res) => {
    const newComment = {
        name: req.body.name,
        comment: req.body.comment,
        id: uuidv4(), 
        timestamp: Date.now(),
    }

    const photo = photos.find(photo => photo.id === req.params.id);
    photo.comments.push(newComment);
    const stringPhotos = JSON.stringify(photos);
    fs.writeFileSync("./data/photos.json", stringPhotos);
    res.json(newComment);
});

export default photoRoutes;