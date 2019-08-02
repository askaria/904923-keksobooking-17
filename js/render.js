'use strict';

(function () {
  var similarListElement = document.querySelector('.map__pins');
  var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var similarCardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  // Создание пина
  var renderPin = function (ad) {
    var pinElement = similarPinTemplate.cloneNode(true);

    pinElement.id = 'pin-' + ad.id;

    pinElement.style.cssText = 'left: ' + ad.location.x + 'px; top: ' + ad.location.y + 'px;';

    var pinImage = pinElement.querySelector('img');
    pinImage.src = ad.author.avatar;

    return pinElement;
  };

  // Создание карточки
  var renderCard = function (card) {
    var cardElement = similarCardTemplate.cloneNode(true);

    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';

    var typeHouse;
    switch (card.offer.type) {
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
    }
    cardElement.querySelector('.popup__type').textContent = typeHouse;
    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;

    var featuresHouse = cardElement.querySelector('.popup__features');
    featuresHouse.innerHTML = '';
    for (var i = 0; i < card.offer.features.length; i++) {
      featuresHouse.innerHTML += '<li class="popup__feature popup__feature--' + card.offer.features[i] + '"></li>';
    }

    cardElement.querySelector('.popup__description').textContent = card.offer.description;

    var photosHouse = cardElement.querySelector('.popup__photos');
    photosHouse.innerHTML = '';
    for (i = 0; i < card.offer.photos.length; i++) {
      photosHouse.innerHTML += '<img src="' + card.offer.photos[i] + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">';
    }

    var popupAvatar = cardElement.querySelector('.popup__avatar');
    popupAvatar.src = card.author.avatar;

    return cardElement;
  };

  // Рендеринг пина и карточки
  window.render = {
    pins: function (data) {
      var pinsNumber = data.length > 5 ? 5 : data.length;
      for (var i = 0; i < pinsNumber; i++) {
        similarListElement.appendChild(renderPin(data[i]));
      }
    },
    card: function (data) {
      similarListElement.after(renderCard(data));
    }
  };

})();
