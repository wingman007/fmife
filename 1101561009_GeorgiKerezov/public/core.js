//all angular code for our app 
// public/core.js
var fmiFe = angular.module('fmiFe', []);

function mainController($scope, $http) {
	$scope.formData = {};
	$scope.newField = {};
	$scope.predicate = '';
	$scope.typePredicate = '';
	var regexForDigits = /^\d{10,}$/;
	
	$http.get('/api/phoneBook')
		.success(function(data) {
			$scope.entries = data;
		})
		.error(function(data) {
			console.log('Error: ' + data);
	});

	$scope.createEntry = function() {
		if (Object.keys($scope.formData).length == 3){
			var match = $scope.formData.Number.match(regexForDigits);
			if (match != null){
				$http.post('/api/phoneBook', $scope.formData)
					.success(function(data) {
						$scope.formData = {};
						$scope.entries = data;
					})
					.error(function(data) {
						console.log('Error: ' + data);
					});
				clearErrors();
				clearSuccess();
				showSuccess();					
			}else {
				clearErrors();
				showErrors();
			}
		}
	};

	$scope.deleteEntry = function(id) {
		if (confirm('Are you sure you want to delete that entry?')){
			$http.delete('/api/phoneBook/'+ id)
				.success(function(data) {
					$scope.entries = data;
				})
				.error(function(data) {
					console.log('Error: ' + data);
				});
		}
	};
	
	$scope.editEntry = function(field) {
        $scope.newField = angular.copy(field);
    }
    
    $scope.saveEntry = function(entry) {
		var match = entry.Number.match(regexForDigits);
		if (match != null){
            $http.put('/api/phoneBook/'+ entry._id, entry)
				.success(function(data) {
					$scope.entries = data;
				})
				.error(function(data) {
					console.log('Error: ' + data);
				});
			editMode = false;
			clearSuccess();
			showSuccess();
		}else {
				editMode = true;
				clearErrors();
				showErrors();
		}
    };
    
    $scope.cancel = function() {
		$http.get('/api/phoneBook')
			.success(function(data) {
				$scope.entries = data;
			})
			.error(function(data) {
				console.log('Error: ' + data);
		});
		clearErrors();
    };
	
	$scope.changePredicate = function() {
		if($('#sortOrder option:selected').val() == "asc") {
			$scope.predicate = $scope.typePredicate;
		} else {
			$scope.predicate = "-" + $scope.typePredicate;
		}
    };
	
	$scope.changeField = function() {
		if($('#sortField option:selected').val() == "fName") {
			$scope.typePredicate = "Fname";
		} else {
			$scope.typePredicate = "Lname";
		}	
    };
}

function clearErrors() {
	$('.errors').css("visibility", "hidden");
	$('.errors').empty();
}

function showErrors() {
	$('.errors').css("visibility", "visible");
	$('.errors').fadeIn(0);
	$('.errors').append('Please enter a valid phonenumber that is 10 digits or more');
	
	setTimeout( function(){
		$('.errors').fadeOut(1500);
	}
	, 2000 );
}

function clearSuccess() {
	$('.success').css("visibility", "hidden");
	$('.success').empty();
}

function showSuccess() {
	$('.success').css("visibility", "visible");
	$('.success').fadeIn(0);
	$('.success').append('Success');
	
	setTimeout( function(){
		$('.success').fadeOut(1200);
	}
	, 1200 );
}