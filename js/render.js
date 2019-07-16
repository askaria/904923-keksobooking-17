'use strict';

(function () {
  var map = document.querySelector('.map');
  var similarListElement = document.querySelector('.map__pins');
  var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var similarCardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var renderPin = function (arr) {
    var pinElement = similarPinTemplate.cloneNode(true);

    pinElement.style.cssText = 'left: ' + arr.location.x + 'px; top: ' + arr.location.y + 'px;';

    var pinImage = pinElement.querySelector('img');
    pinImage.src = arr.author.avatar;

    return pinElement;
  };

  var renderCard = function (arr) {
    var cardElement = similarCardTemplate.cloneNode(true);

    cardElement.querySelector('.popup__title').textContent = arr.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = arr.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = arr.offer.price + '₽/ночь';

    var typeHouse;
    switch (arr.offer.type) {
      case 'flat':
        typeHouse = 'Квартира';
        break;
      case 'bungalo':
        typeHouse = 'Бунгало';
        break;
      case 'house':
        typeHouse = 'Дом';
        break;
      case 'palace':
        typeHouse = 'Дворец';
        break;
    };

    cardElement.querySelector('.popup__type').textContent = typeHouse;
    cardElement.querySelector('.popup__text--capacity').textContent = arr.offer.rooms + ' комнаты для ' + arr.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + arr.offer.checkin + ', выезд до ' + arr.offer.checkout;

    var featuresHouse = cardElement.querySelector('.popup__features');
    featuresHouse.innerHTML = '';
    for (var i = 0; i < arr.offer.features.length; i++) {
      featuresHouse.innerHTML += '<li class="popup__feature popup__feature--' + arr.offer.features[i] + '"></li>';
    }

    cardElement.querySelector('.popup__description').textContent = arr.offer.description;

    var photosHouse = cardElement.querySelector('.popup__photos');
    photosHouse.innerHTML = '';
    for (var i = 0; i < arr.offer.photos.length; i++) {
      photosHouse.innerHTML += '<img src="' + arr.offer.photos[i] + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">';
    }

    var popupAvatar =  cardElement.querySelector('.popup__avatar');
    popupAvatar.src = arr.author.avatar;

    return cardElement;
  }

  window.render = function (data) {
    var pinsNumber = data.length > 5 ? 5 : data.length;
    for (var i = 0; i < pinsNumber; i++) {
      similarListElement.appendChild(renderPin(data[i]));
    }
    similarListElement.after(renderCard(data[0]));
  };

})();
