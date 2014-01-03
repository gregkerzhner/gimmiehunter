angular.module('gimmiehunter.default.model',['gimmiehunter.default.resource']
  ).factory('Model', function($q, $http){
    var Model = function(defaults, resource){
      this.data = defaults;
      this.resource = resource;
    };

    Model.prototype.fetch = function(){
      var self = this;
      var defer = $q.defer();
      this.resource.GET().success(function(result){  

        self.data = result.data;
        defer.resolve(self.data);
      });
      return defer.promise;
    };

    Model.prototype.post = function(params){
      var self = this;
      var defer = $q.defer();
      this.resource.POST(params).success(function(result){  
        self.data = result.data;
        defer.resolve(self.data);
      });
      return defer.promise;
    };

    return Model;
  });