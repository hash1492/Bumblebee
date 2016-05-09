(function() {
  var app = angular.module("bumblebee.storage", []);

  app.provider("StorageService", function() {

    var _get = function (key) {
      if(key){
        return localStorage.getItem(key);
      }
      else {
        return localStorage;
      }
    }

    var _set = function (key, value) {
      localStorage.setItem(key, value);
    }

    var _delete = function (key) {
      localStorage.removeItem(key);
    }

    return {
      get: _get,
      set: _set,
      delete: _delete,
      $get: function() {
        return {
          get: _get,
          set: _set,
          delete: _delete
        }
      }
    }

  })
})()
