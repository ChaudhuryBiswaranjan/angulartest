(function () {
  'use strict';

  angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
    .directive('foundItems', FoundItemsDirective);


  function FoundItemsDirective() {
    var ddo = {
      templateUrl: 'foundItems.html',
      scope: {
        items: '<',
        title: '@title',
        onRemove: '&'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'list',
      bindToController: true
    };

    return ddo;
  }


  function FoundItemsDirectiveController() {
    var list = this;

    list.checkIfNoData = function () {
      if (list.items.length === 0) {
        return true;
      } else {
        return false;
      }



    };
  }


  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var list = this;
    list.title = "Menu Item Search Result:";
    list.foundItems = [];
    list.itemDescription = "";
    list.getMatchedMenuItems = function () {
      list.foundItems = [];
      list.title = "Menu Item Search Result:" + " (" + list.foundItems.length + " items )";
      if (list.itemDescription != "") {
        var promise = MenuSearchService.getMatchedMenuItems(list.itemDescription);
        promise.then(function (response) {
          list.foundItems = response;
          list.title = "Menu Item Search Result:" + " (" + list.foundItems.length + " items )";
        })
      }






    }
    list.removeItem = function (itemIndex) {

      list.foundItems.splice(itemIndex, 1);
      list.title = "Menu Item Search Result:" + " (" + list.foundItems.length + " items )";
    };




  }


  MenuSearchService.$inject = ['$http', 'ApiBasePath'];
  function MenuSearchService($http, ApiBasePath) {
    var service = this;

    service.getMatchedMenuItems = function (searchTerm) {
      var promise = $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json")
      });
      return promise.then(function (response) {
        var foundItems = [];
        var items = response.data.menu_items;
        items.forEach(function (entry) {
          if (entry.description.search(searchTerm) !== -1) {
            foundItems.push(entry);
          }
        });
        return foundItems;

      })




    };




  }

})();
