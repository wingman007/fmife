//all angular code for our app 
// public/core.js
var fmiFe = angular.module('fmiFe', []);

function mainController($scope, $http) {
	$scope.formData = {};

	// when landing on the page, get all the phonebook and show them
	$http.get('/api/guestBook')
		.success(function(data) {
			$scope.guestBook = data;
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

	// when submitting the add form, send the text to the node API
	$scope.createGuest = function() {
		$http.post('/api/guestBook', $scope.formData)
			.success(function(data) {
				$scope.formData = {}; // clear the form so our user is ready to enter another
				$scope.guestBook = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	// delete a contact after checking it
	$scope.deleteGuest = function(id) {
		$http.delete('/api/guestBook/' + id)
			.success(function(data) {
				$scope.guestBook = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};
}