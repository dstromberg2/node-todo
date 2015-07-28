angular.module('todo', []).controller('todoController', function todoController($scope, $http) {
  $scope.formData = {};
  $scope.checkStatus = {};

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

  $scope.updateItem = function(id, val) {
    $http.post('/api/item/update/' + id, {status: val}).success(function(data) {
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
});
