'use strict';
// public/js/services/MessageService.js
angular.module('PaymentsService', [])
.factory('PaymentsService', ['$http', function($http) {

    return {
            // call to get all messages
            get : function() {
                return $http.get('/client_token');
            },

            post : function(form){
                console.log("POST!");
                return $http.post('/checkout', form);
            }
        }      

}]);