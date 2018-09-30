const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const db             = require('./config/db');
const path = require('path');
const app            = express();

const port = 8000;
app.use(express.static(path.join(__dirname,'/app/puplic')))
app.use(bodyParser.urlencoded({ extended: true }))

MongoClient.connect(db.url, (err, database) => {
  if (err) return console.log(err)

  // Make sure you add the database name and not the collection name

  require('./app/routes')(app, database);

  app.listen(port, () => {
    console.log('We are live on ' + port);
  });
})
