const AcceptedFileTypes = [
  'image/apng',
  'image/avif',
  'image/gif',
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/svg+xml',
  'image/webp',
  'image/bmp',
  'image/x-icon',
  'image/tiff',
];

const DEFAULT_AVATAR_URL = 'img/muffin-grey.svg';

const avatarInput = document.querySelector('.ad-form-header__input');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
// const photoInput = document.querySelector('.ad-form__input');
// const photosPreviewContainer = document.querySelector('.ad-form__photo');

const setAvatarPreview = (input, preview) => {
  const file = input.files[0];

  const matches = AcceptedFileTypes.includes(file.type);

  if (matches) {
    preview.src = URL.createObjectURL(file);
  }
};


//не работает
// const setPhotoPreview = (input, previewContainer) => {
//   // const file = input.files[0];
//   // const reader = new FileReader();
//   // reader.onloadend = () => {
//   //   previewContainer.style.backgroundImage = `url('${reader.result})`;

//   //   if (file) {
//   //     reader.readAsDataURL(file);
//   //   }
//   // };
//   //если так пробовать, не дает доступ к локальному ресурсу
//   // previewContainer.style.backgroundImage = `url(${input.value})`;

// };

const onAvatarChange = () => setAvatarPreview(avatarInput, avatarPreview);
// const onPhotoChange = () => setPhotoPreview(photoInput, photosPreviewContainer);

export const setPreviews = () => {
  avatarInput.addEventListener('change', onAvatarChange);
  // photoInput.addEventListener('change', onPhotoChange);
};

const clearAvatarPreview = () => {
  avatarInput.value = '';
  avatarPreview.src = DEFAULT_AVATAR_URL;
};

const clearPhotosPreview = () => {
  //
};

export const clearPreviews = () => {
  clearAvatarPreview();
  clearPhotosPreview();
};
