var myApp = angular.module('myApp', [
  'auth0',
  'ngRoute', // angular-route.js
  'appServices',
  'appControllers'
  ])
  .config(appRouter);

function appRouter($routeProvider, authProvider) {
  authProvider.init({
    domain:         'fh-dan.auth0.com',
    clientID:       'oxpgqtGJGRv1d9VIT3hXi32KFuDqf7jV',
    callbackURL:    'http:/127.0.0.1:8001/callback',
    callbackOnLocationHash: true
  });
  $routeProvider
    .when('/',        { templateUrl: 'partials/root.html',     controller: 'RootCtrl'    })
    .when('/logout',  { templateUrl: 'partials/logout.html',   controller: 'LogoutCtrl'  })
    .when('/login',   { templateUrl: 'partials/login.html',    controller: 'LoginCtrl'   })
    .otherwise({ redirectTo: '/login' });
}

