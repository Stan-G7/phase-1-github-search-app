document.addEventListener('DOMContentLoaded', () => {
  const movieList = document.getElementById('movie-list');
  const movieDetails = document.getElementById('movie-details');

  // Function to fetch movie data from the server
  const fetchMovieData = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log('Error:', error);
    }
  };

  // Function to display movie details
  const displayMovieDetails = (movie) => {
    movieDetails.innerHTML = `
      <img src="${movie.poster}" alt="${movie.title} Poster">
      <h2>${movie.title}</h2>
      <p>Runtime: ${movie.runtime} minutes</p>
      <p>Showtime: ${movie.showtime}</p>
      <p>Tickets Available: ${movie.capacity - movie.tickets_sold}</p>
      <p>Description: ${movie.description}</p>
    `;
  };

  // Function to display movie list
  const displayMovieList = (movies) => {
    movieList.innerHTML = movies
      .map((movie) => `<li class="film-item" data-id="${movie.id}">${movie.title}</li>`)
      .join('');
  };

  // Fetch the movie list and display the first movie's details
  fetchMovieData('http://localhost:3000/films')
    .then((movies) => {
      displayMovieList(movies);
      return fetchMovieData('http://localhost:3000/films/1');
    })
    .then((movie) => {
      displayMovieDetails(movie);
    })
    .catch((error) => {
      console.log('Error:', error);
    });

  // Add event listener to movie list
  movieList.addEventListener('click', (event) => {
    if (event.target.matches('.film-item')) {
      const movieId = event.target.dataset.id;
      const url = `http://localhost:3000/films/${movieId}`;
      fetchMovieData(url)
        .then((movie) => {
          displayMovieDetails(movie);
        })
        .catch((error) => {
          console.log('Error:', error);
        });
    }
  });
});
