import { makeActive } from './activation.js';
import { renderPopup } from './card.js';
import { setFilterListener } from './filter.js';
import { getData } from './api.js';
import { showErrorMsg } from './utils.js';

const MapDefault = {
  LAT: 35.682272,
  LNG: 139.753137,
  ZOOM: 13,
  PRECISION: 5,
};

const MainPin = {
  WIDTH: 52,
  HEIGHT: 52,
  SRC: '../img/main-pin.svg',
};

const Pin = {
  WIDTH: 40,
  HEIGHT: 40,
  SRC: '../img/pin.svg',
};

const AMOUNT = 10;
const ERROR_MESSAGE = 'Ошибка загрузки данных';
const TILE_LAYER = 'https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png';
const ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const address = document.querySelector('#address');
const mapCanvas = document.querySelector('.map__canvas');
const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');

const mainPinIcon = L.icon({
  iconUrl: MainPin.SRC,
  iconSize: [MainPin.WIDTH, MainPin.HEIGHT],
  iconAnchor: [MainPin.WIDTH / 2, MainPin.HEIGHT],
});

const mainPinMarker = L.marker(
  {lat: MapDefault.LAT, lng: MapDefault.LNG},
  {draggable: true, icon: mainPinIcon},
);

const map = L.map(mapCanvas)
  .setView({
    lat: MapDefault.LAT,
    lng: MapDefault.LNG,
  }, MapDefault.ZOOM);

L.tileLayer(TILE_LAYER,{attribution: ATTRIBUTION}).addTo(map);

const markerGroup = L.layerGroup().addTo(map);

const setAddressValue = () => {
  address.value = `${MapDefault.LAT.toFixed(MapDefault.PRECISION)}, ${MapDefault.LNG.toFixed(MapDefault.PRECISION)}`;
};

const setDefault = () => {
  mainPinMarker.setLatLng({
    lat: MapDefault.LAT,
    lng: MapDefault.LNG,
  });
  map.setView({
    lat: MapDefault.LAT,
    lng: MapDefault.LNG,
  }, MapDefault.ZOOM);
  map.closePopup();
  setAddressValue();
};

const onAddressChange = (evt) => {
  const { lat, lng } = evt.target.getLatLng();
  address.value = `${lat.toFixed(MapDefault.PRECISION)}, ${lng.toFixed(MapDefault.PRECISION)}`;
};

const createMarker = (point) => {
  const { lat, lng } = point.location;

  const icon = L.icon({
    iconUrl: Pin.SRC,
    iconSize: [Pin.WIDTH, Pin.HEIGHT],
    iconAnchor: [Pin.WIDTH / 2, Pin.HEIGHT],
  });

  L.marker({ lat, lng }, { icon }).addTo(markerGroup).bindPopup(renderPopup(point));
};

const clearMarkers = () => markerGroup.clearLayers();

const renderMarkers = (points) => points.forEach(createMarker);

const onDataLoad = (ads) => {
  makeActive(mapFilters, '.map__filters');
  renderMarkers(ads.slice(0, AMOUNT));
  setFilterListener(ads);
};

const onDataFail = () => {
  showErrorMsg(ERROR_MESSAGE);
};

const initMap = () => {
  setDefault();
  map.whenReady(() => {
    makeActive(adForm, '.ad-form');
    getData(onDataLoad, onDataFail);
  });
  mainPinMarker.addTo(map);
  mainPinMarker.on('move', onAddressChange);
};

export {
  setDefault,
  clearMarkers,
  renderMarkers,
  initMap
};
