let app = angular.module("app", [
  "ctrl",
  "filters",
  "ngRoute",
  "ngSanitize",
  "ngQuill",
]);
app.config([
  "$routeProvider",
  "ngQuillConfigProvider",
  function ($routeProvider, ngQuillConfigProvider) {
    ngQuillConfigProvider.set();
    $routeProvider
      .when("/", {
        templateUrl: "./views/home.html",
        controller: "homeCtrl",
      })
      .when("/categories", {
        templateUrl: "./views/categories.html",
        controller: "categoriesCtrl",
      })
      .when("/shoes", {
        templateUrl: "./views/shoes.html",
        controller: "shoeCtrl",
      })
      .when("/shoes/new", {
        templateUrl: "./views/shoe-new.html",
        controller: "shoeAddCtrl",
      })
      .when("/shoes/details/:id", {
        templateUrl: "./views/shoe-details.html",
        controller: "shoeDetailCtrl",
      })
      .when("/shoes/edit/:id", {
        templateUrl: "./views/shoe-edit.html",
        controller: "shoeEditCtrl",
      })
      .otherwise({ templateUrl: "./views/404.html" });
  },
]);
app.run(function ($rootScope, $http, $location) {
  $http.get("json/home.json").then(function (res) {
    $rootScope.homeData = res.data;
  });
  $http.get("json/categories.json").then(function (res) {
    $rootScope.categories = res.data;
  });
  $http.get("json/shoes.json").then(function (res) {
    $rootScope.shoes = res.data;
  });
  $rootScope.$on("$locationChangeSuccess", function () {
    console.log($location.path());
    $rootScope.page = $location.path();
  });
});