const i18Obj = {
  'en': {
    'skills': 'Skills',
    'portfolio': 'Portfolio',
    'video': 'Video',
    'price': 'Price',
    'contacts': 'Contacts',
    'hero-title': 'Alexa Rise',
    'hero-text': 'Save sincere emotions, romantic feelings and happy moments of life together with professional photographer Alexa Rise',
    'hire': 'Hire me',
    'skill-title-1': 'Digital photography',
    'skill-text-1': 'High-quality photos in the studio and on the nature',
    'skill-title-2': 'Video shooting',
    'skill-text-2': 'Capture your moments so that they always stay with you',
    'skill-title-3': 'Rotouch',
    'skill-text-3': 'I strive to make photography surpass reality',
    'skill-title-4': 'Audio',
    'skill-text-4': 'Professional sounds recording for video, advertising, portfolio',
    'winter': 'Winter',
    'spring': 'Spring',
    'summer': 'Summer',
    'autumn': 'Autumn',
    'price-sub-title-standart': 'Standpart',
    'price-sub-title-premium': 'Premium',
    'price-sub-title-gold': 'Gold',
    'price-sub-title-standart-value': '500 $',
    'price-sub-title-premium-value': '700 $',
    'price-sub-title-gold-value': '1000 $',
    'price-description-1-span-1': 'One location',
    'price-description-1-span-2': '120 photos in color',
    'price-description-1-span-3': '12 photos in retouch',
    'price-description-1-span-4': 'Readiness 2-3 weeks',
    'price-description-1-span-5': 'Make up, visage',
    'price-description-2-span-1': 'One or two locations',
    'price-description-2-span-2': '200 photos in color',
    'price-description-2-span-3': '20 photos in retouch',
    'price-description-2-span-4': 'Readiness 1-2 weeks',
    'price-description-2-span-5': 'Make up, visage',
    'price-description-3-span-1': 'Three locations or more',
    'price-description-3-span-2': '300 photos in color',
    'price-description-3-span-3': '50 photos in retouch',
    'price-description-3-span-4': 'Readiness 1 week',
    'price-description-3-span-5': 'Make up, visage, hairstyle',
    'order': 'Order shooting',
    'contact-me': 'Contact me',
    'placeholder-email': 'E-mail',
    'placeholder-phone': 'Phone',
    'placeholder-message': 'Message',
    'send-message': 'Send message'
  },
  'ru': {
    'skills': 'Навыки',
    'portfolio': 'Портфолио',
    'video': 'Видео',
    'price': 'Цены',
    'contacts': 'Контакты',
    'hero-title': 'Алекса Райс',
    'hero-text': 'Сохраните искренние эмоции, романтические переживания и счастливые моменты жизни вместе с профессиональным фотографом',
    'hire': 'Пригласить',
    'skill-title-1': 'Фотография',
    'skill-text-1': 'Высококачественные фото в студии и на природе',
    'skill-title-2': 'Видеосъемка',
    'skill-text-2': 'Запечатлите лучшие моменты, чтобы они всегда оставались с вами',
    'skill-title-3': 'Ретушь',
    'skill-text-3': 'Я стремлюсь к тому, чтобы фотография превосходила реальность',
    'skill-title-4': 'Звук',
    'skill-text-4': 'Профессиональная запись звука для видео, рекламы, портфолио',
    'winter': 'Зима',
    'spring': 'Весна',
    'summer': 'Лето',
    'autumn': 'Осень',
    'price-sub-title-standart': 'Стандарт',
    'price-sub-title-premium': 'Премиум',
    'price-sub-title-gold': 'Золотой',
    'price-sub-title-standart-value': '42000 руб',
    'price-sub-title-premium-value': '56000 руб',
    'price-sub-title-gold-value': '80000 руб',
    'price-description-1-span-1': 'Одна локация',
    'price-description-1-span-2': '120 цветных фото',
    'price-description-1-span-3': '12 отретушированных фото',
    'price-description-1-span-4': 'Готовность через 2-3 недели',
    'price-description-1-span-5': 'Макияж, визаж',
    'price-description-2-span-1': 'Одна-две локации',
    'price-description-2-span-2': '200 цветных фото',
    'price-description-2-span-3': '20 отретушированных фото',
    'price-description-2-span-4': 'Готовность через 1-2 недели',
    'price-description-2-span-5': 'Макияж, визаж',
    'price-description-3-span-1': 'Три локации и больше',
    'price-description-3-span-2': '300 цветных фото',
    'price-description-3-span-3': '50 отретушированных фото',
    'price-description-3-span-4': 'Готовность через 1 неделю',
    'price-description-3-span-5': 'Макияж, визаж, прическа',
    'order': 'Заказать съемку',
    'contact-me': 'Свяжитесь со мной',
    'placeholder-email': 'Почта',
    'placeholder-phone': 'Телефон',
    'placeholder-message': 'Сообщение',
    'send-message': 'Отправить'
  }
}
//export default i18Obj;

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

const portfolioBtns = document.querySelector('.tabs__head');
const portfolioImages = document.querySelectorAll('.item__image');
//const portfolioBtn = document.querySelector('.tabs__item');
//const buttons = document.querySelectorAll('.tabs__item');

function changeClassActive(activeClass) {
  const button = document.querySelectorAll(`.${event.target.classList[0]}`);
  button.forEach(i => i.classList.remove(activeClass));
  event.target.classList.add(activeClass);      
}

function changeImage(event) {
  if(event.target.classList.contains('tabs__item')) {
    changeClassActive('active'); 
    portfolioImages.forEach((img, index) => img.src = `./assets/img/${event.target.dataset.season}/${index + 1}.jpg`);
  }
}
portfolioBtns.addEventListener('click', changeImage);

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
languageButtons.forEach(item => {
  item.addEventListener('click', () => {
    const key = event.target.dataset.language;
    changeClassActive('active'); 
    getTranslate(key);
  });
});


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