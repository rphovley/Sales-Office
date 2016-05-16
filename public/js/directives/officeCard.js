'use strict';
angular.module('officeCard', []).directive("officeCard", function(OfficeService) {
    return {
        templateUrl: "/views/directives/office_card.html",
        scope: {
            officeProto : '=officeProto',
        },
        link: function(scope, element, attributes) {
            var OfficeUser = OfficeService.OfficeUser;
            var queryObject = new Parse.Query(scope.officeProto.CLASS_NAME);
            $("#overlay").addClass("currently-loading");
            var officeList = [];
            var managersList = [];
            queryObject.find({
                success: function(officeResults){
                    for (var i = 0; i < officeResults.length; i++){
                        officeList.push(officeResults[i]);
                        scope.$apply(function () {
                            scope.offices = officeList;
                            $("#overlay").removeClass("currently-loading");
                        });
                        

                    }
                    
                },
                error: function(results, error){
                    console.log("error");
                    $("#overlay").removeClass("currently-loading");
                }
            });
            scope.editOfficeDir = function(office){
                OfficeService.set(office);
                OfficeService.setIsAdd(false);
            }
        }
    };
});