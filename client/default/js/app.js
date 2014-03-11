var myApp = angular.module('myApp', [
  'auth0',
  'authInterceptor',
  'ngRoute', // angular-route.js
  'appServices',
  'appControllers'
  ]).
  // config(['$sceDelegateProvider', function($sceDelegateProvider) {
  //   // Used to handle cors issue of sending an options http request
  //   $sceDelegateProvider.resourceUrlWhitelist(['self', 'http://127.0.0.1:8001/**']);
  // }]).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/',        { templateUrl: 'partials/root.html',     controller: 'RootCtrl'    })
      .when('/logout',  { template: '<p>You are now logged out</p>',   controller: 'LogoutCtrl'  })
      .when('/login',   { templateUrl: 'partials/login.html',    controller: 'LoginCtrl'   })
      .when('/user',    { template: '<p>User Page</p>',     controller: 'UserCtrl'    })
      .otherwise({ redirectTo: '/login' });
  }]).
  config(['authProvider', function(authProvider) {
    authProvider.init({
      domain:         'fh-dan.auth0.com',
      clientID:       'pEs0LRL0jgbs8fZpaiTHSS3qu44aknjo',
      callbackURL:    'http://127.0.0.1:8000/',
      callbackOnLocationHash: true
    });
  }]);