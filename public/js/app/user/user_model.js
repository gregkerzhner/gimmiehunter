angular.module('gimmiehunter.user.user_model', 
  ['gimmiehunter.default.model',
    'gimmiehunter.user.user_resource'
  ]
  ).factory("UserModel",["Model", "UserResource", 
    function(Model, UserResource){
      return new Model({}, UserResource)
    }
  ]
);