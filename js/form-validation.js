const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE = 1000000;
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
const formTimeIn = adForm.querySelector('#timein');
const formTimeOut = adForm.querySelector('#timeout');

const onTitleInput = () => {
  const valueLength = formTitle.value.length;
  if (valueLength === 0) {
    formTitle.setCustomValidity('Минимальная длина заголовка - 30 символов!');
  } else if (valueLength < MIN_TITLE_LENGTH) {
    formTitle.setCustomValidity(`Ещё ${  MIN_TITLE_LENGTH - valueLength } симв.`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    formTitle.setCustomValidity(`Удалите лишние ${valueLength - MAX_TITLE_LENGTH} симв.`);
  } else {
    formTitle.setCustomValidity('');
  }
  formTitle.reportValidity();
};

export const changeMinPrice = () => {
  formPrice.min = priceType[formType.value];
  formPrice.placeholder = priceType[formType.value];
};

const onChangePrice = () => changeMinPrice();

const onPriceInput = (evt) => {
  const value = evt.target.value;
  const typeValue = priceType[formType.value];

  if (value < typeValue) {
    formPrice.setCustomValidity(`Минимальная цена ${typeValue}`);
  } else if (value > MAX_PRICE) {
    formPrice.setCustomValidity(`Максимальная цена ${MAX_PRICE}`);
  } else {
    formPrice.setCustomValidity('');
  }
  formPrice.reportValidity();
};

const checkCapacity = () => {
  const rooms = Number(formRooms.value);
  const guests = Number(formCapacity.value);

  if (rooms < guests) {
    formCapacity.setCustomValidity('Выберите другой вариант');
  } else if (rooms === MAX_ROOMS && guests !== 0) {
    formCapacity.setCustomValidity('Выберите другой вариант');
  } else if (guests === 0 && rooms !== MAX_ROOMS) {
    formCapacity.setCustomValidity('Выберите другой вариант');
  } else {
    formCapacity.setCustomValidity('');
  }
  formCapacity.reportValidity();
};

const onChangeTimeIn = () => formTimeOut.value = formTimeIn.value;
const onChangeTimeOut = () => formTimeIn.value = formTimeOut.value;

const syncTime = () => {
  onChangeTimeIn();
  onChangeTimeOut();
};

const onChangeCapacity = () => checkCapacity();


const syncFields = () => {
  changeMinPrice();
  checkCapacity();
  syncTime();
};

export const validateForm = () => {
  syncFields();

  formTitle.addEventListener('input', onTitleInput);

  formType.addEventListener('change', onChangePrice);
  formPrice.addEventListener('change', onPriceInput);

  formRooms.addEventListener('change', onChangeCapacity);
  formCapacity.addEventListener('change', onChangeCapacity);

  formTimeIn.addEventListener('change', onChangeTimeIn);
  formTimeOut.addEventListener('change', onChangeTimeOut);
};
