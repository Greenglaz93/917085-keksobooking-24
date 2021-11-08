import { renderMarkers, clearMarkers } from './map.js';
import { debounce } from './utils/debounce.js';

const AMOUNT = 10;
const DEFAULT_VALUE = 'any';
const DELAY = 500;

const priceFilterRange = {
  low: {
    min: 0,
    max: 10000,
  },
  middle: {
    min: 10000,
    max: 50000,
  },
  high: {
    min: 50000,
  },
};

const mapFilters = document.querySelector('.map__filters');
const typeSelect = mapFilters.querySelector('#housing-type');
const priceSelect = mapFilters.querySelector('#housing-price');
const roomsSelect = mapFilters.querySelector('#housing-rooms');
const guestsSelect = mapFilters.querySelector('#housing-guests');

export const resetFilters = () => mapFilters.reset();

const filterByType = ({ offer }) => {
  if (typeSelect.value !== DEFAULT_VALUE && typeSelect.value !== offer.type) {
    return false;
  }
  return true;
};

const filterByRooms = ({ offer }) => {
  if (roomsSelect.value !== DEFAULT_VALUE && roomsSelect.value !== String(offer.rooms)) {
    return false;
  }
  return true;
};

const filterByGuests = ({ offer }) => {
  if (guestsSelect.value !== DEFAULT_VALUE && guestsSelect.value !== String(offer.guests)) {
    return false;
  }
  return true;
};

const filterByPrice = ({ offer }) => {
  const offerPriceType = priceSelect.value;

  if (offerPriceType === DEFAULT_VALUE) {
    return true;
  }

  switch (offerPriceType) {
    case 'low':
      return offer.price > priceFilterRange.low.min && offer.price < priceFilterRange.low.max;
    case 'middle':
      return offer.price >= priceFilterRange.middle.min && offer.price <= priceFilterRange.middle.max;
    case 'high':
      return offer.price > priceFilterRange.high.min;
  }
};

const filterByFeatures = ({ offer }) => {
  const featuresChecked = mapFilters.querySelectorAll('input[name="features"]:checked');
  if (!featuresChecked.length) {
    return true;
  }
  if (!offer.features) {
    return false;
  }

  let featuresCount = 0;
  featuresChecked.forEach((feature) => {
    if (offer.features.includes(feature.value)) {
      featuresCount++;
    }
  });
  return featuresCount === featuresChecked.length;
};

const filterMarkers = (ads) => ads.filter((item) => filterByType(item)
  && filterByRooms(item)
  && filterByGuests(item)
  && filterByPrice(item)
  && filterByFeatures(item));

const onFilterChange = (data) => {
  const filteredData = filterMarkers(data);
  clearMarkers();
  renderMarkers(filteredData.slice(0, AMOUNT));
};

export const setFilterListener = (ads) => {
  mapFilters.addEventListener('change', () => {
    debounce(onFilterChange(ads), DELAY);});
};
