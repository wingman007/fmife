define(['backbone', '../models/contact'], function(Backbone, ContactModel) {
	
	var Contacts = Backbone.Collection.extend({
		model : ContactModel,
		url : 'contacts'
	});

	return Contacts;
});