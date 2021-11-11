const getRandomIntInclusive = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.floor(Math.random() * (upper - lower + 1)) + lower;

  return result;
};

const getRandomFloat = (min, max, precision = 2) => {
  const lower = Math.min(Math.abs(min), Math.abs(max));
  const upper = Math.max(Math.abs(min), Math.abs(max));
  const result = Math.random() * (upper - lower) + lower;

  return parseFloat(result.toFixed(precision));
};

const createUniqueIdGeneratorFromRange = (min, max) => {
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

const getRandomArrayElement = (elements) => elements[getRandomIntInclusive(0, elements.length - 1)];

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

const createRandomLengthArray = (array) => {
  const newArray = array.slice();
  const randomNumber = getRandomIntInclusive(1, newArray.length);

  return shuffle(newArray).slice(0, randomNumber);
};

function pluralize(number, words) {
  return words[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? Math.abs(number) % 10 : 5]];
}

const showErrorMsg = (message) => {
  const container = document.createElement('div');
  const SHOW_ERROR_TIME = 3000;

  container.style.zIndex = 999;
  container.style.position = 'fixed';
  container.style.left = 0;
  container.style.top = '10px';
  container.style.right = 0;
  container.style.margin = '0 auto';
  container.style.paddingTop = '20px';
  container.style.height = '80px';
  container.style.maxWidth = '600px';
  container.style.border = '4px solid red';
  container.style.borderRadius = '20px';
  container.style.fontSize = '30px';
  container.style.textAlign = 'center';
  container.style.backgroundColor = 'red';
  container.style.color = 'white';
  container.textContent = message;

  document.body.append(container);

  setTimeout(() => {
    container.remove();
  }, SHOW_ERROR_TIME);
};

export {
  getRandomIntInclusive,
  getRandomFloat,
  createUniqueIdGeneratorFromRange,
  getRandomArrayElement,
  shuffle,
  createRandomLengthArray,
  pluralize,
  showErrorMsg
};
