exports.index = function(req, res){
  console.log("seinding!")
  res.sendfile("public/index.html");
}