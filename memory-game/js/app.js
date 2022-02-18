document.addEventListener('DOMContentLoaded', () => {
  const cardsArray = [
    {
      name: 'Tickatus',
      img: './assets/img/card1.png'
    },
    {
      name: 'Tickatus',
      img: './assets/img/card1.png'
    },
    {
      name: 'Vanndar',
      img: './assets/img/card2.png'
    },
    {
      name: 'Vanndar',
      img: './assets/img/card2.png'
    },
    {
      name: 'Varden',
      img: './assets/img/card3.png'
    },
    {
      name: 'Varden',
      img: './assets/img/card3.png'
    },
    {
      name: 'Brukan',
      img: './assets/img/card4.png'
    },
    {
      name: 'Brukan',
      img: './assets/img/card4.png'
    },
    {
      name: 'AlAkir',
      img: './assets/img/card5.png'
    },
    {
      name: 'AlAkir',
      img: './assets/img/card5.png'
    },
    {
      name: 'Akazamzarak',
      img: './assets/img/card6.png'
    },
    {
      name: 'Akazamzarak',
      img: './assets/img/card6.png'
    },
    {
      name: 'Aranna Starseeker',
      img: './assets/img/card7.png'
    },
    {
      name: 'Aranna Starseeker',
      img: './assets/img/card7.png'
    },
    {
      name: 'Galewing',
      img: './assets/img/card8.png'
    },
    {
      name: 'Galewing',
      img: './assets/img/card8.png'
    },
    {
      name: 'Alexstrasza',
      img: './assets/img/card9.png'
    },
    {
      name: 'Alexstrasza',
      img: './assets/img/card9.png'
    },
    {
      name: 'Afk',
      img: './assets/img/card10.png'
    },
    {
      name: 'Afk',
      img: './assets/img/card10.png'
    }
  ]

  let gridSize = 16;
  let cardsInGame = 16;
  function changeGridSize(event) {
    gridSize = event.target.getAttribute('data-grid-size');
    cardsInGame = gridSize;
    let btn = document.querySelectorAll('.size-btn');
    btn.forEach(i => i.classList.remove('active'))
    event.target.classList.add('active');
  }

  const startGameBtn = document.querySelector('.start-game');
  const gridSizeBtn = document.querySelector('.grid-size');
  gridSizeBtn.addEventListener('click', changeGridSize);
 
  function shuffleCards() {
    shuffleArr = cardsArray.slice(cardsArray.length - gridSize);
    shuffleArr.sort(() => {
      return 0.5 - Math.random();
    });
  }

  const gameMenuContainer = document.querySelector('.game-menu');
  const overflow = document.querySelector('.overflow');
  function gameMenu(state) {
    if (state == 'hide') {
      gameMenuContainer.classList.add(state);
      overflow.classList.add(state);
    } else {
      gameMenuContainer.classList.remove('hide');
      overflow.classList.remove('hide');
    }
  }
  gameMenu();

  const grid = document.querySelector('.grid');
  let selectedCards = [];
  let selectedCardsId = [];
  let scoreContainer = document.querySelector('.score span');
  let movesContainer = document.querySelector('.moves span');
  let playerNameInput = document.querySelector('.player-name input');
  let playerName = 'Player';

  /* COUNTERS */
  let score = 0;
  let moves = 0;
  let cardsOpen = 0;
  let lastGames = [];

  function createGrid() {
    grid.className = 'grid';
    grid.innerHTML = '';
    grid.classList.add(`grid-size-${gridSize}`);
    for (let i = 0; i < gridSize; i++) {
      let card = document.createElement('div');
      let backCard = document.createElement('img');
      let frontCard = document.createElement('img');

      card.setAttribute('id', i);
      backCard.classList.add('back-card');
      backCard.setAttribute('src', './assets/img/back.png');
      frontCard.classList.add('front-card');
      frontCard.setAttribute('src', shuffleArr[i].img);
      card.classList.add('card');
      card.appendChild(backCard);
      card.appendChild(frontCard);
      grid.appendChild(card);
    }
  }

  let lockGrid = false; 
  function flipCard() {
    if (lockGrid || this.classList.contains('open') || this.classList.contains('flip')) {
      return;
    }
    let cardId = this.getAttribute('id');
    this.classList.toggle('flip');
    selectedCards.push(shuffleArr[cardId].name);
    selectedCardsId.push(cardId);
    if (selectedCards.length == 2) {
      lockGrid = true;
      setTimeout(checkMatch, 300);
    }
  }

  function checkMatch() {
    const cards = document.querySelectorAll('.card');
    const cardOne = selectedCardsId[0];
    const cardTwo = selectedCardsId[1];
    if (selectedCards[0] === selectedCards[1]) {
      cards[cardOne].classList.add('flip');
      cards[cardOne].classList.add('open');
      cards[cardTwo].classList.add('open');
      score +=100;
      cardsOpen +=2;
    } else {
      cards[cardOne].classList.remove('flip');
      cards[cardTwo].classList.remove('flip');
      if (score != 0) {
        score -=50;
      }
    }
    selectedCards = [];
    selectedCardsId = [];
    lockGrid = false;
    moves++;
    movesContainer.textContent = moves;
    scoreContainer.textContent = score;
    console.log(cardsInGame);
    console.log(cardsOpen);
    console.log(lastGames);
    if (cardsInGame == cardsOpen) {
      if (lastGames.length === 10) {
        lastGames.pop();
      }
      lastGames.unshift({Name: playerName, Score: score, Moves: moves});
      setLocalStorage('lastGames', lastGames);
      gameEnd();
      console.log(lastGames);
    }
    
  }

  function gameStart() {
    shuffleCards();
    createGrid();
    gameMenu('hide');
    const cards = document.querySelectorAll('.card');
    cards.forEach((card) => {
      card.addEventListener('click', flipCard);
    });  
  }

  function gameEnd() {
    grid.innerHTML = '';
    movesContainer.textContent = 0;
    scoreContainer.textContent = 0;
    let resultContainer = document.querySelector('.results');
    let result = `
      <h3>${playerName}, your result:</h3>
      <p>Score: ${score}</p>
      <p>Moves: ${moves}</p>
    `;
    resultContainer.innerHTML = '';
    resultContainer.insertAdjacentHTML('beforeend', result);
    score = 0;
    moves = 0;
    cardsOpen = 0;
    gameMenu();
    showTableResults();
  }

  function setLocalStorage(key, value) {
    console.log(key)
    localStorage.setItem(key, JSON.stringify(value));
  }

  function getLocalStorage() {
    if (localStorage.getItem('lastGames')) {
      lastGames = JSON.parse(localStorage.getItem('lastGames'));
    }
    console.log(lastGames);
  }
  getLocalStorage();

  function showTableResults() {
    const table = document.querySelector('.table-result__body');
    table.innerHTML = '';
    if (lastGames.length === 0) {
      let noResults = `
        <td colspan="3">
          <h3 class="no-results">No results :(</h3>
        </td
      `; 
      table.insertAdjacentHTML('beforeend', noResults);
    } else {
      lastGames.forEach((item) => {
        let tableCell = `
        <tr>
          <td>${item.Name}</td>
          <td>${item.Score}</td>
          <td>${item.Moves}</td>
        </tr>`;
        table.insertAdjacentHTML('beforeend', tableCell);
      });
    }
    
  }
  startGameBtn.addEventListener('click', gameStart);
  showTableResults();
  playerNameInput.addEventListener('input', (event) => {
    console.log(event.target.value)
    playerName = event.target.value;
  });
});
