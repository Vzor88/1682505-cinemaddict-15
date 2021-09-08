import {UpdateType} from './consts.js';
import FilmsList from './presenter/films-list.js';
import FilmsModel from './model/films.js';
import FiltersModel from './model/filters.js';
import FiltersPresenter from './presenter/filters.js';
import Api from './api.js';

export const AUTHORIZATION = 'Basic mS7sfS83wma2sa5ret58rt1i';
export const END_POINT = 'https://15.ecmascript.pages.academy/cinemaddict/';
const copyFilms = [];
export const siteBodyElement = document.querySelector('.body');
const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('.footer');

const api = new Api(END_POINT, AUTHORIZATION);

const filmsModel = new FilmsModel();
const filtersModel = new FiltersModel();

api.getFilms()
  .then((films) => {
    films.forEach((film) => {
      api.getComments(film)
        .then((comments) => {
          film.comments = comments;
          copyFilms.push(film);
        })
        .then(() => {
          if(films.length === copyFilms.length){
            filmsModel.setFilms(UpdateType.INIT, films);
            const filtersPresenter = new FiltersPresenter(siteMainElement, filtersModel, filmsModel, films);
            filtersPresenter.init();
          }
        })
        .catch(() => {
          filmsModel.setFilms(UpdateType.INIT, []);
          const filtersPresenter = new FiltersPresenter(siteMainElement, filtersModel, filmsModel, films);
          filtersPresenter.init();
        });
    });
  });

const filmsListPresenter = new FilmsList(siteHeaderElement, siteMainElement, siteFooterElement, filmsModel, filtersModel, api);
filmsListPresenter.init();
