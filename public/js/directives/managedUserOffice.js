'use strict';
angular.module('managedUserOffice', []).directive("managedUserOffice", function(OfficeService,$window, $compile) {
    return {
        templateUrl: "/views/directives/managed_office.html",
        scope: {
            isAdd : "=isAdd",
            user  : "=user",
            managedOffice : "=managedOffice"
        },
        link: function(scope, element, attributes) {
            var OfficeUser = OfficeService.OfficeUser;
            scope.offices = []; 
            scope.managed_types = OfficeUser.TYPES;
            OfficeService.getAll().then(function(queriedOffices){
                scope.$apply(function(){
                    scope.offices = queriedOffices;
                });

            }, function(queriedOffices, errer){
                console.log("ERROR");
            }); 

            if(!scope.isAdd){ //if we are loading edit input elements
                scope.new_rate   = scope.managedOffice.get(OfficeUser.RATE);
                scope.new_type   = scope.managedOffice.get(OfficeUser.TYPE);
                scope.new_office = scope.managedOffice.get(OfficeUser.OFFICE);
            }
            scope.addOffice = function(form){
                if(form.$valid){
                    var officeUser = new OfficeUser();
                    saveOfficeUser(officeUser);
                }
            }
            scope.editOffice = function(form){
                if(form.$valid){
                    var officeUser = scope.managedOffice;
                    saveOfficeUser(officeUser);
                }
            }
            scope.deleteOffice = function(){
                console.log("destroy");
                scope.managedOffice.destroy({
                    success: function(managedOffice){
                        notification('Office deleted', 'text-danger');
                        $window.location.reload();
                    },
                    error : function(managedOffice, error){
                        notification('Error deleting office', 'text-danger');
                    }
                })
            }

            function saveOfficeUser(officeUser){
                officeUser.set(OfficeUser.OFFICE, scope.new_office);
                officeUser.set(OfficeUser.USER, scope.user);
                officeUser.set(OfficeUser.RATE, scope.new_rate);
                officeUser.set(OfficeUser.TYPE, scope.new_type);
                notification('Saving, please wait...', 'text-info');
                officeUser.save(null, {
                    success : function(officeUser){
                        notification('User saved!', 'text-success');
                        $window.location.reload();
                    },
                    error : function(officeUser, error){
                        notification('Error saving office', 'text-danger');
                        console.log("ERROR");
                    }
                });
            }
            function notification(message, type){
                var notification = element.find('span');
                notification.html(message)
                notification.removeClass();
                notification.addClass(type);
                $compile(notification)(scope);
           }
        }
    };
});