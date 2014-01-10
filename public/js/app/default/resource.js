angular.module('gimmiehunter.default.resource', []
  ).factory('Resource', function($http){
    $http.defaults.headers.post["Content-Type"] = "application/json";
    var baseURL = 'http://localhost:4000',
      baseParams = {};
    return function(endpoint, params, options){
      var url = endpoint,
        params = _.extend(params, baseParams);

      var ret = {
        GET: function(){
          return $http({method: "GET", url: url, params: params})
        },
        POST: function(params){
          return $http({method: "POST", url: url, data: params})
        }
      }
      return ret;
    };

  });