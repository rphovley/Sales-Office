'use strict';
angular.module('userTextFields', []).directive("userTextFields", function($window, $compile, UserService) {
    return {
        templateUrl: "/views/directives/user_fields.html",
        scope: {
            field : "=field",
            user  : "=user"
        },
        link: function(scope, element, attributes) {

            scope.editing = false;
            var empty_value = "empty";
            scope.field_value = scope.user.get(scope.field);
            scope.inputHandling = function(){
                if(!scope.isParseField){
                    scope.editing = true;
                    var find_class = scope.user.id + scope.field;
                    $("."+find_class).focus();
                }

            }
            scope.confirmEdit = function(){
                var inputElement = element.find('input');
                var inputValue = inputElement.val().trim();
                var hasChanged = false;
                if(scope.field_value !== inputValue){
                    scope.field_value = inputValue;
                    saveExtendedUser();
                }
                scope.editing = false;
            }

            var saveExtendedUser = function(){
                displaySpinner(true);
                var extendedUser = scope.user;
                extendedUser.set(scope.field, scope.field_value);
                UserService.saveExtUser(extendedUser).then(function(user){
                    displaySpinner(false);
                }, function(error){
                    displaySpinner(false);
                });
            }
            var displaySpinner = function(isLoading){
                if(isLoading){
                    element.find("#overlay").addClass("tiny-loading");
                }else{
                    element.find("#overlay").removeClass("tiny-loading");
                }
            }

        }
    };
});