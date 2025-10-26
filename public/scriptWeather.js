'use strict';

const btn = document.getElementById('searchBtn');

btn.addEventListener('click', async function () {
  const city = document.getElementById('cityInput').value.trim();
  if (!city) {
    alert('Молимо унесите назив града!');
    return;
  }

  try {
    const response = await fetch(`/weather?city=${encodeURIComponent(city)}`);
    if (!response.ok) throw new Error('Град није пронађен!');

    const data = await response.json();

    document.querySelector('.city').textContent = data.name;
    document.querySelector('.temperature').textContent =
      data.main.temp.toFixed(0);
    document.querySelector('.description').textContent =
      data.weather[0].description;

    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    const iconEl = document.querySelector('.icon');
    iconEl.src = iconUrl;
    iconEl.style.display = 'inline';

    document.querySelector('.weather').style.display = 'block';
  } catch (err) {
    alert(err.message);
    console.error(err);
  }
});
