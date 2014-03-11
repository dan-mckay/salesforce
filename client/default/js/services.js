angular.module('appServices', ['ngResource'])
  .factory('APIBaseUrl', function() {
    var cloud_host = $fh.cloud_props.hosts.releaseCloudUrl;
    if ( $fh.app_props.mode && $fh.app_props.mode.indexOf("dev") > -1 ) {
        cloud_host = $fh.cloud_props.hosts.debugCloudUrl;
    }
    return cloud_host + '/api';
  })
  .factory('APILogin', ['$resource', 'APIBaseUrl', function($resource, APIBaseUrl){
    console.log('api login called from client')
    console.log(APIBaseUrl + '/login');
    return $resource(APIBaseUrl + '/login');
  }])
  // .factory('apiLogin', 'APIBaseUrl', function($resource) {
  //   //console.log('APIBaseUrl', APIBaseUrl)
  //   return $resource(APIBaseUrl + '/login');
  // })
  .factory('Accounts', function($resource) {
    return $resource(APIBaseUrl + '/accounts');
  });
