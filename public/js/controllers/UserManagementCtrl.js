'use strict';
// public/js/controllers/UserCtrl.js

angular.module('UserManagementCtrl', []).controller('UserManagementController', function($scope, $window, $cookies, ExtendedUser, UserService) {
	var extended_user = {};
	
	var currentExtUser = {};
	console.log("Success");
	UserService.getCurrentExtUser().then(function(queriedUser){
		console.log("Success");
		currentExtUser = queriedUser;
		console.log(queriedUser.isAdmin());
  		if(queriedUser.isAdmin()){
	    	$('#role').prop('disabled', false);
		}
	});

	if($cookies.get(UserService.IS_ADD_COOKIE_TAG)){
		extended_user = new ExtendedUser();
	}else{
		editUser();
	}
	function setEditScope(extended_user){
		
    	$scope.first_name = extended_user.get(ExtendedUser.FIRST_NAME);
		$scope.last_name  = extended_user.get(ExtendedUser.LAST_NAME);
		$scope.role       = extended_user.get(ExtendedUser.CORPORATE_ROLE);
		$scope.roles      = ExtendedUser.CORPORATE_ROLES;
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


    function editUser(){
	    /*Sometimes we need to get the user from cookie (for example on a page refresh the 
	    UserService will not hold the user information past the refresh)*/
		/*Get the current extendedUser object.  Sometimes we need to get the user from the cookie*/
		UserService.get().then(function(queriedUser){
			extended_user = queriedUser;
			$scope.$apply(function(){
				setEditScope(extended_user);
			});
		});
		
		
	}
	
	$scope.updateUser = function(form){
		/*Save profile*/
        editExtUser(form);
	}

	function editExtUser(form){
		if(form.$valid){
            $("#overlay").addClass("currently-loading");
            extended_user = setUserFromScope(extended_user);
            //save the user information
            UserService.saveExtUser(extended_user).then(function(user){
            	$window.location.href= '/users';
                $("#overlay").removeClass("currently-loading");
            }, function(error){
            	$(".error").html("Couldn't update user...").show();
                    $("#overlay").removeClass("currently-loading");
            });
        }
	}
	function addUser(form){

	}

	function setUserFromScope(extended_user){
		extended_user.set(ExtendedUser.FIRST_NAME,    $scope.first_name);
        extended_user.set(ExtendedUser.LAST_NAME,    $scope.last_name);
        extended_user.set(ExtendedUser.CORPORATE_ROLE, $scope.role);
        return extended_user;
	}


});