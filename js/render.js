'use strict';

(function () {
  var similarListElement = document.querySelector('.map__pins');
  var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderObject = function (arr) {
    var pinElement = similarPinTemplate.cloneNode(true);

    pinElement.style.cssText = 'left: ' + arr.location.x + 'px; top: ' + arr.location.y + 'px;';

    var image = pinElement.querySelector('img');
    image.src = arr.author.avatar;

    return pinElement;
  };

  window.render = function (data) {
    var pinsNumber = data.length > 5 ? 5 : data.length;
    for (var i = 0; i < pinsNumber; i++) {
      similarListElement.appendChild(renderObject(data[i]));
    }
  };

})();
