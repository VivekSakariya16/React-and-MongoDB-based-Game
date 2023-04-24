const express = require('express');
const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const Score = require("./model/Score");
const User = require("./model/User");
// const email = require("./model/email");
const nodemailer = require('nodemailer');
const cron = require('node-cron');
const fs = require('fs');
const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const DB = 'mongodb+srv://@cluster0.vdrvb7z.mongodb.net/?retryWrites=true&w=majority'
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

let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: '',
        pass: ''
    }
});

//minute hour day month dayOfWeek
cron.schedule('38 18 * * *', () => {
    let mailOptions = {
        from: '',
        to: '',
        subject: 'Rock Paper Scissor Game - Top 5',
        html: '<h1>Hey there!</h1><p>Congratulations, you made it to the top 5 leaderboard in last day in Rock Paper Scissor game.</p><h1>We have a reward for your achievement!</h1><p>Here is a 10% gift coupon of your favourite store </p><img src="https://firebasestorage.googleapis.com/v0/b/bcd-predicter.appspot.com/o/image.jpeg?alt=media&token=b85a53c2-fded-4196-961b-e939b4cba42e" alt="Gift Voucher" width="200" height="100">'
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            // res.send("Mail not sent");
        } else {
            console.log('Email sent: ' + info.response);
            // res.send("Mail sent");
        }
    });
});

app.get('/', (req, res) => {
    res.send('Hello from API!');

});

app.post("/add-score", async (req, res) => {
    try {
        const { name, score, date } = req.body;
        const user = await Score.findOne({ name: name });
        if (user) {
            await Score.insertMany({ name: name, score: score, date_time: date });
            res.send("Score updated");
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

app.post("/add-user", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const e = await User.findOne({ username: username });
        if (!username || !email || !password) {
            return res.status(422).json({ error: "Please fill all the fields" });
        }
        else if (e) {
            return res.status(422).json({ error: "User already exists" });
        }
        else {
            const user = new User({
                username: username,
                email: email,
                password: password
            });
            await user.save().then(() => {
                res.send("User added");
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ "message": "Internal server error" })
    }
});

app.post("/get-user", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username: username, password: password });
        if (!username || !password) {
            return res.status(422).json({ error: "Please fill all the fields" });
        }
        else if (!user) {
            return res.status(422).json({ error: "Invalid credentials" });
        }
        else {
            res.sendStatus(200);
        }
    } catch (error) {
        console.log(error);
    }
});

app.get("/get-scores", async (req, res) => {
    // const username = req.query.username;
    await Score.find({}).sort({ score: -1 }).limit(5).then((data) => {
        res.send(data);
    }).catch((e) => {
        console.log(e);
    });
});

app.get("/get-all-scores", async (req, res) => {
    // const username = req.query.username;
    await Score.find({}).sort({ score: -1 }).then((data) => {
        res.send(data);
    }).catch((e) => {
        console.log(e);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

