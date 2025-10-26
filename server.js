// server.js
import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

// služi statičke fajlove (HTML, CSS, JS)
app.use(express.static('public'));

// endpoint koji poziva OpenWeather API sa servera
app.get('/weather', async (req, res) => {
  const city = req.query.city;
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!city) return res.status(400).json({ error: 'City required' });

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=sr`
    );

    if (!response.ok) throw new Error('Град није пронађен!');

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

// MOVIES
app.get('/movies', async (req, res) => {
  const { query, id } = req.query;
  const apiKey = process.env.OMDB_API_KEY;

  if (!query && !id)
    return res.status(400).json({ error: 'Query or ID required' });

  try {
    let url;
    if (id) {
      // detalji za jedan film
      url = `https://www.omdbapi.com/?apikey=${apiKey}&i=${id}&plot=full`;
    } else {
      // pretraga po nazivu
      url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(
        query
      )}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    if (data.Response === 'False') {
      return res.status(404).json({ error: data.Error });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
