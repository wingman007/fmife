var express  = require('express');
var Database = require('nedb');
var port     = 3000;

var db = new Database({
	filename : __dirname + '/db/contacts',
	autoload : true
});

var app = express();

app.configure(function() {

	app.use(express.bodyParser());
	app.use(express.static(__dirname + '/app'));

	app.set('view engine', 'jade');
	app.set('views', __dirname + '/server/views');
});

app.get('/', function(req, res) {
	res.render('index');
});

app.get('/contacts', function(req, res) {
	
	db.find({}, function(error, data) {
		if(error) res.send(500, {error : error });
		res.send(data);
	});
});

app.get('/contacts/:id', function(req, res) {
	db.findOne({_id : req.params.id }, function(error, data) {
		if(error) res.send(500, {error : error });
		res.send(data);
	});
});

app.post('/contacts', function(req, res) {
	var body = req.body;

	if(!body.contactName) {
		res.send(400, { error : "The new contact must have a name or an aliase " });
		return;
	}

	if(!body.contactEmail) {
		res.send(400, {error : "The new contact must have a unique E-mail address" });
		return;
	}

	db.insert(body, function(error, data) {
		if(error) res.send(500, {error : error });
		res.send(data);
	});
});


app.put('/contacts/:id', function(req, res) {
	var body = req.body;

	db.update({ _id : req.params.id}, { $set : { title : body.title, rating : body.rating } }, 
		function(error, data) {
		if(error) res.send(500, {error : error });
		res.send(data);
	});
});

app.delete('/contacts/:id', function(req, res) {
	var body = req.body;

	db.remove({ _id : req.params.id }, function(error, data) {
		if(error) res.send(500, {error : error });
		res.send(data);
	});
});

app.listen(port, function() {
	console.log("Application started on port " + port);
})