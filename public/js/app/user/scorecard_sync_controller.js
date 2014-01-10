angular.module('gimmiehunter.user.scorecard_sync_controller', [
  'gimmiehunter.user.scorecard_model',
  'gimmiehunter.user.user_model'
]
  ).controller('ScorecardSyncController',
  ['$scope','$http', '$location','ScorecardModel', "UserModel", 
  function($scope, $http, $location, ScorecardModel, UserModel){
    $scope.UserModel = UserModel;
    $scope.submitIDs = function(data){
      var url = $("#jens-url").val().replace(/ /g,'')
      var userIdIndex = url.indexOf("UserId");
      var rest = url.substring(userIdIndex);
      $scope.user.jensID = rest.substring(7,rest.indexOf("&"));
      var gidIndex = url.indexOf("GID");
      $scope.user.jensGID = url.substring(gidIndex+4);
      $scope.UserModel.post($scope.user).then(
        function(result){
          $location.path('/gimmiehunter/account');
        }
      )
    }
    
  }
]
);