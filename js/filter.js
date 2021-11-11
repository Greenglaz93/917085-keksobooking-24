import { renderMarkers, clearMarkers } from './map.js';
import { debounce } from './utils/debounce.js';

const AMOUNT = 10;
const DEFAULT_VALUE = 'any';

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
    max: 1000000,
  },
};

const mapFilters = document.querySelector('.map__filters');
const typeSelect = mapFilters.querySelector('#housing-type');
const priceSelect = mapFilters.querySelector('#housing-price');
const roomsSelect = mapFilters.querySelector('#housing-rooms');
const guestsSelect = mapFilters.querySelector('#housing-guests');

const filterByType = ({ offer }) => (
  typeSelect.value === DEFAULT_VALUE || typeSelect.value === offer.type
);

const filterByRooms = ({ offer }) => (
  roomsSelect.value === DEFAULT_VALUE || roomsSelect.value === String(offer.rooms)
);

const filterByGuests = ({ offer }) => (
  guestsSelect.value === DEFAULT_VALUE || guestsSelect.value === String(offer.guests)
);

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
      return offer.price > priceFilterRange.high.min && offer.price < priceFilterRange.high.max;
  }
};

const filterByFeatures = ({ offer }) => {
  const checkedFeatures = mapFilters.querySelectorAll('.map__checkbox:checked');

  if (checkedFeatures.length === 0) {
    return true;
  }

  if (!offer.features) {
    return false;
  }

  return Array.from(checkedFeatures).every((feature) => offer.features.includes(feature.value));
};

const filterMarkers = (ads) => ads.filter((item) => (
  filterByType(item)
  && filterByRooms(item)
  && filterByGuests(item)
  && filterByPrice(item)
  && filterByFeatures(item)
));

const onFilterChange = (data) => {
  const filteredData = filterMarkers(data);
  clearMarkers();
  renderMarkers(filteredData.slice(0, AMOUNT));
};

const setFilterListener = (ads) => {
  mapFilters.addEventListener('change', debounce(() => onFilterChange(ads)));
  mapFilters.addEventListener('reset', debounce(() => onFilterChange(ads)));
};

export { setFilterListener };
