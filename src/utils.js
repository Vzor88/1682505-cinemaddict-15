export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomIntegerFloat = (minNumber, maxNumber, float) => Number((Math.random() * (maxNumber - minNumber) + minNumber).toFixed(float));

export const getRandomArray = (minLength, maxLength, array) => {
  const randomArray = new Array(getRandomInteger (minLength, maxLength)).fill(null).map(() => array[getRandomInteger (0, array.length -1)]);
  return Array.from(new Set(randomArray));
};

export const isClassName = (boolean) =>  boolean ? 'film-card__controls-item--active' : '';

export const isClassNamePopup = (boolean) =>  boolean ? 'film-details__control-button--active' : '';

export const ucFirstName = (name) => name[0].toUpperCase() + name.substr(1).toLowerCase();
