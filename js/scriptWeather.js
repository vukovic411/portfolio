'use strict';

const apiKey = '08abfebead968c6f99db3bcd7caaa553';
const btn = document.getElementById('searchBtn');

btn.addEventListener('click', async function () {
  const city = document.getElementById('cityInput').value.trim();
  if (!city) {
    alert('Молимо унесите назив града!');
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=sr`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Град није пронађен!');

    const data = await response.json();
    console.log(data);

    // Popuni податке
    document.querySelector('.city').textContent = data.name;
    document.querySelector('.temperature').textContent =
      data.main.temp.toFixed(0);
    document.querySelector('.description').textContent =
      data.weather[0].description;

    // Постави иконицу
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    const iconEl = document.querySelector('.icon');
    iconEl.src = iconUrl;
    iconEl.style.display = 'inline';

    // Прикажи секцију
    document.querySelector('.weather').style.display = 'block';
  } catch (err) {
    alert(err.message);
    console.error(err);
  }
});
