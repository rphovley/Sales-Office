'use strict';
angular.module('UserService', [])
.factory('UserService', function($cookies) {
	var USER_COOKIE_TAG = 'user_id';
	var EXT_USER_COOKIE_TAG = 'current_user_id';
	var IS_ADD_EDIT_TAG = 'is_add_edit';
	var IS_ADD     = '1';
	var IS_EDIT    = '2';
	var IS_PROFILE = '3';
	var currentUser = {};

	var ExtendedUser = new Parse.Object.extend("ExtendedUser", {
	//Instance methods
		getFullName : function(){
			return this.get("first_name") + " " + this.get("last_name");
		},
		isAdmin : function(){
			console.log("CORPORATE ROLE: " + this.get(ExtendedUser.CORPORATE_ROLE));
			console.log(this.get(ExtendedUser.CORPORATE_ROLE) === 'Admin');
			return this.get(ExtendedUser.CORPORATE_ROLE) === 'Admin';
		},
		
	}, {CLASS_NAME     : "ExtendedUser",
		USERNAME       : "username",
		PASSWORD       : "password",
		EMAIL          : "email",
		_ID            : "id",
		FIRST_NAME     : "first_name",
		LAST_NAME      : "last_name",
		CORPORATE_ROLE : "corporate_role",
		CORPORATE_ROLES: ['Admin', 'Manager','Sales Rep'],
		MANAGED_OFFICES: "managed_offices",
		OFFICE         : 'office',
		PARSE_USER     : "parent",
		getSelector : function(fieldName){
			return "#" + fieldName;
		}});

	function set(user) {
		$cookies.put(USER_COOKIE_TAG, user.id);
	}
	/**
	*Returns the user promise for the query
	* if a user is passed, it will find the extended user from its parse user relationship,
	* otherwise it will get it from the object id
	*/
	function get(user) {
		var query = new Parse.Query(ExtendedUser.CLASS_NAME);
		if(user){
			query.equalTo(ExtendedUser.PARSE_USER, user);
			return query.find();
		}else{
			return query.get($cookies.get(USER_COOKIE_TAG));
		}
	}
	/**
	* sets the add or edit tag for whether or not the
	* user page is editing a profile, editing a user, or adding a user
	*/
	function setAddEdit(data){
		$cookies.put(IS_ADD_EDIT_TAG, data);
	}
	function isAddEdit(){
		return $cookies.get(IS_ADD_EDIT_TAG);
	}
	function setCurrentExtUser(currentUser){
		console.log(currentUser);
		$cookies.put(EXT_USER_COOKIE_TAG, currentUser.id);
	}
	function getCurrentExtUser(){
		var query = new Parse.Query(ExtendedUser.CLASS_NAME);
		return query.get($cookies.get(EXT_USER_COOKIE_TAG));
	}
	function saveExtUser(user){
		$("#overlay").addClass("currently-loading");
            //save the user information
            return user.save(null);
	}

	return {
		/*TAGS to access cookies*/
		USER_COOKIE_TAG     : USER_COOKIE_TAG,
		EXT_USER_COOKIE_TAG : EXT_USER_COOKIE_TAG,
		IS_ADD_EDIT_TAG     : IS_ADD_EDIT_TAG,
		IS_PROFILE : IS_PROFILE,
		IS_ADD     : IS_ADD,
		IS_EDIT    : IS_EDIT,
		/*Functions*/
		ExtendedUser : ExtendedUser,
		set: set,
		get: get,
		setAddEdit: setAddEdit,
		isAddEdit: isAddEdit,
		setCurrentExtUser: setCurrentExtUser,
		getCurrentExtUser: getCurrentExtUser,
		saveExtUser: saveExtUser
	}

});