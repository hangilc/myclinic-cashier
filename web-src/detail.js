var hogan = require("hogan.js");
var tmplSrc = require("raw!./detail.html");
var tmpl = hogan.compile(tmplSrc);
var service = require("myclinic-service-api");
var conti = require("conti");
var mConsts = require("myclinic-consts");
var Wqueue = require("./wqueue.js");
var Receipt = require("./receipt.js");
var kanjidate = require("kanjidate");
var mUtil = require("myclinic-util");

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
			service.getVisitWithFullHoken(visitId, function(err, result){
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
		bindGotoReceipt(dom, patient, visit, meisai);
		bindGotoStart(dom);
	});
};

function bindGotoReceipt(dom, patient, visit, meisai){
	dom.querySelector(".goto-receipt-button").addEventListener("click", function(){
		var data = makeReceiptData(patient, visit, meisai);
		Receipt.render(dom, data);
	});
}

function bindGotoStart(dom){
	dom.querySelector(".goto-start-button").addEventListener("click", function(){
		Wqueue.render(dom);
	});
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
