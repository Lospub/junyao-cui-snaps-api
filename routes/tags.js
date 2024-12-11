import express from 'express';
import tags from '../data/tags.json' with { type: "json" };

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
