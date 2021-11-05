const API_URL = 'https://24.javascript.pages.academy/keksobooking';

export const getData = (onSuccess, onFail) => {
  fetch(
    `${API_URL}/data`,
    {
      method: 'GET',
    },
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((data) => onSuccess(data))
    .catch(() => {
      onFail();
    });
};


export const sendData = (onSuccess, onFail, body) => {
  fetch(
    API_URL,
    {
      method: 'POST',
      body,
    })
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};