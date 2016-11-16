var hogan = require("hogan.js");
var tmplSrc = require("raw!./detail.html");
var tmpl = hogan.compile(tmplSrc);
var service = require("myclinic-service-api");
var conti = require("conti");
var mConsts = require("myclinic-consts");
var Wqueue = require("./wqueue.js");

exports.render = function(dom, visitId){
	var meisai, visit, patient;
	conti.exec([
		function(done){
			service.calcMeisai(visitId, function(err, result){
				if( err ){
					done(err);
					return;
				}
				meisai = result;
				done();
			});
		},
		function(done){
			service.getVisit(visitId, function(err, result){
				if( err ){
					done(err);
					return;
				}
				visit = result;
				done();
			});
		},
		function(done){
			service.getPatient(visit.patient_id, function(err, result){
				if( err ){
					done(err);
					return;
				}
				patient = result;
				done();
			});
		}
	], function(err){
		if( err ){
			alert(err);
			return;
		}
		console.log(meisai);
		var sections = [];
		mConsts.MeisaiSections.forEach(function(sect){
			var items = meisai.meisai[sect];
			if( items.length === 0 ){
				return;
			}
			sections.push({
				name: sect,
				items: items,
			});
		});
		var html = tmpl.render({
			sections: sections,
			total_ten: meisai.totalTen.toLocaleString(),
			charge: meisai.charge.toLocaleString(),
			futan_wari: meisai.futanWari,
			patient: patient
		});
		dom.innerHTML = html;
		bindGotoReceipt(dom);
		bindGotoStart(dom);
	});
};

function bindGotoReceipt(dom){
	console.log("goto receipt");
}

function bindGotoStart(dom){
	dom.querySelector(".goto-start-button").addEventListener("click", function(){
		Wqueue.render(dom);
	});
}


