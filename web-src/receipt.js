var hogan = require("hogan.js");
var tmplSrc = require("raw!./receipt.html");
var tmpl = hogan.compile(tmplSrc);

exports.render = function(dom, visitId){
	var html = tmpl.render({

	});
	dom.innerHTML = html
};
