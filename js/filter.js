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

  //

})();
