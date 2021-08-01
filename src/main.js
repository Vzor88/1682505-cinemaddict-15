import {createMenuTemplate} from './view/menu.js';
import {createRankUserTemplate} from './view/rank-user.js';
import {createSortListTemplate} from './view/sort.js';
import {createContainerFilmsTemplate} from './view/films.js';
import {createCardFilmTemplate} from './view/card-film.js';
import {createButtonTemplate} from './view/show-more-button.js';
import {createPopularFilmsTemplate} from './view/popular-films.js';
import {createStatisticTemplate} from './view/statistic.js';
// import {createPopupContainerTemplate} from './view/popup-container.js';
// import {createPopupFilmTemplate} from './view/popup-film.js';
// import {createPopupCommentsTemplate} from './view/popup-comments.js';
import {generateTask} from './mock/task.js';

const COUNT = {
  FILMS: 5,
  SORT_FILMS: 2,
  GENERATE_MOCK_FILMS: 20,
};

const tasks = new Array(COUNT.GENERATE_MOCK_FILMS).fill(null).map(generateTask);

// const siteBodyElement = document.querySelector('.body');
const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('.footer');

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(siteHeaderElement, createRankUserTemplate(), 'beforeend');
render(siteMainElement, createMenuTemplate(), 'beforeend');
render(siteMainElement, createSortListTemplate(), 'beforeend');
render(siteMainElement, createContainerFilmsTemplate(), 'beforeend');

const siteFilmsContainerElement = document.querySelector('.films-list__container');
const siteFilmsListElement = document.querySelector('.films-list');
const siteFilmsElement = document.querySelector('.films');

for (let i = 0; i < COUNT.FILMS; i++) {
  render(siteFilmsContainerElement, createCardFilmTemplate(tasks[i]), 'beforeend');
}

render(siteFilmsListElement, createButtonTemplate(), 'beforeend');
render(siteFilmsElement, createPopularFilmsTemplate(), 'beforeend');

const siteFilmsExtraElement = document.querySelector('.films-list--extra');
const containerFilmsExtraElement = siteFilmsExtraElement.querySelector('.films-list__container');

const siteFilmsCommentElement = document.querySelector('.films-list--most-commented');
const containerFilmsCommentElement = siteFilmsCommentElement.querySelector('.films-list__container');

const topRatingFilms = tasks.sort((prev, next) => next.rating - prev.rating);

for (let i = 0; i < COUNT.SORT_FILMS; i++) {
  render(containerFilmsExtraElement, createCardFilmTemplate(topRatingFilms[i]), 'beforeend');
}

const topCommentFilms = tasks.sort((prev, next) => next.comment.length - prev.comment.length);

for (let i = 0; i < COUNT.SORT_FILMS; i++) {
  render(containerFilmsCommentElement, createCardFilmTemplate(topCommentFilms[i]), 'beforeend');
}

render(siteFooterElement, createStatisticTemplate(), 'beforeend');

// render(siteBodyElement, createPopupContainerTemplate(), 'beforeend');
//
// const popupFilmContainerElement = document.querySelector('.film-details__inner');
//
// render(popupFilmContainerElement, createPopupFilmTemplate(), 'beforeend');
// render(popupFilmContainerElement, createPopupCommentsTemplate(), 'beforeend');
