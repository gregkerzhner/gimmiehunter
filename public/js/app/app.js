window.app = angular.module("gimmiehunter", ['ngRoute','gimmiehunter.user.login_controller',
  'gimmiehunter.user.account_controller',
  'gimmiehunter.user.scorecard_controller',
  'gimmiehunter.user.scorecard_sync_controller',
  'gimmiehunter.user.header_controller',
  'gimmiehunter.user.user_service']).config([
  "$routeProvider", "$locationProvider", "$httpProvider", function($routeProvider, $locationProvider, $httpProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
      .when('/gimmiehunter', 
        {
          controller: 'LoginController', 
          templateUrl: "gimmiehunter/partials/login.html"
        }
      )
      .when('/gimmiehunter/account', 
        {
          controller: 'ScorecardController', 
          templateUrl: "gimmiehunter/partials/scorecard.html"
        }
      )
      .when('/gimmiehunter/sync', 
        {
          controller: 'ScorecardSyncController', 
          templateUrl: "gimmiehunter/partials/scorecard_sync.html"
        }
      );
  }
])