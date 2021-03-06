var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var moment = require('moment');
var log = require('tablog');

var numConnections = 0;


server.listen(process.env.PORT || 3000);

app.get('/', function (req, res) {
  res.send('<h1>Hello World<h1>');
});


io.on('connection',function(socket){
	log.info('user connected');
	numConnections+=1;

	socket.on('next', function(){
		log.info("pressed next");
		var now =moment();
		io.emit('next',{time:now.add(700,'milliseconds')});
	});

	socket.on('prev', function(){
		log.info("pressed prev");
		var now =moment();
		io.emit('prev',{time:now.add(700,'milliseconds')});
	});

	socket.on('play',function(){
		log.info('user pressed play');
		var now =moment();
		io.emit('play',{time:now.add(700,'milliseconds')});
		log.info('after emit');
	});

	socket.on('pause',function(){
		log.info('user pressed pause');
		socket.broadcast.emit('pause', 'user pressed pause')
	})
})