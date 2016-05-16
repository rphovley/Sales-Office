'use strict';
// public/js/controllers/OfficeCtrl.js

angular.module('OfficeCtrl', []).controller('OfficeController', function($scope, $location,$window, currentParseUser, OfficeService) {
    /*declare scope variables*/
    var Office = OfficeService.Office;
    var office = OfficeService.get();
    if(!OfficeService.isAdd() && office){
    	setScope(office);
    }
    $scope.updateOffice = function(form){
    	console.log("update office: "+ office);
    	$("#overlay").addClass("currently-loading");
    	if(form.$valid){
    		if(OfficeService.isAdd()){
	    		var office = new Office();
	    		console.log("IS ADD");
	    	}else{
	    		office = OfficeService.get();
	    	}

    		office.set(Office.NAME, $scope.name);
    		office.set(Office.CITY, $scope.city);
    		office.set(Office.STATE, $scope.state);
    		office.save(null, {
    			success: function(office){
    				console.log(office.get(Office.NAME) + " Saved");
    				$("#overlay").removeClass("currently-loading");
    			},
    			error: function(){
    				console.log("error");
    				$("#overlay").removeClass("currently-loading");
    			}
    		})
    	}
    }

    function setScope(office){
    	$scope.name  = office.get(Office.NAME);
    	$scope.city  = office.get(Office.CITY);
    	$scope.state = office.get(Office.STATE);
    	$('#name_lbl').addClass('active');
    	$('#state_lbl').addClass('active');
    	$('#city_lbl').addClass('active');
    }


    
    $scope.Office = Office;
	$scope.states = Office.STATES;

	$scope.addOffice = function(isAddVal){
		OfficeService.setIsAdd(isAddVal);
	}
});