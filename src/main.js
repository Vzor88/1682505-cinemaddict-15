import {COUNTS} from './consts.js';
import {generateCardFilmTemplate} from './mock/film.js';
import FilmsList from './presenter/films-list.js';
import FilmsModel from './model/films.js';
import FiltersModel from './model/filters.js';
import FiltersPresenter from './presenter/filters.js';

export const siteBodyElement = document.querySelector('.body');
const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('.footer');

const cardsFilm = new Array(COUNTS.GENERATE_FILMS).fill(null).map(generateCardFilmTemplate);

const filmsModel = new FilmsModel();
const filtersModel = new FiltersModel();

filmsModel.setFilms(cardsFilm);

const filmsListPresenter = new FilmsList(siteHeaderElement, siteMainElement, siteFooterElement, filmsModel, filtersModel);
const filtersPresenter = new FiltersPresenter(siteMainElement, filtersModel, filmsModel);

filtersPresenter.init();
filmsListPresenter.init();
