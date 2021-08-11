import {onEscKeyDown, render, remove} from './utils/render.js';
import {COUNT} from './mock/data.js';
import RankUserView from './view/rank-user/rank-user.js';
import MenuView from './view/menu/menu.js';
import {generateFilter} from './mock/filters.js';
import SortView from './view/sort/sort.js';
import FilmsView from './view/films/films.js';
import CardFilmView from './view/card-film/card-film.js';
import {generateCardFilmTemplate} from './mock/film.js';
import ShowMoreButtonView from './view/show-more-button/show-more-button.js';
import StatisticView from './view/statistic/statistic.js';
import PopupView  from './view/popup/popup.js';
import {generateCommentsList} from './view/popup/popup-tpl.js';
import NoFilmsView from './view/no-films/no-films.js';

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
    const popupComponent = new PopupView(film);

    const replaceCardFilmToPopup = (cinema) => {
      if (!popupComponent.getElement().querySelector('.film-details')) {
        render(siteBodyElement, popupComponent);
        generateCommentsList(cinema.comments);
        siteBodyElement.classList.add('hide-overflow');
        document.addEventListener('keydown', onEscKeyDown);
      }

      popupComponent.setEditClickPopupHandler(() => {
        remove(document.querySelector('.film-details'));
        siteBodyElement.classList.remove('hide-overflow');
      });
    };

    filmComponent.setEditClickPosterHandler(() => {
      replaceCardFilmToPopup(film);
    });

    filmComponent.setEditClickCommentsHandler(() => {
      replaceCardFilmToPopup(film);
    });

    filmComponent.setEditClickTitleHandler(() => {
      replaceCardFilmToPopup(film);
    });

    render(filmListElement, filmComponent);
  };

  if (films.length > COUNT.FILMS_PER_STEP) {
    let renderedTaskCount = COUNT.FILMS_PER_STEP;
    const moreButton = new ShowMoreButtonView();
    render(siteFilmsListElement, moreButton);

    moreButton.setEditClickMoreButtonHandler(() => {
      films
        .slice(renderedTaskCount, renderedTaskCount + COUNT.FILMS_PER_STEP)
        .forEach((_, index) => renderFilm(siteFilmsContainerElement, cardsFilm[index + renderedTaskCount]));

      renderedTaskCount += COUNT.FILMS_PER_STEP;

      if (renderedTaskCount >= films.length) {
        remove(moreButton);
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

