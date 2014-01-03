var schema = require("./../schema"),
  Scorecard = require('./../models/scorecard').Scorecard;

exports.home= function(req, res){
  res.sendfile('public/index.html');
}


exports.user = function(req, res){ 
  schema.User.findOne({id: req.user.id},
    function(err, user){
      if(user){
        res.send({
          user: user.toJSON()
        });
      }
    }
  );
}

exports.user_update = function(req, res){ 
  schema.User.findOne({id: req.user.id},
    function(err, user){
      user.jensGID = req.body.jensGID;
      user.jensID = req.body.jensID;
      user.save(function(err, results){
        res.send({
          OK: true,
          data: user
        });
      })
    }
  );
}


exports.scorecard = function(req, res){
  var userId = req.user.id;
  schema.User.findOne({id: req.user.id},
    function(err, user){
      schema.Scorecard.findOne({user: userId}, function(err, results){
        var options = {
          userId: userId,
          user: user
        }
        var scorecard = new Scorecard(options);
        if(results){
          scorecard.scorecard = results;
          scorecard.syncDone(res);
        }
        else{
          scorecard.sync(res);
        }
      })
    }
  );  
}

exports.things = function(req, res){
  schema.Route.find({}, function(err, routes){
    var routeMap = {};
     routes.forEach(function(route) {
          routeMap[route._id] = route;
     });
     res.send(routeMap);  
  })
}