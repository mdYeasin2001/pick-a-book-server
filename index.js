const express = require('express');
const app = express();
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const port = 8080;


app.use(express.json());
app.use(cors())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.54hym.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const booksCollection = client.db("BookStore").collection("books");

  app.post('/addBook', (req, res) => {
      const newBook = req.body;
      booksCollection.insertOne(newBook)
      .then(result => console.log(result))
  })

  app.get('/books', (req, res) => {
      booksCollection.find()
      .toArray((err, books) => {
          res.send(books)
      })
  })
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORT || port)