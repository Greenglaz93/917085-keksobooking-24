import { sendData } from './load.js';
import { setDefault } from './map.js';

const adForm = document.querySelector('.ad-form');
const successMsgTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMsgTemplate = document.querySelector('#error').content.querySelector('.error');
const resetBtn = adForm.querySelector('.ad-form__reset');

const isEscKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const onMessage = (message) => {
  message.addEventListener('click', () => {
    message.remove();
  }, {once: true});
  document.addEventListener('keydown', (evt) => {
    if (isEscKey(evt)) {
      message.remove();
    }
  }, {once: true});
};

export const onFormReset = () => {
  resetBtn.addEventListener('click', () => {
    adForm.reset();
    setDefault();
  });
};

const showSuccessMsg = () => {
  const success = successMsgTemplate.cloneNode(true);
  document.body.appendChild(success);
  onMessage(success);
  adForm.reset();
  setDefault();
};

const showErrorMsg = () => {
  const error = errorMsgTemplate.cloneNode(true);
  document.body.appendChild(error);
  onMessage(error);
};

export const onFormSubmit = () => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    sendData(showSuccessMsg, showErrorMsg, formData);
  });
};
