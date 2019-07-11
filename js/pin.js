'use strict';

(function () {

  var map = document.querySelector('.map');
  var pinMain = map.querySelector('.map__pin--main');

  var PIN_WIDTH_0 = 40;
  var PIN_HEIGHT_0 = 44;
  var INIT_X = pinMain.offsetLeft;
  var INIT_Y = pinMain.offsetTop;

  var adsForm = document.querySelector('.ad-form');
  var pinAddress = adsForm.querySelector('#address');

  // Координаты в неактивном состоянии
  pinAddress.value = (INIT_X + PIN_WIDTH_0 / 2) + ', ' + (INIT_Y + PIN_HEIGHT_0 / 2);

  window.removePins = function () {
    var allPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    allPins.forEach(function (currentPin) {
      currentPin.parentNode.removeChild(currentPin);
    });
  };

})();