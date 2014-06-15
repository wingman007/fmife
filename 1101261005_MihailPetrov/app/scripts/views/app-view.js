define([
	// Vendor base libs and scripts
	'backbone',
	
	// Model base scripts
	'../models/contact',
	
	// Collection based scripts
	'../collections/contacts',
	
	// View base scripts
	'../views/add-contact',
	'../views/contacts'],
 function(
 	Backbone,
  	ContactModel,
  	ContactCollection,
  	AddContactView, ContactsView) {
	
	var AppView = Backbone.View.extend({
		
		el : "#app",

		initialize : function() {			
			
			var cCollection = new ContactCollection();

			// show all contacts in the list
			var contactWall = new ContactsView({
				collection : cCollection
			});

			// int the form for new contacts
			var addContactView = new AddContactView({
				collection : cCollection
			});
		}
	});

	return AppView;
});