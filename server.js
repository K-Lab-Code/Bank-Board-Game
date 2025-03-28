//import stuff
import express from 'express';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

//configure stuff
dotenv.config();
const connectionStringURL = process.env.MONGODB_URL;
const client = new MongoClient(connectionStringURL);
await client.connect();
const db = client.db('bank');
const port = process.env.PORT || 3000;

//app functions
//add validation to make sure that only entries that make since work to sendData function
async function sendData(req, res) {
    try {
        const room = req.body.room;
        //make it so theres data in room code
        const data = { room: req.body.room, stage: req.body.stage, turn: req.body.turn, players: req.body.players, points: req.body.points, round: req.body.round, rounds: req.body.rounds }// helps check that structure of the data being passed in is accurate
        const result = await db.collection('data').updateOne({ room: room }, data, { upsert: true })
        if (result) {
            res.send(true)
        } else {
            res.send(false)
        }
    }
    catch (err) {
        console.error(err);
        res.status(404).json({error: err});
    }
}
async function getData(req, res) {
    try {
        const room = req.qarams.room;
        const result = await db.collection('data').findOne({ room: room });
        if (result) {
            res.json(result)
        }
        else {
            res.status(404).json({ error: "Can't find that room code" })
        }
    }
    catch (err) {
        console.error(err);
        res.status(404).json({ error: "Can't find that room code" })
    }
}
async function defaultFile(req, res) {
    try {
        res.sendFile((__dirname + '/public/app.html'));
    }
    catch (err) {
        console.error(err);
    }
}
//setup app
const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))
app.post('/api/send', sendData)
app.get('/api/get/:room', getData)
//get route for room code setting up note also make it so it deletes old rooms too.
//delete route for when the games finshed
app.get('*', defaultFile)
app.listen(port, () => { console.log(`Server started on port ${port}`) })




