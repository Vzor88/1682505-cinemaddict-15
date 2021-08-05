import {isClassNamePopup} from '../utils.js';

const isGenre = (array) => array.length > 1 ? 'Genres' : 'Genre';

export const createPopupFilmTemplate = (task = {}) => {
  const {title, rating, duration, genre, ageRating, poster, description, country, isHistory, isWatchlist, isFavorite, alternativeTitle, director, writer, actor, productionDate} = task;

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
              <p class="film-details__total-rating">${rating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${writer}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${actor}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${productionDate}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${duration}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${country}</td>
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
        <button type="button" class="film-details__control-button film-details__control-button--watchlist ${isClassNamePopup(isHistory)}" id="watchlist" name="watchlist">Add to watchlist</button>
        <button type="button" class="film-details__control-button film-details__control-button--watched ${isClassNamePopup(isWatchlist)}" id="watched " name="watched">Already watched</button>
        <button type="button" class="film-details__control-button film-details__control-button--favorite ${isClassNamePopup(isFavorite)}" id="favorite" name="favorite">Add to favorites</button>
      </section>
    </div>`;
};

export const generateGenreList = (array = {}) => {
  const genreList = document.querySelector('.film-details__cell-genre');
  genreList.innerHTML = '';
  array.genre.forEach((item) => {
    const elementList = document.createElement('span');
    elementList.classList.add('film-details__genre');
    elementList.textContent = item;
    genreList.appendChild(elementList);
  });
};

