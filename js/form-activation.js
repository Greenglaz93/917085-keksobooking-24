const adForm = document.querySelector('.ad-form');
const filters = document.querySelector('.map__filters');

const deactivateForm = (form, formClass) => {
  form.classList.add(`${formClass}--disabled`);
  Array.from(form.children).forEach((element) => element.disabled = true);
};

const activateForm = (form, formClass) => {
  form.classList.remove(`${formClass}--disabled`);
  Array.from(form.children).forEach((element) => element.disabled = false);
};

export const makeActive = () => {
  activateForm(adForm, 'ad-form');
  activateForm(filters, 'map__filters');
};

export const makeInactive = () => {
  deactivateForm(adForm, 'ad-form');
  deactivateForm(filters, 'map__filters');
};
