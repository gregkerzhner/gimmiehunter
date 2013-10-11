var express = require('express');
var app = express();
var server = require('http').createServer(app)
var io = require('socket.io').listen(server);

server.listen(8080);

app.configure(function(){ 
  app.use(express.static(__dirname + '/public'));
});

app.get('/', function(req, res){
  res.sendfile("public/index.html");
});

io.sockets.on('connection', function (socket) {
  var sendData = function(){
    socket.emit('data', { data: Math.floor(Math.random()*100)});
  }
  setInterval(sendData, 100); 
});
