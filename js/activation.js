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

const makeActive = (form, formClass) => {
  activateForm(form, formClass);
};

const makeInactive = () => {
  deactivateForm(adForm, 'ad-form');
  deactivateForm(filters, 'map__filters');
};

export {
  makeActive,
  makeInactive
};
