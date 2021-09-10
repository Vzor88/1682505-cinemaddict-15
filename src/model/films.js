import AbstractObserver from '../services/abstract-observer.js';

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

  addComment(updateType, update) {
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
    const adaptedFilm =  {...film};
    adaptedFilm.id = Number(film['id']);
    adaptedFilm.comments = [];
    film.comments.forEach((comment) => adaptedFilm.comments.push(Number(comment)));
    adaptedFilm.filmInfo = film['film_info'];
    adaptedFilm.filmInfo.ageRating = film.film_info['age_rating'];
    adaptedFilm.filmInfo.alternativeTitle = film.film_info['alternative_title'];
    adaptedFilm.filmInfo.totalRating = film.film_info['total_rating'];
    adaptedFilm.filmInfo.release.newDate = new Date(film.film_info.release.date);
    delete adaptedFilm.filmInfo.release.date;
    adaptedFilm.filmInfo.release.date = adaptedFilm.filmInfo.release.newDate;
    delete adaptedFilm.filmInfo.release.newDate;
    adaptedFilm.filmInfo.release.releaseCountry = film.film_info.release['release_country'];
    adaptedFilm.userDetails = film['user_details'];
    adaptedFilm.userDetails.alreadyWatched = film.user_details['already_watched'];
    adaptedFilm.userDetails.watchList = film.user_details['watchlist'];
    adaptedFilm.userDetails.watchingDate = new Date(film.user_details['watching_date']);
    delete adaptedFilm.filmInfo['age_rating'];
    delete adaptedFilm.filmInfo['alternative_title'];
    delete adaptedFilm.filmInfo['total_rating'];
    delete adaptedFilm.filmInfo.release['release_country'];
    delete adaptedFilm['film_info'];
    delete adaptedFilm.userDetails['already_watched'];
    delete adaptedFilm.userDetails['watchlist'];
    delete adaptedFilm.userDetails['watching_date'];
    delete adaptedFilm['user_details'];
    return adaptedFilm;
  }

  static adaptToServer(film) {
    const adaptedFilm =  {...film};
    adaptedFilm.commentsId = film.comments.map((comment) => String(comment.id));
    adaptedFilm.comments = adaptedFilm.commentsId;
    adaptedFilm.filmInfo['age_rating'] = film.filmInfo.ageRating;
    adaptedFilm.filmInfo['alternative_title'] = film.filmInfo.alternativeTitle;
    adaptedFilm.filmInfo['total_rating'] = film.filmInfo.totalRating;
    adaptedFilm.filmInfo.release['release_country'] = film.filmInfo.release.releaseCountry;
    adaptedFilm.filmInfo.release.newDate = film.filmInfo.release.date.toISOString();
    delete adaptedFilm.filmInfo.release.date;
    adaptedFilm.filmInfo.release.date = adaptedFilm.filmInfo.release.newDate;
    adaptedFilm['film_info'] = film.filmInfo;
    adaptedFilm.userDetails['watching_date'] = film.userDetails.watchingDate.toISOString();
    adaptedFilm.userDetails['already_watched'] = film.userDetails.alreadyWatched;
    adaptedFilm.userDetails['watchlist'] = film.userDetails.watchList;
    adaptedFilm['user_details'] = film.userDetails;
    adaptedFilm.id = String(film['id']);
    delete adaptedFilm['filmInfo'];
    delete adaptedFilm.film_info['ageRating'];
    delete adaptedFilm.film_info['alternativeTitle'];
    delete adaptedFilm.film_info['totalRating'];
    delete adaptedFilm.film_info.release['releaseCountry'];
    delete adaptedFilm['userDetails'];
    delete adaptedFilm.user_details['watchingDate'];
    delete adaptedFilm.user_details['alreadyWatched'];
    delete adaptedFilm.user_details['watchList'];
    delete adaptedFilm.commentsId;
    delete adaptedFilm.film_info.release.newDate;
    return adaptedFilm;
  }

  static adaptToClientComments(film) {
    const adaptedFilm =  {};
    adaptedFilm.comments = film.comments;
    adaptedFilm.filmInfo = film.movie.film_info;
    adaptedFilm.userDetails = film.movie.user_details;
    adaptedFilm.id = Number(film.movie['id']);
    adaptedFilm.filmInfo.ageRating = film.movie.film_info['age_rating'];
    adaptedFilm.filmInfo.alternativeTitle = film.movie.film_info['alternative_title'];
    adaptedFilm.filmInfo.totalRating = film.movie.film_info['total_rating'];
    adaptedFilm.filmInfo.release.newDate = new Date(film.movie.film_info.release.date);
    delete adaptedFilm.filmInfo.release.date;
    adaptedFilm.filmInfo.release.date = adaptedFilm.filmInfo.release.newDate;
    delete adaptedFilm.filmInfo.release.newDate;
    adaptedFilm.filmInfo.release.releaseCountry = film.movie.film_info.release['release_country'];
    adaptedFilm.userDetails.alreadyWatched = film.movie.user_details['already_watched'];
    adaptedFilm.userDetails.watchList = film.movie.user_details['watchlist'];
    adaptedFilm.userDetails.watchingDate = new Date(film.movie.user_details['watching_date']);
    delete adaptedFilm.filmInfo['age_rating'];
    delete adaptedFilm.filmInfo['alternative_title'];
    delete adaptedFilm.filmInfo['total_rating'];
    delete adaptedFilm.filmInfo.release['release_country'];
    delete adaptedFilm.userDetails['already_watched'];
    delete adaptedFilm.userDetails['watchlist'];
    delete adaptedFilm.userDetails['watching_date'];
    return adaptedFilm;
  }

  static adaptToServerComments(comment){
    return comment;
  }
}
