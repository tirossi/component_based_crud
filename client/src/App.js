import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Input, Button } from "./components";

const url = 'http://localhost:3001';

const App = () => {
  const [movie, setMovie] = useState('');
  const [review, setReview] = useState('');
  const [moviesView, setMoviesView] = useState([]);
  const [reviewsView, setReviewsView] = useState([]);

  useEffect(() => {
    readMovies();
    readReviews();
  }, [])

  // MOVIES
  const createMovie = () => {
    axios.post(`${url}/create/movie`, { movie })
    readMovies()
  }

  const readMovies = () => {
    axios.get(`${url}/movies`).then((res) => {
      setMoviesView(res.data)
    })
  }

  const deleteMovie = (movieId) => {
    axios.get(`${url}/delete/movie/${movieId}`)
    readMovies();
  }

  // REVIEWS
  const createReview = (movie) => {
    axios.post(`${url}/create/review`, { text: review, movieName: movie })
    readMovies()
  }

  const readReviews = () => {
    axios.get(`${url}/reviews`).then((res) => {
      setReviewsView(res.data)
    })
  }

  const updateReview = () => {
    //todo
  }

  const deleteReview = () => {
    // todo
  }

  return (
    <div className="app-content">
      <h1>CRUD Review de Filmes</h1>
      <h2>Novo Filme</h2>
      <div className="form-container">
        <Input type="text" placeholder="Nome" value={movie} onChange={(e) => setMovie(e.target.value)} />
        <Button onClick={createMovie} btnText="Novo Filme" />
      </div>
      <h2>Filmes</h2>
      <div>
        {moviesView.map(movie => {
          return (
            <div className="movie-container">
              <h2>{movie.name}</h2>
              <Input type="text" placeholder="review" value={review} onChange={e => setReview(e.target.value)} />
              <Button onClick={() => createReview(movie.name)} btnText="Publicar Review" />
              <Button onClick={() => deleteMovie(movie.id)} btnText="Deletar filme" />
              {reviewsView.map(review => {
                return <p>{review.text}</p>
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App;