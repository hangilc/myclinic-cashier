var hogan = require("hogan.js");
var tmplSrc = require("raw!./wqueue.html");
var tmpl = hogan.compile(tmplSrc);
var service = require("myclinic-service-api");
var conti = require("conti");
var Detail = require("./detail.js");
var Session = require("./session.js");

function padLeft(num, npad){
	var ch = "0";
	var s = "" + num;
	var rem = npad - s.length;
	while( rem > 0 ){
		s = ch + s;
		rem -= 1;
	}
	return s;
}

exports.render = function(dom){
	service.listFullWqueueForCashier(function(err, result){
		if( err ){
			alert(err);
			return;
		}
		var list = result.map(function(item){
			item.patient_id_rep = padLeft(item.patient_id, 4);
			return item;
		});
		var html = tmpl.render({list: list});
		dom.innerHTML = html;
		bindStart(dom);
	});
};

function bindStart(dom){
	var list = dom.querySelectorAll(".start-cashier-button");
	var i, n = list.length;
	for(i=0;i<n;i++){
		var b = list[i];
		b.addEventListener("click", function(event){
			var visitId = event.target.getAttribute("data-visit-id");
			Session.fetch(visitId, function(err, sess){
				if( err ){
					alert(err);
					return;
				}
				Detail.render(dom, sess);
			});
		});
	}
}

