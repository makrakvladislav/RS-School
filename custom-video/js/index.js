import i18Obj from './translate.js';

/* OPEN/CLOSE MENU */
const body = document.body;
const hamburger = document.querySelector('.header__hamburger');
const menuWrapper = document.querySelector('.header');
const nav = document.querySelector('.nav__list');

function toggleMenu() {
  menuWrapper.classList.toggle('open');
  body.classList.toggle('menu-open');
}
hamburger.addEventListener('click', toggleMenu);

function closeMenu(event) {
  if (event.target.classList.contains('nav__link')) {
    menuWrapper.classList.remove('open');
    body.classList.remove('menu-open');
  }
}
nav.addEventListener('click', closeMenu);

/* CHANGE CLASS ACTIVE BUTTON */
function changeClassActive(activeClass) {
  const button = document.querySelectorAll(`.${event.target.classList[0]}`);
  button.forEach(i => i.classList.remove(activeClass));
  event.target.classList.add(activeClass);      
}

/* CHANGE PORTFOLIO IMAGES  */
const portfolioBtns = document.querySelector('.tabs__head');
const portfolioImages = document.querySelectorAll('.item__image');

function changeImage(event) {
  if(event.target.classList.contains('tabs__item')) {
    changeClassActive('active'); 
    portfolioImages.forEach((img, index) => img.src = `./assets/img/${event.target.dataset.season}/${index + 1}.jpg`);
  }
}
portfolioBtns.addEventListener('click', changeImage);

/* IMAGE CACHING */
const seasons = ['winter', 'spring', 'summer', 'autumn'];
function preloadImages() {
  seasons.forEach((item) => {
    for(let i = 1; i <= 6; i++) {
      const img = new Image();
      img.src = `./assets/img/${item}/${i}.jpg`;
    }
  })
}

/* PAGE TRASNLATE */
function getTranslate(language) {
  const arr = i18Obj;
  const translateElements = document.querySelectorAll('[data-i18]').forEach(item => {
    const key = item.dataset.i18;
    if (item.placeholder) {
      item.placeholder = arr[language][key];
    } else {
      item.textContent = arr[language][key];
    }
  });
}

const languageButtons = document.querySelectorAll('.language__item');
let lang = 'en';
languageButtons.forEach(item => {
  item.addEventListener('click', () => {
    const key = event.target.dataset.language;
    lang = key;
    changeClassActive('active'); 
    getTranslate(key);
  });
});

/* SWITCHER PAGE MODE DARK/LIGHT */
const pageWrapper = document.documentElement;
const themeModeWrapper = document.querySelector('.header__theme-mode');
const themeModeButton = document.querySelector('.theme-mode__toggler');
let themeName = pageWrapper.className;

function toggleThemeMode() {
  themeModeWrapper.classList.toggle('active');
  pageWrapper.classList.toggle('light-theme');
  themeName = pageWrapper.className;
}
themeModeButton.addEventListener('click', toggleThemeMode);

/* SAVE TO LOCAL STORAGE */
function setLocalStorage() {
  localStorage.setItem('lang', lang);
  localStorage.setItem('theme', themeName);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem('lang')) {
    lang = localStorage.getItem('lang');
    document.querySelectorAll('[data-language]').forEach(item => {
      const key = item.dataset.language;
      item.classList.remove('active')
      if (key === lang) {
        item.classList.add('active'); 
      }
    })
    getTranslate(lang);
  }
}
window.addEventListener("DOMContentLoaded", (e) => {
  getLocalStorage();
  preloadImages();
});

console.log(`
'Score: 70 / 60' 
- [x] Вёрстка (+10)
  - [x] вёрстка видеоплеера: есть само видео, в панели управления есть кнопка Play/Pause, прогресс-бар, кнопка Volume/Mute, регулятор громкости звука (+5)
  - [x] в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс (+5)
- [x] Кнопка Play/Pause на панели управления (+10)
  - [x] при клике по кнопке Play/Pause запускается или останавливается проигрывание видео (+5)
  - [x] внешний вид и функционал кнопки изменяется в зависимости от того, проигрывается ли видео в данный момент (+5)
- [x] Прогресс-бар отображает прогресс проигрывания видео. При перемещении ползунка прогресс-бара вручную меняется текущее время проигрывания видео. Разный цвет прогресс-бара до и после ползунка (+10)
- [x] При перемещении ползунка регулятора громкости звука можно сделать звук громче или тише. Разный цвет регулятора громкости звука до и после ползунка (+10)
- [x] При клике по кнопке Volume/Mute можно включить или отключить звук. Одновременно с включением/выключением звука меняется внешний вид кнопки. Также внешний вид кнопки меняется, если звук включают или выключают перетягиванием регулятора громкости звука от нуля или до нуля (+10)
- [x] Кнопка Play/Pause в центре видео (+10)
  - [x] есть кнопка Play/Pause в центре видео при клике по которой запускается видео и отображается панель управления (+5)
  - [x] когда видео проигрывается, кнопка Play/Pause в центре видео скрывается, когда видео останавливается, кнопка снова отображается (+5)
- [x] Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения (+10)
  - [x] высокое качество оформления приложения предполагает собственное оригинальное оформление равное или отличающееся в лучшую сторону по сравнению с демо
`);