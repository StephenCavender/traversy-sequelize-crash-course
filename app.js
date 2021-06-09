const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');

const { Sequelize } = require('sequelize');
const db = new Sequelize('postgres://stephencavender:@localhost:5432/postgres'); // Example for postgres

// Test db
db.authenticate()
  .then(() => console.log('Database connected'))
  .catch((err) => console.log(`Error: ${err}`));

const app = express();

app.get('/', (req, res) => res.send('index'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
