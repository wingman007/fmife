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
		if (Object.keys($scope.formData).length == 3){
			var match = $scope.formData.Number.match(/\d{10}\d+/)
			if (match != null){
				if (confirm('An entry:  "' + $scope.formData.Lname + '/' + $scope.formData.Lname + '/' + $scope.formData.Number + '" is going to be added to the database.\n Are you sure you want to add it?')){
					$http.post('/api/phoneBook', $scope.formData)
						.success(function(data) {
							$scope.formData = {}; // clear the form so our user is ready to enter another
							$scope.entries = data;
							console.log(data);
						})
						.error(function(data) {
							console.log('Error: ' + data);
						});			
				}
			}else {
				alert('Please enter a valid phonenumber that is 10 digits or more');
			}
		}
	
	};

	// delete a todo after checking it
	$scope.deleteEntry = function(id) {
		if (confirm('Are you sure you want to delete that entry?')){
			$http.delete('/api/phoneBook/'+ id)
				.success(function(data) {
					$scope.entries = data;
					console.log(data);
				})
				.error(function(data) {
					console.log('Error: ' + data);
				});
		}
	};
}