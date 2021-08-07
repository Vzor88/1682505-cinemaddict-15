import {isClassNamePopup, createElement} from '../utils.js';

const isGenre = (array) => array.length > 1 ? 'Genres' : 'Genre';

const createPopupFilmTemplate = (film = {}) => {
  const {filmInfo, userDetails} = film;
  const {title, totalRating, releaseFilm, genre, poster, description, ageRating, alternativeTitle, writers, director, actors, runtime} = filmInfo;
  const {date, releaseCountry} = releaseFilm;
  const {watchList, alreadyWatched, favorite} = userDetails;

  return `<div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${poster}" alt="">

          <p class="film-details__age">${ageRating}+</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">Original: ${alternativeTitle}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${totalRating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${writers}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${actors}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${date}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${runtime}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${releaseCountry}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">${isGenre(genre)}</td>
              <td class="film-details__cell film-details__cell-genre">

              </td>
            </tr>
          </table>

          <p class="film-details__film-description">${description}</p>
        </div>
      </div>

      <section class="film-details__controls">
        <button type="button" class="film-details__control-button film-details__control-button--watchlist ${isClassNamePopup(alreadyWatched)}" id="watchlist" name="watchlist">Add to watchlist</button>
        <button type="button" class="film-details__control-button film-details__control-button--watched ${isClassNamePopup(watchList)}" id="watched " name="watched">Already watched</button>
        <button type="button" class="film-details__control-button film-details__control-button--favorite ${isClassNamePopup(favorite)}" id="favorite" name="favorite">Add to favorites</button>
      </section>
    </div>`;
};

export const generateGenreList = (array = {}) => {
  const genreList = document.querySelector('.film-details__cell-genre');
  genreList.innerHTML = '';
  array.filmInfo.genre.forEach((item) => {
    const elementList = document.createElement('span');
    elementList.classList.add('film-details__genre');
    elementList.textContent = item;
    genreList.appendChild(elementList);
  });
};

export default class PopupFilm {
  constructor(film) {
    this._film = film;
    this._element = null;
  }

  getTemplate() {

    return createPopupFilmTemplate(this._film);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());

    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
