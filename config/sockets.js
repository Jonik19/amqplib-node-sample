var winston = require('winston');
var amqp = require('../app/amqp');
var config = require('../config');

module.exports = function (io) {

	io.on('connection', function (socket) {
		winston.log('debug', 'Connected new user: ', socket.id);

		amqp.assertExchange(config.rabbitmq.exchange.socket, 'direct')
		.then(function () {
			amqp.assertQueue(socket.id)
				.then(function (queue) {
					amqp.bindQueue(queue.queue, config.rabbitmq.exchange.socket)
						.then(function () {
							console.log('Queue ' + socket.id + ' was binded to ' + config.rabbitmq.exchange.socket);
						});
				});
		});

		socket.on('disconnect', function () {
			console.log(socket.id + ' disconnected');

			amqp.deleteQueue(socket.id)
				.then(function (queue) {
					console.log('Queue ' + socket.id + ' was deleted');
				});
		});
	});

};

