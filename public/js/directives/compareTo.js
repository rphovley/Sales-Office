'use strict';
angular.module('compareTo', []).directive("compareTo", function() {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compareTo"
        },
        link: function(scope, element, attributes, ngModel) {
             
            /*add the "compareTo" function to the validotors for the ngModel*/
            ngModel.$validators.compareTo = function(modelValue) {
                console.log("modelValue: " + modelValue);
                console.log("otherModelValue: " + scope.otherModelValue);
                return modelValue == scope.otherModelValue;
            };
 
            //when the othermodelvalue changes, validate the scope
            scope.$watch("otherModelValue", function() {
                console.log(scope.otherModelValue);
                ngModel.$validate();
            });
        }
    };
});
 
/*angular.module('student', []).directive('student', function() {
    var directive = {};
    directive.restrict = 'E';
    directive.template = "Student: <b>{{student.name}}</b> , Roll No: <b>{{student.rollno}}</b>";
    
    directive.scope = {
       student : "=name"
    }
    
    directive.compile = function(element, attributes) {
       element.css("border", "1px solid #cccccc");
       
       var linkFunction = function($scope, element, attributes) {
          element.html("Student: <b>"+$scope.student.name +"</b> , Roll No: <b>"+$scope.student.rollno+"</b><br/>");
          element.css("background-color", "#ff00ff");
       }
       return linkFunction;
    }
    
    return directive;
 });*/