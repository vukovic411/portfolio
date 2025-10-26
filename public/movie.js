'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.querySelector('#searchInput');
  const searchBtn = document.querySelector('#searchBtn');
  const moviesContainer = document.querySelector('#moviesContainer');
  const yearFilter = document.querySelector('#yearFilter');
  const genreFilter = document.querySelector('#genreFilter');
  const apiKey = 'c4bdad56';

  let allMovies = []; // Svi filmovi iz osnovne pretrage
  let detailedMoviesCache = []; // Keširani detaljni podaci (za žanr)

  // 🔍 Pretraga po nazivu
  searchBtn.addEventListener('click', async () => {
    const query = searchInput.value.trim();
    if (!query) {
      alert('Unesi naziv filma!');
      return;
    }

    try {
      // movie.js
      const response = await fetch(
        `/movies?query=${encodeURIComponent(query)}`
      );

      const data = await response.json();

      if (data.Response === 'False') {
        moviesContainer.innerHTML = `<p>Film nije pronađen.</p>`;
        allMovies = [];
        detailedMoviesCache = [];
        return;
      }

      allMovies = data.Search;
      detailedMoviesCache = []; // resetujemo keš detalja
      applyFilters(); // odmah primeni filtere (ako su postavljeni)
    } catch (error) {
      console.error('Greška:', error);
      moviesContainer.innerHTML = `<p>Greška prilikom pretrage.</p>`;
    }
  });

  // 🎞️ Funkcija za prikaz filmova
  function displayMovies(movies) {
    moviesContainer.innerHTML = '';

    if (movies.length === 0) {
      moviesContainer.innerHTML = '<p>Nema filmova za odabrane filtere.</p>';
      return;
    }

    movies.forEach(movie => {
      const div = document.createElement('div');
      div.classList.add('movie-card');

      const img = document.createElement('img');
      img.src = movie.Poster !== 'N/A' ? movie.Poster : 'img/no-image.jpg';
      img.alt = movie.Title;
      img.onerror = () => {
        img.src = 'img/no-image.jpg'; // fallback za slomljene slike
      };

      div.appendChild(img);
      div.innerHTML += `
        <h3>${movie.Title}</h3>
        <p>${movie.Year}</p>
        <button onclick="viewDetails('${movie.imdbID}')">Detalji</button>
      `;
      moviesContainer.appendChild(div);
    });
  }

  // 🧩 Funkcija za primenu svih filtera
  async function applyFilters() {
    const selectedYear = yearFilter.value.trim();
    const selectedGenre = genreFilter.value;

    let filtered = allMovies;

    // Filtracija po godini
    if (selectedYear) {
      filtered = filtered.filter(movie => movie.Year == selectedYear);
    }

    // Filtracija po žanru
    if (selectedGenre) {
      // Dohvati detalje samo ako još nisu keširani
      if (detailedMoviesCache.length === 0) {
        try {
          detailedMoviesCache = await Promise.all(
            filtered.map(async movie => {
              const res = await fetch(
                `https://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`
              );
              return res.json();
            })
          );
        } catch (error) {
          console.error('Greška prilikom dohvata detalja:', error);
          detailedMoviesCache = [];
        }
      }

      filtered = detailedMoviesCache.filter(
        movie => movie.Genre && movie.Genre.includes(selectedGenre)
      );

      // Ako je izabrana i godina, dodatno filtriramo keširane detalje
      if (selectedYear) {
        filtered = filtered.filter(movie => movie.Year == selectedYear);
      }
    }

    displayMovies(filtered);
  }

  // Event listeneri za filtere
  yearFilter.addEventListener('input', applyFilters);
  genreFilter.addEventListener('change', applyFilters);
});

// Funkcija za detalje (isti kod kao ranije)
function viewDetails(id) {
  localStorage.setItem('selectedMovie', id);
  window.location.href = 'detailsMovie.html';
}
