//all angular code for our app 
// public/core.js
var fmiFe = angular.module('fmiFe', []);

function mainController($scope, $http) {
	$scope.formData = {};

	// when landing on the page, get all todos and show them
	$http.get('/api/phoneBook')
		.success(function(data) {
			$scope.contacts = data;
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

	// when submitting the add form, send the text to the node API
	$scope.createEntry = function() {

		if (Object.keys($scope.formData).length == 4){

			var match = $scope.formData.PhoneNumber.match(/\d{10}\d+/)
			var emailMatch = $scope.formData.PhoneNumber.match(/\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}/)
			if (match != null && emailMatch!= null){

				if (confirm('An entry:  "' + $scope.formData.fName + '/' + $scope.formData.lName + '/' + $scope.formData.PhoneNumber + '/' + $scope.formData.email +  '" is going to be added to the database.\n Are you sure you want to add it?')){

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
				alert('Please enter a valid email');
			}

		}

	

	};

	// delete a todo after checking it
	$scope.deleteContact = function(id) {
		if (confirm('Are you sure you want to delete that contact?')){
			$http.delete('/api/phoneBook/'+ id)
				.success(function(data) {
					$scope.contacts = data;
					console.log(data);
				})
				.error(function(data) {
					console.log('Error: ' + data);
				});
		}
	};
}