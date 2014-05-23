var http = require("http");

var s = http.createServer(function(req, res){
	res.writeHeader(200, {'content-type': 'text/plain'});
	// res.write();
	res.end('hello world\n');
});

s.listen(8000);