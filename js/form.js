'use strict';

(function () {

  var map = document.querySelector('.map');
  var pinMain = map.querySelector('.map__pin--main');

  var PIN_WIDTH_0 = 40;
  var PIN_HEIGHT_0 = 44;
  var INIT_X = pinMain.offsetLeft;
  var INIT_Y = pinMain.offsetTop;

  var adsForm = document.querySelector('.ad-form');
  var adsFormFields = adsForm.children;
  var mapFilterForm = map.querySelector('.map__filters');
  var mapFiltersFields = mapFilterForm.children;
  var pinAddress = adsForm.querySelector('#address');

  // Валидация форм
  var selectType = adsForm.querySelector('#type');
  var price = adsForm.querySelector('#price');

  var typeHouseMatchPrice = {
    'flat': 1000,
    'house': 5000,
    'palace': 10000,
    'bungalo': 0
  };

  selectType.addEventListener('change', function () {
    var typeOfHouse = selectType.value;
    price.min = typeHouseMatchPrice[typeOfHouse];
    price.placeholder = price.min;
  });

  var selectTimein = adsForm.querySelector('#timein');
  var selectTimeout = adsForm.querySelector('#timeout');

  selectTimein.addEventListener('change', function () {
    selectTimeout.value = selectTimein.value;
  });

  selectTimeout.addEventListener('change', function () {
    selectTimein.value = selectTimeout.value;
  });

  // Кнопка сброса
  var resetButton = adsForm.querySelector('.ad-form__reset');
  resetButton.addEventListener('click', function () {

    // Форма блокируется
    map.classList.add('map--faded');

    adsForm.classList.add('ad-form--disabled');
    for (var i = 0; i < mapFiltersFields.length; i++) {
      mapFiltersFields[i].disabled = true;
    }
    for (i = 0; i < adsFormFields.length; i++) {
      adsFormFields[i].disabled = true;
    }

    // Пин возвращается на место
    pinMain.style.top = INIT_Y + 'px';
    pinMain.style.left = INIT_X + 'px';
    pinAddress.value = (INIT_X + PIN_WIDTH_0 / 2) + ', ' + (INIT_Y + PIN_HEIGHT_0 / 2);

    // Удаляем пины похожих объявлений
    window.removePins();
  });

})();
