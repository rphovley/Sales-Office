'use strict';
// public/js/controllers/MessagesCtrl.js

angular.module('MessagesCtrl', []).controller('MessagesController', function($scope, MessagesService) {
	//$scope.parent = 'MESSAGE stuff';  This is an example of inheritance from the main controller

	Parse.initialize("test_id");
    Parse.serverURL = 'http://nextbigparseserver.azurewebsites.net/parse';
    var currentUser = Parse.User.current();
    //get list of messages
    MessagesService.get()
    	.success(function(data){
			console.log('success!');
			console.log(data);
			$scope.messages = data;
		})
		.error(function(data){
			console.log('Error: ' + data);
		});
    $scope.message;
    
    //add message to list of messages
    $scope.addMessage = function (form){
    	if(form.$valid){
    		console.log($scope.message);
    		$scope.message.from = currentUser.get("username");
    		MessagesService.create($scope.message)
    			.success(function(data){
    				$scope.messages = data;
					console.log('success!');
    			})
    			.error(function(data){
	    			console.log('Error: ' + data);
	    	});
    	}
    }
    //remove message from list of messages
    $scope.deleteMessage = function(_id){
    	console.log("delete: " + _id);
    	MessagesService.delete(_id)
			.success(function(data){
				$scope.messages = data;
				console.log('success!');
			})
			.error(function(data){
    			console.log('Error: ' + data);
    		});
    }
});