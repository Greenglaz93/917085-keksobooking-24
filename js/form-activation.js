const adForm = document.querySelector('.ad-form');
const filters = document.querySelector('.map__filters');

const deactivateForm = (form, formClass) => {
  form.classList.add(`${formClass}--disabled`);
  const formChildrens = form.children;
  formChildrens.disabled = true;
};

const activateForm = (form, formClass) => {
  form.classList.remove(`${formClass}--disabled`);
  const formChildrens = form.children;
  formChildrens.disabled = false;
};

export const makeActive = () => {
  activateForm(adForm, 'ad-form');
  activateForm(filters, 'map__filters');
};

export const makeDeactive = () => {
  deactivateForm(adForm, 'ad-form');
  deactivateForm(filters, 'map__filters');
};
