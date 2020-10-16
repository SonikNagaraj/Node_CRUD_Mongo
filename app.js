const express = require('express');
const bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

// Setting up express 
const app = express();
app.use(bodyParser.json());

// Create a database
app.get('/createdb', (req,res) => {
    var url = "mongodb://localhost:27017/mydb";
    
    MongoClient.connect(url, (err, db) => {
      if (err) 
        throw err;
      else
        res.send('Database created!');
      db.close();
    });
});

// Create collection
app.get('/createcollection', (req,res) => {
    var url = "mongodb://localhost:27017/";

  MongoClient.connect(url, (err, db) => {
    if (err) 
      throw err;
    var dbo = db.db("mydb");
      dbo.createCollection("test", (err, ress) => {
        if (err) 
          throw err;
        else
          res.send('Collection created!');
       db.close();
      });
  });
});

// Insert
app.post('/insert', (req,res) => {
  var url = "mongodb://localhost:27017/";
  MongoClient.connect(url, (err, db) => {
    if (err) 
      throw err;
    var dbo = db.db("mydb");
    var data = { name: req.body.name, age: req.body.age };
    //console.log(data);
    dbo.collection("test").insertOne(data, (err, ress) => {
      if (err) 
        throw err;
      else
        res.send("Document inserted");
      db.close();
    });
  });
});

// View
app.get('/view', (req,res) => {
  var url = "mongodb://localhost:27017/";

  MongoClient.connect(url, (err, db) => {
    if (err) 
      throw err;
    var dbo = db.db("mydb");
    dbo.collection("test").find({}).toArray((err, result) => {
      if (err) 
        throw err;
      else
        res.send(result);
      db.close();
    });
  });
});

// Update
app.post('/update', (req,res) => {
  var url = "mongodb://127.0.0.1:27017/";

  MongoClient.connect(url, (err, db) => {
    if (err) 
      throw err;
    var dbo = db.db("mydb");
    var value = { age: "15" };
    var newvalues = { $set: {name: req.body.name} };
    dbo.collection("test").updateOne(value, newvalues, (err, ress) => {
      if (err) 
        throw err;
      else
        res.send("Document updated");
      db.close();
    });
  });
});

// Delete
app.post('/delete', (req,res) => {
  var url = "mongodb://localhost:27017/";

  MongoClient.connect(url, (err, db) => {
    if (err) 
      throw err;
    var dbo = db.db("mydb");
    let value = { age: req.body.age };
    dbo.collection("test").deleteOne(value, (err, obj) => {
      if (err) 
        throw err;
      else
        res.send("Document deleted");
      db.close();
    });
  });
});

 app.listen('3000', () => {
     console.log('Listening on port 3000');
 });

