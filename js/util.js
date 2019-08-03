'use strict';

(function () {
  var map = document.querySelector('.map');
  var pinMain = map.querySelector('.map__pin--main');

  var PIN_WIDTH_0 = 40;
  var PIN_HEIGHT_0 = 44;
  var INIT_X = pinMain.offsetLeft;
  var INIT_Y = pinMain.offsetTop;
  var ESC_KEYCODE = 27;

  window.util = {
    ESC_KEYCODE: ESC_KEYCODE,
    PIN_WIDTH_0: PIN_WIDTH_0,
    PIN_HEIGHT_0: PIN_HEIGHT_0,
    INIT_X: INIT_X,
    INIT_Y: INIT_Y
  };
})();
