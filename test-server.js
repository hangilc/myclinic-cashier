var web = require("myclinic-web");
var subapp = require("./index.js");

var sub = {
	name: "cashier",
	module: subapp,
	configKey: "cashier"
};

web.cmd.runFromCommand([sub], 9003);

