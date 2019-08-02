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
  var test = {
    test1: function (t) {},
    test2: function (t) {}
  }

  selectHousingType.addEventListener('change', function () {
    var newTypeOfHouse = selectHousingType.value;
    test.test1(newTypeOfHouse);
  });

  selectHousingPrice.addEventListener('change', function () {
    var newHousingPrice = selectHousingPrice.value;
    test.test2(newHousingPrice);
  });

  window.test = test;

  //

})();
