'use strict';

(function () {
  var map = document.querySelector('.map');
  var pinMain = map.querySelector('.map__pin--main');

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

  // Функция сброса
  var resetAdsForm = function () {
    // Форма очищается и блокируется
    map.classList.add('map--faded');
    adsForm.reset();
    mapFilterForm.reset();

    adsForm.classList.add('ad-form--disabled');
    for (i = 0; i < mapFiltersFields.length; i++) {
      mapFiltersFields[i].disabled = true;
    }
    for (i = 0; i < adsFormFields.length; i++) {
      adsFormFields[i].disabled = true;
    }

    // Пин возвращается на место
    pinMain.style.top = window.util.INIT_Y + 'px';
    pinMain.style.left = window.util.INIT_X + 'px';
    var pinX = Math.round(window.util.INIT_X + window.util.PIN_WIDTH_0 / 2);
    var pinY = Math.round(window.util.INIT_Y + window.util.PIN_HEIGHT_0 / 2);
    pinAddress.value = pinX + ', ' + pinY;

    // Удаляем пины похожих объявлений и карточку
    window.removePins();
    window.removeCard();
  };

  // Кнопка сброса
  var resetButton = adsForm.querySelector('.ad-form__reset');
  resetButton.addEventListener('click', resetAdsForm);

  // Отправка формы
  var onFormSubmit = function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(adsForm), onLoad, onError);
  };

  adsForm.addEventListener('submit', onFormSubmit);

  // Успешная отправка
  var similarSuccessTemplate = document.querySelector('#success').content.querySelector('.success');
  var similarErrorTemplate = document.querySelector('#error').content.querySelector('.error');

  var onLoad = function () {
    var successNode = similarSuccessTemplate.cloneNode(true);
    document.querySelector('main').appendChild(successNode);
    document.addEventListener('keydown', onSuccessEscPress);
    document.addEventListener('click', closeSuccess);

    resetAdsForm();
  };

  var closeSuccess = function () {
    var success = document.querySelector('.success');
    if (success) {
      success.remove();
      document.removeEventListener('keydown', onSuccessEscPress);
    }
  };

  var onSuccessEscPress = function (e) {
    if (e.keyCode === window.util.ESC_KEYCODE) {
      closeSuccess();
    }
  };

  // Отправить форму не удалось
  var onError = function () {
    var errorNode = similarErrorTemplate.cloneNode(true);
    document.querySelector('main').appendChild(errorNode);

    var errorButton = document.querySelector('.error__button');
    document.addEventListener('keydown', onErrorEscPress);
    document.addEventListener('click', closeError);
    errorButton.addEventListener('click', closeError);
  };

  var closeError = function () {
    var error = document.querySelector('.error');
    if (error) {
      error.remove();
      document.removeEventListener('keydown', onErrorEscPress);
    }
  };

  var onErrorEscPress = function (e) {
    if (e.keyCode === window.util.ESC_KEYCODE) {
      closeError();
    }
  };
})();
