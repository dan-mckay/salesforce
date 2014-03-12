angular.module('appServices', ['ngResource'])
  .factory('APIBaseUrl', function() {
    var cloud_host = $fh.cloud_props.hosts.releaseCloudUrl;
    if ( $fh.app_props.mode && $fh.app_props.mode.indexOf("dev") > -1 ) {
        cloud_host = $fh.cloud_props.hosts.debugCloudUrl;
    }
    return cloud_host + '/api';
  })
  .factory('APILogin', ['$resource', 'APIBaseUrl', function($resource, APIBaseUrl){
    return $resource(APIBaseUrl + '/login');
  }])
  .factory('Accounts', ['$resource', 'APIBaseUrl', function($resource, APIBaseUrl) {
    return $resource(APIBaseUrl + '/accounts/:accountId');
  }])
  .factory('Cases', ['$resource', 'APIBaseUrl', function($resource, APIBaseUrl) {
    return $resource(APIBaseUrl + '/cases/:caseId');
  }])
  .factory('Campaigns', ['$resource', 'APIBaseUrl', function($resource, APIBaseUrl) {
    return $resource(APIBaseUrl + '/campaigns/:campaignId');
  }])
  .factory('Campaign', function() {   // Used to pass scope between controllers
    return {};
  });
