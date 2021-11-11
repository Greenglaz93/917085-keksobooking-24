import { validateForm } from './form-validation.js';
import { initMap } from './map.js';
import { onFormSubmit } from './form.js';
import { setPreviews } from './previews.js';
import { makeInactive } from './activation.js';

makeInactive();
initMap();
validateForm();
setPreviews();
onFormSubmit();
