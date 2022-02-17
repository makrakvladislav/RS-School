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

  cardsArray.sort(() => {
    return 0.5 - Math.random();
  });


  const grid = document.querySelector('.grid');
  
  let selectedCards = [];
  let selectedCardsId = [];
  let scoreContainer = document.querySelector('.score span');
  let movesContainer = document.querySelector('.moves span');
  let timerContainer = document.querySelector('.time');

  /* COUNTERS */
  let score = 0;
  let moves = 0;
  let cardsOpen = 0;
  const cardsInGame = 20;

  function createGrid() {
    for (let i = 0; i < cardsArray.length; i++) {
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

  createGrid();

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
    console.log(cardsOpen);
    if (cardsInGame === cardsOpen) {
      console.log('YOU WIN!!');
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
        }
    }, 1000);
  }

  timer(3, timerContainer);

  const cards = document.querySelectorAll('.card');
  cards.forEach((card) => {
    card.addEventListener('click', flipCard);
  });


});
