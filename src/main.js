import {createFilterTemplate} from './view/menu.js';
import {createRankUserTemplate} from './view/rank-user.js';
import {createSortListTemplate} from './view/sort.js';
import {createContainerFilmsTemplate} from './view/films.js';
import {createCardFilmTemplate} from './view/card-film.js';
import {generateCardFilmTemplate} from './mock/film.js';
import {createButtonTemplate} from './view/show-more-button.js';
import {createPopularFilmsTemplate} from './view/popular-films.js';
import {createStatisticFooterTemplate} from './view/statistic.js';
import {createPopupContainerTemplate} from './view/popup-container.js';
import {createPopupFilmTemplate, generateGenreList} from './view/popup-film.js';
import {createPopupCommentsTemplate, getGenerateCommentsList} from './view/popup-comments.js';
import {COUNT} from './mock/data.js';
import {generateFilter} from './mock/filters.js';

const siteBodyElement = document.querySelector('.body');
const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('.footer');

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const cardsFilm = new Array(COUNT.GENERATE_FILMS).fill(null).map(generateCardFilmTemplate);
const films = cardsFilm.map((item) => (item.film));

const filters = generateFilter(films);

render(siteHeaderElement, createRankUserTemplate(filters[0]), 'beforeend');
render(siteMainElement, createFilterTemplate(filters), 'beforeend');
render(siteMainElement, createSortListTemplate(), 'beforeend');
render(siteMainElement, createContainerFilmsTemplate(), 'beforeend');

const siteFilmsElement = siteBodyElement.querySelector('.films');
const siteFilmsContainerElement = siteFilmsElement.querySelector('.films-list__container');
const siteFilmsListElement = siteFilmsElement.querySelector('.films-list');

if (films.length > COUNT.FILMS_PER_STEP) {
  let renderedTaskCount = COUNT.FILMS_PER_STEP;
  render(siteFilmsListElement, createButtonTemplate(), 'beforeend');

  const loadMoreButton = siteFilmsElement.querySelector('.films-list__show-more');

  loadMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();

    films
      .slice(renderedTaskCount, renderedTaskCount + COUNT.FILMS_PER_STEP)
      .forEach((_, index) => render(siteFilmsContainerElement, createCardFilmTemplate(cardsFilm[index + renderedTaskCount].film), 'beforeend'));

    renderedTaskCount += COUNT.FILMS_PER_STEP;

    if (renderedTaskCount >= films.length) {
      loadMoreButton.remove();
    }
  });
}

for (let i = 0; i < Math.min(films.length, COUNT.FILMS_PER_STEP); i++) {
  render(siteFilmsContainerElement, createCardFilmTemplate(cardsFilm[i].film), 'beforeend');
}

render(siteFilmsElement, createPopularFilmsTemplate(), 'beforeend');

const siteFilmsExtraElement = document.querySelector('.films-list--extra');
const containerFilmsExtraElement = siteFilmsExtraElement.querySelector('.films-list__container');

const siteFilmsCommentElement = document.querySelector('.films-list--most-commented');
const containerFilmsCommentElement = siteFilmsCommentElement.querySelector('.films-list__container');

const topRatingFilms = films.sort((prev, next) => next.filmInfo.totalRating - prev.filmInfo.totalRating);

for (let i = 0; i < COUNT.SORT_FILMS; i++) {
  render(containerFilmsExtraElement, createCardFilmTemplate(topRatingFilms[i]), 'beforeend');
}

const topCommentFilms = films.sort((prev, next) => next.comments.length - prev.comments.length);

for (let i = 0; i < COUNT.SORT_FILMS; i++) {
  render(containerFilmsCommentElement, createCardFilmTemplate(topCommentFilms[i]), 'beforeend');
}

render(siteFooterElement, createStatisticFooterTemplate(cardsFilm.length), 'beforeend');

const getCreatePopupRender = () => {
  render(siteBodyElement, createPopupContainerTemplate(), 'beforeend');
  const popupFilmContainerElement = document.querySelector('.film-details__inner');

  render(popupFilmContainerElement, createPopupFilmTemplate(cardsFilm[0].film), 'beforeend');
  generateGenreList(cardsFilm[0].film);
  render(popupFilmContainerElement, createPopupCommentsTemplate(cardsFilm[0].comments.length), 'beforeend');
  getGenerateCommentsList(cardsFilm[0].comments);
};

const filmPosters = siteFilmsElement.querySelectorAll('.film-card__poster');

filmPosters.forEach((item) => {
  item.addEventListener('click', () => {
    getCreatePopupRender();
    siteBodyElement.classList.add('hide-overflow');

    const cardFilmPopup = document.querySelector('.film-details');
    const buttonClosePopup = cardFilmPopup.querySelector('.film-details__close-btn');

    buttonClosePopup.addEventListener('click', () => {
      cardFilmPopup.remove();
      siteBodyElement.classList.remove('hide-overflow');
    });
  });
});

