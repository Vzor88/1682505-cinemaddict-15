import {END_POINT, AUTHORIZATION, UpdateType} from './consts.js';
import FilmsList from './presenter/films-list.js';
import FilmsModel from './model/films.js';
import FiltersModel from './model/filters.js';
import FiltersPresenter from './presenter/filters.js';
import Api from './api.js';

export const siteBodyElement = document.querySelector('.body');
const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('.footer');

const api = new Api(END_POINT, AUTHORIZATION);

const filmsModel = new FilmsModel();
const filtersModel = new FiltersModel();

api.getFilms()
  .then((films) => filmsModel.setFilms(UpdateType.INIT, films))
  .catch(() => filmsModel.setFilms(UpdateType.INIT, []));

const filmsListPresenter = new FilmsList(siteHeaderElement, siteMainElement, siteFooterElement, filmsModel, filtersModel, api);
const filtersPresenter = new FiltersPresenter(siteMainElement, filtersModel, filmsModel, api);

filtersPresenter.init();
filmsListPresenter.init();
