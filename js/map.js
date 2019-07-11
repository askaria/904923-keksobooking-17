'use strict';

(function () {

  var map = document.querySelector('.map');
  var pinMain = map.querySelector('.map__pin--main');

  var PIN_WIDTH = 65;
  var PIN_HEIGHT = 65;

  var adsForm = document.querySelector('.ad-form');
  var adsFormFields = adsForm.children;
  var mapFilterForm = map.querySelector('.map__filters');
  var mapFiltersFields = mapFilterForm.children;

  var pinAddress = adsForm.querySelector('#address');

  // Блокировка формы подачи объявления
  for (var i = 0; i < mapFiltersFields.length; i++) {
    mapFiltersFields[i].disabled = true;
  }
  for (i = 0; i < adsFormFields.length; i++) {
    adsFormFields[i].disabled = true;
  }

  // При движении курсора
  pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    // Разблокируем карту и форму
    map.classList.remove('map--faded');

    adsForm.classList.remove('ad-form--disabled');
    for (i = 0; i < mapFiltersFields.length; i++) {
      mapFiltersFields[i].disabled = false;
    }
    for (i = 0; i < adsFormFields.length; i++) {
      adsFormFields[i].disabled = false;
    }

    // Фильтр по типу жилья
    var typeOfHouse;
    var pins = [];
    var selectHousingType = mapFilterForm.querySelector('#housing-type');

    var updatePins = function () {
      if (selectHousingType.value !== 'any') {
        var sameTypeOfHouses = pins.filter(function(it) {
          return it.offer.type === typeOfHouse;
        });
        window.render(sameTypeOfHouses);
      } else {
        window.render(pins);
      }
    }

    selectHousingType.addEventListener('change', function () {
      var newTypeOfHouse = selectHousingType.value;
      typeOfHouse = newTypeOfHouse;

      window.removePins();
      updatePins();
    });

    var successHandler = (function (data) {
      pins = data;
      updatePins();
    });

    // Ошибка соединения с сервером
    var errorHandler = function (errorMessage) {
      var node = document.createElement('div');
      node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
      node.style.position = 'absolute';
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = '30px';

      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
    };

    var URL = 'https://js.dump.academy/keksobooking/data';
    window.load(successHandler, errorHandler);

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
