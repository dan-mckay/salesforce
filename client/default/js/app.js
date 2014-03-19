var myApp = angular.module('myApp', [
  'auth0',
  'authInterceptor',
  'shoppinpal.mobile-menu',
  'easypiechart',
  'ngRoute',   
  'ngCookies',
  'appServices',
  'appControllers'
  ]).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/',                        { templateUrl: 'partials/root.html',            controller: 'RootCtrl'        })
      .when('/logout',                  { template: '<p>You are now logged out</p>',    controller: 'LogoutCtrl'      })
      .when('/login',                   { templateUrl: 'partials/login.html',           controller: 'LoginCtrl'       })
      .when('/accounts',                { templateUrl: 'partials/accounts.html',        controller: 'AccListCtrl'     })
      .when('/accounts/:accountId',     { templateUrl: 'partials/account.html',         controller: 'AccCtrl'         })
      .when('/cases',                   { templateUrl: 'partials/cases.html',           controller: 'CaseListCtrl'    })
      .when('/cases/:caseId',           { templateUrl: 'partials/case.html',            controller: 'CaseCtrl'        })
      .when('/campaigns',               { templateUrl: 'partials/campaigns.html',       controller: 'CampaignListCtrl'})
      .when('/campaigns/:campaignId',   { templateUrl: 'partials/campaign.html',        controller: 'CampaignCtrl'    })
      .when('/opps',                    { templateUrl: 'partials/opps.html',            controller: 'OppListCtrl'     })
      .when('/opps/:opp',               { templateUrl: 'partials/opp.html',             controller: 'OppCtrl'         })
      .when('/user',                    { templateUrl: 'partials/user.html',            controller: 'UserCtrl'        })
      .otherwise({ redirectTo: '/login' });
  }]).
  config(['authProvider', function(authProvider) {
    authProvider.init({
      domain:         'fh-dan.auth0.com',
      clientID:       'pEs0LRL0jgbs8fZpaiTHSS3qu44aknjo',
      callbackURL:    'https://127.0.0.1:8000/',
      callbackOnLocationHash: true
    });
  }]);