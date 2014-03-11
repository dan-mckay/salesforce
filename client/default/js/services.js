angular.module('appServices', ['ngResource'])
  .factory('BaseUrl', function() {
    var cloud_host = $fh.cloud_props.hosts.releaseCloudUrl;
    if ( $fh.app_props.mode && $fh.app_props.mode.indexOf("dev") > -1 ) {
        cloud_host = $fh.cloud_props.hosts.debugCloudUrl;
    }
    return cloud_host;
  })
  .factory('Accounts', function ($resource) {
    return $resource('http://127.0.0.1:8001/accounts');
  });
