// server.js

	// set up ========================
	var express  = require('express');
	var app      = express(); 								// create our app w/ express
	var mongoose = require('mongoose'); 					// mongoose for mongodb
	var https = require('https');							//used for the API call to github


	// configuration =================

	mongoose.connect('mongodb://localhost/revov-db');
	
	app.configure(function() {
		app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
		app.use(express.logger('dev')); 						// log every request to the console
		app.use(express.bodyParser()); 							// pull information from html in POST
	});
	
	var githubOptions = {
						  host: 'api.github.com',
						  port: 443,
						  path: '/repos/revov/fmife/contents',
						  method: 'GET',
						  headers: 	{
										"user-agent": "node.js"
									}
						};
	
	// 2) Mongo model
	// define model ================= MongoDB will automatically generate an _id for each record that we create also.
	var student = mongoose.model('Student', {
		Name : String,
		Grade: Number
	});
	
	// 3) routes ======================================================================

	// api ---------------------------------------------------------------------
	// get all students
	app.get('/api/students', function(req, res) {
	
		var req = https.request(githubOptions, function(httpsResponse) {
			if (httpsResponse.statusCode === 200) {
				var data = '';
				var result = [];
				httpsResponse.on('data', function (chunk) {
					data += chunk;
				});
				httpsResponse.on('end', function (chunk) {
					JSON.parse(data).forEach( function(folder) {
						var folderName = /^\d{10}_([A-Za-z]+)$/.exec(folder.name);
						if (!!folderName) {
							result[result.length] = {
														name : folderName[1],
														url  : folder.html_url,
														grade: 6
													};
							
						}
					});
					
					res.send(result);
				});
				
			}
		});
		req.end();
	});

	// --------------------- Start Extra Update --------------------------
	app.get('/api/students/:student_id', function(req, res) {

		student.findOne({_id: req.params.student_id}, '_id text done', function(err, student) {

			if (err)
				res.send(err)

			res.json(student);
		});
	});
	// ----------------------- End Extra Update --------------------------
	
	// create student and send back all students after creation
	app.post('/api/students', function(req, res) {

		student.create({
			text : req.body.text,
			done : false
		}, function(err, student) {
			if (err)
				res.send(err);

			student.find(function(err, students) {
				if (err)
					res.send(err)
				res.json(students);
			});
		});

	});

	app.delete('/api/students/:student_id', function(req, res) {
		student.remove({
			_id : req.params.student_id
		}, function(err, student) {
			if (err)
				res.send(err);

			student.find(function(err, students) {
				if (err)
					res.send(err)
				res.json(students);
			});
		});
	});
	
	
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
	
	// listen (start app with node server.js) ======================================
	app.listen(8081);
	console.log("App listening on port 8081");

/*
http://mongoosejs.com/docs/api.html#model_Model.findOneAndUpdate
Model.findOne({ name: 'borne' }, function (err, doc) {
  if (err) ..
  doc.name = 'jason borne';
  doc.save(callback);
})
*/
