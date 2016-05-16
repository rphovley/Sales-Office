'use strict';
angular.module('OfficeService', [])
.factory('OfficeService', function($cookies, UserService) {
	var ExtendedUser = UserService.ExtendedUser
	var Office = new Parse.Object.extend("Office", {
	}, {CLASS_NAME : "Office",
		_ID        : "id",
		NAME       : "name",
		CITY       : "city",
		STATE      : "state",
		STATES     : ["AL","AK","AS","AZ","AR","CA","CO","CT","DE","DC","FM","FL","GA","GU","HI","ID",
					"IL","IN","IA","KS","KY","LA","ME","MH","MD","MA","MI","MN","MS","MO","MT","NE","NV",
					"NH","NJ","NM","NY","NC","ND","MP","OH","OK","OR","PW","PA","PR","RI","SC","SD","TN","TX",
					"UT","VT","VI","VA","WA","WV","WI","WY"]
	});

	var OfficeUser = new Parse.Object.extend("OfficeUser", {
	}, {CLASS_NAME : "OfficeUser",
		_ID        : "id",
		USER       : "user",
		OFFICE     : "office",
		RATE       : "rate",
		TYPE       : "type",
		TYPES      : ['Manager', 'Regional', 'Divisional'],
	});

	var office = null;
	var isAddVal = false;
	function set(data){
		office = data;
	}
	function get(){
		return office;
	}
	function getAll(){
		var query = new Parse.Query(Office.CLASS_NAME);
		return query.find();
	}
	function getManagedOffices(user){
		var query = new Parse.Query(OfficeUser.CLASS_NAME);
		query.equalTo(OfficeUser.USER, user);
		return query.find();
	}
	function getOfficeManagers(office){
		var query = new Parse.Query(OfficeUser.CLASS_NAME);
		query.equalTo(OfficeUser.OFFICE, office);
		return query.find();
	}
	function setIsAdd(data){
		isAddVal = data
	}
	function isAdd(){
		return isAddVal;
	}

	return{
		Office : Office,
		OfficeUser : OfficeUser,
		set : set,
		get : get,
		getAll: getAll,
		getManagedOffices : getManagedOffices,
		getOfficeManagers : getOfficeManagers,
		isAdd : isAdd,
		setIsAdd : setIsAdd
	}
});