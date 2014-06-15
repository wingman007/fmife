define([
	// Vendor based libs and scripts
	'backbone',

	// View base scripts
	'../views/contact'
], 
function(
	Backbone,
	SingleContactView) {
	
	var ContactsView = Backbone.View.extend({
		
		el : "#contact-view",

		initialize : function() {
			var _this = this;
			this.collection.fetch().then(function() {
				_this.render();
			});

			this.listenTo(this.collection, 'add', this.addSingle);
		},
		
		render : function() {
			this.collection.each(this.addSingle, this);
			return this;
		},

		addSingle : function(singleContact) {

			// create a new single view
			var view = new SingleContactView({
				model : singleContact
			});

			this.$el.append(view.render().el);
		}
	});

	return ContactsView;
})