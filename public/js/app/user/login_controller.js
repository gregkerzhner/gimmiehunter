angular.module('gimmiehunter.user.login_controller', []).controller('LoginController', function($scope, $http){
  $scope.login = function(){
    window.location.href = "/gimmiehunter/auth/twitter"
  }
});