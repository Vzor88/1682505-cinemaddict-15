import {COUNTS} from './consts.js';
import {generateCardFilmTemplate} from './mock/film.js';
import FilmsList from './presenter/films-list.js';
import FilmsModel from './model/films.js';

export const siteBodyElement = document.querySelector('.body');
const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('.footer');

const cardsFilm = new Array(COUNTS.GENERATE_FILMS).fill(null).map(generateCardFilmTemplate);

const filmsModel = new FilmsModel();
filmsModel.setFilms(cardsFilm);

const filmsListPresenter = new FilmsList(siteHeaderElement, siteMainElement, siteFooterElement, filmsModel);

filmsListPresenter.init();
