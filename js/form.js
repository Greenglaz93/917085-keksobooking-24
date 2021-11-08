import { sendData } from './api.js';
import { resetFilters } from './filter.js';
import { clearMarkers, initMap, setDefault } from './map.js';

const adForm = document.querySelector('.ad-form');
const successMsgTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMsgTemplate = document.querySelector('#error').content.querySelector('.error');
const resetBtn = adForm.querySelector('.ad-form__reset');

const isEscKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const renderMessage = (node) => {
  const onClose = () => {
    node.remove();
    document.removeEventListener('keydown', onDocumentKeyDown);
  };

  function onDocumentKeyDown(evt) {
    if (isEscKey(evt)) {
      onClose();
    }
  }

  const onNodeClick = () => onClose();

  node.addEventListener('click', onNodeClick);
  document.addEventListener('keydown', onDocumentKeyDown);
};


export const onFormReset = () => {
  adForm.reset();
  resetFilters();
  clearMarkers();
  initMap();
};

resetBtn.addEventListener('click', onFormReset);

const showSuccessMsg = () => {
  const success = successMsgTemplate.cloneNode(true);
  document.body.appendChild(success);
  renderMessage(success);
};

const showErrorMsg = () => {
  const error = errorMsgTemplate.cloneNode(true);
  document.body.appendChild(error);
  renderMessage(error);
};

const onSendSuccess = () => {
  showSuccessMsg();
  adForm.reset();
  setDefault();
};

export const onFormSubmit = () => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    sendData(onSendSuccess, showErrorMsg, formData);
  });
};
