import dayjs from 'dayjs';
import {LENGTH_STRING} from '../../const.js';
import {isClassName} from '../../utils/card-film.js';

export const createCardFilmTemplate = (card) => {
  const {film} = card;
  const {filmInfo, comments, userDetails} = film;
  const {title, totalRating, releaseFilm, runtime, genre, poster, description} = filmInfo;
  const {date} = releaseFilm;
  const {watchList, alreadyWatched, favorite} = userDetails;

  const dateYear = dayjs(date).format('YYYY');
  const descriptionShort = (text) => text.length >= LENGTH_STRING ? `${text.substr(0, LENGTH_STRING)} <span class='more'>...</span>` : text;

  return `<article class="film-card">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${totalRating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${dateYear}</span>
      <span class="film-card__duration">${runtime}</span>
      <span class="film-card__genre">${genre}</span>
    </p>
    <img src="${poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${descriptionShort(description)}</p>
    <a class="film-card__comments">${comments.length} comments</a>
    <div class="film-card__controls">
      <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${isClassName(watchList)}" type="button">Add to watchlist</button>
      <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${isClassName(alreadyWatched)}" type="button">Mark as watched</button>
      <button class="film-card__controls-item film-card__controls-item--favorite ${isClassName(favorite)}" type="button">Mark as favorite</button>
    </div>
  </article>`;
};
