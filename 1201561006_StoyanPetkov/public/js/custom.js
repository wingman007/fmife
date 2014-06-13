var fmiFe = angular.module('fmiFe', []);
var erroradd = false

function mainController($scope, $http) {
$scope.formData = {};

//Get contact
$http.get('/api/contacts')
.success(function(data) {
$scope.contacts = data;
setTimeout(function() {
$('.index').each(function(i) {
$(this).text(i + 1);
});
}, 10);
})
.error(function(data) {
console.log('Error: ' + data);
});


//Submit
$scope.createContact = function() {
if(!$('#name').val() || !$('#phone').val()) {
$('.form-group').attr('class','form-group has-error has-feedback');
if(!erroradd) {
$('#name, #phone').after('<span class=' + '"' +'glyphicon glyphicon-remove form-control-feedback' + '"' + '></span>');
erroradd = true;
}
} else {
$('.form-group').attr('class','form-group has-succes has-feedback');
if(erroradd) {
$('#name, #phone').next().remove();
erroradd = false;
}
$http.post('/api/contacts', $scope.formData)
.success(function(data) {
$scope.formData = {};
$scope.contacts = data;
setTimeout(function() {
$('.index').each(function(i) {
$(this).text(i + 1);
});
}, 10);
})
.error(function(data) {
console.log('Error: ' + data);
});
}
};

//Delete
$scope.deleteContact = function(id) {
$http.delete('/api/contacts/' + id)
.success(function(data) {
$scope.formData = {};
$scope.contacts = data;
setTimeout(function() {
$('.index').each(function(i) {
$(this).text(i + 1);
});
}, 10);
})
.error(function(data) {
console.log('Error: ' + data);
});
};
};