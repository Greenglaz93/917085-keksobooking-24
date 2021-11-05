import { validateForm } from './form-validation.js';
import { initMap } from './map.js';
import { onFormReset, onFormSubmit } from './form.js';

initMap();
validateForm();
onFormSubmit();
onFormReset();
