'use strict';
// public/js/services/MessageService.js
angular.module('MessagesService', [])
.factory('MessagesService', ['$http', function($http) {

    return {
        // call to get all messages
        get : function() {
            return $http.get('/api/messages');
        },


        // these will work when more API routes are defined on the Node side of things
        // call to POST and create a new message
        create : function(messageData) {
            return $http.post('/api/messages', messageData);
        },

        // call to DELETE a message
        delete : function(id) {
            return $http.delete('/api/messages/' + id);
        }
    }       

}]);