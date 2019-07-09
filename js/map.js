'use strict';

(function () {

var map = document.querySelector('.map');
var pinMain = map.querySelector('.map__pin--main');
var adsForm = document.querySelector('.ad-form');
var adsFormFields = adsForm.children;
var mapFilterForm = map.querySelector('.map__filters');
var mapFiltersFields = mapFilterForm.children;

// Блокировка формы подачи объявления
for (var i = 0; i < mapFiltersFields.length; i++) {
  mapFiltersFields[i].disabled = true;
}
for (i = 0; i < adsFormFields.length; i++) {
  adsFormFields[i].disabled = true;
}

var similarListElement = document.querySelector('.map__pins');
var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var renderObject = function () {
  var pinElement = similarPinTemplate.cloneNode(true);

  pinElement.style.cssText = 'left: ' + window.data.similarAdsNearBy[i].location.x + 'px; top: ' + window.data.similarAdsNearBy[i].location.y + 'px;';

  var image = pinElement.querySelector('img');
  image.src = window.data.similarAdsNearBy[i].author.avatar;

  return pinElement;
};

// При движении курсора
pinMain.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  // Разблокируем карту и форму
  map.classList.remove('map--faded');

  adsForm.classList.remove('ad-form--disabled');
  for (var i = 0; i < mapFiltersFields.length; i++) {
    mapFiltersFields[i].disabled = false;
  }
  for (i = 0; i < adsFormFields.length; i++) {
    adsFormFields[i].disabled = false;
  }

  // Отрисуем похожие объявления
  var fragment = document.createDocumentFragment();

  for (i = 0; i < window.data.similarAdsNearBy.length; i++) {
    fragment.appendChild(renderObject(window.data.similarAdsNearBy[i]));
  }
  similarListElement.appendChild(fragment);

  // Стартовые координаты
  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    var limitsCoords = {
      top: 130,
      bottom: 630,
      left: 0,
      right: 1200 - PIN_WIDTH
    };

    var newCoords = {
      x: pinMain.offsetLeft - shift.x,
      y: pinMain.offsetTop - shift.y
    };

    if (newCoords.y < limitsCoords.top) {
      newCoords.y = limitsCoords.top;
    } else if (newCoords.y > limitsCoords.bottom) {
      newCoords.y = limitsCoords.bottom;
    }

    if (newCoords.x < limitsCoords.left) {
      newCoords.x = limitsCoords.left;
    } else if (newCoords.x > limitsCoords.right) {
      newCoords.x = limitsCoords.right;
    }

    pinMain.style.top = newCoords.y + 'px';
    pinMain.style.left = newCoords.x + 'px';

    pinAddress.value = (newCoords.x + PIN_WIDTH / 2) + ', ' + (newCoords.y + PIN_HEIGHT);
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    var shift = {
      x: startCoords.x - upEvt.clientX,
      y: startCoords.y - upEvt.clientY
    };

    startCoords = {
      x: upEvt.clientX,
      y: upEvt.clientY
    };

    var limitsCoords = {
      top: 130,
      bottom: 630,
      left: 0,
      right: 1200 - PIN_WIDTH
    };

    var newCoords = {
      x: pinMain.offsetLeft - shift.x,
      y: pinMain.offsetTop - shift.y
    };

    if (newCoords.y < limitsCoords.top) {
      newCoords.y = limitsCoords.top;
    } else if (newCoords.y > limitsCoords.bottom) {
      newCoords.y = limitsCoords.bottom;
    }

    if (newCoords.x < limitsCoords.left) {
      newCoords.x = limitsCoords.left;
    } else if (newCoords.x > limitsCoords.right) {
      newCoords.x = limitsCoords.right;
    }

    pinAddress.value = (newCoords.x + PIN_WIDTH / 2) + ', ' + (newCoords.y + PIN_HEIGHT);

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});


})();
