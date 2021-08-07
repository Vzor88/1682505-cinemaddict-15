import {ucFirstName, createElement} from '../utils.js';
import {RANK} from '../mock/data.js';

const isNameRank = (count) => {
  let nameRank = 'novice';
  if (count >= RANK.FAN.MIN && count <= RANK.FAN.MAX) {
    nameRank = 'fan';
  } else if (count >= RANK.MOVIE_BUFF) {
    nameRank = 'movie buff';
  }
  nameRank = ucFirstName(nameRank);
  return nameRank;
};

const isGenerateProfile = (count) => (count === 0) ? ' ' : `<p class="profile__rating">${isNameRank(count)}</p>`;

const createRankUserTemplate = (filter) => {
  const {count} = filter;
  return `<section class="header__profile profile">
      ${isGenerateProfile(count)}
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`;
};

export default class RankUser {
  constructor(filter) {
    this._filter = filter;
    this._element = null;
  }

  getTemplate() {
    return createRankUserTemplate(this._filter);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

