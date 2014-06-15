define(['backbone',
		'../models/contact'
], function(Backbone, ContactModel) {
	
	var ContactView = Backbone.View.extend({
		el : "#form-view",

		events : {
			'submit' : 'addContact'
		},

		addContact : function(e) {
			e.preventDefault();
			
			var contactName = $("#contact-name");
			var contactEmail = $("#contact-email");

			this.collection.create({
				contactName 	: contactName.val(),
				contactEmail 	: contactEmail.val(),
			}, {wait : true} );

			// clear the form content
			contactName.val('');
			contactEmail.val('');
		}
	});
	
	return ContactView;
})