angular.module('gimmiehunter.user.scorecard_resource', 
  ['gimmiehunter.default.resource']
  ).factory("ScorecardResource", 
  ["Resource",
    function(Resource){
      var endpoint = '/gimmiehunter/user/scorecard',
        params = {},
        options = {};
      return new Resource(endpoint, params, options)
  
    }
  ]
);