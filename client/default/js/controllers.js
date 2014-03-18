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
  .controller('HeaderCtrl', function($scope, $location, PageTitle) {
    $scope.PageTitle = PageTitle;
    $scope.go = function(path) {
      $location.path(path);
    }
  })
  .controller('RootCtrl', function(auth, $scope, $location, CurrentUser, APILogin) {
    if (!auth.isAuthenticated) {
      $location.path('/login');
      return;
    }
    $scope.auth = auth;
    var user = APILogin.get(function(data) {
      CurrentUser.setUser(data);
    });
    $scope.user = user;
    $scope.go = function(path) {
      $location.path(path);
    }
  })
  .controller('MenuCtrl', function($scope, $location, CurrentUser, MenuItems) {
    $scope.user = CurrentUser.getUser();
    $scope.menuItems = MenuItems;
    $scope.go = function(path, $spMenu) {
      if(path == "/opportunities") {
        path = '/opps'; 
      }
      $location.path(path);
      $spMenu.hide();
    }
  })
  .controller('AccListCtrl', function($scope, $location, Accounts, AccountsCache, PageTitle) {
    PageTitle.setTitle('Accounts');
    $scope.accounts = AccountsCache.get('accounts');
    if(!$scope.accounts) {
      $scope.accounts = Accounts.query();
      AccountsCache.put('accounts', $scope.accounts);
    }
    $scope.go = function(path) {
      $location.path(path);
    }
  })
  .controller('AccCtrl', function($scope, $routeParams, Accounts) {
    Accounts.get({
      accountId: $routeParams.accountId
    }, function(data) {
      $scope.account = data;
      // Map stuff for header
      var mapContainer = document.getElementById('mapCanvas');
      var mapOptions = {
        zoom: 11,
        center: new google.maps.LatLng(data.lat, data.lng),
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      $scope.map = new google.maps.Map(mapContainer, mapOptions);
      var marker = new google.maps.Marker({
        map: $scope.map,
        position: new google.maps.LatLng(data.lat, data.lng),
        title: $scope.account.Name
      });
      $scope.marker = marker;
    });
  })
  .controller('CaseListCtrl', function($scope, $location, Cases, CasesCache, PageTitle) {
    PageTitle.setTitle('Cases');
    $scope.cases = CasesCache.get('cases');
    if(!$scope.cases) {
      $scope.cases = Cases.query();
      CasesCache.put('cases', $scope.cases);
    }
    $scope.go = function(path) {
      $location.path(path);
    }
  })
  .controller('CaseCtrl', function($scope, $routeParams, Cases) {
    $scope.case = Cases.get({
      caseId: $routeParams.caseId
    })
  })
  .controller('CampaignListCtrl', function($scope, $rootScope, $location, Campaigns, CampaignsCache, PageTitle) {
    PageTitle.setTitle('Campaigns');
    $scope.campaigns = CampaignsCache.get('campaigns');
    if(!$scope.campaigns) {
      $scope.campaigns = Campaigns.query();
      CampaignsCache.put('campaigns', $scope.campaigns);
    }
    $scope.goToCamp = function(camp) {
      $rootScope.currentCampaign = camp;
      $location.path('/campaigns/' + camp.Id);
    }
  })
  .controller('CampaignCtrl', function($scope, $rootScope) {
    $scope.campaign = $rootScope.currentCampaign;
    var barColour = '#5be55b'; // Green
    $scope.classColour = 'green';
    $scope.thisIcon = '\ud83d\udc4d'; // Thumbsup
    // Pie-chart
    $scope.percent = Math.round(($scope.campaign.ActualCost / $scope.campaign.BudgetedCost) * 100);
    if($scope.percent > 100) {
      barColour = '#e75d5c';  //Red
      $scope.classColour = 'red';
      $scope.thisIcon = '\ud83d\udc4e'; // Thumbsdown
    }
    $scope.options = {
      animate:{
        duration: 1000,
        enabled: true
      },
      barColor: barColour,
      scaleColor: false,
      lineWidth: 15,
      lineCap: 'circle',
      size: 160
    };
  })
  .controller('OppListCtrl', function($scope, $rootScope, $location, Opps, OppsCache, PageTitle) {
    PageTitle.setTitle('Opportunities');
    $scope.opps = OppsCache.get('opps');
    if(!$scope.opps) {
      $scope.opps = Opps.query();
      OppsCache.put('opps', $scope.opps);
    }
    $scope.goToOpp = function(opp) {
      $rootScope.currentOpp = opp;
      $location.path('/opps/' + opp.Id);
    }
  })
  .controller('OppCtrl', function($scope, $rootScope) {
    $scope.opp = $rootScope.currentOpp;
  })
  .controller('UserCtrl', function($scope, CurrentUser, PageTitle) {
    $scope.user = CurrentUser.getUser();
    PageTitle.setTitle('User Details');
  }); 




