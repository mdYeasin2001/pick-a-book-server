const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const port = 8080;




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.54hym.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("BookStore").collection("books");
  console.log('database connected');
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port)