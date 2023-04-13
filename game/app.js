const express = require('express');
const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const Score = require("./model/Score");
const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const DB = 'YOUR_MONGODB_URI'
const connectToDatabase = () => {
    mongoose.connect(DB, {
        useNewUrlParser: true,
    }).then(() => {
        console.log("Connection Successful");
    }).catch((e) => {
        console.log("Connection Failed\n", e);
    });
}
connectToDatabase()

app.get('/', (req, res) => {
    res.send('Hello from API!');
});

app.post("/add-score", async (req, res) => {
    try {
        const { name, score } = req.body;
        const user = await Score.findOne({ name: name });
        if (user) {
            if (user.score >= score) {
                res.send("You already have a higher score")
            } else {
                await Score.findOneAndUpdate({ name: name }, { score: score }, { new: true, upsert: true });
                res.send("Score updated");
            }
        } else {
            const newScore = new Score({
                name: name,
                score: score
            });
            await newScore.save().then(() => {
                res.send("Score added");
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ "message": "Internal server error" })
    }
});

app.get("/get-scores", async (req, res) => {
    await Score.find({}).sort({ score: -1 }).limit(5).then((data) => {
        res.send(data);
    }).catch((e) => {
        console.log(e);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

