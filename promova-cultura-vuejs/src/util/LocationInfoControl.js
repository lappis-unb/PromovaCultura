// import $ from "jquery";
// import "proxy-polyfill"
//
//
// let __locationInfo = undefined;
// const getLocationInfo = () => {
//   if (!__locationInfo) {
//     __locationInfo = document.querySelector('.LocationInfo');
//   }
//
//   return __locationInfo;
// }
//
// const getBoxPosition = ({ abbreviation }) => {
//   if (abbreviation in __stateBoxDirections) {
//     return __stateBoxDirections[abbreviation];
//   }
//
//   throw new Error(`Abbreviation not found on __stateBoxDirections.\n abbreviation = ${abbreviation}`);
// }
//
// const onStateClick = (data) => {
//   let locationInfo = getLocationInfo();
//   locationInfo.style.top = '200px';
//   locationInfo.style.left = '200px';
//
//   $('#location-modal').modal({ show: true });
//
//   EventBus.$emit('mapOnMouseOver', data);
// }
//
// const getPropByType = (obj, prop) => (type) => {
//   let locationInfo = getLocationInfo();
//
//   if (locationInfo.dataset.showon === type) {
//     return obj[prop];
//   } else {
//     return undefined;
//   }
// }
//
//
// const __publicActions = { onStateClick }
//
// const LocationInfoControl = new Proxy(__publicActions, {
//   get: function (obj, prop) {
//     let propGetter = getPropByType(obj, prop);
//
//     switch (prop) {
//       case "onStateClick":
//         return propGetter("click");
//
//       default:
//         return undefined;
//     }
//   }
// });
//
// export default LocationInfoControl;
