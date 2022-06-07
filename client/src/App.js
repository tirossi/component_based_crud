import React, { useState } from 'react';

import { Input, Button } from "./components";

const App = () => {
  const [movie, setMovie] = useState('');

  const createMovie = () => {
    console.log(`created movie: ${movie}`);
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

      </div>
    </div>
  )
}

export default App;