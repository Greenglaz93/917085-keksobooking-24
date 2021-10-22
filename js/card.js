import {pluralize} from './utils.js';

const dictionary = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const DECLENSION = {
  rooms: ['комната', 'комнаты', 'комнат'],
  guests: ['гостя', 'гостей', 'гостей'],
};

const popup = document.querySelector('#card').content.querySelector('.popup');

const renderFeatures = (features, cardFeatures) => {
  features.forEach((element) => {
    const feature = document.createElement('li');

    feature.classList.add('popup__feature', `popup__feature--${element}`);
    cardFeatures.append(feature);
  });
};

const renderPhotos = (photos, cardPhotos, cardPhoto) => {
  photos.forEach((element) => {
    const photo = cardPhoto.cloneNode(true);

    photo.src = element;
    cardPhotos.append(photo);
  });
};

export const renderPopup = ({author, offer}) => {
  const {
    title,
    address,
    price,
    type,
    rooms,
    guests,
    checkin,
    checkout,
    description,
    features,
    photos,
  } = offer;
  const {avatar} = author;

  const card = popup.cloneNode(true);

  const cardAvatar = card.querySelector('.popup__avatar');
  const cardTitle = card.querySelector('.popup__title');
  const cardAddress = card.querySelector('.popup__text--address');
  const cardPrice = card.querySelector('.popup__text--price');
  const cardType = card.querySelector('.popup__type');
  const cardCapacity = card.querySelector('.popup__text--capacity');
  const cardTime = card.querySelector('.popup__text--time');
  const cardFeatures = card.querySelector('.popup__features');
  const cardDescription = card.querySelector('.popup__description');
  const cardPhotos = card.querySelector('.popup__photos');
  const cardPhoto = card.querySelector('.popup__photo');

  cardAvatar.src = avatar;
  cardTitle.textContent = title;
  cardAddress.textContent = address;
  cardPrice.textContent = `${price} ₽/ночь`;
  cardType.textContent = dictionary[type];
  cardCapacity.textContent = `${rooms} ${pluralize(rooms, DECLENSION.rooms)} для ${String(guests)} ${pluralize(guests, DECLENSION.guests)}`;
  cardTime.textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  cardDescription.textContent = description;

  if (features.length > 0) {
    cardFeatures.innerHTML = '';
    renderFeatures(features, cardFeatures);
  } else {
    cardFeatures.remove();
  }

  if (photos.length > 0) {
    cardPhotos.innerHTML = '';
    renderPhotos(photos, cardPhotos, cardPhoto);
  } else {
    cardFeatures.remove();
  }

  return card;
};
