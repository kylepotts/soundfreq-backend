var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var log = require('tablog');


server.listen(process.env.PORT || 3000);

app.get('/', function (req, res) {
  res.send('<h1>Hello World<h1>');
});


io.on('connection',function(socket){
	log.info('user connected');
})