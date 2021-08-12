import {getRandomInteger} from './common.js';

export const getRandomArray = (minLength, maxLength, array) => {
  const randomArray = new Array(getRandomInteger (minLength, maxLength)).fill(null).map(() => array[getRandomInteger (0, array.length -1)]);
  return Array.from(new Set(randomArray));
};

export const isClassName = (boolean) =>  boolean ? 'film-card__controls-item--active' : '';

export const isClassNamePopup = (boolean) =>  boolean ? 'film-details__control-button--active' : '';

export const ucFirstName = (name) => name[0].toUpperCase() + name.substr(1).toLowerCase();
