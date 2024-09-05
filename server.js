const express = require('express')
const app = express()
const db = require('./config/connection');
// const routes = require('./routes/api');
const routes = require('./routes');

const PORT = process.env.PORT || 3001;

// app.get('/', function (req, res) {
//   res.send()
  // res.send('Hello World')
// })

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);


  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });
  });