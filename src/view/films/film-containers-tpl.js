import {isTopRatedFilms, isTopCommentedFilms} from '../../utils/render.js';

export const createFilmsListExtraTemplate = (films) => (!isTopRatedFilms(films).length) ? ' ' : `<section class="films-list films-list--extra films-list--top-rated">
    <h2 class="films-list__title">Top rated</h2>
    <div class="films-list__container"></div>
  </section>`;

export const createFilmsTopCommentedTemplate = (films) => (!isTopCommentedFilms(films).length) ? ' ' : `<section class="films-list films-list--extra films-list--most-commented">
    <h2 class="films-list__title">Most commented</h2>
    <div class="films-list__container"></div>
  </section>`;

export const createFilmsTemplate = () => (
  `<section class="films">
    <section class="films-list films-list--all">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

      <div class="films-list__container">

      </div>
    </section>

  </section>`
);
