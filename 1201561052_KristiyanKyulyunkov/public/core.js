//all angular code for our app 
// public/core.js
var fmiFe = angular.module('fmiFe', []);

function phonebookController($scope, $http) {
	$scope.formData = {};

	// when landing on the page, get all phonebooks and show them
	$http.get('/api/phonebooks')
		.success(function(data) {
			$scope.phonebooks = data;
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

	// when submitting the add form, send the text to the node API
	$scope.createPhonebook = function() {
		$http.post('/api/phonebooks', $scope.formData)
			.success(function(data) {
				$scope.formData = {}; // clear the form so our user is ready to enter another
				$scope.phonebooks = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	// delete a phonebook after checking it
	$scope.deletePhonebook = function(id) {
		$http.delete('/api/phonebooks/' + _id)
			.success(function(data) {
				$scope.phonebooks = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};
}