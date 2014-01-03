//curl "http://www.8a.nu/scorecard/AscentList.aspx?UserId=18774&AscentType=0&AscentClass=0&AscentListTimeInterval=1&AscentListViewType=0&GID=40f764cc67553d6ea4e01b5fdb620636" -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.116 Safari/537.36" 
module.mongoose = require('mongoose');
module.cheerio = require('cheerio');
module.schema = require("./../schema");

var http = require('http');

var Scorecard = function(options){
  this.options = options;
  this.module = module;
}

Scorecard.prototype.sync = function(response) {
  var _this = this;
  var options = this.options;
  var jensID = _this.options.user.jensID;
  var jensGID = _this.options.user.jensGID;
  if(jensID && jensGID){
    var options = {
      host:'www.8a.nu',
      //http://www.8a.nu/scorecard/AscentList.aspx?UserId=35319&AscentType=0&AscentClass=0&AscentListTimeInterval=1&AscentListViewType=0&GID=f5340da601c5cdf27c6d362885addfdd
      //35319
      //f5340da601c5cdf27c6d362885addfdd
      path: '/scorecard/AscentList.aspx?UserId='+jensID+'&AscentType=0&AscentClass=0&AscentListTimeInterval=0&AscentListViewType=0&GID='+jensGID, 
      headers: {
        'User-Agent': "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.116 Safari/537.36"
    }}
    var body = [];
    http.get(options,
      function(res){
        res.setEncoding('utf8');
        res.on('data', function(chunk) {
          body.push(chunk);
        });
        res.on('end', function() {
          body = body.join('');
          _this.rawScorecard = body;
          _this.parseHTML(response);
          console.log(body);
        });
      }
    )
  }
  else{
    response.send({
      OK: true, data: {}
    })
  }
}

Scorecard.prototype.parseHTML = function(response){
  var _this = this;
  $ = this.module.cheerio.load(this.rawScorecard);
  var table = $($(".AscentListHeadRow")[0]).closest("table");
  var rows = table.find("tr");
  var ScorecardModel = this.module.schema.Scorecard;
  var Route = this.module.schema.Route
  this.scorecard = new ScorecardModel({
    user: this.options.userId
  });
  this.scorecard.save(function(err){
    var grades = [];
    var gradeRows = $("#AscentStats table table tr");
    for (var g = 0; g < gradeRows.length; g++){
      var gradeRow = gradeRows[g];
      var grade = $($(gradeRow).find("td")[0]).text();
      if(grade !=="Grade" && grade!==""){
        grades.push(grade);
      }
    }
    var gradeIndex = -1;

    for(var i = 0; i< rows.length; i++){
      var row = rows[i];
      if($(row).find(".AscentListHeadRow").html()){
        gradeIndex++;        
      }
      grade = grades[gradeIndex];
      if($(row).html().indexOf("baseline")>-1){
        (function(row, last, response, grade){
          var tds = $(row).find("td");
          var name= $(tds[2]).find("a").html();  
          var area = $(tds[4]).find("span").find("a").html();  
          var braveAndHumble = $(tds[2]).find("b").html() != null;
          var numberChaser = $(tds[2]).find("i").html() != null;
          var ascentData = {
            name: name,
            braveAndHumble: braveAndHumble,
            numberChaser: numberChaser,
            grade: grade,
            area: area
          }     
          Route.findOne({name: name}, ascentData, function(err, route){
            if(!route){
              route = new Route({
                name: ascentData.name,
                area: ascentData.area
              })
              route.save(function(err){
                _this.addRouteToScorecard(route, ascentData, last ? response : null)
              });
            }
            else{
              _this.addRouteToScorecard(route, ascentData, last ? response : null)
            }
          })
          
        })(rows[i], i == rows.length-1, response, grade)
      }
    }

  });
  return {ok: true};
}

Scorecard.prototype.addRouteToScorecard = function(route, ascentData, response){
  var _this = this;
  var Ascent = this.module.schema.Ascent;
  ascentData["route"] = route.id;
  ascentData["scorecard"] = this.scorecard.id;
  ascent = new Ascent(ascentData)
  this.scorecard.ascents.push(ascent);
  ascent.save(function(err){
    if(response){
      _this.syncDone(response);
    }
  });
}

Scorecard.prototype.syncDone = function(res){
  var _this = this;
  var Ascent = this.module.schema.Ascent;
  Ascent.find({scorecard: this.scorecard.id}).popualte("route","area").exec(function(err, ascents){
    debugger;
    res.send({
      data: ascents
    })
  })
}


module.exports = {
  Scorecard: Scorecard
}

