'use strict';

(function () {
  var URL_SAVE = 'https://js.dump.academy/keksobooking';
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var STATUS = 200;
  var TIMEOUT = 10000;

  var setupRequest = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа ' + xhr.status + '' + xhr.statusText);
      }
    });
    return xhr;
  };

  window.backend = {
    save: function (data, onLoad, onError) {
      var xhr = setupRequest(onLoad, onError);
      xhr.open('POST', URL_SAVE);
      xhr.send(data);
    },
    load: function (onLoad, onError) {
      var xhr = setupRequest(onLoad, onError);

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполнится за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = TIMEOUT;
      xhr.open('GET', URL_LOAD);
      xhr.send();
    },
  };
})();
