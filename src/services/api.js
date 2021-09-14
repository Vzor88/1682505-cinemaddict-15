import FilmsModel from '../model/films.js';

export const MethodType = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

export const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299,
};

export default class Api {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getFilms() {
    return this._load( 'movies')
      .then(Api.toJSON)
      .then((movies) => movies.map(FilmsModel.adaptToClient));
  }

  updateFilm(film) {
    return this._update(`movies/${film.id}`, FilmsModel.adaptToServer(film));
  }

  getComments(film) {
    return this._load(`comments/${film.id}`)
      .then(Api.toJSON);
  }

  addComment(film, comment) {
    return this._load( `comments/${film.id}`, MethodType.POST, JSON.stringify(comment))
      .then(Api.toJSON)
      .then(FilmsModel.adaptToClientMovieAndComments);
  }

  deleteComment(film, commentId) {
    return this._load( `comments/${commentId}`, MethodType.DELETE);
  }

  _update(url, body) {
    return this._load(url, MethodType.PUT, JSON.stringify(body))
      .then(Api.toJSON)
      .then(FilmsModel.adaptToClient)
      .catch(Api.catchError);
  }

  _load(url, method = MethodType.GET, body = null, headers = new Headers({'Content-Type': 'application/json'})) {
    headers.append('Authorization', this._authorization);

    return fetch(
      `${this._endPoint}${String(url)}`,
      {method, body, headers},
    )
      .then(Api.checkStatus)
      .catch(Api.catchError);
  }

  static checkStatus(response) {
    if(
      response.status < SuccessHTTPStatusRange.MIN ||
      response.status > SuccessHTTPStatusRange.MAX
    ) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response;
  }

  static toJSON(response) {
    return response.json();
  }

  static catchError(err) {
    throw err;
  }
}
