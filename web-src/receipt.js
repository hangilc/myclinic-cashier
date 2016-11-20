var hogan = require("hogan.js");
var tmplSrc = require("raw!./receipt.html");
var tmpl = hogan.compile(tmplSrc);
var ReceiptForm = require("myclinic-drawer-forms").Receipt;
var Detail = require("./detail.js");
var settingsTmplSrc = require("raw!./printer-settings.html");
var settingsTmpl = hogan.compile(settingsTmplSrc);
var Finish = require("./finish.js");
var Wqueue = require("./wqueue.js");
var kanjidate = require("kanjidate");
var mUtil = require("myclinic-util");

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

function dateToKanji(d){
	return kanjidate.format(kanjidate.f2, d);
}

function subtotal(items){
	var total = 0;
	items.forEach(function(item){
		total += item.tanka * item.count;
	});
	return total;
}

function makeReceiptData(patient, visit, meisai){
	var sects = meisai.meisai;
	return {
		"名前": patient.last_name + patient.first_name,
		"領収金額": meisai.charge,
		"診察日": dateToKanji(visit.v_datetime),
		"発効日": dateToKanji(new Date()),
		"患者番号": patient.patient_id,
		"保険種別": mUtil.hokenRep(visit),
		"負担割合": meisai.futanWari,
		"初・再診料": subtotal(sects["初・再診料"]),
		"医学管理等": subtotal(sects["医学管理等"]),
		"在宅医療": subtotal(sects["在宅医療"]),
		"検査": subtotal(sects["検査"]),
		"画像診断": subtotal(sects["画像診断"]),
		"投薬": subtotal(sects["投薬"]),
		"注射": subtotal(sects["注射"]),
		"処置": subtotal(sects["処置"]),
		"その他": subtotal(sects["その他"]),
		"診療総点数": meisai.totalTen,
		"保険外１": "", 
		"保険外２": "", 
		"保険外３": "", 
		"保険外４": ""
	};
}
exports.render = function(dom, sess){
	var html = tmpl.render({
		current_printer_setting: getPrinterSetting(settingKey) || "(設定なし)"
	});
	dom.innerHTML = html;
	var data = makeReceiptData(sess.patient, sess.visit, sess.meisai);
	var ops = new ReceiptForm(data).getOps();
	bindPrint(dom, sess, ops);
	bindNoPrint(dom, sess);
	bindGotoDetail(dom, sess);
	bindGotoStart(dom);
	bindSelectPrinter(dom);
	var svg = drawerToSvg(ops, {width: "150mm", height: "106mm", viewBox: "0 0 150 106"});
	dom.querySelector(".preview").appendChild(svg);
};

function bindGotoDetail(dom, visitId){
	dom.querySelector(".goto-detail").addEventListener("click", function(event){
		Detail.render(dom, visitId);
	});
}

function bindPrint(dom, sess, ops){
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
		})
		.then(function(){
			Finish.render(dom, sess);
		})
		.catch(function(err){
			alert(err);
		});
	});
}

function bindNoPrint(dom, sess){
	dom.querySelector(".no-print").addEventListener("click", function(event){
		Finish.render(dom, sess);
	});
}

function bindGotoStart(dom){
	dom.querySelector(".goto-start").addEventListener("click", function(event){
		Wqueue.render(dom);
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

