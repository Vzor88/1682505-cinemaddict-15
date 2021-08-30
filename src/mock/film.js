import {getRandomArray} from '../utils/card-film.js';
import {getRandomInteger, getRandomIntegerFloat} from '../utils/common.js';
import {DESCRIPTIONS, GENRES, POSTERS, SMILES, TITLES, ALTERNATIVE_TITLES, DIRECTORS, WRITERS, ACTORS, RATING, COUNTRIES, AUTHORS_COMMENT, DURATION, COUNT_RANDOM_DATE, COUNT_RANDOM_DATE_WATCHING} from './data.js';
import {INDEX_COMMENT, COUNTS} from '../consts.js';
import dayjs from 'dayjs';

let index = 0;

export const generateData = (array) => {
  const randomIndex = getRandomInteger(0, array.length - 1);

  return array[randomIndex];
};

// const generateDuration = (minutes) => {
//   let hour = 0;
//   while (minutes > 60) {
//     hour += 1;
//     minutes -= 60;
//   }
//   return hour === 0 ? `${minutes}m` : `${hour}h ${minutes}m`;
// };

const generateDate = () => {
  const randYear = getRandomInteger(COUNT_RANDOM_DATE.YEAR.MIN, COUNT_RANDOM_DATE.YEAR.MAX);
  const randMonth = getRandomInteger(COUNT_RANDOM_DATE.MONTH.MIN, COUNT_RANDOM_DATE.MONTH.MAX);
  const randDay = getRandomInteger(COUNT_RANDOM_DATE.DAY.MIN, COUNT_RANDOM_DATE.DAY.MAX);

  return `${randYear}-${randMonth}-${randDay}`;
};

const generateDateWatching = () => {
  const randYear = getRandomInteger(COUNT_RANDOM_DATE_WATCHING.YEAR.MIN, COUNT_RANDOM_DATE_WATCHING.YEAR.MAX);
  const randMonth = getRandomInteger(COUNT_RANDOM_DATE_WATCHING.MONTH.MIN, COUNT_RANDOM_DATE_WATCHING.MONTH.MAX);
  const randDay = getRandomInteger(COUNT_RANDOM_DATE_WATCHING.DAY.MIN, COUNT_RANDOM_DATE_WATCHING.DAY.MAX);

  return `${randYear}-${randMonth}-${randDay}`;
};

export const generateComment = () => {
  const maxGap = DURATION.GAP;
  const gap = getRandomInteger(0, maxGap);

  return {
    id: getRandomInteger(INDEX_COMMENT.MIN, INDEX_COMMENT.MAX),
    author: generateData(AUTHORS_COMMENT),
    comment: generateData(DESCRIPTIONS),
    date: dayjs()
      .subtract(gap, 'minute')
      .subtract(gap, 'hour')
      .subtract(gap, 'day')
      .format('YYYY/MM/DD HH:mm'),
    emotion: generateData(SMILES),
  };
};

const generateUserDetails = () => ({
  watchList: Boolean(getRandomInteger(0, 1)),
  alreadyWatched: Boolean(getRandomInteger(0, 1)),
  watchingDate: generateDateWatching(),
  favorite: Boolean(getRandomInteger(0, 1)),
});

const generateReleaseFilm = () => {
  const randomDate = dayjs(generateDate());

  return {
    date: dayjs(randomDate).format('DD MMMM YYYY'),
    releaseCountry: generateData(COUNTRIES),
  };
};

const generateFIlmInfo = () => {
  const releaseFilm = generateReleaseFilm();

  return {
    title: generateData(TITLES),
    alternativeTitle: generateData(ALTERNATIVE_TITLES),
    totalRating: getRandomIntegerFloat(RATING.FILM.MIN, RATING.FILM.MAX, 1),
    poster: generateData(POSTERS),
    ageRating: getRandomInteger(RATING.AGE.MIN, RATING.AGE.MAX),
    director: generateData(DIRECTORS),
    writers: getRandomArray(1, 3, WRITERS),
    actors: getRandomArray(1, 3, ACTORS),
    releaseFilm,
    runtime: getRandomInteger(DURATION.FILM.MIN,DURATION.FILM.MAX),
    genre: getRandomArray(1, 2, GENRES),
    description: String(getRandomArray(1, 5, DESCRIPTIONS)),
  };
};

const generateFilm = (commentsId) => {
  const filmInfo = generateFIlmInfo();
  const userDetails = generateUserDetails();
  index += 1;

  return {
    id: index,
    comments: commentsId,
    filmInfo,
    userDetails,
  };
};

export const generateCardFilmTemplate = () => {
  const comments = new Array(getRandomInteger(1, COUNTS.MAX_COMMENTS_FILMS)).fill(null).map(generateComment);
  const commentsId = comments.map((item) => item.id);
  const film = generateFilm(commentsId);
  return {film, comments};
};
