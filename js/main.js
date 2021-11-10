import { validateForm } from './form-validation.js';
import { initMap } from './map.js';
import { onFormSubmit } from './form.js';
import { setPreviews } from './previews.js';

initMap();
validateForm();
setPreviews();
onFormSubmit();
