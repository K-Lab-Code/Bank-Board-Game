//import stuff
import express from 'express';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

//configure stuff
dotenv.config();
const connectionStringURL = process.env.MONGODBURL;
const client = new MongoClient(connectionStringURL);
await client.connect();
const db = client.db('bank');
const port = process.env.PORT || 3000;

//app functions
async function sendData(req, res) {
    try {
        const room = req.body.room;
        const data = { room: req.body.room, stage: req.body.stage, turn: req.body.turn, players: req.body.players }// helps check that structure of the data being passed in is accurate
        const result = await db.collection('data').updateOne({ room: room }, data, { upsert: ture })
        if (result){
            res.send(true)
        } else {
            res.send(false)
        }
    }
    catch (err) {
        console.error(err);
    }
}
async function getData(req, res) {
    try {
        const room = req.qarams.room;
        const result = await db.collection('data').findOne({room: room});
        if (result) {
            res.json(result)
        }
        else {
            res.status(404).json({error: "Can't find that room code"})
        }
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
app.listen(port, () => { console.log(`Server started on port ${port}`) })




