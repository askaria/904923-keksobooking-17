'use strict';

(function () {
  var map = document.querySelector('.map');
  var adsForm = document.querySelector('.ad-form');
  var pinAddress = adsForm.querySelector('#address');

  // Координаты в неактивном состоянии
  var pinX = Math.round(window.util.INIT_X + window.util.PIN_WIDTH_0 / 2);
  var pinY = Math.round(window.util.INIT_Y + window.util.PIN_HEIGHT_0 / 2);
  pinAddress.value = pinX + ', ' + pinY;

  // Удаление пинов
  window.removePins = function () {
    var allPins = map.querySelectorAll('.map__pin:not(.map__pin--main)');

    allPins.forEach(function (currentPin) {
      currentPin.parentNode.removeChild(currentPin);
    });
  };
})();
