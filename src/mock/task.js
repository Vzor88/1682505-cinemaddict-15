import {getRandomArray, getRandomInteger, getRandomIntegerFloat} from '../utils.js';
import {DESCRIPTIONS, GENRES, POSTERS, SMILES, TITLES} from './data.js';

const generateData = (array) => {
  const randomIndex = getRandomInteger(0, array.length - 1);

  return array[randomIndex];
};

const generateDuration = () => {
  const hour = getRandomInteger(0,1);
  if (hour === 0) {
    return `${getRandomInteger(0,60)}m`;
  } else {
    return `${hour}h ${getRandomInteger(0,60)}m`;
  }
};

const generateDescription = () => {
  const description = String(getRandomArray(1, 5, DESCRIPTIONS));
  return description.length >= 139 ? `${description.substr(0, 139)} <span class='more'>...</span>` : description;
};


const createComment = () => ({
  id: getRandomInteger(0, 10000),
  author: 'Ilya Reilly',
  comment: getRandomArray(1, 1, DESCRIPTIONS),
  date: '2019-05-11T16:12:32.554Z',
  emotion: getRandomArray(1, 2, SMILES),
});

const generateComments = () => new Array(getRandomInteger (0, 5)).fill().map(createComment);

const generateTask = () => ({
  poster: generateData(POSTERS),
  title: generateData(TITLES),
  rating: getRandomIntegerFloat(0, 10, 1),
  productionYear: getRandomInteger(1920, 2000),
  duration: generateDuration(),
  genre: getRandomArray(1, 2, GENRES),
  description: generateDescription(),
  isWatchlist: Boolean(getRandomInteger(0, 1)),
  isFavorite: Boolean(getRandomInteger(0, 1)),
  isHistory: Boolean(getRandomInteger(0, 1)),
  comment: generateComments(),
});

export {generateTask};
