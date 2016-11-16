var hogan = require("hogan.js");
var tmplSrc = require("raw!./receipt.html");
var tmpl = hogan.compile(tmplSrc);
var ReceiptForm = require("myclinic-drawer-forms").Receipt;
var Detail = require("./detail.js");

exports.render = function(dom, data, visitId){
	var html = tmpl.render({

	});
	dom.innerHTML = html;
	var ops = new ReceiptForm(data).getOps();
	bindGotoDetail(dom, visitId);
	bindPrint(dom, ops);
	var svg = drawerToSvg(ops, {width: "150mm", height: "106mm", viewBox: "0 0 150 106"});
	dom.querySelector(".preview").appendChild(svg);
};

function bindGotoDetail(dom, visitId){
	dom.querySelector(".goto-detail").addEventListener("click", function(event){
		Detail.render(dom, visitId);
	});
}

var settingKey = "receipt-printer-setting";

function getPrinterSetting(key){
	return window.localStorage.getItem(key);
}

function setPrinterSetting(key, name){
	window.localStorage.setItem(key, name);
}

function removePrinterSetting(key){
	window.localStorage.removeItem(key);
}

function bindPrint(dom, ops){
	dom.querySelector(".print").addEventListener("click", function(event){
		fetch("/printer/print", {
			method: "POST",
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify({
				pages: [ops]	
			})
		});
	});
}
