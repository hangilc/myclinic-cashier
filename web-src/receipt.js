var hogan = require("hogan.js");
var tmplSrc = require("raw!./receipt.html");
var tmpl = hogan.compile(tmplSrc);
var ReceiptForm = require("myclinic-drawer-forms").Receipt;

exports.render = function(dom, data){
	var html = tmpl.render({

	});
	dom.innerHTML = html;
	var ops = new ReceiptForm(data).getOps();
	var svg = drawerToSvg(ops, {width: "150mm", height: "106mm", viewBox: "0 0 150 106"});
	dom.querySelector(".preview").appendChild(svg);
};
