export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomIntegerFloat = (minNumber, maxNumber, float) => Number((Math.random() * (maxNumber - minNumber) + minNumber).toFixed(float));

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.film.id === update.film.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};
