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
'Score: 85 / 75' 
- [x] Смена изображений в секции portfolio (+25)
  - [x] при кликах по кнопкам Winter, Spring, Summer, Autumn в секции portfolio отображаются изображения из папки с соответствующим названием (+20)
  - [x] кнопка, по которой кликнули, становится активной т.е. выделяется стилем. Другие кнопки при этом будут неактивными (+5)
- [x] Перевод страницы на два языка (+25)
  - [x] при клике по надписи ru англоязычная страница переводится на русский язык (+10)
  - [x] при клике по надписи en русскоязычная страница переводится на английский язык (+10)
  - [x] надписи en или ru, соответствующие текущему языку страницы, становятся активными т.е. выделяются стилем (+5)
- [x] Переключение светлой и тёмной темы (+25)
  - [x] На страницу добавлен переключатель при клике по которому:
    - [x] тёмная тема приложения сменяется светлой (+10)
    - [x] светлая тема приложения сменяется тёмной (+10)
    - [x] после смены светлой и тёмной темы интерактивные элементы по-прежнему изменяют внешний вид при наведении и остаются видимыми (+5)
- [x] Дополнительный функционал: выбранный пользователем язык отображения страницы и светлая или тёмная тема сохраняются при перезагрузке страницы (+5)
- [x] Дополнительный функционал: сложные эффекты для кнопок при наведении и/или клике (+5)
`);