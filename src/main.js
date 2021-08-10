import {onEscKeyDown, render} from './utils.js';
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
import PopupView  from './view/popup.js';
import {generateCommentsList} from './view/template.js';
import NoFilmsView from './view/no-films.js';


export const siteBodyElement = document.querySelector('.body');
const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('.footer');

const cardsFilm = new Array(COUNT.GENERATE_FILMS).fill(null).map(generateCardFilmTemplate);
const films = cardsFilm.map((item) => (item.film));

const filters = generateFilter(films);

render(siteHeaderElement, new RankUserView(filters));
render(siteMainElement, new MenuView(filters));

if(cardsFilm.length === 0) {
  render(siteMainElement, new NoFilmsView());
} else {
  render(siteMainElement, new SortView());
  render(siteMainElement, new FilmsView());

  const siteFilmsElement = siteBodyElement.querySelector('.films');
  const siteFilmsContainerElement = siteFilmsElement.querySelector('.films-list__container');
  const siteFilmsListElement = siteFilmsElement.querySelector('.films-list');

  const siteFilmsExtraElement = document.querySelector('.films-list--extra');
  const containerFilmsExtraElement = siteFilmsExtraElement.querySelector('.films-list__container');

  const siteFilmsCommentElement = document.querySelector('.films-list--most-commented');
  const containerFilmsCommentElement = siteFilmsCommentElement.querySelector('.films-list__container');

  const renderFilm = (filmListElement, film) => {
    const filmComponent = new CardFilmView(film);

    const replaceCardFilmToPopup = (cinema) => {
      let popup = document.querySelector('.film-details');
      if (!popup) {
        render(siteBodyElement, new PopupView(cinema));
        generateCommentsList(cinema.comments);
        siteBodyElement.classList.add('hide-overflow');
      }

      popup = document.querySelector('.film-details');
      popup.querySelector('.film-details__close-btn').addEventListener('click', () => {
        popup.remove();
        siteBodyElement.classList.remove('hide-overflow');
      });

      document.addEventListener('keydown', onEscKeyDown);
    };

    filmComponent.getElement().querySelector('.film-card__poster').addEventListener('click', () => {
      replaceCardFilmToPopup(film);
    });

    filmComponent.getElement().querySelector('.film-card__comments').addEventListener('click', () => {
      replaceCardFilmToPopup(film);
    });

    filmComponent.getElement().querySelector('.film-card__title').addEventListener('click', () => {
      replaceCardFilmToPopup(film);
    });

    render(filmListElement, filmComponent);
  };

  if (films.length > COUNT.FILMS_PER_STEP) {
    let renderedTaskCount = COUNT.FILMS_PER_STEP;
    render(siteFilmsListElement, new ShowMoreButtonView());

    const loadMoreButton = siteFilmsElement.querySelector('.films-list__show-more');

    loadMoreButton.addEventListener('click', (evt) => {
      evt.preventDefault();

      films
        .slice(renderedTaskCount, renderedTaskCount + COUNT.FILMS_PER_STEP)
        .forEach((_, index) => renderFilm(siteFilmsContainerElement, cardsFilm[index + renderedTaskCount]));

      renderedTaskCount += COUNT.FILMS_PER_STEP;

      if (renderedTaskCount >= films.length) {
        loadMoreButton.remove();
      }
    });
  }

  for (let i = 0; i < Math.min(films.length, COUNT.FILMS_PER_STEP); i++) {
    renderFilm(siteFilmsContainerElement, cardsFilm[i]);
  }

  const topRatingFilms = cardsFilm.slice().sort((prev, next) => next.film.filmInfo.totalRating - prev.film.filmInfo.totalRating);

  for (let i = 0; i < COUNT.SORT_FILMS; i++) {
    renderFilm(containerFilmsExtraElement,topRatingFilms[i]);
  }

  const topCommentFilms = cardsFilm.slice().sort((prev, next) => next.comments.length - prev.comments.length);

  for (let i = 0; i < COUNT.SORT_FILMS; i++) {
    renderFilm(containerFilmsCommentElement, topCommentFilms[i]);
  }
}

render(siteFooterElement, new StatisticView(cardsFilm.length));

