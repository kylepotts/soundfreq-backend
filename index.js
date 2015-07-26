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

	socket.on('enqueue',function(data){
		log.info('enqueue ' + data);
		queue.push(data);
	});

	socket.on('play',function(){
		log.info('user pressed play');
		var now =moment();;
		var item = getItemToPlay();
		log.info('item ' +item);
		io.emit('play',{time:now.add(700,'milliseconds'), fileUrl:item});
		log.info('after emit');
	});

	socket.on('pause',function(){
		log.info('user pressed pause');
		socket.broadcast.emit('pause', 'user pressed pause')
	})
})

function getItemToPlay(){
	var item = queue[0];
	queue = queue.shift();
	log.info("Now queue is " + JSON.stringify(queue));
	return item
}