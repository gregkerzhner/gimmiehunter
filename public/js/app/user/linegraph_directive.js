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
          
         } 
      };
      return directiveDefinitionObject;
   }
  );