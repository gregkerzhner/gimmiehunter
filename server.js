var express = require('express');
var app = express(),
  mongoose = require('mongoose'),
  index = require('./routes/index'),
  account = require('./routes/account'),
  partials = require('./routes/partials'),
  server = require('http').createServer(app),
  io = require('socket.io').listen(server),
  config = require('./config.js'),
  passport = require("passport"),
  TwitterStrategy = require('passport-twitter').Strategy;

server.listen(config.port);
mongoose.connect(config.db);

var User = require("./schema").User

passport.use(new TwitterStrategy({
    consumerKey: config.tweet,
    consumerSecret: config.secret,
    callbackURL: config.callbackUrl
  },
  function(token, tokenSecret, profile, done) {
    User.findOne({id: profile.id},
      function(err, user){
        if(!user){
          var userData = new User({
            id: parseInt(profile.id),
            created: Date.now(),
            token: token,
            username: profile.displayName
            //,
            //me
            //jensID: "14075&",
            //jensGID: "d39fd41da5c8016fec55e02156d66d01"
            //tara
            //jensID: "35319",
            //jensGID: "f5340da601c5cdf27c6d362885addfdd"
            //dutter
            //jensID: "4930",
            //jensGID: "d3fe205b19d037681bc81c9811b150fb"            

          });
          userData.save(function(err) {
            if (err) console.log(err);
            else console.log('Saving user...');
          });

        }
      }
    );
    var user = { id: profile.id, name: profile.username };
    done(null, user);
  }
));

var authenticatedOrNot = function(req, res, next){
  if(req.isAuthenticated()){
    next();
  }else{
    res.redirect("/gimmiehunter");
  }
}

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.configure(function(){ 
  app.use(express.static(__dirname + '/public'));
  app.use('/gimmiehunter', express.static(__dirname + '/public'));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.session({ secret: 'SECRET' }));
  app.use(passport.initialize());
  app.use(passport.session());
});

//app.set('views', __dirname + '/public/partials');
//app.engine('html', require('ejs').renderFile);

app.get('/gimmiehunter/user/foo', account.things);
app.get('/gimmiehunter/user/scorecard', authenticatedOrNot, account.scorecard);
app.get('/gimmiehunter/account', authenticatedOrNot, account.home);
app.get('/gimmiehunter/user', authenticatedOrNot, account.user);
app.post('/gimmiehunter/user', authenticatedOrNot, account.user_update);
app.get('/gimmiehunter/partials/:filename', partials.partials);
app.get('/gimmiehunter/auth/twitter', passport.authenticate('twitter'));
app.get('/gimmiehunter/auth/twitter/callback', 
  passport.authenticate('twitter', 
    { 
      successReturnToOrRedirect: '/gimmiehunter/account', 
      failureRedirect: '/gimmiehunter/login' 
    }
  )
);

app.use(function(req, res) {
  // Use res.sendfile, as it streams instead of reading the file into memory.
  res.sendfile(__dirname + '/public/index.html');
});


