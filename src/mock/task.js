import {getRandomArray, getRandomInteger, getRandomIntegerFloat} from '../utils.js';
import {DESCRIPTIONS, GENRES, POSTERS, SMILES, TITLES, ALTERNATIVE_TITLES, DIRECTORS, WRITERS, ACTORS, COUNTRIES, AUTHORS_COMMENT, COUNT} from './data.js';
import dayjs from 'dayjs';

let index = 0;

const generateData = (array) => {
  const randomIndex = getRandomInteger(0, array.length - 1);

  return array[randomIndex];
};

const generateDuration = (minutes) => {
  let hour = 0;
  while (minutes > 60) {
    hour += 1;
    minutes -= 60;
  }
  return hour === 0 ? `${minutes}m` : `${hour}h ${minutes}m`;
};

const generateDescription = (text) => text.length >= 139 ? `${text.substr(0, 139)} <span class='more'>...</span>` : text;
const getGenerateDate = () => `${getRandomInteger(1920, 2020)}-${getRandomInteger(1, 12)}-${getRandomInteger(1, 30)}`;

const generateComment = () => {
  const maxGap = 3;
  const gap = getRandomInteger(0, maxGap);

  return {
    id: getRandomInteger(0, 10000),
    author: generateData(AUTHORS_COMMENT),
    text: generateData(DESCRIPTIONS),
    date: dayjs()
      .subtract(gap, 'minute')
      .subtract(gap, 'hour')
      .subtract(gap, 'day')
      .format('YYYY/MM/DD HH:mm'),
    emotion: generateData(SMILES),
  };
};

const generateTask = (commentsId) => {
  const description = String(getRandomArray(1, 5, DESCRIPTIONS));
  const randomDate = dayjs(getGenerateDate());
  index += 1;
  return {
    id: index,
    poster: generateData(POSTERS),
    title: generateData(TITLES),
    alternativeTitle: generateData(ALTERNATIVE_TITLES),
    rating: getRandomIntegerFloat(0, 10, 1),
    ageRating: getRandomInteger(0, 18),
    productionDate: dayjs(randomDate).format('DD MMMM YYYY'),
    productionYear: dayjs(randomDate).format('YYYY'),
    country: generateData(COUNTRIES),
    duration: generateDuration(getRandomInteger(1,200)),
    genre: getRandomArray(1, 2, GENRES),
    description: description,
    descriptionShort: generateDescription(description),
    director: generateData(DIRECTORS),
    writer: getRandomArray(1, 3, WRITERS),
    actor: getRandomArray(1, 3, ACTORS),
    isWatchlist: Boolean(getRandomInteger(0, 1)),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    isHistory: Boolean(getRandomInteger(0, 1)),
    comment: commentsId,
  };
};

export const createCardFilmsTemplate = () => {
  const comments = new Array(getRandomInteger(1, COUNT.MAX_COMMENTS_FILMS)).fill(null).map(generateComment);
  const commentsId = comments.map((item) => item.id);
  const tasks = generateTask(commentsId);
  return {tasks, comments};
};
