import { makeActive, makeInactive } from './activation.js';
import { renderPopup } from './card.js';

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

const TILE_LAYER = 'https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png';
const ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const address = document.querySelector('#address');
const mapCanvas = document.querySelector('.map__canvas');

const mainPinIcon = L.icon({
  iconUrl: MainPin.SRC,
  iconSize: [MainPin.WIDTH, MainPin.HEIGHT],
  iconAnchor: [MainPin.WIDTH / 2, MainPin.HEIGHT],
});

const mainPinMarker = L.marker(
  {lat: MapDefault.LAT, lng: MapDefault.LNG},
  {draggable: true, icon: mainPinIcon},
);

makeInactive();

export const map = L.map(mapCanvas)
  .on('load', () => {makeActive();})
  .setView({
    lat: MapDefault.LAT,
    lng: MapDefault.LNG,
  }, MapDefault.ZOOM);

L.tileLayer(TILE_LAYER,{attribution: ATTRIBUTION}).addTo(map);

const markerGroup = L.layerGroup().addTo(map);

export const setDefault = () => {
  mainPinMarker.setLatLng({
    lat: MapDefault.LAT,
    lng: MapDefault.LNG,
  });
  map.setView({
    lat: MapDefault.LAT,
    lng: MapDefault.LNG,
  }, MapDefault.ZOOM);
  map.closePopup();
  address.value = `${MapDefault.LAT.toFixed(MapDefault.PRECISION)}, ${MapDefault.LNG.toFixed(MapDefault.PRECISION)}`;
};

const setAddressValue = () => {
  mainPinMarker.on('move', (evt) => {
    const mainMarkerAddress = (evt.target.getLatLng());
    address.value = `${mainMarkerAddress.lat.toFixed(MapDefault.PRECISION)}, ${mainMarkerAddress.lng.toFixed(MapDefault.PRECISION)}`;
  });
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

export const renderMarkers = (points) => points.forEach(createMarker);

export const initMap = () => {
  setDefault();
  mainPinMarker.addTo(map);
  setAddressValue();
};
