'use strict';
// public/js/controllers/ProfileCtrl.js

angular.module('ProfileCtrl', []).controller('ProfileController', function($scope, $location, currentUser, User) {
    /*declare scope variables*/
    $scope.first_name = currentUser.get(User.FIRST_NAME);
    $scope.last_name = currentUser.get(User.LAST_NAME);
    $scope.role = currentUser.get(User.CORPORATE_ROLE);

    /*add active class if there is a value for the input fields*/
    if($scope.first_name){
        $('#first_name_lbl').addClass('active');
    }
    if($scope.last_name){
        $('#last_name_lbl').addClass('active');
    }
    if($scope.role){
        $('#role_lbl').addClass('active');
    }

    /*Save profile*/
    $scope.updateProfileInfo = function(form) {
        if(form.$valid){
            //set the user's band information
            $("#overlay").addClass("currently-loading");
            currentUser.set(User.FIRST_NAME,    $scope.first_name);
            currentUser.set(User.LAST_NAME,    $scope.last_name);
            
            //save the user information
            currentUser.save(null, {
                success: function(currentUser) {
                    console.log("Success!");
                    $location.url('/profile');
                    $("#overlay").removeClass("currently-loading");
                },
                error: function(currentUser, error) {
                    $(".error").html("Couldn't update user...").show();
                    $("#overlay").removeClass("currently-loading");
                }
            });
        }

    }
    
});