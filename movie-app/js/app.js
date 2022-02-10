const apiKey = 'api_key=1939abe3d00976407f86acd63c341f94';
const baseUrl = 'https://api.themoviedb.org/3';
const url = baseUrl + '/discover/movie?sort_by=popularity.desc&'+apiKey;
const searchUrl = baseUrl + '/search/movie?'+apiKey;

const form = document.getElementById('search-form');
const search = document.getElementById('search');
const clearFormBtn =  document.querySelector('.form__clear');
const moviePage = document.querySelector('.overlay-content');

getData(url);

async function getData(url) {
  const res = await fetch(url);
  const data = await res.json();
  showData(data.results)
}

getPosterData();

const posterContainer = document.querySelector('.poster__wrapper');
function getPosterData() {
  fetch(baseUrl+'/discover/movie/?'+apiKey+'&with_genres=28'+'&append_to_response=videos&region=US').then(res => res.json()).then(data => {
  posterContainer.innerHTML = '';
  console.log(data);
  showPoster(data);
  });
}

function dateConverter(data) {
  return data.split('-').reverse().join('.')
}

function showPoster(data) {
  console.log(data.results[0]);
  let idMovie = Math.floor(Math.random() * (20 - 0 + 1) + 0);
  let dataPoster = data.results[idMovie];
  const posterTitle = dataPoster.title;
  const poster = dataPoster.backdrop_path === null ? 'https://via.placeholder.com/420?text=No+photo' : `https://image.tmdb.org/t/p/w1280/${dataPoster.backdrop_path}`;
  posterContainer.style.backgroundImage = `url('${poster}')`;
  const movieDate = dateConverter(dataPoster.release_date);
  const posterTemplate = `
    <h2 class="poster__title">${posterTitle}</h2>
    <div class="poster__info">
      <span>Raiting: ${dataPoster.vote_average}</span>
      <span>Votes: ${dataPoster.vote_count}</span>
      <span>Release date: ${movieDate}</span>
    </div>
    <p class="poster__overview">${dataPoster.overview}</p>
  `
  posterContainer.insertAdjacentHTML('beforeend', posterTemplate);
}

function showData(data) {
  console.log(data);
  const moviesList = document.querySelector('.movies__list');
  moviesList.innerHTML = '';

  if (data.length == 0) {
    console.log('No results found');
    moviesList.insertAdjacentHTML('beforeend', `<h3>No results found</h3>`);
  }
  
  data.forEach((element) => {

    const moviePoster = element.poster_path === null ? 'https://via.placeholder.com/420?text=No+photo' : `https://image.tmdb.org/t/p/w500/${element.poster_path}`;
    const movieTitle = element.title;
    const movieRating = element.vote_average;
    const movieOverview = element.overview;
    const movieId = element.id;

    let ratingColor;
    if (movieRating >= 7.5) {
      ratingColor = 'green';
    } else if (movieRating < 7.5 && movieRating > 4.5) {
      ratingColor = 'orange';
    } else {
      ratingColor = 'red';
    }

    const movieCardTemplate = `<div class="movie card">
    <img class="card__img" src="${moviePoster}" alt="${movieTitle}">
    <div class="card__info-wrapper">
      <div class="card__info">
        <h3 class="card__title">${movieTitle}</h3>
        <span class="card__rating ${ratingColor}">${movieRating}</span>
      </div>
      <button id="${movieId}" class="btn card__more-info">More info</button>
    </div>  
    <div class="card__overview">
    <h3>The overview</h3>
    ${movieOverview}
    </div>
    </div>`

    moviesList.insertAdjacentHTML('beforeend', movieCardTemplate);
    document.getElementById(movieId).addEventListener('click', () => {
      showMoviePage(element);
    });
  });
}


