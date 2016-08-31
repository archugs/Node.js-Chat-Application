var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var numUsers = 0;

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
	io.emit('chat message', 'a new user connected');
	socket.on('chat message', function(msg) {
		io.emit('chat message', msg);
	});
	socket.on('disconnect', function() {
		io.emit('chat message', 'a user disconnected');
	});
});

http.listen(3000, function() {
	console.log("listening on *:3000");
});
