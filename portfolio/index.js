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
preloadImages();

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
const themeModeWrapper = document.querySelector('.header__theme-mode');
const themeModeButton = document.querySelector('.theme-mode__toggler');
let themeName = body.className;

function toggleThemeMode() {
  themeModeWrapper.classList.toggle('active');
  body.classList.toggle('light-theme');
  themeName = body.className;
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
 
  if (localStorage.getItem('theme')) {
    themeName = localStorage.getItem('theme');
    console.log(themeName);
  }
}
window.addEventListener('load', getLocalStorage)


console.log('Score: 100 / 100\n' +
  '-[X] Вёрстка валидная +10\n' +
  '  - для проверки валидности вёрстки используйте сервис https://validator.w3.org/\n' +
  '  - валидной вёрстке соответствует надпись "Document checking completed. No errors or warnings to show." В таком случае баллы за пункт требований выставляем полностью.\n' +
  '  - если есть предупреждения - warnings, но нет ошибок - errors, выставляем половину баллов за пункт требований\n' +
  '-[X] Вёрстка семантическая +20\n' +
  '  В коде странице присутствуют следующие элементы (указано минимальное количество, может быть больше):\n' +
  '   - <header>, <main>, <footer> +2\n' +
  '   - шесть элементов <section> (по количеству секций) +2\n' +
  '   - только один заголовок <h1> +2\n' +
  '   - пять заголовков <h2> (количество секций минус одна, у которой заголовок <h1>) +2\n' +
  '   - один элемент <nav> (панель навигации) +2\n' +
  '   - два списка ul > li > a (панель навигации, ссылки на соцсети) +2\n' +
  '   - десять кнопок <button> +2\n'+
  '   - два инпута: <input type="email"> и <input type="tel"> +2\n' +
  '   - один элемент <textarea> +2\n' +
  '   - три атрибута placeholder +2\n' +
  '-[X] Вёрстка соответствует макету +48\n' +
  ' - блок <header> +6\n' +
  ' - секция hero +6\n' +
  ' - секция skills +6\n' +
  ' - секция portfolio +6\n' +
  ' - секция video +6\n' +
  ' - секция price +6\n' +
  ' - секция contacts +6\n' +
  ' - блок <footer> +6\n' +
  '-[X] Требования к css + 12\n' +
  ' - для построения сетки используются флексы или гриды +2\n' +
  ' - при уменьшении масштаба страницы браузера вёрстка размещается по центру, а не сдвигается в сторону +2\n' +
  ' - фоновый цвет тянется на всю ширину страницы +2\n' +
  ' - иконки добавлены в формате .svg. SVG может быть добавлен любым способом. Обращаем внимание на формат, а не на способ добавления +2\n' +
  ' - изображения добавлены в формате .jpg +2\n' +
  ' - есть favicon +2\n' +
  '-[X] Интерактивность, реализуемая через css +20\n' +
  ' - плавная прокрутка по якорям +5\n' +
  ' - ссылки в футере ведут на гитхаб автора проекта и на страницу курса https://rs.school/js-stage0/ +5\n' +
  ' - интерактивность включает в себя не только изменение внешнего вида курсора, например, при помощи свойства cursor: pointer, но и другие визуальные эффекты, например, изменение цвета фона или цвета шрифта. Если в макете указаны стили при наведении и клике, для элемента указываем эти стили. Если в макете стили не указаны, реализуете их по своему усмотрению, руководствуясь общим стилем макета +5\n' +
  ' - обязательное требование к интерактивности: плавное изменение внешнего вида элемента при наведении и клике не влияющее на соседние элементы +5');

console.log(
  'Score: 85 / 75\n' +
  `-[X] Вёрстка соответствует макету. Ширина экрана 768px +48` +
  `  - блок <header> +6\n` +
  `  - секция hero +6\n` +
  `  - секция skills +6\n` +
  `  - секция portfolio +6\n` +
  `  - секция video +6\n` +
  `  - секция price +6\n` +
  `  - секция contacts +6\n` +
  `  - блок <footer> +6\n` +
  `-[X] Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки +15\n` +
  `  - нет полосы прокрутки при ширине страницы от 1440рх до 768рх +5\n` +
  `  - нет полосы прокрутки при ширине страницы от 768рх до 480рх +5\n` +
  `  - нет полосы прокрутки при ширине страницы от 480рх до 320рх +5\n` +
 `-[X] На ширине экрана 768рх и меньше реализовано адаптивное меню +22\n` +
  `  - при ширине страницы 768рх панель навигации скрывается, появляется бургер-иконка +2\n` +
  `  - при нажатии на бургер-иконку справа плавно появляется адаптивное меню, бургер-иконка изменяется на крестик +4\n` +
  `  - высота адаптивного меню занимает всю высоту экрана. При ширине экрана 768-620рх вёрстка меню соответствует макету, когда экран становится уже, меню занимает всю ширину экрана +4\n` +
  `  - при нажатии на крестик адаптивное меню плавно скрывается уезжая за правую часть экрана, крестик превращается в бургер-иконку +4\n` +
  `  - бургер-иконка, которая при клике превращается в крестик, создана при помощи css-анимаций без использования изображений +2\n` +
  `  - ссылки в адаптивном меню работают, обеспечивая плавную прокрутку по якорям +2\n` +
  `  - при клике по ссылке в адаптивном меню адаптивное меню плавно скрывается, - - - крестик превращается в бургер-иконку +4\n`);