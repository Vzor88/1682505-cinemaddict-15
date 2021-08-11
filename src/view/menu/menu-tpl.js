import {ucFirstName} from '../../utils/card-film.js';

const createMenuTemplate = (filter) => {
  const {name, count} = filter;
  const ucFirstNameFilter = ucFirstName(name);
  return `<a href="#${name}" class="main-navigation__item">${ucFirstNameFilter}<span class="main-navigation__item-count">${count}</span></a>`;
};

export const createFilterTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems
    .map((filter, index) => createMenuTemplate(filter, index === 0))
    .join('');

  return `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
          ${filterItemsTemplate}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`;
};
