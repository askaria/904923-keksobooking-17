'use strict';

(function () {

// Отрисовка маркеров-соседей
var similarAdsNearBy = [];
var OFFER_TYPE = ['palace', 'flat', 'house', 'bungalo'];

var randomInteger = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
};

var randomArr = function (arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};

for (var i = 1; i <= 8; i++) {
    var mapObjects = {
      author: {
        avatar: 'img/avatars/user0' + i + '.png',
      },
      offer: {
        type: randomArr(OFFER_TYPE)
      },
      location: {
        x: randomInteger(0, 1200),
        y: randomInteger(130, 630)
      }
    };
    similarAdsNearBy.push(mapObjects);
  }
  window.data = {
    similarAdsNearBy:  similarAdsNearBy
  }

})();
