import {COUNT} from './const.js';
import {generateCardFilmTemplate} from './mock/film.js';
import FilmsList from './presenter/films-list.js';

export const siteBodyElement = document.querySelector('.body');
const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('.footer');

const cardsFilm = new Array(COUNT.GENERATE_FILMS).fill(null).map(generateCardFilmTemplate);

const filmsListPresenter = new FilmsList(siteHeaderElement, siteMainElement, siteFooterElement);

filmsListPresenter.init(cardsFilm);

