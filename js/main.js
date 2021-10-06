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

//Функция генерации уникального ID из указанного диапазона
function createUniqueIdGeneratorFromRange (min, max) {
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
}

const SIMILAR_COUNT_MIN = 1;
const SIMILAR_COUNT_MAX = 10;

//Функция генерации уникального айди фото из диапазона
const generatePhotoId = createUniqueIdGeneratorFromRange(SIMILAR_COUNT_MIN, SIMILAR_COUNT_MAX);

//Приведение к виду 01, 02..
const formattedPhotoId = (`0${generatePhotoId()}`).slice(-2);

// let formattedNumber = ("0" + myNumber).slice(-2);
// //Приведет к двум toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}

const AUTHOR = {
  avatar: `img/avatars/user${formattedPhotoId}.png`,
};

const OFFER_TITLES = [
  'Алые паруса',
  'Вип Хаус',
  'Ульяна',
  'Волна',
  'Грейс Калифорния',
  'Лазурный',
  'Сосновый бор',
  'Страна магнолий',
  'Вейлер',
  'Южная  звезда',
];

// Вычисление координат
const MIN_LAT = 35.65000;
const MAX_LAT = 35.70000;
const PRECISION_LAT = 5;

const MIN_LNG = 139.70000;
const MAX_LNG = 139.80000;
const PRECISION_LNG = 5;

const LOCATION = {
  lat: getRandomFloat(MIN_LAT, MAX_LAT, PRECISION_LAT),
  lng: getRandomFloat(MIN_LNG, MAX_LNG, PRECISION_LNG),
};

// Строка адреса в предложении
const OFFER_ADDRESS = `${LOCATION.lat}, ${LOCATION.lng}`;

//Цена в предложении
const MIN_PRICE = 1000;
const MAX_PRICE = 100000;
const OFFER_PRICE = getRandomIntInclusive(MIN_PRICE, MAX_PRICE);

//Тип жилья
const OFFER_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

//Число комнат
const MIN_ROOMS = 1;
const MAX_ROOMS = 20;
const OFFER_ROOMS = getRandomIntInclusive(MIN_ROOMS, MAX_ROOMS);

// Число гостей
const MIN_GUESTS = 1;
const MAX_GUESTS = 20;
const OFFER_GUESTS = getRandomIntInclusive(MIN_GUESTS, MAX_GUESTS);

// Время
const OFFER_CHECKIN = [
  '12:00',
  '13:00',
  '14:00',
];

const OFFER_CHECKOUT = [
  '12:00',
  '13:00',
  '14:00',
];

// Удобства
const OFFER_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

// Описание
const OFFER_DESCRIPTION = [
  'Находится в Сочи, в 1,8 км от пляжа станции «Лесная».',
  'У здания разбит сад с террасой и принадлежностями для барбекю.',
  'C бесплатной парковкой, находится в Сочи, в 200 м от берега Черного моря.',
  'Расположен в центре Сочи.',
  'Стойка регистрации работает круглосуточно.',
  'В 5 минутах ходьбы от Театральной площади',
  'К услугам гостей разнообразные удобства для отдыха.',
];

// Фото
const OFFER_PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

//Функция получения рандомного элемента из массива
const getRandomArrayElement = (elements) => elements[_.random(0, elements.length - 1)];

//Функция получения n элементов из элементов массива
const getRandomLengthArray = (collection, n) => _.sampleSize(collection, n);

//Функция создания предложения - объект из 11 пар ключ-значение
const createOffer = () => ({
  title : getRandomArrayElement(OFFER_TITLES),
  address: OFFER_ADDRESS,
  price: OFFER_PRICE,
  type: getRandomArrayElement(OFFER_TYPES),
  rooms: OFFER_ROOMS,
  guests: OFFER_GUESTS,
  checkin: getRandomArrayElement(OFFER_CHECKIN),
  checkout: getRandomArrayElement(OFFER_CHECKOUT),
  features: getRandomLengthArray(OFFER_FEATURES, getRandomIntInclusive(1, OFFER_FEATURES.length)),
  description: getRandomArrayElement(OFFER_DESCRIPTION),
  photos: getRandomLengthArray(OFFER_PHOTOS, getRandomIntInclusive(1, OFFER_PHOTOS.length)),
});

//Функция создания объявления - объект из автора, предложения и местоположения
const createAd = () => ({
  author: AUTHOR,
  offer: createOffer(),
  location: LOCATION,
});

const similarAds = Array.from({length: SIMILAR_COUNT_MAX}, createAd);

similarAds;//чтобы линтер не ругался
