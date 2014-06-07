//all angular code for our app 
// public/core.js
var fmiFe = angular.module('fmiFe', []);

function mainController($scope, $http) {
	$scope.formData = {};

	// when landing on the page, get all records and show them
	$http.get('/api/phones')
		.success(function(data) {
			$scope.phones = data;
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

	// when submitting the add form, send the text to the node API
	$scope.save = function() {
		$http.post('/api/phones', $scope.formData)
			.success(function(data) {

				$scope.formData = {}; // clear the form so our user is ready to enter another
				$scope.phones = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	// delete a record after checking it
	$scope.deleteRecord = function(id) {
		$http.delete('/api/phones/' + id)
			.success(function(data) {
				$scope.phones = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};
}