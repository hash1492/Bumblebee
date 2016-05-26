(function() {

  var app = angular.module('bumblebee');

  app.factory('GeneralDataService', function($http, REST_BASE_URL) {

    var _http_get = function (url) {
      return $http.get(REST_BASE_URL + url);
    };

    var _http_post = function (url, data) {
      return $http.post(REST_BASE_URL + url, data);
    };

    return {
      http_get: _http_get,
      http_post: _http_post
    };

  });

})();
