var config = require('./config');
var restify = require('restify');
var winston = require('winston');
var io = require('socket.io')();

var route = require('./config/route');
var sockets = require('./config/sockets');

// Setting level
winston.level = config.debug ? 'debug' : 'production';

var server = restify.createServer();
// var amqpOpen = amqp('amqp://localhost');

// Set routes
route(server);
sockets(io);

io.listen(server.server);

server.listen(config.server.port, function () {
	winston.info('Listening on port: ' + config.server.port);
});
