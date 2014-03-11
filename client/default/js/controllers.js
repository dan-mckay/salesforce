/* Controllers */

angular.module('appControllers', ['appServices'])
  .controller('RootCtrl', function(auth, $scope, $location, $http, APIBaseUrl, APILogin) {
    console.log(APIBaseUrl);
    if (!auth.isAuthenticated) {
      $location.path(APIBaseUrl + '/login');
      return;
    }
    $scope.auth = auth;
    // $scope.user = APILogin.query(function(){
    //   console.log('SCOPE', $scope);
    // });
    $http({method: 'GET', url: APIBaseUrl + '/login'})
      .success(function (data, status, headers, config) {
        // User authenticated, do something with the response
        console.log('success', data);
      })
      .error(function (data, status, headers, config) {
        console.log('fail', data);
      });
  })
  .controller('LoginCtrl', function(auth, $scope) {
    $scope.auth = auth;
  })
  .controller('LogoutCtrl', function(auth, $location) {
    auth.signout();
    $location.path('/login');
  })
  .controller('UserCtrl', function($scope) {
    console.log($scope);
  });