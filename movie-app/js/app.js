const apiKey = 'api_key=1939abe3d00976407f86acd63c341f94';
const baseUrl = 'https://api.themoviedb.org/3';
const url = baseUrl + '/discover/movie?sort_by=popularity.desc&'+apiKey;
const searchUrl = baseUrl + '/search/movie?'+apiKey;
//http://api.themoviedb.org/3/movie/157336/videos?api_key=1939abe3d00976407f86acd63c341f94
//search/movie?query=matrix&api_key=1939abe3d00976407f86acd63c341f94&append_to_response=videos
//search/movie?query=matrix&api_key=1939abe3d00976407f86acd63c341f94
//'&language=ru'
const form = document.getElementById('search-form');
const search = document.getElementById('search');

getData(url);

async function getData(url) {
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  showData(data.results)
}

function showData(data) {

  //const video = data.videos.results[0].key;
  //console.log(video);

  const moviesList = document.querySelector('.movies__list');
  console.log(data);
  moviesList.innerHTML = '';
  data.forEach((element) => {
    let img = '';
    if (element.poster_path === null) {
      img = 'https://via.placeholder.com/420?text=No+photo';
    } else {
      img = `https://image.tmdb.org/t/p/w500/${element.poster_path}`;
    }
    const title = element.title;
    const rating = element.vote_average;
    const overview = element.overview;
    const id = element.id;
    let ratingColor = '';
    if (rating >= 7.5) {
      ratingColor = 'green';
    } else if (rating < 7.5 && rating > 4.5) {
      ratingColor = 'orange';
    } else {
      ratingColor = 'red';
    }
    //const video = element.videos.results[0].key;
    //console.log(element[index].videos.results[0].key);
    //let dynamicHeight = Math.ceil(Math.random() * 30) + 100;
    const cardTemplate = `<div class="movie card">
    <img class="card__img" src="${img}" alt="${title}">
    <div class="card__info-wrapper">
      <div class="card__info">
        <h3 class="card__title">${title}</h3>
        <span class="card__rating ${ratingColor}">${rating}</span>
      </div>
      <button id="${id}" class="btn card__more-info">More info</button>
    </div>  
    <div class="card__overview">
    <h3>The overview</h3>
    ${overview}
    </div>
    </div>`

    moviesList.insertAdjacentHTML('beforeend', cardTemplate);
    document.getElementById(id).addEventListener('click', () => {
      showPopup(element);
    });
  });
}
const moviePage = document.querySelector('.overlay-content');

function showPopup(element) {
  let id = element.id;
  //https://api.themoviedb.org/3/movie/524434/?api_key=1939abe3d00976407f86acd63c341f94&append_to_response=videos
  //http://api.themoviedb.org/3/movie/157336?api_key=###&append_to_response=videos
  //+'&append_to_response=videos'
  //credits
  fetch(baseUrl + '/movie/'+id+'?'+apiKey+'&append_to_response=videos').then(res => res.json()).then(data => {
    console.log(data);
    fetch(baseUrl + '/movie/'+id+'/credits?'+apiKey+'&append_to_response=videos').then(res => res.json()).then(credits => {
      console.log(element.title);
      console.log(credits);
      //console.log(data);
      
      const movieDate = new Date(`${data.release_date}`);
      //let trailerId = '';
      let trailer = '';
      moviePage.innerHTML = '';
      
      if (data.videos.results.length > 0) {
        trailerId = data.videos.results[0].key;
        trailer = `<div class="movie-trailer">
          <iframe src="https://www.youtube.com/embed/${data.videos.results[0].key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>`;
      } 

      //let arrGenres = [];
      /*
      data.genres.forEach((element) => {
        movieGenres.push(element.name);
      });
      */

      let movieGenres = data.genres.map((element) => {
        console.log(element.name);
        return `<span>${element.name}</span>`
      }).join('');

      console.log(movieGenres);

      let movieCountries = [];
      data.production_countries.forEach((element) => {
        movieCountries.push(element.name);
      });

      let homePage = '';
      if (data.homepage === null) {
        homePage = '';
      } else {
        homePage = `<a href="${data.homepage}" class="btn" target="_blank">Learn to more</a>`;
      }
      //movieGenres = movieGenres.join(', ');
      movieCountries = movieCountries.join(', ');

      /*
      let movieCast = [];
      credits.cast.forEach((element) => {
        movieCast.push(element.name);
      });
      */
      let arrCast = credits.cast.slice(0, 10);
      let movieCast = arrCast.map((element) => {
        //console.log(element.name);
        let img = '';
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
      }).join('');

      //console.log(movieCast);
      console.log(element.title)
      const pageTemplate = `
        
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
                ${homePage}
              </div>
              ${trailer}
            </div>  
              
            <div class="movie-actors">
              <h3>Top cast</h3>
              <ul class="actors-list">
                ${movieCast}
              </ul>
            </div>
          </div>
        </div>`
        
      moviePage.insertAdjacentHTML('beforeend', pageTemplate);
    });
  });

  document.querySelector('.overlay').style.display = "block";
  document.body.classList.toggle('overlay-open');
}


document.querySelector('.overlay-close').addEventListener('click', closePopup);

function closePopup () {
  document.querySelector('.overlay').style.display = "none";
  moviePage.innerHTML = '';
  document.body.classList.toggle('overlay-open');
}

function previewData(data) {
  const card = document.querySelectorAll('.card');
  card.forEach(item => {
    item.addEventListener('click', (event) => {
      console.log(`${event.target} click`);
      let currentId = event.target.getAttribute('data-id');
      console.log(currentId);
      previewData(`http://api.themoviedb.org/3/movie/${currentId}?api_key=1939abe3d00976407f86acd63c341f94&append_to_response=videos`);
    });
  });
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
  } else {
    getData(url);
  }
})





  //const videoContainer = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${video}"></iframe>`


  //moviesList.insertAdjacentHTML('beforeend', videoContainer);
/*
  const imgContainer = `<img class="card__img" src="https://image.tmdb.org/t/p/w500/${img}" alt="${title}">`;
  const titleContainer = `<div class="card__info"><h3 class="card__title">${title}</h3>`;
  const ratingContainer = `<span class="card__rating">${rating}</span>`
  const overviewContainer = `<div class="card__overview">${overview}</div>`
  */

/*
<iframe width="560" height="315"
src="https://www.youtube.com/embed/KlyknsTJk0w">
</iframe>
*/