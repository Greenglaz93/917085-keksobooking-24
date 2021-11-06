const ERROR_SHOW_TIME = 3000;

export const getRandomIntInclusive = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.floor(Math.random() * (upper - lower + 1)) + lower;

  return result;
};

export const getRandomFloat = (min, max, precision = 2) => {
  const lower = Math.min(Math.abs(min), Math.abs(max));
  const upper = Math.max(Math.abs(min), Math.abs(max));
  const result = Math.random() * (upper - lower) + lower;

  return parseFloat(result.toFixed(precision));
};

export const createUniqueIdGeneratorFromRange = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomIntInclusive(min, max);
    if (previousValues.length >= (max - min + 1)) {
      throw new Error('Перебраны все числа из диапазона');
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomIntInclusive(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

export const getRandomArrayElement = (elements) => elements[getRandomIntInclusive(0, elements.length - 1)];

export const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

export const createRandomLengthArray = (array) => {
  const newArray = array.slice();
  const randomNumber = getRandomIntInclusive(1, newArray.length);

  return shuffle(newArray).slice(0, randomNumber);
};

export function pluralize(number, words) {
  return words[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? Math.abs(number) % 10 : 5]];
}

export const showErrorMsg = (message) => {
  const container = document.createElement('div');

  container.style.zIndex = 100;
  container.style.position = 'absolute';
  container.style.left = 0;
  container.style.top = 0;
  container.style.right = 0;
  container.style.padding = '10px 3px';
  container.style.fontSize = '26px';
  container.style.textAlign = 'center';
  container.style.backgroundColor = 'red';
  container.style.color = 'white';
  container.textContent = message;

  document.body.append(container);

  setTimeout(() => {
    container.remove();
  }, ERROR_SHOW_TIME);
};
