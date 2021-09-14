import {FilterType} from '../../consts.js';

const NoFilmsTextType = {
  [FilterType.ALL_MOVIES]: 'There are no movies in our database',
  [FilterType.WATCHLIST]:'There are no movies to watch now',
  [FilterType.HISTORY]: 'There are no watched movies now',
  [FilterType.FAVORITES]: 'There are no favorite movies now',
};

export const createNoFilmTemplate = (filterType) => {
  const noFilmsText = NoFilmsTextType[filterType];
  return `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title">
        ${noFilmsText}
      </h2>
    </section>
  </section>`;
};
