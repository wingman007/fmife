//all angular code for our app 
// public/core.js
var fmiFe = angular.module('fmiFe', []);

function mainController($scope, $http) {
	$scope.formData = {};

	// when landing on the page, get all students and show them
	$http.get('/api/students')
		.success(function(data) {
			$scope.students = data;
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

	// when submitting the add form, send the text to the node API
	$scope.createstudent = function() {
		$http.post('/api/students', $scope.formData)
			.success(function(data) {
				$scope.formData = {}; // clear the form so our user is ready to enter another
				$scope.students = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	// delete a student after checking it
	$scope.deletestudent = function(id) {
		$http.delete('/api/students/' + id)
			.success(function(data) {
				$scope.students = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};
}