import FilmsModel from '../model/films.js';

export const MethodType = {
  GET: 'GET',
  PUT: 'PUT',
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

  updateComments(comments) {
    return this._update(`comments/${comments.id}`, comments);
  }

  _update(url, body) {
    return this._load(url, MethodType.PUT, JSON.stringify(body), new Headers({'Content-Type': 'application/json'}))
      .then(Api.toJSON)
      .then(FilmsModel.adaptToClient);
  }

  _load(url, method = MethodType.GET, body = null, headers = new Headers()) {
    headers.append('Authorization', this._authorization);

    return fetch(
      `${this._endPoint}${String(url)}`,
      {method, body, headers},
    )
      .then(Api.checkStatus)
      .catch(Api.catchError);
  }

  static checkStatus(response) {
    if (
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
