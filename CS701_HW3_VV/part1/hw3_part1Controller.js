angular.module("myApp", []).controller("CartControler", function ($scope) {
  //let defaultBooks = []; //Do NOT create global variables
  //Any function, including the window object, can overwrite your global variables and functions.
  var key = JSON.parse(localStorage.getItem("villagomez_cart"));
  if (key == "" || key == undefined) {
    //local variable
    let defaultBooks = [
      { title: "Absolute Java", qty: 1, price: 114.95 },
      { title: "Pro HTML5", qty: 2, price: 27.95 },
      { title: "Head First HTML5", qty: 1, price: 27.89 },
    ];
    $scope.defaultBooks = defaultBooks;
  } else {
    $scope.defaultBooks = key;
  }

  $scope.removeBook = function (index) {
    $scope.defaultBooks.splice(index, 1);
  };

  $scope.addBook = function () {
    $scope.defaultBooks.splice($scope.defaultBooks.length, 0, {
      title: "New Book",
      qty: 1,
      price: 10.99,
    });
  };

  $scope.saveBooks = function () {
    localStorage.setItem("villagomez_cart", JSON.stringify($scope.defaultBooks));
  };
  $scope.updateTotal = function () {
    $scope.$watch(function () {
      $scope.total = 0;
      angular.forEach($scope.defaultBooks, function (item) {
        $scope.total += item.qty * item.price;
      });
    });
  };
});
