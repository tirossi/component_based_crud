import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Input, Button } from "./components";

const url = 'http://localhost:3001';

const App = () => {
  const [movie, setMovie] = useState('');
  const [review, setReview] = useState('');
  const [updatedReview, setUpdatedReview] = useState('');
  const [moviesView, setMoviesView] = useState([]);
  const [reviewsView, setReviewsView] = useState([]);

  useEffect(() => {
    readMovies();
    readReviews();
  }, [])

  // MOVIES
  const createMovie = () => {
    if (!movie) return;
    axios.post(`${url}/create/movie`, { movie })
    window.location.reload() // foi mal rafa, nao tava dando certo do outro jeito e to sem tempo :(
  }

  const readMovies = () => {
    axios.get(`${url}/movies`).then((res) => {
      setMoviesView(res.data)
    })
  }

  const deleteMovie = (movieId) => {
    axios.get(`${url}/delete/movie/${movieId}`)
    window.location.reload() // foi mal rafa, nao tava dando certo do outro jeito e to sem tempo :(
  }

  // REVIEWS
  const createReview = (movie) => {
    if (!review) return;
    axios.post(`${url}/create/review`, { text: review, movieName: movie })
    window.location.reload() // foi mal rafa, nao tava dando certo do outro jeito e to sem tempo :(
  }

  const readReviews = () => {
    axios.get(`${url}/reviews`).then((res) => {
      setReviewsView(res.data)
    })
  }

  const updateReview = (reviewId) => {
    axios.put(`${url}/update/review`, {
      id: reviewId,
      text: updatedReview
    })
    window.location.reload() // foi mal rafa, nao tava dando certo do outro jeito e to sem tempo :(
  }

  const deleteReview = (reviewId) => {
    axios.get(`${url}/delete/review/${reviewId}`)
    window.location.reload() // foi mal rafa, nao tava dando certo do outro jeito e to sem tempo :(
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
              <Button onClick={() => deleteMovie(movie.id)} btnText="Deletar filme" />
              <Input type="text" placeholder="review" onChange={e => setReview(e.target.value)} />
              <Button onClick={() => createReview(movie.name)} btnText="Publicar Review" />

              {
                reviewsView.map(review => {
                  if (review.movieName === movie.name) return (
                    <div>
                      <p>{review.text}</p>
                      <input type="text" placeholder="editar" onChange={e => setUpdatedReview(e.target.value)} />
                      <button onClick={() => updateReview(review.id)}> editar review</button>
                      <button onClick={() => deleteReview(review.id)}> deletar review</button>
                    </div>
                  );
                })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App;