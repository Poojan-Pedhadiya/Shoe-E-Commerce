let ctrl = angular.module("ctrl", []);
ctrl
  .controller("homeCtrl", function ($scope, $rootScope) {
    $scope.about = $rootScope.homeData.about;
  })
  .controller("categoriesCtrl", function ($scope, $rootScope) {
    $scope.orderByField = "title";
    $scope.reverseOrder = false;
    $scope.customOrderBy = (field) => {
      $scope.orderByField = field;
      $scope.reverseOrder = !$scope.reverseOrder;
    };
    $scope.searchType = "title";
    $scope.searchText = "";
    $scope.newCategory = {};
    $scope.addNewCategory = () => {
      $scope.newCategory.id =
        Math.max.apply(
          Math,
          $rootScope.categories.map(function (category) {
            return category.id;
          })
        ) + 1;
      $rootScope.categories.push($scope.newCategory);
      $scope.newCategory = {};
    };
    $scope.selectedCategory = {};
    $scope.selectCategory = (id) => {
      let category = $rootScope.categories.find((category) => {
        return category.id == id;
      });
      $scope.selectedCategory.id = category.id;
      $scope.selectedCategory.title = category.title;
      $scope.selectedCategory.createdOn = category.createdOn;
    };
    $scope.updateCategory = () => {
      let index = $rootScope.categories.findIndex((category) => {
        return category.id == $scope.selectedCategory.id;
      });
      $rootScope.categories.splice(index, 1, $scope.selectedCategory);
      $scope.selectedCategory = {};
    };
    $scope.deleteCategory = () => {
      let index = $rootScope.categories.findIndex((category) => {
        return category.id == $scope.selectedCategory.id;
      });
      $rootScope.categories.splice(index, 1);
      $scope.selectedCategory = {};
    };
  })
  .controller("shoeCtrl", function ($scope, $rootScope) {
    $scope.searchType = "title";
    $scope.searchText = "";
    $scope.selectedshoe = {};
    $scope.selectShoe = (id) => {
      let shoe = $rootScope.shoes.find((shoe) => {
        return shoe.id == id;
      });
      $scope.selectedshoe.id = shoe.id;
      $scope.selectedshoe.title = shoe.title;
    };
    $scope.deleteShoe = () => {
      let index = $rootScope.shoes.findIndex((shoe) => {
        return shoe.id == $scope.selectedshoe.id;
      });
      $rootScope.shoes.splice(index, 1);
      $scope.selectedshoe = {};
    };
  })
  .controller(
    "shoeDetailCtrl",
    function ($scope, $rootScope, $routeParams, $http, $location) {
      $scope.shoeId = $routeParams.id;
    }
  )
  .controller("shoeAddCtrl", function ($scope, $rootScope, $location) {
    if (!$rootScope.shoes) {
      $rootScope.shoes = [];
    }
    var newshoeId = $rootScope.shoes.length + 1;
    $scope.addShoe = function () {
      var newshoe = {
        id: newshoeId,
        title: $scope.title,
        brand: $scope.brand,
        category: $scope.category,
        price: $scope.price,
        image: $scope.featuredImage,
      };
      $rootScope.shoes.push(newshoe);
      $location.path("/shoes");
    };
    $scope.submitForm = function () {
      $scope.addShoe();
    };
    $scope.updateButton = function() {
      $scope.selectedCategory = $scope.category;
  };
  })
  .controller("shoeEditCtrl", function ($scope, $rootScope, $routeParams , $location) {
    $scope.shoeId = $routeParams.id;
    $scope.updateShoe = function () {
        $rootScope.shoes[index] = {
            id: $scope.shoeId,
            title: $rootScope.shoes[index].title,
            brand: $rootScope.shoes[index].brand,
            category: $rootScope.shoes[index].category,
            price: $rootScope.shoes[index].price,
            image: $rootScope.shoes[index].image
        };
        $location.path('#!/shoes');
    };
    $scope.submitForm = function () {
        $scope.updateShoe();
    };
});

