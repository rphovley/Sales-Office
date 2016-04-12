'use strict';
// public/js/controllers/EditProfileCtrl.js

angular.module('EditProfileCtrl', []).controller('EditProfileController', function($scope, $location) {
    Parse.initialize("test_id");
    Parse.serverURL = 'http://nextbigparseserver.azurewebsites.net/parse';
    var currentUser = Parse.User.current();
    console.log(currentUser.get("band_name"));
    
    $scope.updateProfileInfo = function(form) {
        if(form.$valid){
            //set the user's band information
            currentUser.set('band_name',    $scope.band_name);
            currentUser.set('home_city',    $scope.home_city);
            currentUser.set('record_label', $scope.record_label);
            currentUser.set('influences',   $scope.influences);
            currentUser.set('band_info',    $scope.band_info);
            
            //save the user information
            currentUser.save(null, {
                success: function(currentUser) {
                    console.log("Success!");
                    $location.url('/profile');
                },
                error: function(currentUser, error) {
                    $(".error").html("Couldn't update user...").show();
                }
            });
        }
        
        //$location.url('/profile');
    }
    
    $scope.cancelUpdate = function() {
        $location.url('/profile');
    }
    
});