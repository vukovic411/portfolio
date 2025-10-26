'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const movieDetails = document.querySelector('#movieDetails');
  const API_KEY = 'c4bdad56'; // твој API key као string

  async function loadMovieDetails() {
    const movieId = localStorage.getItem('selectedMovie');
    if (!movieId) {
      movieDetails.innerHTML = '<p>Film nije pronađen.</p>';
      return;
    }

    try {
      // details.js
      const response = await fetch(`/movies?id=${movieId}`);

      const data = await response.json();

      if (data.Response === 'False') {
        movieDetails.innerHTML = '<p>Greška prilikom učitavanja podataka.</p>';
        return;
      }

      movieDetails.innerHTML = `
        <div class="movie-card details-card">
          <img src="${
            data.Poster !== 'N/A' ? data.Poster : 'img/no-image.jpg'
          }" alt="${data.Title}" />
          <div class="details-content">
            <h2>${data.Title} (${data.Year})</h2>
            <p><strong>Žanr:</strong> ${data.Genre}</p>
            <p><strong>Režiser:</strong> ${data.Director}</p>
            <p><strong>Glumci:</strong> ${data.Actors}</p>
            <p><strong>Opis:</strong> ${data.Plot}</p>
            <p><strong>Ocena IMDb:</strong> ${data.imdbRating}</p>
            <p><a href="https://www.imdb.com/title/${
              data.imdbID
            }" target="_blank" rel="noopener">Pogledaj na IMDb</a></p>
            <button id="backBtn">Nazad</button>
          </div>
        </div>
      `;

      // Optional: back button
      document.querySelector('#backBtn').addEventListener('click', () => {
        window.history.back();
      });
    } catch (error) {
      console.error('Greška:', error);
      movieDetails.innerHTML =
        '<p>Došlo je do greške prilikom prikaza filma.</p>';
    }
  }

  loadMovieDetails();
});
