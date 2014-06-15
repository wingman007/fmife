require.config({

    paths : {
        jquery      : 'vendors/jquery',
        underscore  : 'vendors/underscore',
        backbone    : 'vendors/backbone'
    }
});


define(['scripts/views/app-view'], function(App) {
    new App;
});