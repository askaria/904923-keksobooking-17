'use strict';

(function () {
  var map = document.querySelector('.map');

  // Удаление карточки
  window.removeCard = function () {
    var card = map.querySelector('.map__card');
    if (card) {
      card.remove();
    }
  };

})();
