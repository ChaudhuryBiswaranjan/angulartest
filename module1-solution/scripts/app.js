(function () {
    'use strict';
    
    angular.module('LunchCheck', [])
    .controller('LunchCheckController', LunchCheckController);
    LunchCheckController.$inject = ['$scope'];
    function LunchCheckController($scope){
        var enjoyMessage="Enjoy!";
        var tooMuchMessage="Too much!";
        var invalidInputMessage="Please enter data first";

        $scope.inputTextBordercolor="green";
        
        
        $scope.message = "";
        $scope.itemListInput="";
        $scope.checkIfTooMuch = function () {
            $scope.inputTextBordercolor="green";
            var itemArray = $scope.itemListInput.split(',');
            itemArray=itemArray.filter(item => item.length > 0);
            if(itemArray.length === 0 || $scope.itemListInput === ""){
                $scope.message = invalidInputMessage;
                $scope.inputTextBordercolor="red";
            }else if(itemArray.length <= 3){
                $scope.message = enjoyMessage;
            }else {
                $scope.message = tooMuchMessage;
            }
        };
        $scope.resetMessage = function() {
            $scope.inputTextBordercolor="green";
            $scope.message="";
        };

    }
    
    })();
    