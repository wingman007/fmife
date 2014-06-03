//all angular code for our app 
// public/core.js
var fmiFe = angular.module('fmiFe', []);

function mainController($scope, $http) {
	$scope.availableGrades = [
		{value:2, description:"2 (Слаб)"},
		{value:3, description:"3 (Среден)"},
		{value:4, description:"4 (Добир)"},
		{value:5, description:"5 (Много Добир)"},
		{value:6, description:"6 (Отличен)"},
	];
	$scope.alertClass = "alert-info";
	$scope.alertMessage = "Апликацията показва всички студенти, с merge-нати проекти в wingman007/fmife";
	
	var showMessage = function(alertClass, alertMessage) {
		$scope.alertClass = alertClass;
		$scope.alertMessage = alertMessage;
		$('#message').fadeIn(500);
		if(alertClass != 'alert-danger') {
			setTimeout(function(){
					$('#message').fadeOut(500);
				}, 4000)
			};
	};
	
	//onSelectedGradeChanged
	$scope.persistGrade = function(student) {
		$http.post('/api/students/' + student.facNum, student)
			.success(function(result) {
				console.log(result);
				if(result.success == true) { showMessage('alert-success', result.message); }
				else { showMessage('alert-danger', result.message); }
			})
			.error(function(result) {
				console.log('Error: ' + result);
				showMessage('alert-danger', "Възникна грешка при опит за записване на оценката на " + student.name + ". Моля ПРЕЗАРЕДЕТЕ страницата.");
			});
	};

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