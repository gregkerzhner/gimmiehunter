angular.module('gimmiehunter.user.scorecard_sync_controller', [
  'gimmiehunter.user.scorecard_model',
  'gimmiehunter.user.user_model'
]
  ).controller('ScorecardSyncController',
  ['$scope','$http', '$location','ScorecardModel', "UserModel", 
  function($scope, $http, $location, ScorecardModel, UserModel){
    $scope.UserModel = UserModel;
    $scope.submitIDs = function(data){
      var params = $("#jens-ids").serialize();
      $scope.user.jensID = $("#jens-ids").serializeArray()[0].value;
      $scope.user.jensGID = $("#jens-ids").serializeArray()[1].value;
      $scope.UserModel.post(params).then(
        function(result){
          $location.path('/gimmiehunter/account');
        }
      )
    }
    
  }
]
);