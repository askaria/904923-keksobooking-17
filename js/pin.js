'use strict';

(function () {

var map = document.querySelector('.map');

var adsForm = document.querySelector('.ad-form');
var pinMain = map.querySelector('.map__pin--main');

var PIN_WIDTH_0 = 40;
var PIN_HEIGHT_0 = 44;
var PIN_WIDTH = 65;
var PIN_HEIGHT = 65;
var INIT_X = pinMain.offsetLeft;
var INIT_Y = pinMain.offsetTop;

// Координаты в неактивном состоянии
var pinAddress = adsForm.querySelector('#address');
pinAddress.value = (INIT_X + PIN_WIDTH_0 / 2) + ', ' + (INIT_Y + PIN_HEIGHT_0 / 2);


})();
