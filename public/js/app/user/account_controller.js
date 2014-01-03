angular.module('gimmiehunter.user.account_controller', 
  ['gimmiehunter.user.user_service']
  ).controller('AccountController', ['$scope','$http', 'User', function($scope, $http, User){
    if(User.isLogged == false){
      $http({method: 'GET', url: '/user'}).
      success(function(data, status, headers, config) {
        if(data.user){
          User = data.user;
          User.isLogged = true;
          $scope.user = User
        }
      })
    }

    $scope.user = User;
  }]
);