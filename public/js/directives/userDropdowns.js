'use strict';
angular.module('userDropdowns', []).directive("userDropdowns", function(OfficeService,$window, $compile, UserService) {
    return {
        templateUrl: "/views/directives/user_dropdowns.html",
        scope: {
            field : "=field",
            user  : "=user",
            offices : "=offices"
        },
        link: function(scope, element, attributes) {
            scope.isOffice = true;
            scope.isEditing = false;
            if(scope.offices === undefined){
                scope.isOffice = false;
            }
            var User = UserService.ExtendedUser
            if(scope.field === User.CORPORATE_ROLE){
                console.log(scope.offices);
                scope.roles = User.CORPORATE_ROLES;
                scope.role  = scope.user.get(scope.field);
            }else if(scope.field === User.OFFICE){
                console.log("OFFICE");
                scope.office = scope.user.get(scope.field);
            }
            scope.editing = function(){
                isEditing(true);
                $("dropdown").focus();
                console.log(scope.isEditing);   
            }

            scope.onRoleChange = function(role) {
                alert("id:"+role);
                scope.role = role;
            }
            scope.onOfficeChange = function(office) {
                alert("id:"+office.get("name"));
                scope.office = office;
            }
            scope.confirmOfficeEdit = function(){
                saveField(scope.office);
                console.log(scope.office);
            }
            scope.confirmRoleEdit = function(){
                saveField(scope.role);
                console.log(scope.role);
            }

            var saveField = function(value){
                displaySpinner(true);
                var extendedUser = scope.user;
                extendedUser.set(scope.field, value); 
                UserService.saveExtUser(scope.user).then(function(user){
                    displaySpinner(false);
                    isEditing(false);
                    console.log('success!');
                }, function(error){
                    console.log('error!');
                    displaySpinner(false);
                    isEditing(false);
                });
            }
            var displaySpinner = function(isLoading){
                if(isLoading){
                    element.find("#overlay").addClass("tiny-loading");
                }else{
                    element.find("#overlay").removeClass("tiny-loading");
                }
            }
            var isEditing = function(isEditing){
                scope.isEditing = isEditing;
                if(isEditing){
                    element.find(".dropdown").addClass("dropdown-edit");
                }else{
                    element.find(".dropdown").removeClass("dropdown-edit");
                    scope.$apply();
                }
            }

        }
    };
});