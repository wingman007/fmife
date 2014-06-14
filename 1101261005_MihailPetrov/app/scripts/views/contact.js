define(['backbone'], function(Backbone) {

	var SingleContactView = Backbone.View.extend({
		
		className : "contact-element", 

		initialize : function() {
			this.model.on('destroy', this.unrender, this);	
		},

		render :  function() {
			this.$el.append('<span>' + this.model.get('contactName') + '</span><span>' + this.model.get('contactEmail') + '</span><a class="delete-contact" href="#/contacts/' + this.model.get('_id') + '">Delete</a>');
			return this;
		},

		events : {
			'click a.delete-contact' : 'deleteContact'
		},

		deleteContact : function() {
			this.model.destroy();
		},

		unrender : function() {
			this.remove();
		}
	});

	return SingleContactView;
});