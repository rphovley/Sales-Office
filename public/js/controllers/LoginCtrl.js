
'use strict';
// public/js/controllers/MainCtrl.js
angular.module('LoginCtrl', []).controller('LoginController', function($scope) {

	$scope.isLogin = true;
	console.log($scope.isLogin);
	Parse.initialize("test_id");
    Parse.serverURL = 'http://nextbigparseserver.azurewebsites.net:1337/parse';
    $scope.username = ""
    $scope.password = "";
    $scope.logIn = function(e) {
      var username = $("#login-username").val();
      var password = $("#login-password").val();
      
      Parse.User.logIn(username, password, {
        success: function(user) {
          //redirect to home page
        },

        error: function(user, error) {
          self.$(".login-form .error").html("Invalid username or password. Please try again.").show();
          self.$(".login-form button").removeAttr("disabled");
        }
      });

      this.$(".login-form button").attr("disabled", "disabled");

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
	          $(".error").html(_.escape('Someone with that username already exists')).show();
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