//all angular code for our app 
// public/core.js
var fmiFe = angular.module('fmiFe', []);

function mainController($scope, $http) {
	$scope.formData = {};

	// when landing on the page, get all todos and show them
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
		if (Object.keys($scope.formData).length == 3){
				if (confirm('An entry:  "' + $scope.formData.fName + '/' + $scope.formData.lName + '/' + $scope.formData.address + '" is going to be added to the database.\n Are you sure you want to add it?')){
					$http.post('/api/addressBook', $scope.formData)
						.success(function(data) {
							$scope.formData = {}; // clear the form so our user is ready to enter another
							$scope.addressBook = data;
							console.log(data);
						})
						.error(function(data) {
							console.log('Error: ' + data);
						});			
				}
			}
		}

	};

	// delete a todo after checking it
	$scope.deleteAddress = function(id) {
		if (confirm('Are you sure you want to delete that address?')){
			$http.delete('/api/addressBook/'+ id)
				.success(function(data) {
					$scope.addressBook = data;
					console.log(data);
				})
				.error(function(data) {
					console.log('Error: ' + data);
				});
		}
	};
}