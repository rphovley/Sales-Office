'use strict';
angular.module('officeManagers', []).directive("officeManagers", function(OfficeService) {
    return {
        templateUrl: 'views/directives/office_managers.html',
        scope: {
            office : '=office',
        },
        link: function(scope, element, attributes) {
            var OfficeUser = OfficeService.OfficeUser;
            var managersList = [];
            var regionalsList = [];
            var divisionalsList = [];
            OfficeService.getOfficeManagers(scope.office).then(function(queriedUsers){ //get any upline reps for this office
                for(var y = 0; y < queriedUsers.length; y++){ //iterate over each upline rep
                    var userType = queriedUsers[y].get(OfficeUser.TYPE); //get the upline reps upline type
                    (function(userType){
                        queriedUsers[y].get(OfficeUser.USER).fetch({//get the upline rep user object
                            success: function(queriedUser){
                                console.log("USER: "+queriedUser.getFullName());
                                console.log(userType);
                                if(userType=== 'Manager'){
                                    managersList.push(queriedUser);
                                }else if(userType === 'Regional'){
                                    regionalsList.push(queriedUser);
                                }else if(userType === 'Divisional'){
                                    divisionalsList.push(queriedUser);
                                }
                                scope.$apply();
                            }
                        });
                         
                    })(userType);;
                }
                scope.divisionals = divisionalsList;
                scope.regionals = regionalsList;
                scope.managers = managersList;
                console.log("managers list size " + scope.managers.length);
                
            }, function(queriedUsers, error){
                console.log("error");
            });
        }
    };
});