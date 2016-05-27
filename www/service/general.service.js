(function() {

  var app = angular.module('bumblebee');

  app.factory('GeneralService', function(GeneralDataService, StorageService) {

    var _register = function(user) {
      var url = "/auth/register";
      return GeneralDataService.http_post(url, user);
    };

    var _login = function(user) {
      var url = "/auth/login";
      return GeneralDataService.http_post(url, user);
    };

    var _getLatestAppVersion = function() {
      var url = "/app/getLatestAppVersion";
      return GeneralDataService.http_get(url);
    };

    var _replicateToRemote = function() {
      var user_db = new PouchDB(JSON.parse(StorageService.get("bumblebee_session")).db_name);

      var user_db_remote = new PouchDB("https://hash1492:bumblebeepass@hash1492.cloudant.com/" + JSON.parse(StorageService.get("bumblebee_session")).db_name);
      user_db.replicate.to(user_db_remote,{live:true},function(err){
        console.log(err);
      });
    };

    return {
      register: _register,
      login: _login,
      getLatestAppVersion: _getLatestAppVersion,
      replicateToRemote: _replicateToRemote
    };

  });

})();
