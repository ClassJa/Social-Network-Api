const express = require('express')
const app = express()
const db = require('./config/connection');
const routes = require('./routes/api');

const PORT = process.env.PORT || 3001;

app.get('/', function (req, res) {
  res.send('Hello World')
})

// ?
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

// app.listen((PORT) => {
//     console.log("Listening on Port:", DB_PORT)
// })
// app.listen(3000)

// app.listen(3000, () => {
//     console.log('Server listening on http://localhost:3000');
//   })

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });
  });