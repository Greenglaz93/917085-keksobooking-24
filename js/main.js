/*Получение случайного целого числа в заданном интервале, включительно
https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random */

const getRandomIntInclusive = (lower, upper) => {

  if (lower >= upper || lower < 0) {
    throw new Error('Некорректный диапазон чисел');
  }

  const min = Math.ceil(lower);
  const max = Math.floor(upper);
  const result = Math.floor(Math.random() * (max - min + 1)) + min;

  return result;
};

getRandomIntInclusive(2, 10); //временный вызов функции

/*Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно
https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed*/

const getRandomFloat = (min, max, precision = 2) => {

  if (min >= max || min < 0) {
    throw new Error('Некорректный диапазон чисел');
  }

  const randomFloat = Math.random() * (max - min) + min;
  const result = randomFloat.toFixed(precision);

  return result;
};

getRandomFloat(1.1, 25.8, 5); //временный вызов функции
