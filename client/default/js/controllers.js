/* Controllers */

angular.module('appControllers', ['appServices']).
  controller('RootCtrl', function(auth, $location, BaseUrl) {
    console.log(BaseUrl);
    if (!auth.isAuthenticated) {
      $location.path('/login');
      return;
    }
    $scope.auth = auth;
  })
  .controller('LoginCtrl', function(auth, $scope) {
    $scope.auth = auth;
  })
  .controller('LogoutCtrl', function(auth, $location) {
    auth.signout();
    $location.path('/login');
  });