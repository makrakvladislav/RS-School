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

  const startGameBtn = document.querySelector('.start-game');
  const gridSizeBtn = document.querySelector('.grid-size');
  let gridSize = 16;
  let cardsInGame = 16;
  function changeGridSize(event) {
    console.log(event.target.getAttribute('data-grid-size'));
    gridSize = event.target.getAttribute('data-grid-size');
    cardsInGame = gridSize;
  }
  gridSizeBtn.addEventListener('click', changeGridSize);

  function shuffleCards() {
    let tempArr = cardsArray.slice(gridSize);
    /*
    cardsArray.sort(() => {
      return 0.5 - Math.random();
    });
    */
  }

  const grid = document.querySelector('.grid');
  let selectedCards = [];
  let selectedCardsId = [];
  let scoreContainer = document.querySelector('.score span');
  let movesContainer = document.querySelector('.moves span');
  let timerContainer = document.querySelector('.time');
  const gameEndContainer = document.querySelector('.game-end');
  const gameResetBtn = document.querySelector('.game-end__reset');
  let playerNameInput = document.querySelector('.player-name input');
  let playerName = 'Unknown';
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
      //card.setAttribute('data-name', cardsArray[i].name);

      backCard.classList.add('back-card');
      backCard.setAttribute('src', './assets/img/back.png');
      frontCard.classList.add('front-card');
      frontCard.setAttribute('src', cardsArray[i].img);

      card.classList.add('card');
      card.appendChild(backCard);
      card.appendChild(frontCard);
      grid.appendChild(card);
    }
  }

  //createGrid();

  let lockGrid = false; 
  function flipCard() {
    if (lockGrid || this.classList.contains('open') || this.classList.contains('flip')) {
      return;
    }
    //console.log(this);
    let cardId = this.getAttribute('id');
    this.classList.toggle('flip');
    selectedCards.push(cardsArray[cardId].name);
    selectedCardsId.push(cardId);
    //console.log(selectedCards);
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
      //console.log('Not');
      //console.log(cards[cardOne], cards[cardTwo])
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
    //console.log(cardsInGame);
    //console.log(cardsOpen);
    console.log(lastGames);
    if (cardsInGame == cardsOpen) {
      if (lastGames.length === 10) {
        lastGames.pop();
      }
      lastGames.unshift({Name: playerName, Score: score, Moves: moves});
      setLocalStorage('lastGames', lastGames);
      gameEnd('You WIN!');
      console.log(lastGames);
    }
    
  }

  function timer(duration, display) {
    let timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
            console.log('time out');
            gameEnd('Time is over');
        }
    }, 1000);
  }
  function stopTimer() {
    
  }

  function gameStart() {
    shuffleCards();
    createGrid();
    //timer(3, timerContainer);
    const cards = document.querySelectorAll('.card');
    cards.forEach((card) => {
      card.addEventListener('click', flipCard);
    });  
  }

  function gameEnd(gameEndText) {
    gameEndContainer.classList.add('show');
    const gameEndTitle = document.querySelector('.game-end__title');
    const gameEndScore = document.querySelector('.game-end__score');
    const gameEndMoves = document.querySelector('.game-end__moves');
    gameEndTitle.textContent = gameEndText;
    gameEndScore.textContent = score;
    gameEndMoves.textContent = moves;
    score = 0;
    moves = 0;
    cardsOpen = 0;
    cardsInGame = 0;
    showTableResults();
  }

  function gameReset() {
    gameStart();
    score = 0;
    moves = 0;
    movesContainer.textContent = 0;
    scoreContainer.textContent = 0;
    console.log('gameReset');
    gameEndContainer.classList.remove('show');
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
    const table = document.querySelector('.table-results');
    table.innerHTML = '';
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

  //gameStart();

  startGameBtn.addEventListener('click', gameStart);
  gameResetBtn.addEventListener('click', gameReset);
  showTableResults();
  playerNameInput.addEventListener('input', (event) => {
    console.log(event.target.value)
    playerName = event.target.value;
  });
});
