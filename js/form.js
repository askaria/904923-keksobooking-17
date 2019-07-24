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

  // Блокировка формы подачи объявления
  for (var i = 0; i < mapFiltersFields.length; i++) {
    mapFiltersFields[i].disabled = true;
  }
  for (i = 0; i < adsFormFields.length; i++) {
    adsFormFields[i].disabled = true;
  }

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

  // Проверка соответствия количества гостей
  var roomSelect = adsForm.querySelector('#room_number');
  var capacitySelect = adsForm.querySelector('#capacity');

  var guestsNumber = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  var roomSelectChange = function () {
    var rooms = roomSelect.value;
    var capacity = capacitySelect.value;
    var errorMessage = (guestsNumber[rooms].indexOf(capacity) === -1) ?
      'Попробуйте еще. Количество гостей  не соответствует количеству комнат :(' : '';
    capacitySelect.setCustomValidity(errorMessage);
  };

  roomSelect.addEventListener('change', roomSelectChange);
  capacitySelect.addEventListener('change', roomSelectChange);

  // Кнопка сброса
  var resetButton = adsForm.querySelector('.ad-form__reset');
  resetButton.addEventListener('click', function () {

    // Форма блокируется
    map.classList.add('map--faded');

    adsForm.classList.add('ad-form--disabled');
    for (i = 0; i < mapFiltersFields.length; i++) {
      mapFiltersFields[i].disabled = true;
    }
    for (i = 0; i < adsFormFields.length; i++) {
      adsFormFields[i].disabled = true;
    }

    // Пин возвращается на место
    pinMain.style.top = INIT_Y + 'px';
    pinMain.style.left = INIT_X + 'px';
    pinAddress.value = (INIT_X + PIN_WIDTH_0 / 2) + ', ' + (INIT_Y + PIN_HEIGHT_0 / 2);

    // Удаляем пины похожих объявлений и карточку
    window.removePins();
    window.removeCard();
  });

})();
