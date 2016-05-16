'use strict';
angular.module('parseUserFields', []).directive("parseUserFields", function($window, $compile, UserService) {
    return {
        templateUrl: "/views/directives/parse_user_fields.html",
        scope: {
            field : "=field",
            parseUser  : "=parseUser"
        },
        link: function(scope, element, attributes) {
            
            scope.editing = false;
            var empty_value = "empty";
            var setScope = function(){
                scope.field_value = scope.parseUser.get(scope.field);
            }
            setScope();

        }
    };
});