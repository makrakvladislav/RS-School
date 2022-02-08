const apiKey = 'api_key=1939abe3d00976407f86acd63c341f94';
const baseUrl = 'https://api.themoviedb.org/3';
const url = baseUrl + '/discover/movie?sort_by=popularity.desc&'+apiKey;
const searchUrl = baseUrl + '/search/movie?'+apiKey;
//http://api.themoviedb.org/3/movie/157336/videos?api_key=1939abe3d00976407f86acd63c341f94
//search/movie?query=matrix&api_key=1939abe3d00976407f86acd63c341f94&append_to_response=videos
//search/movie?query=matrix&api_key=1939abe3d00976407f86acd63c341f94
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
    const img = element.poster_path;
    const title = element.title;
    const rating = element.vote_average;
    const overview = element.overview;
    const id = element.id;
    //const video = element.videos.results[0].key;
    //console.log(element[index].videos.results[0].key);
    //let dynamicHeight = Math.ceil(Math.random() * 30) + 100;
    const cardTemplate = `<div class="movie card" data-id="${id}">
    <img class="card__img" src="https://image.tmdb.org/t/p/w500/${img}" alt="${title}">
    <div class="card__info-wrapper">
      <div class="card__info">
        <h3 class="card__title">${title}</h3>
        <span class="card__rating">${rating}</span>
      </div>
    </div>  
    <div class="card__overview">${overview}</div>
    </div>`
   
    moviesList.insertAdjacentHTML('beforeend', cardTemplate);
  });

  /*
  const card = document.querySelectorAll('.card');
  card.forEach(item => {
    item.addEventListener('click', (event) => {
      console.log(`${event.target} click`);
      let currentId = event.target.getAttribute('data-id');
      console.log(currentId);
      previewData(`http://api.themoviedb.org/3/movie/${currentId}?api_key=1939abe3d00976407f86acd63c341f94&append_to_response=videos`);
      
    });
  });
  */

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