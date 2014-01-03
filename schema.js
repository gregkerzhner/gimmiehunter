var mongoose = require('mongoose');

var ObjectId = mongoose.Schema.ObjectId;


var UserSchema = mongoose.Schema({
  //provider id from twitter
  id: Number,
  username: String,
  displayName: String,
  photo: String,
  jensID: String,
  jensGID: String,
  token: String,

})

var User = mongoose.model('User', UserSchema)

var ScorecardSchema = mongoose.Schema({
  user: {type: Number, ref: 'User'},
  ascents:[{
    type: ObjectId,
    ref: "Ascent"
  }]
})

var Scorecard = mongoose.model('Scorecard', ScorecardSchema)

var AscentSchema = mongoose.Schema({
  scorecard: {type: ObjectId, ref: 'Scorecard'},
  name: String,
  grade: String,
  area: String,
  braveAndHumble: Boolean,
  numberChaser: Boolean,
  comment: String,
  route: {
    type: ObjectId,
    ref: "Route"
  }
})

var Ascent = mongoose.model("Ascent", AscentSchema);

var RouteSchema = mongoose.Schema({
  name: String,
  area: String
})


var Route = mongoose.model('Route', RouteSchema)

module.exports = {
  Ascent: Ascent,
  Route: Route,
  Scorecard: Scorecard,
  User: User
}