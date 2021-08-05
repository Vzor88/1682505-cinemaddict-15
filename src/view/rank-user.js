import {ucFirstName} from '../utils.js';

const isNameRank = (count) => {
  let nameRank = 'novice';
  if (count >= 11 && count <= 20) {
    nameRank = 'fan';
  } else if (count >= 21) {
    nameRank = 'movie buff';
  }
  nameRank = ucFirstName(nameRank);
  return nameRank;
};

const isGenerateProfile = (count) => (count === 0) ? ' ' : `<p class="profile__rating">${isNameRank(count)}</p>`;

export const createRankUserTemplate = (filter) => {
  const {count} = filter;
  return `
    <section class="header__profile profile">
      ${isGenerateProfile(count)}
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`;
};

