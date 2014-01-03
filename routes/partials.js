exports.partials = function(req, res){
  var filename = req.params.filename;
  if(!filename) return;  
  res.render("public/partials/" + filename );
};