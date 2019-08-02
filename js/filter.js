'use strict';

(function () {
  // Устранение дребезга
  var DEBOUNCE_INTERVAL = 300; // ms

  window.debounce = function (cb) {
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

  var map = document.querySelector('.map');
  var mapFilter = map.querySelector('.map__filters-container');
  var mapFilterForm = mapFilter.querySelector('.map__filters');
  var mapFiltersFields = mapFilterForm.children;
  var selectHousingType = mapFilterForm.querySelector('#housing-type');
  var selectHousingPrice = mapFilterForm.querySelector('#housing-price');
  var selectHousingRooms = mapFilterForm.querySelector('#housing-rooms');
  var selectHousingGuests = mapFilterForm.querySelector('#housing-guests');
  var selectHousingFeatures = mapFilterForm.querySelector('#housing-features').querySelectorAll('input');

  var pins = [];
  var typeOfHouse;
  var housingPrice;
  var housingRooms;
  var housingGuests;
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

  // Фильтр по типу жилья
  var filter = {
    type: function (it) {},
    price: function (it) {},
    rooms: function (it) {},
    guests: function (it) {},
  }

  selectHousingType.addEventListener('change', function () {
    var newTypeOfHouse = selectHousingType.value;
    filter.type(newTypeOfHouse);
  });

  selectHousingPrice.addEventListener('change', function () {
    var newHousingPrice = selectHousingPrice.value;
    filter.price(newHousingPrice);
  });

  selectHousingRooms.addEventListener('change', function () {
    var newHousingRooms = +selectHousingRooms.value;
    filter.rooms(newHousingRooms);
  });

  selectHousingGuests.addEventListener('change', function () {
    var newHousingGuests = +selectHousingGuests.value;
    filter.guests(newHousingGuests);
  });

  window.filter = filter;

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


})();
