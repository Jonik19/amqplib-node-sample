var controllers = {};

var local = {
	controllerPath: '../app/controllers/?Controller'
};

module.exports.controller = function (name) {
	var controller, name = capitalize(name);

	if(contoller = controllers[name]) {
		return controller;
	}

	controller = require(local.controllerPath.replace('?', name));

	return controller;
};

module.exports.setControllerPath = function (path) {
	local.controllerPath = path;
};

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}