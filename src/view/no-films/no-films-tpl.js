import {NoFilmsTextType} from '../../consts.js';

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
