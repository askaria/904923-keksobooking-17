'use strict';

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var similarAdsNearBy = [];
var OFFER_TYPE = ['palace', 'flat', 'house', 'bungalo'];

var randomInteger = function(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}

var randomArr = function(arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
}

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

var similarListElement = document.querySelector('.map__pins');
var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var renderObject = function(pins) {
  var pinElement = similarPinTemplate.cloneNode(true);

  pinElement.style.cssText = 'left: ' + similarAdsNearBy[i].location.x + 'px; top: ' + similarAdsNearBy[i].location.y + 'px;';

  var image = pinElement.querySelector('img');
  image.src = similarAdsNearBy[i].author.avatar;

  return pinElement;
}

var fragment = document.createDocumentFragment();

for (var i = 0; i < similarAdsNearBy.length; i++) {
  fragment.appendChild(renderObject(similarAdsNearBy[i]));
}
similarListElement.appendChild(fragment);
