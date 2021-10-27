
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE = 1000000;
const MIN_ROOMS = 1;
const MAX_ROOMS = 100;

const priceType = {
  bungalow: '0',
  flat: '1000',
  hotel: '3000',
  house: '5000',
  palace: '10000',
};

const adForm = document.querySelector('.ad-form');
const formTitle = adForm.querySelector('#title');
const formPrice = adForm.querySelector('#price');
const formType = adForm.querySelector('#type');
const formCapacity = adForm.querySelector('#capacity');
const formRooms = adForm.querySelector('#room_number');

const onTitleInput = () => {
  const valueLength = formTitle.value.lenght;
  if (valueLength === '0') {
    formTitle.setCustomValidity('Минимальная длина заголовка - 30 символов!');
  } else if (valueLength < MIN_TITLE_LENGTH) {
    formTitle.setCustomValidity(`Ещё ${  MIN_TITLE_LENGTH - valueLength } симв.`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    formTitle.setCustomValidity(`Удалите лишние ${valueLength - MAX_TITLE_LENGTH} симв.`);
  } else {
    formTitle.setCustomValidity('');
  }
};

const changeMinPrice = () => {
  formPrice.min = priceType[formType.value];
  formPrice.placeholder = priceType[formType.value];
};

const onPriceInput = (evt) => {
  const value = evt.target.value;
  const typeValue = priceType[formType.value];

  if (value.length === '0') {
    formPrice.setCustomValidity(`Минимальная цена ${typeValue}`);
  } else if (value < typeValue) {
    formPrice.setCustomValidity(`Минимальная цена ${typeValue}`);
  } else if (value > MAX_PRICE) {
    formPrice.setCustomValidity(`Максимальная цена ${MAX_PRICE}`);
  } else {
    formPrice.setCustomValidity('');
  }
};

const checkCapacity = () => {
  const roomsValue = Number(formRooms.value);
  const capacityValue = Number(formCapacity.value);

  if (roomsValue === MIN_ROOMS && capacityValue === '0'
    || roomsValue === MIN_ROOMS && roomsValue < capacityValue) {
    formCapacity.setCustomValidity('Допустимое количество гостей 1');
  } else if (roomsValue !== MAX_ROOMS && capacityValue === '0'
    || roomsValue !== MAX_ROOMS && roomsValue < capacityValue) {
    formCapacity.setCustomValidity(`Допустимое количество гостей от 1 до ${roomsValue}`);
  } else if (roomsValue === MAX_ROOMS && capacityValue !== '0') {
    formCapacity.setCustomValidity('Не для гостей');
  } else {
    formCapacity.setCustomValidity('');
  }
};

export const validateForm = () => {
  formTitle.addEventListener('invalid', onTitleInput);
  formTitle.addEventListener('input', onTitleInput);
  formType.addEventListener('change', changeMinPrice);
  formPrice.addEventListener('invalid', onPriceInput);
  formPrice.addEventListener('input', onPriceInput);
  formRooms.addEventListener('change', checkCapacity);
  formCapacity.addEventListener('change', checkCapacity);
};
