'use strict';

(function () {
  var map = document.querySelector('.map');
  var pinMain = map.querySelector('.map__pin--main');

  var PIN_WIDTH = 65;
  var PIN_HEIGHT = 65;

  var adsForm = document.querySelector('.ad-form');
  var adsFormFields = adsForm.children;
  var mapFilter = map.querySelector('.map__filters-container');
  var mapFilterForm = mapFilter.querySelector('.map__filters');
  var mapFiltersFields = mapFilterForm.children;
  var selectHousingType = mapFilterForm.querySelector('#housing-type');
  var selectHousingPrice = mapFilterForm.querySelector('#housing-price');
  var selectHousingRooms = mapFilterForm.querySelector('#housing-rooms');
  var selectHousingGuests = mapFilterForm.querySelector('#housing-guests');
  var selectHousingFeatures = mapFilterForm.querySelector('#housing-features').querySelectorAll('input');
  var pinAddress = adsForm.querySelector('#address');

  // Отрисовка пинов
  var typeOfHouse;
  var housingPrice;
  var housingRooms;
  var housingGuests;
  var pins = [];
  var updatePins = function () {
    var filteredPins = pins.slice();
    if (selectHousingType.value !== 'any') {
      filteredPins = filteredPins.filter(function (it) {
        return it.offer.type === typeOfHouse;
      });
    }
    if (selectHousingPrice.value !== 'any') {
      filteredPins = filteredPins.filter(function (it) {
        var housingFeature;
        switch (housingPrice) {
          case 'low':
            housingFeature = it.offer.price < '10000';
            break;
          case 'middle':
            housingFeature = it.offer.price >= '10000' && it.offer.price <= '50000';
            break;
          case 'high':
            housingFeature = it.offer.price > '50000';
            break;
          default:
            housingFeature = it.offer.price;
        }
        return housingFeature;
      });
    }
    if (selectHousingRooms.value !== 'any') {
      filteredPins = filteredPins.filter(function (it) {
        return it.offer.rooms === housingRooms;
      });
    }
    if (selectHousingGuests.value !== 'any') {
      filteredPins = filteredPins.filter(function (it) {
        return it.offer.guests === housingGuests;
      });
    }
    for (var i = 0; i < selectHousingFeatures.length; i++) {
      if (selectHousingFeatures[i].checked) {
        filteredPins = filteredPins.filter(function (it) {
          return it.offer.features.includes(selectHousingFeatures[i].value);
        });
      }
    }
    window.render.pins(filteredPins);
  };

  window.filter.type = window.debounce(function (it) {
    typeOfHouse = it;
    window.removePins();
    window.removeCard();
    updatePins();
  });

  window.filter.price = window.debounce(function (it) {
    housingPrice = it;
    window.removePins();
    window.removeCard();
    updatePins();
  });

  window.filter.rooms = window.debounce(function (it) {
    housingRooms = it;
    window.removePins();
    window.removeCard();
    updatePins();
  });

  window.filter.guests = window.debounce(function (it) {
    housingGuests = it;
    window.removePins();
    window.removeCard();
    updatePins();
  });

  /*selectHousingType.addEventListener('change', function () {
    var newTypeOfHouse = selectHousingType.value;
    typeOfHouse = newTypeOfHouse;

    window.removePins();
    window.removeCard();
    updatePins();
  });

  //
  selectHousingPrice.addEventListener('change', function () {
    var newHousingPrice = selectHousingPrice.value;
    housingPrice = newHousingPrice;

    window.removePins();
    window.removeCard();
    updatePins();
  });

  //
  selectHousingRooms.addEventListener('change', function () {
    var newHousingRooms = +selectHousingRooms.value;
    housingRooms = newHousingRooms;

    window.removePins();
    window.removeCard();
    updatePins();
  });

  //
  selectHousingGuests.addEventListener('change', function () {
    var newHousingGuests = +selectHousingGuests.value;
    housingGuests = newHousingGuests;

    window.removePins();
    window.removeCard();
    updatePins();
  });*/

  //
  for (var i = 0; i < selectHousingFeatures.length; i++) {
    selectHousingFeatures[i].addEventListener('click', function () {
      for (i = 0; i < selectHousingFeatures.length; i++) {
        window.removePins();
        window.removeCard();
        updatePins();
      }
    });
  }

  var successHandler = (function (data) {
    pins = data;
    for (i = 0; i < pins.length; i++) {
      pins[i].id = i;
    }
    for (i = 0; i < mapFiltersFields.length; i++) {
      mapFiltersFields[i].disabled = false;
    }
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

  // Активация карты и загрузка пинов
  var activatePage = function () {
    // Разблокируем карту и форму
    map.classList.remove('map--faded');

    adsForm.classList.remove('ad-form--disabled');
    for (i = 0; i < adsFormFields.length; i++) {
      adsFormFields[i].disabled = false;
    }

    var roomNumber = adsForm.querySelector('#room_number');
    var capacity = adsForm.querySelector('#capacity');
    roomNumber.value = '1';
    capacity.value = '1';

    var flatPrice = adsForm.querySelector('#price');
    flatPrice.placeholder = '1000';

    var mapPins = map.querySelector('.map__pins');
    mapPins.addEventListener('click', loadCard);
    mapPins.addEventListener('keydown', openCard);

    window.backend.load(successHandler, errorHandler);
  };

  // Отрисовка карточки по клику
  var pin;
  var loadCard = function (evt) {
    evt.preventDefault();
    var target = evt.target;

    if (target.nodeName === 'IMG') {
      target = target.parentNode;
    }

    var mainPin = target.classList.contains('map__pin--main');

    var id = target.id.slice(4);
    var index = pins.findIndex(function (it) {
      return it.id === parseInt(id, 10);
    });
    if (target.nodeName === 'BUTTON' && !mainPin) {
      window.removeCard();
      window.render.card(pins[index]);
    }

    // Закрытие карточки
    var ESC_KEYCODE = 27;
    var card = document.querySelector('.map__card');
    if (card) {
      var closeButton = card.querySelector('.popup__close');

      var closeCard = function () {
        card.classList.add('hidden');
        document.removeEventListener('keydown', onCardEscPress);
        pin.classList.remove('map__pin--active');
      };

      var onCardEscPress = function (e) {
        if (e.keyCode === ESC_KEYCODE) {
          closeCard();
        }
      };

      document.addEventListener('keydown', onCardEscPress);
      closeButton.addEventListener('click', closeCard);
    }

    // Смена класса при клике
    target.classList.add('map__pin--active');
    if (pin) {
      pin.classList.remove('map__pin--active');
    }
    pin = target;
  };

  // Открытие карточки по Enter
  var ENTER_KEYCODE = 13;
  var openCard = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      loadCard();
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