function showMoviePage(element) {
  let id = element.id;
  fetch(baseUrl+'/movie/'+id+'?'+apiKey+'&append_to_response=videos').then(res => res.json()).then(data => {
    console.log(data);
    fetch(baseUrl+'/movie/'+id+'/credits?'+apiKey+'&append_to_response=videos').then(res => res.json()).then(credits => {
      moviePage.innerHTML = '';
      const movieDate = new Date(`${data.release_date}`);

      let movieTrailer = '';
      if (data.videos.results.length > 0) {
        trailerId = data.videos.results[0].key;
        movieTrailer = `<div class="movie-trailer">
          <iframe src="https://www.youtube.com/embed/${trailerId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>`;
      } 

      let movieGenres = data.genres.map((element) => {
        console.log(element.name);
        return `<button class="genres-btn btn" id="${element.id}">${element.name}</button>`
      }).join('');

      let movieCountries = data.production_countries.map((element) => {
        return element.name;
      }).join(''); 

      let movieHomePage; 
      if (data.homepage === null || data.homepage.length == 0) {
        movieHomePage = '';
      } else {
        movieHomePage = `<a href="${data.homepage}" class="btn" target="_blank">Learn to more</a>`;
      }

      let movieCast = credits.cast.map((element) => {
        let img;
        if (element.profile_path === null) {
          img = 'https://via.placeholder.com/150?text=No+photo';
        } else {
          img = `https://image.tmdb.org/t/p/w500/${element.profile_path}`;
        }
        return `<li>
        <img src= '${img}' class="actor-photo" title="${element.name}">
        <div  class="actor-name">
          <a href='https://www.google.com/search?q=${element.name}' target="_blank">${element.name}</a>
          <span>as ${element.character}</span>
        </div>
        </li>`
      }).slice(0, 10).join('');

      const moviePageTemplate = `
        <div class="movie-info">
          <div class="movie-info-wrapper">
            <div class="movie-overview-wrapper">
            <div class="movie-title"><h3>${data.title}</h3></div>
            <div class="movie-description">
              <span class="description-item">${data.vote_average}/10</span>
              <span class="description-item">${movieDate.getFullYear()} ${movieCountries}</span>
              <div class="movie-genres">
                ${movieGenres}
              </div>
            </div>
              <div class="movie-overview">
                <p>${data.overview}</p>
                ${movieHomePage}
              </div>
              ${movieTrailer}
            </div>  
            <div class="movie-actors">
              <h3>Top cast</h3>
              <ul class="actors-list">
                ${movieCast}
              </ul>
            </div>
          </div>
        </div>` 
        moviePage.insertAdjacentHTML('beforeend', moviePageTemplate);

        const genresBtns = document.querySelector('.movie-genres');
        genresBtns.addEventListener('click', getGenreData);

        async function getGenreData(event) {
          let idCollection = event.target.getAttribute('id');
          const res = await fetch(baseUrl+'/discover/movie/?'+apiKey+'&with_genres='+idCollection);
          const data = await res.json();
          moviePage.innerHTML = '';
          closePopup();
          showData(data.results)
          window.scrollTo({
            top: 600,
            behavior: "smooth"
          });
        }

      });
  });
  document.querySelector('.overlay').style.display = "block";
  document.body.classList.toggle('overlay-open');
}

document.querySelector('.overlay-close').addEventListener('click', closePopup);
function closePopup (){
  document.querySelector('.overlay').style.display = "none";
  moviePage.innerHTML = '';
  document.body.classList.toggle('overlay-open');
}

window.onload = function() {
  search.focus();
}

form.addEventListener('submit', (event) =>{
  event.preventDefault();
  const searchQuery = search.value;
  if (searchQuery) {
    getData(searchUrl+'&query='+searchQuery);
    search.value = searchQuery;
    window.scrollTo({
      top: 600,
      behavior: "smooth"
    });
  } else {
    getData(url);
  }
});

search.addEventListener("input", function(){ 
  if (search.value.length > 0) {
    clearFormBtn.classList.add('show');
  } else {
    clearFormBtn.classList.remove('show');
  }
});

clearFormBtn.addEventListener("click", function(event){
  event.preventDefault();
  search.value = '';
  clearFormBtn.classList.remove('show');
});
