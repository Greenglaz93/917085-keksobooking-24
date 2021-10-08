import {
  getRandomIntInclusive,
  getRandomFloat,
  createUniqueIdGeneratorFromRange,
  getRandomArrayElement,
  createRandomLengthArray} from './utils.js';

const SIMILAR_COUNT_MIN = 1;
const SIMILAR_COUNT_MAX = 10;
const MIN_LAT = 35.65000;
const MAX_LAT = 35.70000;
const PRECISION_LAT = 5;
const MIN_LNG = 139.70000;
const MAX_LNG = 139.80000;
const PRECISION_LNG = 5;
const MIN_PRICE = 1000;
const MAX_PRICE = 100000;
const MIN_ROOMS = 1;
const MAX_ROOMS = 20;
const MIN_GUESTS = 1;
const MAX_GUESTS = 20;

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
const OFFER_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];
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
const OFFER_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const OFFER_DESCRIPTION = [
  'Находится в Сочи, в 1,8 км от пляжа станции «Лесная».',
  'У здания разбит сад с террасой и принадлежностями для барбекю.',
  'C бесплатной парковкой, находится в Сочи, в 200 м от берега Черного моря.',
  'Расположен в центре Сочи.',
  'Стойка регистрации работает круглосуточно.',
  'В 5 минутах ходьбы от Театральной площади',
  'К услугам гостей разнообразные удобства для отдыха.',
];
const OFFER_PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const generatePhotoId = createUniqueIdGeneratorFromRange(SIMILAR_COUNT_MIN, SIMILAR_COUNT_MAX);

// eslint-disable-next-line arrow-body-style
const createAvatarId = () => {
  const avatarId = generatePhotoId();

  return String(avatarId).padStart(2, '0');
};

// eslint-disable-next-line arrow-body-style
const createOffer = () => {
  const latitude = getRandomFloat(MIN_LAT, MAX_LAT, PRECISION_LAT);
  const longitude = getRandomFloat(MIN_LNG, MAX_LNG, PRECISION_LNG);

  return {
    author: {
      avatar: `img/avatars/user${createAvatarId()}.png`,
    },
    offer: {
      title : getRandomArrayElement(OFFER_TITLES),
      address: `${latitude}, ${longitude}`,
      price: getRandomIntInclusive(MIN_PRICE, MAX_PRICE),
      type: getRandomArrayElement(OFFER_TYPES),
      rooms: getRandomIntInclusive(MIN_ROOMS, MAX_ROOMS),
      guests: getRandomIntInclusive(MIN_GUESTS, MAX_GUESTS),
      checkin: getRandomArrayElement(OFFER_CHECKIN),
      checkout: getRandomArrayElement(OFFER_CHECKOUT),
      features: createRandomLengthArray(OFFER_FEATURES),
      description: getRandomArrayElement(OFFER_DESCRIPTION),
      photos: createRandomLengthArray(OFFER_PHOTOS),
    },
    location: {
      lat: latitude,
      lng: longitude,
    },
  };
};

const createAds = (amount) => Array.from({length: amount}, createOffer);
createAds(SIMILAR_COUNT_MAX);
