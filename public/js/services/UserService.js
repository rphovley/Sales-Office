'use strict';
angular.module('UserService', [])
.factory('UserService', function($cookies, User) {
	var user = {}

	function set(data) {
		user = data;
		$cookies.put('user_id', user.id);
	}
	function get() {
		return user;
	}

	return {
		set: set,
		get: get
	}

});