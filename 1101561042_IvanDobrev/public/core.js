//all angular code for our app 
// public/core.js
var fmiFe = angular.module('fmiFe', []);

function mainController($scope, $http) {
	$scope.formData = {};

	$scope.table = function (){
		return 'hello';
	}
	
	// when landing on the page, get all todos and show them
	$http.get('/api/phoneBook')
		.success(function(data) {
			$scope.entries = data;
			console.log("i am here");
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

	// when submitting the add form, send the text to the node API
	$scope.createEntry = function() {
		$http.post('/api/phoneBook', $scope.formData)
			.success(function(data) {
				$scope.formData = {}; // clear the form so our user is ready to enter another
				$scope.entries = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	// delete a todo after checking it
	$scope.deleteEntry = function(id) {
		$http.delete('/api/phoneBook/'+ id)
			.success(function(data) {
				$scope.entries = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};
}