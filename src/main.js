import {renderElement, RenderPosition} from './utils.js';
import {COUNT} from './mock/data.js';
import RankUserView from './view/rank-user.js';
import MenuView from './view/menu.js';
import {generateFilter} from './mock/filters.js';
import SortView from './view/sort.js';
import FilmsView from './view/films.js';
import CardFilmView from './view/card-film.js';
import {generateCardFilmTemplate} from './mock/film.js';
import ShowMoreButtonView from './view/show-more-button.js';
import StatisticView from './view/statistic.js';
import PopupContainerView from './view/popup-container.js';
import PopupFilm from './view/popup-film.js';
import {generateGenreList} from './view/popup-film.js';
import PopupCommentsView from './view/popup-comments.js';
import {generateCommentsList} from  './view/popup-comments.js';

const siteBodyElement = document.querySelector('.body');
const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('.footer');

const cardsFilm = new Array(COUNT.GENERATE_FILMS).fill(null).map(generateCardFilmTemplate);
const films = cardsFilm.map((item) => (item.film));

const filters = generateFilter(films);

renderElement(siteHeaderElement, new RankUserView(filters).getElement(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new MenuView(filters).getElement(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new SortView().getElement(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new FilmsView().getElement(), RenderPosition.BEFOREEND);

const siteFilmsElement = siteBodyElement.querySelector('.films');
const siteFilmsContainerElement = siteFilmsElement.querySelector('.films-list__container');
const siteFilmsListElement = siteFilmsElement.querySelector('.films-list');

const siteFilmsExtraElement = document.querySelector('.films-list--extra');
const containerFilmsExtraElement = siteFilmsExtraElement.querySelector('.films-list__container');

const siteFilmsCommentElement = document.querySelector('.films-list--most-commented');
const containerFilmsCommentElement = siteFilmsCommentElement.querySelector('.films-list__container');

if (films.length > COUNT.FILMS_PER_STEP) {
  let renderedTaskCount = COUNT.FILMS_PER_STEP;
  renderElement(siteFilmsListElement, new ShowMoreButtonView().getElement(), RenderPosition.BEFOREEND);

  const loadMoreButton = siteFilmsElement.querySelector('.films-list__show-more');

  loadMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();

    films
      .slice(renderedTaskCount, renderedTaskCount + COUNT.FILMS_PER_STEP)
      .forEach((_, index) => renderElement(siteFilmsContainerElement, new CardFilmView(cardsFilm[index + renderedTaskCount].film).getElement(), RenderPosition.BEFOREEND));

    renderedTaskCount += COUNT.FILMS_PER_STEP;

    if (renderedTaskCount >= films.length) {
      loadMoreButton.remove();
    }
  });
}

for (let i = 0; i < Math.min(films.length, COUNT.FILMS_PER_STEP); i++) {
  renderElement(siteFilmsContainerElement, new CardFilmView(cardsFilm[i].film).getElement(), RenderPosition.BEFOREEND);
}

const topRatingFilms = films.sort((prev, next) => next.filmInfo.totalRating - prev.filmInfo.totalRating);

for (let i = 0; i < COUNT.SORT_FILMS; i++) {
  renderElement(containerFilmsExtraElement, new CardFilmView(topRatingFilms[i]).getElement(),  RenderPosition.BEFOREEND);
}

const topCommentFilms = films.sort((prev, next) => next.comments.length - prev.comments.length);

for (let i = 0; i < COUNT.SORT_FILMS; i++) {
  renderElement(containerFilmsCommentElement, new CardFilmView(topCommentFilms[i]).getElement(),  RenderPosition.BEFOREEND);
}

renderElement(siteFooterElement, new StatisticView(cardsFilm.length).getElement(), RenderPosition.BEFOREEND);

const getCreatePopupRender = () => {
  renderElement(siteBodyElement, new PopupContainerView().getElement(), RenderPosition.BEFOREEND);

  const popupFilmContainerElement = document.querySelector('.film-details__inner');
  popupFilmContainerElement.innerHTML = '';

  renderElement(popupFilmContainerElement, new PopupFilm(cardsFilm[0].film).getElement(), RenderPosition.BEFOREEND);
  generateGenreList(cardsFilm[0].film);
  renderElement(popupFilmContainerElement, new PopupCommentsView(cardsFilm[0].comments.length).getElement(), RenderPosition.BEFOREEND);
  generateCommentsList(cardsFilm[0].comments);
};

const filmPosters = siteFilmsElement.querySelectorAll('.film-card__poster');

filmPosters.forEach((item) => {
  item.addEventListener('click', () => {
    const cardFilmPopup = document.querySelector('.film-details');

    if (!cardFilmPopup) {
      getCreatePopupRender();
    }

    siteBodyElement.classList.add('hide-overflow');

    const popup = document.querySelector('.film-details');
    const buttonClosePopup = popup.querySelector('.film-details__close-btn');

    buttonClosePopup.addEventListener('click', () => {
      popup.remove();
      siteBodyElement.classList.remove('hide-overflow');
    });
  });
});

