'use strict';
// public/js/controllers/UserCtrl.js

angular.module('UserManagementCtrl', []).controller('UserManagementController', function($scope, $window, $cookies, User, UserService) {
	var user = UserService.get();
	function setScope(scope_user){
		user = scope_user;
    	$scope.first_name = scope_user.get(User.FIRST_NAME);
		$scope.last_name  = scope_user.get(User.LAST_NAME);
		$scope.role       = scope_user.get(User.CORPORATE_ROLE);

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
    }
	if(!user.id && $cookies.get('user_id')){
		var query = new Parse.Query(Parse.User);
		query.get($cookies.get('user_id'), {
		  success: function(queriedUser) {
		  	$scope.$apply(function(){
		  		setScope(queriedUser);
		  	});
		  }
		});
	}
	if(user.id){
		setScope(user);
	}
	

	$scope.updateUser = function(form){
		/*Save profile*/
        if(form.$valid){
            $("#overlay").addClass("currently-loading");
            user.set(User.FIRST_NAME,    $scope.first_name);
            user.set(User.LAST_NAME,    $scope.last_name);
            console.log(user);
            //save the user information
            user.save(null, {
                success: function(user) {
                    console.log("Success!");
                    $window.location.href= '/users';
                    $("#overlay").removeClass("currently-loading");
                },
                error: function(user, error) {
                    $(".error").html("Couldn't update user...").show();
                    $("#overlay").removeClass("currently-loading");
                }
            });
        }
	}


});