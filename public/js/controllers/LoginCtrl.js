
'use strict';
// public/js/controllers/MainCtrl.js
angular.module('LoginCtrl', []).controller('LoginController', function($scope, $location, $window, User) {

	$scope.isLogin = true;
    $scope.username = "";
    $scope.password = "";
    //when the user presses the "Log in button"
    $scope.logIn = function(form) {
    	$("#overlay").addClass("currently-loading");
      	var username = $scope.username;
      	var password = $scope.password;
      	
		if(form.$valid){
			console.log("valid form");
			  Parse.User.logIn(username, password, {
			    success: function(user) {
			      //redirect to home page
			      console.log("logged in!");
			      $("#overlay").removeClass("currently-loading");
			      $window.location.reload();
			    },

			    error: function(user, error) {
			      $(".error").html("Invalid username or password. Please try again.").show();
			      $("#loginBtn").removeAttr("disabled");
			      $("#signupBtn").removeAttr("disabled");
			      $("#overlay").removeClass("currently-loading");
			    }
			  });
		}	
		$("#loginBtn").attr("disabled", "disabled");
		$("#signupBtn").attr("disabled", "disabled");
     
      return false;
    }

    //when a user clicks the register button
    $scope.signup = function(form) {
    $("#overlay").addClass("currently-loading");
      var username = $scope.username;
      var password = $scope.password;
      if(form.$valid){
	      Parse.User.signUp(username, password,
	       { //'fullName': 'Paul Hovley', //additional attributes go here
	       ACL: new Parse.ACL() }, 
	       {
	        success: function(user) {
	          //redirect to home page
	          var extendedUser = new User();
	          extendedUser.set(User.PARENT_ID, user.id);
	          extendedUser.save(null, {
	          	success: function(user){
	          		console.log("Success! Extended!");
	          	},
	          	error: function(user, error){
	          		console.log(error.message);
	          	}
	          });
		      
	          console.log("Success!");
	        },
	        error: function(user, error) {
	          $(".error").html('Someone with that username already exists').show();
	          $("#signupBtn").removeAttr("disabled");
	          $("#loginBtn").removeAttr("disabled");
	          $("#overlay").removeClass("currently-loading");
	        }
	      });
		}
		$("#loginBtn").attr("disabled", "disabled");
     	$("#signupBtn").attr("disabled", "disabled");

      return false;
    },

    //toggles between the login and the register form
    $scope.toggleForms = function(){
    	console.log("logged");
    	$scope.isLogin = !$scope.isLogin;
    	return false;
    }
});