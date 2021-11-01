import { makeActive, makeInactive } from './form-activation.js';
import { createAds } from './data.js';
import { renderPopup } from './card.js';

const AMOUNT = 10;

const initial = {
  lat: 35.682272,
  lng: 139.753137,
  zoom: 10,
  precision: 5,
};

const mainPin = {
  width: 52,
  height: 52,
  src: '../img/main-pin.svg',
};

const pin = {
  width: 40,
  height: 40,
  src: '../img/pin.svg',
};

const TILE_LAYER = 'https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png';
const ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const address = document.querySelector('#address');
const mapCanvas = document.querySelector('.map__canvas');
const resetBtn = document.querySelector('.ad-form__reset');

const getAddressValue = () => {
  const {lat, lng, precision} = initial;
  address.value = `${lat.toFixed(precision)}, ${lng.toFixed(precision)}`;
};

makeInactive();

const map = L.map(mapCanvas)
  .on('load', () => {makeActive();})
  .setView({
    lat: initial.lat,
    lng: initial.lng,
  }, initial.zoom);

L.tileLayer(TILE_LAYER,{attribution: ATTRIBUTION}).addTo(map);

const markerGroup = L.layerGroup().addTo(map);

function onAddressChange(evt) {
  const { precision } = initial;
  const { lat, lng } = evt.target.getLatLng();

  address.value = `${lat.toFixed(precision)}, ${lng.toFixed(precision)}`;
}

const mainPinIcon = L.icon({
  iconUrl: mainPin.src,
  iconSize: [mainPin.width, mainPin.height],
  iconAnchor: [mainPin.width / 2, mainPin.height],
});

const mainPinMarker = L.marker(
  {lat: initial.lat, lng: initial.lng},
  {draggable: true, icon: mainPinIcon},
);

const setDefault = () => {
  mainPinMarker.setLatLng({
    lat: initial.lat,
    lng: initial.lng,
  });
  map.setView({
    lat: initial.lat,
    lng: initial.lng,
  }, initial.zoom);
  getAddressValue();
};

resetBtn.addEventListener('click', setDefault);

const createMarker = (point) => {
  const { lat, lng } = point.location;

  const icon = L.icon({
    iconUrl: pin.src,
    iconSize: [pin.width, pin.width],
    iconAnchor: [pin.width / 2, pin.height],
  });

  L.marker({ lat, lng }, { icon }).addTo(markerGroup).bindPopup(renderPopup(point));
};

const renderMarkers = (points) => points.forEach(createMarker);
const ads = createAds(AMOUNT);

export const initMap = () => {
  getAddressValue();
  mainPinMarker.addTo(map);
  mainPinMarker.on('move', onAddressChange);
  renderMarkers(ads);
};
