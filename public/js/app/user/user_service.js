angular.module('gimmiehunter.user.user_service', []).service("User", function(){
  var user = {
    isLogged: false,
    username: ''
  };
  return user;

});