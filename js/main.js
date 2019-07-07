'use strict';

var map = document.querySelector('.map');

//Отрисовка маркеров-соседей
var similarAdsNearBy = [];
var OFFER_TYPE = ['palace', 'flat', 'house', 'bungalo'];

var randomInteger = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
};

var randomArr = function (arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};

for (var i = 1; i <= 8; i++) {
  var mapObjects = {
    author: {
      avatar: 'img/avatars/user0' + i + '.png',
    },
    offer: {
      type: randomArr(OFFER_TYPE)
    },
    location: {
      x: randomInteger(0, 1200),
      y: randomInteger(130, 630)
    }
  };
  similarAdsNearBy.push(mapObjects);
}

var similarListElement = document.querySelector('.map__pins');
var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var pinMain = map.querySelector('.map__pin--main');

var adsForm = document.querySelector('.ad-form');
var adsFormFields = adsForm.children;
var mapFilterForm = map.querySelector('.map__filters');
var mapFiltersFields = mapFilterForm.children;

var renderObject = function () {
  var pinElement = similarPinTemplate.cloneNode(true);

  pinElement.style.cssText = 'left: ' + similarAdsNearBy[i].location.x + 'px; top: ' + similarAdsNearBy[i].location.y + 'px;';

  var image = pinElement.querySelector('img');
  image.src = similarAdsNearBy[i].author.avatar;

  return pinElement;
};

//Блокировка формы подачи объявления
for (i = 0; i < mapFiltersFields.length; i++) {
  mapFiltersFields[i].disabled = true;
}
for (i = 0; i < adsFormFields.length; i++) {
  adsFormFields[i].disabled = true;
}

var PIN_WIDTH_0 = 40;
var PIN_HEIGHT_0 = 44;
var PIN_WIDTH = 65;
var PIN_HEIGHT = 65;
var INIT_X = pinMain.offsetLeft;
var INIT_Y = pinMain.offsetTop;

//Координаты в неактивном состоянии
var pinAddress = adsForm.querySelector('#address');
pinAddress.value = (INIT_X + PIN_WIDTH_0 / 2) + ', ' + (INIT_Y + PIN_HEIGHT_0 / 2);

//При движении курсора
pinMain.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  //Разблокируем карту и форму
  map.classList.remove('map--faded');

  adsForm.classList.remove('ad-form--disabled');
  for (i = 0; i < mapFiltersFields.length; i++) {
    mapFiltersFields[i].disabled = false;
  }
  for (i = 0; i < adsFormFields.length; i++) {
    adsFormFields[i].disabled = false;
  }

  //Отрисуем похожие объявления
  var fragment = document.createDocumentFragment();

  for (i = 0; i < similarAdsNearBy.length; i++) {
    fragment.appendChild(renderObject(similarAdsNearBy[i]));
  }
  similarListElement.appendChild(fragment);

  //Стартовые координаты
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
    }

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
    }

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

//Валидация форм
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

//Кнопка сброса
var resetButton = adsForm.querySelector('.ad-form__reset');
resetButton.addEventListener('click', function () {

  //Форма блокируется
  map.classList.add('map--faded');

  adsForm.classList.add('ad-form--disabled');
  for (i = 0; i < mapFiltersFields.length; i++) {
    mapFiltersFields[i].disabled = true;
  }
  for (i = 0; i < adsFormFields.length; i++) {
    adsFormFields[i].disabled = true;
  }

  //Пин возвращается на место
  pinMain.style.top = INIT_X + 'px';
  pinMain.style.left = INIT_Y + 'px';
  pinAddress.value = (INIT_X + PIN_WIDTH_0 / 2) + ', ' + (INIT_Y + PIN_HEIGHT_0 / 2);

});
