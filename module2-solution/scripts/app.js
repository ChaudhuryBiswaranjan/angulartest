(function () {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .provider('ShoppingListCheckOffService', ShoppingListCheckOffServiceProvider)
        .config(Config);

    //Following snippet is just the implementation of service configuration. In this case, restricting the number of items that can be bought. 
    //Since there is no requirement of this restriction in this assignment , have set it to the value "5" as we have 5 items pre-populated
    //So this configuration won't matter in this excercise
    
    Config.$inject = ['ShoppingListCheckOffServiceProvider'];
    function Config(ShoppingListCheckOffServiceProvider) {
        ShoppingListCheckOffServiceProvider.defaults.maxItems = 5;
    }


    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
        var toBuyCtrl = this;

        toBuyCtrl.buyItemList = ShoppingListCheckOffService.getBuyItemList();

        //toBuyItem.itemName = "";
        //toBuyItem.itemQuantity = "";

        toBuyCtrl.buyItem = function (index) {
            try {
                ShoppingListCheckOffService.buyItem(index);
            } catch (error) {
                toBuyCtrl.errorMessage = error.message;
            }
        };


    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var boughtItemCtrl = this;

        boughtItemCtrl.items = ShoppingListCheckOffService.getBoughtItemList();

    }



    // If not specified, maxItems assumed unlimited
    function ShoppingListCheckOffService(maxItems) {
        var service = this;


        // List of items to buy
        var toBuyItems = [
            { name: "cookies", quantity: 5 },
            { name: "chocolates", quantity: 15 },
            { name: "colddrinks", quantity: 10 },
            { name: "toys", quantity: 10 },
            { name: "beers", quantity: 20 }

        ];


        //List of items already bought
        var boughtItems = [];

        //following check for maxItems is not required for this assignment, but will be valid if we restrict the number of items that can be bought.
        //Please ignore this maxItems check while reviewing the solution
        service.buyItem = function (index) {
            if ((maxItems === undefined) ||
                (maxItems !== undefined) && (boughtItems.length < maxItems)) {
               boughtItems.push(toBuyItems[index]);
               toBuyItems.splice(index,1);
            }
            else {
                throw new Error("You can't buy more than" + maxItems + " items.");
            };
        }
        service.getBuyItemList = function () {
            return toBuyItems;
        };
        service.getBoughtItemList = function () {
            return boughtItems;
        };





    }

    function ShoppingListCheckOffServiceProvider() {
        var provider = this;

        provider.defaults = {
            maxItems: 5
        };

        provider.$get = function () {
            var shoppingListCheckOffService = new ShoppingListCheckOffService(provider.defaults.maxItems);

            return shoppingListCheckOffService;
        };
    }
})();