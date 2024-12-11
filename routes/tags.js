import express from 'express';
import { readFile } from 'fs/promises';

const tags = JSON.parse(
    await readFile(
        new URL('../data/tags.json', import.meta.url)
    )
);

const app = express();
const PORT = 8080;

const router = express.Router();

router.get('/tags', (req, res) => {
    console.log("get tags");
    res.json(tags);
});


app.use('/', router);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
