angular.module('gimmiehunter.user.piechart_directive', []).
   directive('pieChart', function ($parse) {
     //explicitly creating a directive definition variable
     //this may look verbose but is good for clarification purposes
     //in real life you'd want to simply return the object {...}
     var directiveDefinitionObject = {
         //We restrict its use to an element
         //as usually  <bars-chart> is semantically
         //more understandable
         restrict: 'E',
         //this is important,
         //we don't want to overwrite our directive declaration
         //in the HTML mark-up
         replace: false,
         scope: {data: '=chartData'},

         link: function (scope, element, attrs) {
            var width = parseInt($(element).parent().css("width")),
              height = width,
              radius = Math.min(width, height) / 3.5;

            var color = d3.scale.ordinal().
              range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

            var arc = d3.svg.arc()
              .outerRadius(radius - 20)
              .innerRadius(0);

            var pie = d3.layout.pie()
              .sort(null)
              .value(function(d) { return d.number; });

            var getAngle = function (d) {
              return (180 / Math.PI * (d.startAngle + d.endAngle) / 2 - 90);
            };

            var svg = d3.select(element[0]).append("svg")
              .attr("width", width)
              .attr("height", height)
              .append("g")
              .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

            var data = scope.data;

            var g = svg.selectAll(".arc")
              .data(pie(data))
              .enter().append("g")
              .attr("class", "arc");

            g.append("path")
              .attr("d", arc)
              .style("fill", function(d) { return color(d.data.type); });

             var pos = d3.svg.arc().innerRadius(radius).outerRadius(radius); 
             g.append("svg:text") 
                .attr("transform", function(d) { 
                  var angle = getAngle(d) > 110 ? 180 + getAngle(d) : getAngle(d);
                  return "translate(" + pos.centroid(d) + ")" + "rotate(" + angle + ")"; 
                }) 
                .attr("dy", 5) 
                .attr("text-anchor", function(d){
                  return getAngle(d) > 110  ? "end" : "start"
                }) 
                .text(function(d, i) { return d.data.type + " ("+d.data.number+")"}); 
         } 
      };
      return directiveDefinitionObject;
   }
  );