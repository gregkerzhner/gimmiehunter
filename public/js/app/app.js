window.app = angular.module("gimmiehunter", ['ngRoute','gimmiehunter.user.login_controller',
  'gimmiehunter.user.account_controller',
  'gimmiehunter.user.scorecard_controller',
  'gimmiehunter.user.scorecard_sync_controller',
  'gimmiehunter.user.header_controller',
  'gimmiehunter.user.user_service']).config([
  "$routeProvider", "$locationProvider", "$httpProvider", function($routeProvider, $locationProvider, $httpProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
      .when('/', 
        {
          controller: 'LoginController', 
          templateUrl: "partials/login.html"
        }
      )
      .when('/account', 
        {
          controller: 'ScorecardController', 
          templateUrl: "partials/scorecard.html"
        }
      )
      .when('/sync', 
        {
          controller: 'ScorecardSyncController', 
          templateUrl: "partials/scorecard_sync.html"
        }
      );
  }
])