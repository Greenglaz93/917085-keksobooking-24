import { validateForm } from './form-validation.js';
import { initMap, renderMarkers } from './map.js';
import { getData } from './load.js';
import { shuffle } from './utils.js';
import { onFormReset, onFormSubmit } from './form.js';

const AMOUNT = 10;

initMap();
validateForm();
onFormSubmit();
onFormReset();
getData().then((response) => {
  const ads = shuffle(response);
  renderMarkers(ads.slice(0, AMOUNT));
});

