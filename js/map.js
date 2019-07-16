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

  // Фильтр и загрузка пинов с сервера
  var activatePage = function () {
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
        var sameTypeOfHouses = pins.filter(function (it) {
          return it.offer.type === typeOfHouse;
        });
        window.render(sameTypeOfHouses);
      } else {
        window.render(pins);
      }
    };

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

    window.backend.load(successHandler, errorHandler);
  };

  // Координаты
  var LimitCoords = function(left, top, right, bottom) {
    this.left = left;
    this.top = top;
    this.right = right;
    this.bottom = bottom;
  };
  var limits = new LimitCoords (0, 130, (1200 - PIN_WIDTH), 630);

  var Coordinate = function(x, y, constraints) {
    this.x = x;
    this.y = y;
    if (constraints) {
      this._constraints = constraints;
    }
  };

  Coordinate.prototype.setX = function(x) {
    if (x >= this._constraints.left &&
        x <= this._constraints.right) {
      this.x = x;
    }
  };

  Coordinate.prototype.setY = function(y) {
    if (y >= this._constraints.top &&
        y <= this._constraints.bottom) {
      this.y = y;
    }
  };

  // При движении курсора
  pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var pageIsNotActived = map.classList.contains('map--faded');
    if (pageIsNotActived) {
      activatePage();
    }

    // Стартовые координаты
    var startCoords = new Coordinate (evt.clientX, evt.clientY);

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = new Coordinate ((startCoords.x - moveEvt.clientX), (startCoords.y - moveEvt.clientY));

      startCoords =  new Coordinate (moveEvt.clientX, moveEvt.clientY);

    /*  var limitsCoords = {
        top: 130,
        bottom: 630,
        left: 0,
        right: 1200 - PIN_WIDTH
      };
*/
      var newCoords =  new Coordinate ((pinMain.offsetLeft - shift.x), (pinMain.offsetTop - shift.y), limits);

     /* if (newCoords.y < limitsCoords.top) {
        newCoords.y = limitsCoords.top;
      } else if (newCoords.y > limitsCoords.bottom) {
        newCoords.y = limitsCoords.bottom;
      }

      if (newCoords.x < limitsCoords.left) {
        newCoords.x = limitsCoords.left;
      } else if (newCoords.x > limitsCoords.right) {
        newCoords.x = limitsCoords.right;
      }
*/
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
