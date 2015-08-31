module.exports = {
	debug: true,
	server: {
		port: process.env.WEB_PORT || 3000
	},
	rabbitmq: {
		url: 'amqp://localhost',
		exchange: {
			socket: 'socket.events'
		}
	}
};