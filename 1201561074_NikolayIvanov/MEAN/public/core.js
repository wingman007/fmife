//all angular code for our app 
// public/core.js
var fmiFe = angular.module('fmiFe', []);

function mainController($scope, $http) {
	$scope.formData = {};

	// when landing on the page, get all the phonebook and show them
	$http.get('/api/addressBook')
		.success(function(data) {
			$scope.addressBook = data;
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

	// when submitting the add form, send the text to the node API
	$scope.createAddress = function() {
		$http.post('/api/addressBook', $scope.formData)
			.success(function(data) {
				$scope.formData = {}; // clear the form so our user is ready to enter another
				$scope.addressBook = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	// delete a contact after checking it
	$scope.deleteAddress = function(id) {
		$http.delete('/api/addressBook/' + id)
			.success(function(data) {
				$scope.addressBook = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};
}