function phoneController($scope){
	
	var data = [
		  {
			"fullname": "No Name Man",
                        "number": "3598888888888888",
			"_id": "5374060990c0cd0824000001",
			"__v": 0
		  }
		]
	
	$scope.data = data;
	
	$scope.addPhone = function() {
		$scope.data.push({"fullname": $scope.fullname, "number": $scope.number, "_id": data.length, "__v": 0});
		$scope.fullname = "";
                $scope.number = "";
	}
	
}