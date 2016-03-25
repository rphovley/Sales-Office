'use strict';
// public/js/controllers/NerdCtrl.js
/*var message = require('../../app/models/messages');*/

angular.module('MessagesCtrl', []).controller('MessagesController', function($scope, MessagesService) {
	$scope.parent = 'MESSAGE stuff';
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
    $scope.addMessage = function (form){
    	console.log(form);
    	if(form.$valid){
    		console.log($scope.message);
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
    /*$http.get('/api/messages')
	    .success(function(data){
	    	$scope.messages = data;
	    	console.log(data);
	    })
	    .error(function(data){
	    	console.log('Error: ' + data);
	    });

	$http.post('/api/todos', $scope.formData)
		.success(function(data){
			scope.formData = {};
			scope.messages = data;
			console.log(data);
		})
		.error(function(data){
	    	console.log('Error: ' + data);
	    });*/
});