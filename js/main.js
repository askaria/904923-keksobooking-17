'use strict';

var map = document.querySelector('.map');

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

var similarListElement = document.querySelector('.map__pins');
var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var renderObject = function () {
  var pinElement = similarPinTemplate.cloneNode(true);

  pinElement.style.cssText = 'left: ' + similarAdsNearBy[i].location.x + 'px; top: ' + similarAdsNearBy[i].location.y + 'px;';

  var image = pinElement.querySelector('img');
  image.src = similarAdsNearBy[i].author.avatar;

  return pinElement;
};

var fragment = document.createDocumentFragment();

for (var j = 0; i < similarAdsNearBy.length; j++) {
  fragment.appendChild(renderObject(similarAdsNearBy[j]));
}
similarListElement.appendChild(fragment);

var pinMain = map.querySelector('.map__pin--main');

var adsForm = document.querySelector('.ad-form');
var adsFormFields = adsForm.children;
var mapFilterForm = map.querySelector('.map__filters');
var mapFiltersFields = mapFilterForm.children;

for (i = 0; i < mapFiltersFields.length; i++) {
  mapFiltersFields[i].disabled = true;
}
for (i = 0; i < adsFormFields.length; i++) {
  adsFormFields[i].disabled = true;
}

pinMain.addEventListener('click', function () {
  map.classList.remove('map--faded');
  adsForm.classList.remove('ad-form--disabled');
  for (i = 0; i < mapFiltersFields.length; i++) {
    mapFiltersFields[i].disabled = false;
  }
  for (i = 0; i < adsFormFields.length; i++) {
    adsFormFields[i].disabled = false;
  }
});

var PIN_WIDTH = 65;
var PIN_HEIGHT = 65;
var PIN_MAIN_LEFT = pinMain.offsetLeft + PIN_WIDTH / 2;
var PIN_MAIN_TOP = pinMain.offsetTop + PIN_HEIGHT;

var pinAddress = adsForm.querySelector('#address');
pinAddress.value = PIN_MAIN_LEFT + ', ' + PIN_MAIN_TOP;
