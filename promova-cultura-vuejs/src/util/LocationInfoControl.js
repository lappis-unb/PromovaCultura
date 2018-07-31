import $ from "jquery";
import EventBus from './EventBus';


/**
 * If "now" and "before" are equals, then the mouse is
 * out of canvas or has never been inside,
 * so keep the LocationInfo hidden.
 */
const __stateMouseOver = {
  now: "",
  before: ""
};


let __locationInfo = undefined;
const getLocationInfo = () => {
  if (!__locationInfo) {
    __locationInfo = document.querySelector('.LocationInfo');
  }

  return __locationInfo;
}

const __stateBoxDirections = {
  'AM': {top: 150, left: 175},
  'AC': {top: 230, left: 75},
  'RO': {top: 260, left: 190},
  'RR': {top: 60, left: 215},
  'MT': {top: 300, left: 310},
  'PA': {top: 165, left: 350},
  'AP': {top: 70, left: 360},
  'MS': {top: 180, left: 320},
  'SP': {top: 210, left: 100},
  'RJ': {top: 220, left: 200},
  'TO': {top: 250, left: 115},
  'GO': {top: 110, left: 95},
  'DF': {top: 115, left: 128},
  'MA': {top: 170, left: 170},
  'BA': {top: 290, left: 230},
  'PI': {top: 210, left: 200},
  'MG': {top: 150, left: 165},
  'CE': {top: 175, left: 270},
  'SE': {top: 245, left: 300},
  'AL': {top: 225, left: 300},
  'PE': {top: 210, left: 270},
  'PB': {top: 195, left: 310},
  'RN': {top: 170, left: 300},
  'ES': {top: 160, left: 245},
  'PR': {top: 250, left: 60},
  'SC': {top: 300, left: 85},
  'RS': {top: 335, left: 35},

}


const getBoxPosition = ({ abbreviation }) => {
  if (abbreviation in __stateBoxDirections) {
    return __stateBoxDirections[abbreviation];
  }

  throw new Error(`Abbreviation not found on __stateBoxDirections.\n abbreviation = ${abbreviation}`);
}


const setNewlocationInfoPosition = (data) => {
  let locationInfo = getLocationInfo();
  let positions = getBoxPosition(data);

  locationInfo.style.top = `${positions.top}px`;
  locationInfo.style.left = `${positions.left}px`;
  locationInfo.style.display = "inline-block";
}


const onStateClick = (data) => {
  let locationInfo = getLocationInfo();
  locationInfo.style.top = '200px';
  locationInfo.style.left = '200px';
  locationInfo.style.display = "inline-block";

  $('#location-modal').modal({ show: true });

  EventBus.$emit('mapOnMouseOver', data);
}


const onMouseOverState = (data) => {
  __stateMouseOver.now = data.name;
  setNewlocationInfoPosition(data);
  EventBus.$emit('mapOnMouseOver', data);
}


const onMouseOutState = (data) => {
  __stateMouseOver.before = data.name;

  // Check if mouse is out of canvas, if yes, hide it.
  if (__stateMouseOver.now === __stateMouseOver.before) {
    const locationInfo = getLocationInfo();
    // locationInfo.style.display = "none";
  }
}


const getPropByType = (obj, prop) => (type) => {
  let locationInfo = getLocationInfo();

  if (locationInfo.dataset.showon === type) {
    return obj[prop];
  } else {
    return undefined;
  }
}


const __publicActions = { onStateClick, onMouseOverState, onMouseOutState };

const LocationInfoControl = new Proxy(__publicActions, {
  get: function (obj, prop) {
    let propGetter = getPropByType(obj, prop);

    switch (prop) {
      case "onStateClick":
        return propGetter("click");

      case "onMouseOverState":
        return propGetter("hover");

      case "onMouseOutState":
        return propGetter("hover");

      default:
        return undefined;
    }
  }
});

export default LocationInfoControl;
