(function() {

  var app = angular.module('bumblebee');

  app.factory('GeneralService', function(GeneralDataService) {

    var _register = function(user) {
      var url = "/auth/register";
      return GeneralDataService.http_post(url, user);
    };

    var _login = function(user) {
      var url = "/auth/login";
      return GeneralDataService.http_post(url, user);
    }

    return {
      register: _register,
      login: _login
    };

  });

})();
