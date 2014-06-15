define(['backbone'], function(Backbone) {
	
	var Contact = Backbone.Model.extend({
		idAttribute : "_id",
		urlRoot : "contacts",

		defaults : {
			contactName  : "",
			contactEmail : ""
		}
	});

	return Contact;
})