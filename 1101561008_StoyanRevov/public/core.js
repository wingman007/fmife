//all angular code for our app 
// public/core.js
var fmiFe = angular.module('fmiFe', []);

function mainController($scope, $http) {
	$scope.formData = {};
	$scope.availableGrades = [
		{value:2, description:"2 (Слаб)"},
		{value:3, description:"3 (Среден)"},
		{value:4, description:"4 (Добир)"},
		{value:5, description:"5 (Много Добир)"},
		{value:6, description:"6 (Отличен)"},
	];
	
	//onSelectedGradeChanged
	$scope.persistGrade = function(student) {
		$http.post('/api/students/' + student.facNum, student)
			.success(function(result) {
				console.log(result);
				if(result.success == true) { $scope.alertClass = "alert-success";}
				else {$scope.alertClass = "alert-error";}
				$scope.alertMessage = result.message;
			})
			.error(function(result) {
				console.log('Error: ' + result);
				$scope.alertClass = "alert-error";
				$scope.alertMessage = "Възникна грешка при опит за записване на оценката на " + student.name;
			});
	}

	// when landing on the page, get all students and show them
	$http.get('/api/students')
		.success(function(data) {
			$scope.students = data;
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

}