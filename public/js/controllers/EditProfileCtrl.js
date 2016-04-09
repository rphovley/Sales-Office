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
            
//            //save the user information
//            currentUser.save();
//            
//            $location.url('/profile');
            
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
    }
});

//$scope.signup = function(form) {
//      var username = $scope.username;
//      var password = $scope.password;
//      console.log(form);
//      if(form.$valid){
//      	  console.log("it's valid");
//	      Parse.User.signUp(username, password,
//	       { 'fullName': 'Paul Hovley', //additional attributes go here
//	       ACL: new Parse.ACL() }, 
//	       {
//	        success: function(user) {
//	          //redirect to home page
//		      $window.location.reload();
//	          console.log("Success!");
//	        },
//
//	        error: function(user, error) {
//	          $(".error").html('Someone with that username already exists').show();
//	          $("#signupBtn").removeAttr("disabled");
//	        }
//	      });
//		}
//      $("#signupBtn").attr("disabled", "disabled");
//
//      return false;
//    }