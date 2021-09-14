import AbstractObserver from '../services/abstract-observer.js';
import _ from 'lodash';

export default class Films extends AbstractObserver {
  constructor() {
    super();
    this._films = [];
  }

  setFilms(updateType, films) {
    this._films = films;
    this._notify(updateType);
  }

  getFilms() {
    return this._films;
  }

  updateFilm(updateType, update) {
    const index = this._films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting film');
    }

    this._films = [
      ...this._films.slice(0, index),
      update,
      ...this._films.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  deleteComment(updateType, update, commentId) {
    const index = update.comments.findIndex((comment) => comment.id === commentId);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting task');
    }

    update.comments = [
      ...update.comments.slice(0, index),
      ...update.comments.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  static adaptToClient(film) {
    const adaptedFilm = _.mapKeys(film, (value, key) => _.camelCase(key));
    adaptedFilm.filmInfo = _.mapKeys(film.film_info, (value, key) => _.camelCase(key));
    adaptedFilm.filmInfo.release = _.mapKeys(film.film_info.release, (value, key) => _.camelCase(key));
    adaptedFilm.userDetails = _.mapKeys(film.user_details, (value, key) => _.camelCase(key));

    adaptedFilm.id = Number(film['id']);
    adaptedFilm.comments = [];
    film.comments.forEach((comment) => adaptedFilm.comments.push(Number(comment)));
    adaptedFilm.filmInfo.release.date = new Date(adaptedFilm.filmInfo.release.date);
    adaptedFilm.userDetails.watchList = film.user_details['watchlist'];
    adaptedFilm.userDetails.watchingDate = new Date(film.user_details['watching_date']);
    delete adaptedFilm.userDetails['watchlist'];
    return adaptedFilm;
  }

  static adaptToServer(film) {
    const adaptedFilm = _.mapKeys(film, (value, key) => _.snakeCase(key));
    adaptedFilm['film_info'] = _.mapKeys(film.filmInfo, (value, key) => _.snakeCase(key));
    adaptedFilm['film_info'].release = _.mapKeys(film.filmInfo.release, (value, key) => _.snakeCase(key));
    adaptedFilm['user_details'] = _.mapKeys(film.userDetails, (value, key) => _.snakeCase(key));
    adaptedFilm.id = String(film['id']);
    adaptedFilm.comments = film.comments.map((comment) => String(comment.id));
    adaptedFilm['film_info'].release.date = film.filmInfo.release.date.toISOString();
    adaptedFilm['user_details']['watching_date'] = film.userDetails.watchingDate.toISOString();
    adaptedFilm['user_details']['watchlist'] = film.userDetails.watchList;
    delete adaptedFilm.user_details['watch_list'];
    return adaptedFilm;
  }

  static adaptToClientMovieAndComments(film) {
    const adaptedFilm = {};
    adaptedFilm.comments = film.comments;
    adaptedFilm.filmInfo = _.mapKeys(film.movie.film_info, (value, key) => _.camelCase(key));
    adaptedFilm.userDetails = _.mapKeys(film.movie.user_details, (value, key) => _.camelCase(key));
    adaptedFilm.filmInfo.release = _.mapKeys(film.movie.film_info.release, (value, key) => _.camelCase(key));

    adaptedFilm.id = Number(film.movie['id']);
    adaptedFilm.filmInfo.release.date = new Date(film.movie.film_info.release.date);
    adaptedFilm.userDetails.watchList = film.movie.user_details['watchlist'];
    adaptedFilm.userDetails.watchingDate = new Date(film.movie.user_details['watching_date']);
    delete adaptedFilm.userDetails['watchlist'];
    return adaptedFilm;
  }
}
