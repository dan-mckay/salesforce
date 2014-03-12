/* Controllers */

angular.module('appControllers', [
  'appServices',
  'ngCookies'
  ])
  .controller('LoginCtrl', function(auth, $scope) {
    $scope.auth = auth;
  })
  .controller('LogoutCtrl', function(auth, $location) {
    auth.signout();
    $location.path('/login');
  })
  .controller('RootCtrl', function(auth, $scope, $cookieStore, $location, APILogin) {
    if (!auth.isAuthenticated) {
      $location.path('/login');
      return;
    }
    $scope.auth = auth;
    var user = APILogin.get();
    $cookieStore.put('user', user);     // Store the user in session storage
    $scope.user = user;
    $scope.go = function(path) {
      $location.path(path);
    }
  })
  .controller('AccListCtrl', function($scope, $location, Accounts){
    $scope.accounts = Accounts.query();
    $scope.go = function(path) {
      $location.path(path);
    }
  })
  .controller('AccCtrl', function($scope, $routeParams, Accounts){
    $scope.account = Accounts.get({
      accountId: $routeParams.accountId
    })
  })
  .controller('CaseListCtrl', function($scope, $location, Cases){
    $scope.cases = Cases.query();
    $scope.go = function(path) {
      $location.path(path);
    }
  })
  .controller('CaseCtrl', function($scope, $routeParams, Cases){
    $scope.case = Cases.get({
      caseId: $routeParams.caseId
    })
  })
  .controller('CampaignListCtrl', function($scope, $location, Campaigns){
    $scope.campaigns = Campaigns.query();
    $scope.go = function(path) {
      $location.path(path);
    }
  })
  .controller('CampaignCtrl', function($scope, $routeParams, Campaign){
    $scope.campaign = Campaigns.get({
      campaignId: $routeParams.campaignId
    })
  });