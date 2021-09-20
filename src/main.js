import {UpdateType} from './consts.js';
import FilmsList from './presenter/films-list.js';
import FilmsModel from './model/films.js';
import FiltersModel from './model/filters.js';
import FiltersPresenter from './presenter/filters.js';
import Api from './services/api.js';

const AUTHORIZATION = 'Basic mS7sfS83wma2sa5ret58rt1i';
const END_POINT = 'https://15.ecmascript.pages.academy/cinemaddict/';

const copyFilms = [];

const siteMainElement = document.querySelector('.main');
const api = new Api(END_POINT, AUTHORIZATION);
const filmsModel = new FilmsModel();
const filtersModel = new FiltersModel();

const getInitFiltersPresenter = (films) => {
  const filtersPresenter = new FiltersPresenter(siteMainElement, filtersModel, filmsModel, films);
  filtersPresenter.init();
};

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
            getInitFiltersPresenter(films);
          }
        })
        .catch(() => {
          filmsModel.setFilms(UpdateType.INIT, []);
          getInitFiltersPresenter(films);
        });
    });
  });

const filmsListPresenter = new FilmsList(siteMainElement, filmsModel, filtersModel, api);
filmsListPresenter.init();
