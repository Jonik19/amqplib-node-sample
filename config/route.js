var router = require('../app/router');
var restify = require('restify');

module.exports = function (server) {
	// server.get('/', router.controller('home').index);

	server.get(/.*/, restify.serveStatic({
		'directory': './public',
		'default': 'index.html'
	}));
};