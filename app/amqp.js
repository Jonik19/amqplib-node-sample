var amqp = require('amqplib');
var config = require('../config');
var amqpOpen = amqp.connect(config.rabbitmq.url);

function init() {
	var ok;

	ok = amqpOpen.then(function (coon) {
		return coon.createChannel(function (ch) {
			return ch;
		});
	});

	return ok;
}

var channelPromise = init();

module.exports.assertQueue = function (name) {
	return channelPromise.then(function (ch) {
		return ch.assertQueue(name);
	});
};

module.exports.assertExchange = function (name, type, options) {
	return channelPromise.then(function (ch) {
		return ch.assertExchange(name, type, options || {});
	});
};

module.exports.bindQueue = function (queue, ex) {
	return channelPromise.then(function (ch) {
		return ch.bindQueue(queue, ex);
	});
};

/**
 * Deletes queue from channel
 * @param name {String}
 * @return {Promise}
 */
module.exports.deleteQueue = function (name) {
	return channelPromise.then(function (ch) {
		return ch.deleteQueue(name);
	});
};