const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'sqluser',
  password: 'password',
  database: 'crudrafa'
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

db.connect(err => {
  if (err) throw err;
  console.log('mysql connection established')
})

// CREATE MOVIE
app.post('/create/movie', (req, res) => {
  const movie = req.body.movie;

  const query = "INSERT INTO movie (NAME) VALUES (?)";
  db.query(query, movie, (err, result) => {
    console.log(err);
  });
})

// READ MOVIES
app.get('/movies', (req, res) => {
  const query = "SELECT * FROM movie"
  db.query(query, (err, result) => {
    res.send(result);
  });
})

// DELETE MOVIE
app.get('/delete/movie/:movieId', (req, res) => {
  const movieId = req.params.movieId;

  const query = "DELETE FROM movie WHERE id = ?";
  db.query(query, movieId, (err, result) => {
    console.log(err);
  })
})

// CREATE REVIEW
app.post('/create/review', (req, res) => {
  const movie = req.body.movieName;
  const text = req.body.text;

  const query = "INSERT INTO review (text, movieName) VALUES (?, ?)";
  db.query(query, [text, movie], (err, result) => {
    console.log(err);
  });
})

// READ REVIEW
app.get('/reviews', (req, res) => {
  const query = "SELECT * FROM review"
  db.query(query, (err, result) => {
    res.send(result);
  });
})

// UPDATE REVIEW
app.put('/update/review', (req, res) => {
  const id = req.body.id;
  const text = req.body.text;
  const query = "UPDATE review SET text = ? WHERE id = ?"

  db.query(query, [text, id], (err, result) => {
    console.log(id + text);
  })
})

// DELETE REVIEW
app.get('/delete/review/:reviewId', (req, res) => {
  const reviewId = req.params.reviewId;

  const query = "DELETE FROM review WHERE id = ?";
  db.query(query, reviewId, (err, result) => {
    console.log(err);
  })
})

app.get('/', (req, res) => {
  res.send('server running, go to localhost:3000 for application')
})

app.listen(3001, () => {
  console.log('listening on port 3001');
});