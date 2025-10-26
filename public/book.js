'use script';
const btn = document.getElementById('searchBtn');
const bookContainer = document.getElementById('bookContainer');
const loader = document.getElementById('loader');

btn.addEventListener('click', async function () {
  const book = document.getElementById('searchInput').value.trim();

  if (!book) {
    alert('Молимо унесите назив књиге!');
    return;
  }

  const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(
    book
  )}`;

  try {
    // Прикажи loader
    loader.style.display = 'block';
    bookContainer.innerHTML = '';

    const response = await fetch(url);
    if (!response.ok) throw new Error('Грешка при приступу API-ју');

    const data = await response.json();
    console.log(data);

    if (data.docs.length === 0) {
      alert('Ниједна књига није пронађена.');
      loader.style.display = 'none';
      return;
    }

    data.docs.slice(0, 10).forEach(book => {
      const title = book.title || 'Непознат наслов';
      const author = book.author_name ? book.author_name[0] : 'Непознат аутор';
      const year = book.first_publish_year || 'Непозната година';
      const coverId = book.cover_i;

      const coverUrl = coverId
        ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
        : 'https://via.placeholder.com/200x280?text=No+Cover';

      const card = document.createElement('div');
      card.classList.add('book-card');
      card.innerHTML = `
        <img src="${coverUrl}" alt="${title}" />
        <h3>${title}</h3>
        <p>${author}</p>
        <p>${year}</p>
      `;

      bookContainer.appendChild(card);
    });
  } catch (error) {
    console.error(error);
    alert('Дошло је до грешке приликом претраге.');
  } finally {
    // Сакриј loader кад се све заврши
    loader.style.display = 'none';
  }
});
