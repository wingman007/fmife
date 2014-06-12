var myBook = angular.module('myBookApp', ['ui.router', 'ngAnimate']);

myBook.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $stateProvider
        .state('home', {
            url: '/',
            controller: 'indexController',
            templateUrl: 'add-list.html'
        })
        .state('about', {
            url: '/about',
            //controller: 'aboutController',
            templateUrl: 'about.html'
        });
    $urlRouterProvider.otherwise('/');

    // use the HTML5 History API
    $locationProvider.html5Mode(true);

});

// DIRECTIVE
// Used for ng-repeat to load JQuery ater last element is loaded
myBook.directive('myPostRepeatDirective', function () {
    return function (scope, element, attrs) {
        if (scope.$last) {
            // Jquery here
            //alert("Loaded");
        }
    };
});

myBook.directive("confirmButton", function ($document, $parse, $compile) {

    return {
        restrict: 'A',
        //scope: {editPerson: "=", editRecord: "="},
        link: function (scope, element, attrs) {

            //Responsive
            function wheretoplace() {
                var width = window.innerWidth;
                if (width < 850) {
                    if (attrs.edit == "true")
                        return 'bottom';
                    else
                        return 'left';
                }
                return attrs.position || "top";
            }

            var buttonId, html, message, nope, title, yep, position;

            buttonId = Math.floor(Math.random() * 10000000000);

            attrs.buttonId = buttonId;

            message = attrs.message || "Are you sure?";
            yep = attrs.yes || "Yes";
            nope = attrs.no || "No";
            title = attrs.title || "Confirm";
            //position = attrs.position || "top";

            html = "<div id=\"button-" + buttonId + "\">\n  <span class=\"confirmbutton-msg\">" + message + "</span><br>\n	<button class=\"confirmbutton-yes btn btn-danger btn-delete-center\">" + yep + "</button>\n </div>";

            if (attrs.edit == "true") {
                html = $compile("<div id=\"button-" + buttonId + "\">\n <input type='text'  class=\"form-control form-edit\" data-ng-model=\"person.first_name\" /><br>\n	<input type='text'  class=\"form-control form-edit\" data-ng-model=\"person.last_name\" /><br>\n 	<input type='text'  class=\"form-control form-edit\" data-ng-model=\"person.phone_number\" /><br>\n	<input type='text'  class=\"form-control form-edit\" data-ng-model=\"person.address\" /><br>\n	<input type='text'  class=\"form-control form-edit\" data-ng-model=\"person.e_mail\" /><br>\n <button class=\"confirmbutton-yes btn btn-danger\">" + yep + "</button>\n	<button class=\"confirmbutton-no btn\">" + nope + "</button>\n</div><!--h1>{{person.first_name}}</h1-->")(scope);

            }

            element.popover({
                    content: html,
                    html: true,
                    trigger: "manual",
                    title: title,
                    //container: '#popover-contanier',
                    placement: wheretoplace
                }

            );

            element.bind('click', function (e) {
                if ($('.list-info-edit a').hasClass("processing")) {
                    //alert("busy");
                    return false;
                } else {
                    //alert("working");
                    $('.list-info-edit a').addClass("processing");
                    var dontBubble, pop;
                    dontBubble = true;

                    if (attrs.edit == "true") {
                        // store current record data. This data will be return on CANCEL click
                        var temp = {
                            fname: scope.person.first_name,
                            lname: scope.person.last_name,
                            phone: scope.person.phone_number,
                            addr: scope.person.address,
                            email: scope.person.e_mail,
                        };
                    }

                    e.stopPropagation();

                    element.popover('show');

                    pop = $("#button-" + buttonId);

                    $compile(pop.contents())(scope);
                    scope.$apply();

                    pop.closest(".popover").click(function (e) {
                        if (dontBubble) {
                            e.stopPropagation();
                        }
                    });
                    // YES/SAVE click
                    pop.find('.confirmbutton-yes').click(function (e) {
                        dontBubble = false;

                        if (attrs.edit == "true") {
                            // store changed record data
                            var changes = {
                                first_name: scope.person.first_name,
                                last_name: scope.person.last_name,
                                phone_number: scope.person.phone_number,
                                address: scope.person.address,
                                e_mail: scope.person.e_mail,
                                image: scope.person.image
                            };

                            // Call saveChanges and pass data
                            var func = $parse(scope.saveChanges(scope.person._id, changes));
                            func(scope);
                        } else {
                            // For Deletion. Call deletePerson(person.id)
                            var func = $parse(attrs.confirmButton);
                            func(scope);
                        }

                        element.popover('hide');
                        $('.list-info-edit a').removeClass("processing");
                    });

                    // NO/CANCEL click
                    pop.find('.confirmbutton-no').click(function (e) {
                        dontBubble = false;
                        if (attrs.edit == "true") {
                            //restore previous data
                            scope.person.first_name = temp.fname;
                            scope.person.last_name = temp.lname;
                            scope.person.phone_number = temp.phone;
                            scope.person.address = temp.addr;
                            scope.person.e_mail = temp.email;

                            scope.$apply();

                        } else {
                            $document.off('click.confirmbutton.' + buttonId);
                        }
                        element.popover('hide');
                        $('.list-info-edit a').removeClass("processing");
                    });

                    $document.on('click.confirmbutton.' + buttonId, ":not(.popover, .popover *)", function () {

                        // Hide popover on mouse click out
                        if (attrs.edit != "true") {
                            $document.off('click.confirmbutton.' + buttonId);
                            element.popover('hide');
                            $('.list-info-edit a').removeClass("processing");
                        } else {}

                    });
                }

            });
        }
    };
});

