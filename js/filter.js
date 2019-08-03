'use strict';

(function () {
  // Устранение дребезга
  var DEBOUNCE_INTERVAL = 300; // ms

  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  // Фильтрация пинов
  var map = document.querySelector('.map');
  var mapFilter = map.querySelector('.map__filters-container');
  var mapFilterForm = mapFilter.querySelector('.map__filters');
  var selectHousingType = mapFilterForm.querySelector('#housing-type');
  var selectHousingPrice = mapFilterForm.querySelector('#housing-price');
  var selectHousingRooms = mapFilterForm.querySelector('#housing-rooms');
  var selectHousingGuests = mapFilterForm.querySelector('#housing-guests');
  var selectHousingFeatures = mapFilterForm.querySelector('#housing-features').querySelectorAll('input');

  var updatePins = function () {
    window.removePins();
    window.removeCard();
    var filteredPins = window.pins.slice();
    var typeOfHouse = selectHousingType.value;
    if (selectHousingType.value !== 'any') {
      filteredPins = filteredPins.filter(function (it) {
        return it.offer.type === typeOfHouse;
      });
    }
    var housingPrice = selectHousingPrice.value;
    if (selectHousingPrice.value !== 'any') {
      filteredPins = filteredPins.filter(function (it) {
        var price;
        switch (housingPrice) {
          case 'low':
            price = it.offer.price < '10000';
            break;
          case 'middle':
            price = it.offer.price >= '10000' && it.offer.price <= '50000';
            break;
          case 'high':
            price = it.offer.price > '50000';
            break;
          default:
            price = it.offer.price;
        }
        return price;
      });
    }
    var housingRooms = +selectHousingRooms.value;
    if (selectHousingRooms.value !== 'any') {
      filteredPins = filteredPins.filter(function (it) {
        return it.offer.rooms === housingRooms;
      });
    }
    var housingGuests = +selectHousingGuests.value;
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

  selectHousingType.addEventListener('change', debounce(updatePins, 500));
  selectHousingPrice.addEventListener('change', debounce(updatePins, 500));
  selectHousingRooms.addEventListener('change', debounce(updatePins, 500));
  selectHousingGuests.addEventListener('change', debounce(updatePins, 500));

  for (var i = 0; i < selectHousingFeatures.length; i++) {
    selectHousingFeatures[i].addEventListener('click', function () {
      for (i = 0; i < selectHousingFeatures.length; i++) {
        window.removePins();
        window.removeCard();
        updatePins();
      }
    });
  }
})();
