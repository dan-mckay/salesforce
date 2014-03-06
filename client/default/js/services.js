'use strict';

/* Services */

angular.module('myApp.services', []).
  factory('CloudEndpoint', function() {
    return {
      root: function() {
        // figure out the root for calls to the REST API (instead of using $fh.act)
        // this is taken from data sent by the fh platform to the client
        var cloudHost = $fh.cloud_props.hosts.releaseCloudUrl;
        if ( $fh.app_props.mode && $fh.app_props.mode.indexOf("dev") > -1 ) {
            cloudHost = $fh.cloud_props.hosts.debugCloudUrl;
        }
        return cloudHost;
      }
    }
  });
