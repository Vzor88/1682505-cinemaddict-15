import {FilterType} from '../../consts.js';

const noFilmsTextType = {
  [FilterType.ALL]: 'There are no movies in our database',
  [FilterType.WATCHLIST]:'There are no movies to watch now',
  [FilterType.HISTORY]: 'There are no watched movies now',
  [FilterType.FAVORITES]: 'There are no favorite movies now',
};


export const createNoFilmTemplate = (filterType) => {
  const noFilmsText = noFilmsTextType[filterType];
  return `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title">
        ${noFilmsText}
      </h2>
    </section>
  </section>`;
};
