//all angular code for our app 
// public/core.js
var fmiFe = angular.module('fmiFe', []);

function mainController($scope, $http) {
	$scope.formData = {};

	// when landing on the page, get all the phonebook and show them
	$http.get('/api/phonebook')
		.success(function(data) {
			$scope.phonebook = data;
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

	// when submitting the add form, send the text to the node API
	$scope.createContact = function() {
		$http.post('/api/phonebook', $scope.formData)
			.success(function(data) {
				$scope.formData = {}; // clear the form so our user is ready to enter another
				$scope.phonebook = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	// delete a contact after checking it
	$scope.deleteContact = function(id) {
		$http.delete('/api/phonebook/' + id)
			.success(function(data) {
				$scope.phonebook = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};
}