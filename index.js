const express = require('express');
const app = express();
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config();
const port = 8080;


app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.54hym.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const booksCollection = client.db("BookStore").collection("books");
  const ordersCollection = client.db("OrderInfo").collection("orders");

  // post methods
  app.post('/addBook', (req, res) => {
    const newBook = req.body;
    booksCollection.insertOne(newBook)
      .then(result => {
        if(result.insertedCount > 0){
          res.send(!!result.insertedCount)
        }
      })
  })

  app.post('/addOrder', (req, res) => {
    const orderData = req.body;
    ordersCollection.insertOne(orderData)
    .then(result => {
      if(result.insertedCount > 0){
        res.send(!!result.insertedCount)
      }
    })

  })

  // get methods
  app.get('/books', (req, res) => {
    booksCollection.find()
      .toArray((err, books) => {
        res.send(books)
      })
  })

  app.get('/book/:id', (req, res) => {
    const id = req.params.id;
    booksCollection.find({ _id: ObjectId(id) })
      .toArray((err, documents) => {
        res.send(documents)
      })
  })

  app.get('/orders', (req, res) => {
    const email = req.query.email;
    ordersCollection.find({email})
    .toArray((err, documents) => {
      res.send(documents)
    })
  })

  // delete methods
  app.delete('/deleteBook/:id', (req, res) => {
    const id = req.params.id;
    booksCollection.deleteOne({_id: ObjectId(id)})
    .then(result => {
      if(result.deletedCount > 0){
        res.send(!!result.deletedCount)
      }
    })
  })
});

app.get('/', (req, res) => {
  res.send('Pick A Book Server')
})

app.listen(process.env.PORT || port)