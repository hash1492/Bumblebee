// Ionic bumblebee App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'bumblebee' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
(function() {
  var app = angular.module('bumblebee', ['ionic','ui.router','bumblebee.storage','dtrw.bcrypt','mdo-angular-cryptography','uuid4']);

  app.config(function($stateProvider,$urlRouterProvider) {
    $stateProvider
    .state("app",{
      url: '/app',
      abstract: true,
      templateUrl: 'templates/app.base.tpl.html',
      controller: 'AppBaseController'
    })
    .state("login",{
      url: '/login',
      templateUrl: 'templates/login.tpl.html',
      controller: 'LoginController',
      cache: false
    })
    .state("app.dashboard",{
      url: '/dashboard',
      templateUrl: 'templates/dashboard.tpl.html',
      controller: 'DashboardController',
      cache: false
    })
    .state("intro-slider",{
      url: '/intro-slider',
      templateUrl: 'templates/intro-slider.tpl.html',
      controller: 'IntroSliderController',
      cache: false
    })
    .state("register",{
      url: '/register',
      templateUrl: 'templates/register.tpl.html',
      controller: 'RegisterController',
      cache: false
    })
    .state("app.passwords-list",{
      url: '/passwords-list',
      templateUrl: 'templates/passwords-list.tpl.html',
      controller: 'PasswordsListController',
      cache: false
    })
    .state("app.add-password",{
      url: '/add-password',
      templateUrl: 'templates/add-update-password.tpl.html',
      controller: 'AddUpdatePasswordController',
      cache: false
    })
    .state("app.update-password",{
      url: '/update-password/:password_id',
      templateUrl: 'templates/add-update-password.tpl.html',
      controller: 'AddUpdatePasswordController',
      cache: false
    })
    .state("app.view-password",{
      url: '/view-password/:password_id',
      templateUrl: 'templates/view-password.tpl.html',
      controller: 'ViewPasswordController',
      cache: false
    });

    // Instead
  	$urlRouterProvider.otherwise(function ($injector) {
  		var $state = $injector.get("$state");
  		$state.go('login');
  	});
  });

  app.config(['$httpProvider','StorageServiceProvider',
    function ($httpProvider,StorageServiceProvider) {

      var interceptor = [
      function () {
        return {
          request: function (config) {

            if(config.url.indexOf("http://localhost:1337") > -1){
              // Check if the localstorage has bumblebee_session
              var bumblebee_session = {};
              if(StorageServiceProvider.get("bumblebee_session")){
                bumblebee_session = JSON.parse(StorageServiceProvider.get("bumblebee_session"));
              }
              else {
                bumblebee_session = null;
              }

              // Check if the token exists. If so, add it to the request header
              if(bumblebee_session && bumblebee_session.token){
                config.headers.authorization = bumblebee_session.token;
              }
            }
            return config;
          },

          response: function (result) {
            return result;
          },

          responseError: function (rejection) {

          }
        };
      }];
      $httpProvider.interceptors.push(interceptor);
    }
  ]);

  app.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  });

  app.constant("REST_BASE_URL","http://localhost:1337");

})();
