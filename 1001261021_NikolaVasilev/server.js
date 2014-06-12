// Set up ========================
var express = require('express');
var app = express(); // create our app w/ express
var mongoose = require('mongoose'); // mongoose for mongodb


// Configuration =================

//	mongoose.connect('mongodb://node:node@mongo.onmodulus.net:27017/uwO3mypu'); 
// connect to mongoDB database on modulus.io

mongoose.connect('mongodb://localhost/test');

app.configure(function () {
    // set the static files location /public/img will be /img for users
    app.use(express.static(__dirname + '/public'));
    app.use(express.logger('dev')); // log every request to the console
    app.use(express.bodyParser()); // pull information from html in POST

    // For Internet explorer
    app.use(function noCache(req, res, next) {
        res.header("Cache-Control", "no-cache, no-store, must-revalidate");
        res.header("Pragma", "no-cache");
        res.header("Expires", 0);
        next();
    });
});


var MyBook = mongoose.model('MyBook', {
    first_name: String,
    last_name: String,
    phone_number: String,
    address: String,
    e_mail: String,
    image: String
});

// Routes =========================

// GET all documents -------------------------/
app.get('/get/documents', function (req, res) {
    MyBook.find(function (err, documents) {
        if (err) res.send(err)
        res.json(documents); // return all documents in JSON format
    });
});


// ADD a document ---------------------------/
app.post('/add/document', function (req, res) {
    MyBook.create(
        req.body, function (err, document) {
            if (err) res.send(err);

            // Find and return last added document with generated _id
            MyBook.find().sort({
                _id: -1
            }).limit(1).exec(function (err, document) {
                if (err) res.send(err)
                res.json(document);
            });

        });
});


// EDIT a document --------------------------/
app.put('/edit/document/:doc_id', function (req, res) {
    MyBook.findOneAndUpdate({
        _id: req.params.doc_id
    }, req.body, function (err) {
        if (err) res.send(err)
        res.send(200);
    });
});


// DELETE a document -------------------------/
app.delete('/delete/document/:doc_id', function (req, res) {
    MyBook.remove({
        _id: req.params.doc_id
    }, function (err) {
        if (err) res.send(err);
        res.send(200);
    });
});


// Redirect if something else is requested -------------------/
app.get('/*', function (req, res) {
    res.sendfile(__dirname + '/public/index.html');
});


// listen (start app with node server.js)
app.listen(8081);
console.log("App listening on port 8081");