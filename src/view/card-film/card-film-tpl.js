import {isClassName, generateDuration} from '../../utils/card-film.js';
import dayjs from 'dayjs';

export const LENGTH_STRING_DESCRIPTION = 139;

export const createCardFilmTemplate = (film) => {
  const {filmInfo, userDetails, id, comments} = film;
  const {title, totalRating, release, runtime, genre, poster, description} = filmInfo;
  const {date} = release;
  const {watchList, alreadyWatched, favorite} = userDetails;

  const dateYear = dayjs(date).format('YYYY');
  const getDescriptionShort = (text) => text.length >= LENGTH_STRING_DESCRIPTION ? `${text.substr(0, LENGTH_STRING_DESCRIPTION)} <span class='more'>...</span>` : text;

  return `<article class="film-card">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${totalRating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${dateYear}</span>
      <span class="film-card__duration">${generateDuration(runtime)}</span>
      <span class="film-card__genre">${genre.join(', ')}</span>
    </p>
    <img src="${poster}" alt="" class="film-card__poster" id="film-card__poster-${id}">
    <p class="film-card__description">${getDescriptionShort(description)}</p>
    <a class="film-card__comments">${comments.length} comments</a>
    <div class="film-card__controls">
      <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${isClassName(watchList)}" type="button">Add to watchlist</button>
      <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${isClassName(alreadyWatched)}" type="button">Mark as watched</button>
      <button class="film-card__controls-item film-card__controls-item--favorite ${isClassName(favorite)}" type="button">Mark as favorite</button>
    </div>
  </article>`;
};
