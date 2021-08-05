import {isClassName} from '../utils.js';

export const createCardFilmTemplate = (task) => {
  const {title, rating, productionYear, duration, genre, poster, descriptionShort, isHistory, isWatchlist, isFavorite, comment} = task;

  return `<article class="film-card">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${productionYear}</span>
      <span class="film-card__duration">${duration}</span>
      <span class="film-card__genre">${genre}</span>
    </p>
    <img src="${poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${descriptionShort}</p>
    <a class="film-card__comments">${comment.length} comments</a>
    <div class="film-card__controls">
      <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${isClassName(isHistory)}" type="button">Add to watchlist</button>
      <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${isClassName(isWatchlist)}" type="button">Mark as watched</button>
      <button class="film-card__controls-item film-card__controls-item--favorite ${isClassName(isFavorite)}" type="button">Mark as favorite</button>
    </div>
  </article>`;
};
