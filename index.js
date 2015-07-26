var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var moment = require('moment');
var log = require('tablog');

var numConnections = 0;
var queue = [];


server.listen(process.env.PORT || 3000);

app.get('/', function (req, res) {
  res.send('<h1>Hello World<h1>');
});


io.on('connection',function(socket){
	log.info('user connected');
	numConnections+=1;
	log.info('numConnections='+ numConnections);

	socket.on('disconnect',function(){
		numConnections-=1;
		log.info('User numConnections Disconnected='+ numConnections);

	});

	socket.on('play',function(){
		log.info('user pressed play');
		var now =moment();
		socket.broadcast.emit('play',{time:now.add(700,'milliseconds')});
		log.info('after emit');
	});

	socket.on('pause',function(){
		log.info('user pressed pause');
		socket.broadcast.emit('pause', 'user pressed pause')
	})

	socket.on('next',function(){
		log.info('next pressed');
		socket.broadcast.emit('next', "user pressed next");
	});

		socket.on('prev',function(){
		log.info('prev pressed');
		socket.broadcast.emit('prev', "user pressed prev");
	});
})
