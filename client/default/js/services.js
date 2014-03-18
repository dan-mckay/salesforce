angular.module('appServices', ['ngResource'])
  .factory('APIBaseUrl', function() {
    var cloud_host = $fh.cloud_props.hosts.releaseCloudUrl;
    if ($fh.app_props.mode && $fh.app_props.mode.indexOf("dev") > -1) {
        cloud_host = $fh.cloud_props.hosts.debugCloudUrl;
    }
    return cloud_host + '/api';
  })
  .factory('MenuItems', function() {
    return [
      { name: 'accounts',      icon: '\ud83d\udc65' },
      { name: 'cases',         icon: '\ud83d\udec6' },
      { name: 'campaigns',     icon: '\ud83d\udcf0' },
      { name: 'opportunities', icon: '\ud83c\udfaf' }
    ];
  })
  .factory('PageTitle', function() {
    var title = 'fh-salesforce';
    return {
      getTitle: function() { 
        return title; 
      },
      setTitle: function(newTitle) { 
        title = newTitle 
      }
    };
  })
  .factory('CurrentUser', function() {
    return {
      getUser: function() {
        var user = JSON.parse(sessionStorage.getItem('currentUser'));
        return user;
      },
      setUser: function(user) {
        sessionStorage.setItem('currentUser',  JSON.stringify(user));
      }
    };
  })
  .factory('APILogin', ['$resource', 'APIBaseUrl', function($resource, APIBaseUrl){
    return $resource(APIBaseUrl + '/login');
  }])
  .factory('Accounts', ['$resource', 'APIBaseUrl', function($resource, APIBaseUrl) {
    return $resource(APIBaseUrl + '/accounts/:accountId');
  }])
  .factory('AccountsCache', ['$cacheFactory', function($cacheFactory) {
    return $cacheFactory('accounts');
  }])
  .factory('Cases', ['$resource', 'APIBaseUrl', function($resource, APIBaseUrl) {
    return $resource(APIBaseUrl + '/cases/:caseId');
  }])
  .factory('CasesCache', ['$cacheFactory', function($cacheFactory) {
    return $cacheFactory('cases');
  }])
  .factory('Campaigns', ['$resource', 'APIBaseUrl', function($resource, APIBaseUrl) {
    return $resource(APIBaseUrl + '/campaigns/:campaignId');
  }])
  .factory('CampaignsCache', ['$cacheFactory', function($cacheFactory) {
    return $cacheFactory('campaigns');
  }])
  .factory('Opps', ['$resource', 'APIBaseUrl', function($resource, APIBaseUrl) {
    return $resource(APIBaseUrl + '/opps/:oppId');
  }])
  .factory('OppsCache', ['$cacheFactory', function($cacheFactory) {
    return $cacheFactory('opps');
  }]);
