angular.module('gimmiehunter.user.scorecard_controller', [
  'gimmiehunter.user.scorecard_model',
  'gimmiehunter.user.user_model',
  'gimmiehunter.user.piechart_directive',
  'gimmiehunter.user.wordcloud_directive'
]
  ).controller('ScorecardController',
  ['$scope','$http', "$location", 'ScorecardModel', "UserModel", 
  function($scope, $http, $location, ScorecardModel, UserModel){
    debugger
    $scope.ScorecardModel = ScorecardModel;
    $scope.UserModel = UserModel;
    $scope.getAscents = function(){
      ScorecardModel.fetch().then(
        function(ascents){
          if(ascents){
            $scope.humblePie = ScorecardModel.parseHumble(ascents).data;
            $scope.ascentsByArea = ScorecardModel.ascentsByArea(ascents).data;
            $scope.hardMan = ScorecardModel.hardMan(ascents).data;
            $scope.commentWords = ScorecardModel.commentWords(ascents).data
          }
        }
      )
    }
    if($scope.user.jensID){
      $scope.ascents = $scope.getAscents();
    }
    else{
      $location.path('/gimmiehunter/sync');
    }
  }
]
);