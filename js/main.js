import {createAds} from './data.js';
import {renderPopup} from './card.js';
import {makeActive, makeInactive} from './form-activation.js';

const mapCanvas = document.querySelector('#map-canvas');
const AMOUNT = 10;
const ads = createAds(AMOUNT);
const popup = renderPopup(ads[0]);

mapCanvas.appendChild(popup);

makeActive();
makeInactive();
