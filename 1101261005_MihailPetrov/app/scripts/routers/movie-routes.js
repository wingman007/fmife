var Routes = Backbone.Router.extend({

	routes : {
		'home' 			: 'home',
		'movies(/:id)' 	: 'show_movies'
	},

	home : function() {
		console.log("Home Sweet Home");	
	},

	show_movies : function(id) {
		if(id) {
			App.Vent.trigger('show_single_movie', {
				id : id
			});
		}
		else {
			App.Vent.trigger('show_all_movies');
			console.log("Triger event show all movies");	
		}
	},
});