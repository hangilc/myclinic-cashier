var hogan = require("hogan.js");
var tmplSrc = require("raw!./receipt.html");
var tmpl = hogan.compile(tmplSrc);
var ReceiptForm = require("myclinic-drawer-forms").Receipt;
var Detail = require("./detail.js");
var settingsTmplSrc = require("raw!./printer-settings.html");
var settingsTmpl = hogan.compile(settingsTmplSrc);

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

exports.render = function(dom, data, visitId){
	var html = tmpl.render({
		current_printer_setting: getPrinterSetting(settingKey) || "(設定なし)"
	});
	dom.innerHTML = html;
	var ops = new ReceiptForm(data).getOps();
	bindGotoDetail(dom, visitId);
	bindPrint(dom, ops);
	bindSelectPrinter(dom);
	var svg = drawerToSvg(ops, {width: "150mm", height: "106mm", viewBox: "0 0 150 106"});
	dom.querySelector(".preview").appendChild(svg);
};

function bindGotoDetail(dom, visitId){
	dom.querySelector(".goto-detail").addEventListener("click", function(event){
		Detail.render(dom, visitId);
	});
}

function bindPrint(dom, ops){
	dom.querySelector(".print").addEventListener("click", function(event){
		fetch("/printer/print", {
			method: "POST",
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify({
				pages: [ops],
				setting: getPrinterSetting(settingKey)
			})
		});
	});
}

function fetchPrinterSettings(cb){
	fetch("/printer/setting")
	.then(function(response){
		if( response.ok ){
			response.json().then(function(json){
				cb(undefined, json);
			})
			.catch(function(err){
				cb(err);
			});
		} else {
			response.text()
			.then(function(text){
				cb(text);
			}).catch(function(err){
				cb(err);
			});
		}
	})
	.catch(function(err){
		cb(err);
	});
}

function checkCurrentPrinter(wrapper){
	var current = getPrinterSetting(settingKey);
	var nodes, i, n;
	if( current ){
		nodes = wrapper.querySelectorAll("input[type=radio][name=setting]");
		n = nodes.length;
		console.log("n", n);
		for(i=0;i<n;i++){
			console.log("check", nodes[i].value, current);
			if( nodes[i].value === current ){
				nodes[i].checked = true;
				break;
			}
		}
	} else {
		wrapper.querySelector("input[type=radio][name=setting][value='']").checked = true;
	}
}

function updateCurrentPrinter(dom){
	var current = getPrinterSetting(settingKey);
	var el = dom.querySelector(".current-setting-disp");
	el.innerHTML = "";
	el.appendChild(document.createTextNode(current || "(設定なし)"));
}

function bindSelectPrinter(dom){
	var link = dom.querySelector(".select-printer");
	link.addEventListener("click", function(event){
		var settingsDom = dom.querySelector(".printer-settings");
		if( settingsDom.innerHTML !== "" ){
			settingsDom.innerHTML = "";
		} else {
			fetchPrinterSettings(function(err, result){
				if( err ){
					alert(err);
					return;
				}
				var html = settingsTmpl.render({ list: result });
				settingsDom.innerHTML = html;
				checkCurrentPrinter(settingsDom);
				settingsDom.querySelector(".close").addEventListener("click", function(event){
					settingsDom.innerHTML = "";
				});
				var nodes, node, i, n;
				nodes = settingsDom.querySelectorAll("input[type=radio][name=setting]");
				n = nodes.length;
				for(i=0;i<n;i++){
					node = nodes[i];
					node.addEventListener("change", function(event){
						var value = event.target.value;
						if( value ){
							setPrinterSetting(settingKey, value);
						} else {
							removePrinterSetting(settingKey);
						}
						updateCurrentPrinter(dom);
						settingsDom.innerHTML = "";
					});
				}
			});
		}
	});
}

