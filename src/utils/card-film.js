import {getRandomInteger} from './common.js';
import dayjs from 'dayjs';

export const getRandomArray = (minLength, maxLength, array) => {
  const randomArray = new Array(getRandomInteger (minLength, maxLength)).fill(null).map(() => array[getRandomInteger (0, array.length -1)]);
  return Array.from(new Set(randomArray));
};

export const generateDuration = (minutes, isRenderStats = false) => {
  let hours = 0;
  while (minutes > 60) {
    hours += 1;
    minutes -= 60;
  }

  if(isRenderStats){
    return {hours, minutes};
  }
  return hours === 0 ? `${minutes}m` : `${hours}h ${minutes}m`;
};

export const isClassName = (boolean) =>  boolean ? 'film-card__controls-item--active' : '';

export const isClassNamePopup = (boolean) =>  boolean ? 'film-details__control-button--active' : '';
export const isFilterActive = (boolean) =>  boolean ? ' main-navigation__item--active' : '';

export const ucFirstName = (name) => name[0].toUpperCase() + name.substr(1).toLowerCase();

const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

export const sortFilmDate = (filmA, filmB) => {
  const weight = getWeightForNullDate(filmA.filmInfo.release.date, filmB.filmInfo.release.date);

  if (weight !== null) {
    return weight;
  }

  return dayjs(filmB.filmInfo.release.date).diff(dayjs(filmA.filmInfo.release.date));
};

export const sortFilmRating = (taskA, taskB) => {
  const weight = getWeightForNullDate(taskA.filmInfo.totalRating, taskB.filmInfo.totalRating);

  if (weight !== null) {
    return weight;
  }

  return taskB.filmInfo.totalRating - taskA.filmInfo.totalRating;
};
