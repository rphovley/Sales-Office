
'use strict';
// public/js/controllers/MainCtrl.js
angular.module('LoginCtrl', []).controller('LoginController', function($scope, $location, $window) {

	$scope.isLogin = true;
	console.log($scope.isLogin);
	Parse.initialize("test_id");
    Parse.serverURL = 'http://nextbigparseserver.azurewebsites.net/parse';
    $scope.username = ""
    $scope.password = "";
    $scope.logIn = function(form) {
      	var username = $scope.username;
      	var password = $scope.password;
      	
      	console.log("login clicked");
		if(form.$valid){
			console.log("valid form");
			  Parse.User.logIn(username, password, {
			    success: function(user) {
			      //redirect to home page
			      console.log("logged in!");
			      $location.path('index');
			      $window.location.reload();
			    },

			    error: function(user, error) {
			      $(".error").html("Invalid username or password. Please try again.").show();
			      $("#loginBtn").removeAttr("disabled");
			    }
			  });
		}	
		$("#loginBtn").attr("disabled", "disabled");
     
      return false;
    }

    $scope.signup = function(form) {
      var username = $scope.username;
      var password = $scope.password;
      console.log(form);
      if(form.$valid){
      	  console.log("it's valid");
	      Parse.User.signUp(username, password, { ACL: new Parse.ACL() }, {
	        success: function(user) {
	          //redirect to home page
	          console.log("Success!");
	        },

	        error: function(user, error) {
	          $(".error").html('Someone with that username already exists').show();
	          $("#signupBtn").removeAttr("disabled");
	        }
	      });
		}
      $("#signupBtn").attr("disabled", "disabled");

      return false;
    },

    $scope.toggleForms = function(){
    	console.log("logged");
    	$scope.isLogin = !$scope.isLogin;
    	return false;
    }

	console.log($scope.isLogin);
	console.log($scope.LogInView);
});