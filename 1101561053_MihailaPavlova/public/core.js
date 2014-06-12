//all angular code for our app 
// public/core.js
var fmiFe = angular.module('fmiFe', []); // we add extra brackets in the list

function mainController($scope, $http) {
    $scope.formData = {};

    // when landing on the page, get all todos and show them
    $http.get('/api/contacts')
            .success(function(data) {
                $scope.contacts = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });

    // when submitting the add form, send the text to the node API
    $scope.createContact = function() {
        $http.post('/api/contacts', $scope.formData)
                .success(function(data) {
                    $scope.formData = {}; // clear the form so our user is ready to enter another
                    $scope.contacts = data;
                    console.log(data);
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
    };

    // delete a todo after checking it
    $scope.deleteContact = function(id) {
        $http.delete('/api/contacts/' + id)
                .success(function(data) {
                    $scope.contacts = data;
                    console.log(data);
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
    };
}