/*Получение случайного целого числа в заданном интервале, включительно
https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random */

const getRandomIntInclusive = (min, max) => {
  if (min >= max ||
    min < 0) {
    throw new Error('Некорректный диапазон чисел');
  }

  min = Math.ceil(min);
  max = Math.floor(max);
  const result = Math.floor(Math.random() * (max - min + 1)) + min;

  return result;
};

getRandomIntInclusive(2, 10); //временный вызов функции

/*Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно
https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed*/

const getRandomFloat = (min, max, precision) => {
  if (min >= max ||
    min < 0 ||
    precision === 0) {
    throw new Error('Некорректный диапазон чисел');
  }

  const randomFloat = Math.random() * (max - min) + min;
  const result = randomFloat.toFixed(precision);

  return result;
};

getRandomFloat(1.1, 25.8, 5); //временный вызов функции
