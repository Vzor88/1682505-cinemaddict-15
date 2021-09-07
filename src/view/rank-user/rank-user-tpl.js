import {isNameRank} from '../../utils/statistic.js';

const isGenerateProfile = (count) => !count ? ' ' : `<p class="profile__rating">${isNameRank(count)}</p><img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">`;

export const createRankUserTemplate = (filter) => (
  `<section class="header__profile profile">
      ${isGenerateProfile(filter.length)}
    </section>`
);
