
'use strict';
// public/js/controllers/MainCtrl.js
angular.module('LoginCtrl', []).controller('LoginController', function($scope, $location, $window, UserService) {
	var ExtendedUser = UserService.ExtendedUser
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
					$("#overlay").removeClass("currently-loading");
					var query = new Parse.Query(ExtendedUser.CLASS_NAME);
					query.equalTo(ExtendedUser.PARSE_USER, user);
					query.find({
						success: function(queriedUser) {
							UserService.setCurrentExtUser(queriedUser[0]);
							$window.location.reload();
					}
					});
			      
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
/*    $scope.signup = function(form) {
    $("#overlay").addClass("currently-loading");
      var username = $scope.username;
      var password = $scope.password;

      if(form.$valid){
	      Parse.User.signUp(username, password,
	       { 'email': $scope.email, //additional attributes go here
	       ACL: new Parse.ACL() }, 
	       {
	        success: function(user) {
	          //redirect to home page
	          var extendedUser = new ExtendedUser();
	          extendedUser.set(ExtendedUser.PARSE_USER, user);
	          extendedUser.save(null, {
	          	success: function(user){
	          		console.log("Success! Extended!");
	          		UserService.setCurrentExtUser(user);
	          		$window.location.reload();
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
    },*/

    //toggles between the login and the register form
/*    $scope.toggleForms = function(){
    	console.log("logged");
    	$scope.isLogin = !$scope.isLogin;
    	return false;
    }*/
});