// CONTROLLER
myBook.controller('indexController', function ($scope, $http, $location) {

    $scope.people = [];

    // LOAD image-picker.js
    // Substitute JQuery $( document ).ready()
    $scope.$on('$viewContentLoaded', function () {

        $("#selectImage").imagepicker({
            hide_select: true,
        });

        // GET ALL RECORDS
        $http.get('/get/documents')
            .success(function (data) {
                $scope.people = data;
            })
            .error(function (data) {
                console.error('Error: ' + data);
            });

    });


    // ADD RECORD
    $scope.addNewPerson = function () {

        // set image by default
        if ($scope.newPerson.image == undefined) $scope.newPerson.image = 'female0.png';

        $http.post('/add/document', $scope.newPerson)
            .success(function (data) {
                console.info("DB Add: OK");
                console.info("DB Return:");
                console.dir(data);
                // Because we don't know the new _id generated by DB - we get last added document and add it to $scope.people array 
                // If DB _id is manually generated e.g. 1,2,3..., there is no need to get document from the DB, because we already know the _id
                $scope.people.push(data[0]);
                $scope.newPerson = {}; // clear Add From
            })
            .error(function (data) {
                console.error('Add error: ' + data);
            });

    }

    // EDIT RECORD BY ID
    $scope.saveChanges = function (id, info) {

        // Makes fields of String type if they are undefined
        if (info.first_name == undefined) info.first_name = '';
        if (info.last_name == undefined) info.last_name = '';
        if (info.phone_number == undefined) info.phone_number = '';
        if (info.address == undefined) info.address = '';
        if (info.e_mail == undefined) info.e_mail = '';
        if (info.image == undefined) info.image = '';

        $http.put('/edit/document/' + id, info)
            .success(function (result) {
                console.info("DB Edit: " + result);

                // No need to get back new data from DB. 
                // We use current scope array to show the infomation. 
                // On refresh it will be taken from the DB
            })
            .error(function (result) {
                console.error('Error edit: ' + result);
            });

        //$scope.$apply();
    }

    // DELETE RECORD BY ID
    $scope.deletePerson = function (id) {

        $http.delete('/delete/document/' + id)
            .success(function (result) {
                console.info("DB Delete: " + result);

                // No need to get back new data from DB. 
                // We use current scope array to show the infomation. 
                // On refresh it will be taken from DB
                if (result == 'OK') {
                    // Find and remove selected object from $scope.people array.
                    var i = $scope.people.map(function (e) {
                        return e._id;
                    }).indexOf(id);
                    if (i != -1) {
                        $scope.people.splice(i, 1);
                    }
                }
            })
            .error(function (result) {
                console.error('Delete error: ' + result);
                alert("Failed to delete!");
            });

        //$scope.$apply();
    }

});