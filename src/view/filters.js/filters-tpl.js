import {isFilterActive} from '../../utils/card-film.js';

const createListTemplate = (filter, filterType) => {
  const {type, count} = filter;
  return `<a href="#" class="main-navigation__item${isFilterActive(filterType === type)}" id="${type}">${type}${type === 'All movies' ? '' : `<span class="main-navigation__item-count">${count}</span>`}</a>`;
};

export const createFilterTemplate = (filterItems, filterType) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createListTemplate(filter, filterType))
    .join('');

  return `<nav class="main-navigation">
      <div class="main-navigation__items">
          ${filterItemsTemplate}
      </div>
    </nav>`;
};
