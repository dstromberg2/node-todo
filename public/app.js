var todo = angular.module('todo', []);

function mainController($scope, $http) {
  $scope.formData = {};

  $http.get('/api/item/list').success(function(data) {
    $scope.items = data;
  }).error(function(err) {
    console.log(err);
  });

  $scope.createItem = function() {
    $http.post('/api/item/create', $scope.formData).success(function(data) {
      $scope.formData = {};
	  $scope.items = data;
	}).error(function(err) {
	  console.log(err);
	});
  };

  $scope.updateItem = function(id) {
    $http.post('/api/item/update/' + id).success(function(data) {
      $scope.items = data;
    }).error(function(err) {
      console.log(err);
    });
  };

  $scope.deleteItem = function(id) {
    $http.post('/api/item/delete/' + id).success(function(data) {
      $scope.items = data;
	}).error(function(err) {
      console.log(err);
	});
  };

}
