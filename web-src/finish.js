var hogan = require("hogan.js");
var tmplSrc = require("raw!./finish.html");
var tmpl = hogan.compile(tmplSrc);
var kanjidate = require("kanjidate");
var moment = require("moment");
var service = require("myclinic-service-api");
var Receipt = require("./receipt.js");
var Start = require("./wqueue.js");

function calcAge(birthday){
	return moment().diff(moment(birthday), "years");
}

function birthdayRep(birthday){
	if( !birthday || birthday === "0000-00-00" ){
		return "";
	}
	var rep = kanjidate.format(kanjidate.f2, birthday) + "生";
	rep += " " + calcAge(birthday) + "才";
	return rep;
}

function sexRep(sex){
	switch(sex){
		case "M": return "男性";
		case "F": return "女性";
		default: "";
	}
}

exports.render = function(dom, sess){
	console.log(sess);
	var patient = sess.patient;
	var data = {
		patient_id: patient.patient_id,
		last_name: patient.last_name,
		first_name: patient.first_name,
		last_name_yomi: patient.last_name_yomi,
		first_name_yomi: patient.first_name_yomi,
		birthday_rep: birthdayRep(patient.birth_day),
		sex_rep: sexRep(patient.sex),
	};
	var meisai = sess.meisai;
	data.seikyuu_gaku = meisai.charge;
	if( sess.payments.length > 0 ){
		data.shuusei = true;
		data.prev_payment = sess.payments[0].amount;
		data.shuusei_gaku = meisai.charge - sess.payments[0].amount;
		data.diff_abs = Math.abs(data.shuusei_gaku);
		data.tsuika_choushuu = data.shuusei_gaku > 0;
		data.no_diff = data.shuusei_gaku === 0;
		data.henkin = data.shuusei_gaku < 0;
	} else {
		data.seikyuu = true;
	}
	dom.innerHTML = tmpl.render(data);
	bindDone(dom, sess);
	bindPrev(dom, sess);
	bindCancel(dom);
};

function bindDone(dom, sess){
	dom.querySelector(".done").addEventListener("click", function(){
		var paytime = moment().format("YYYY-MM-DD HH:mm:ss");
		service.finishCashier(sess.visitId, sess.meisai.charge, paytime, function(err){
			if( err ){
				alert(err);
				return;
			}
			Start.render(dom);
		});
	});
}

function bindPrev(dom, sess){
	dom.querySelector(".cmd-prev").addEventListener("click", function(){
		Receipt.render(dom, sess);
	});
}

function bindCancel(dom){
	dom.querySelector(".cmd-cancel").addEventListener("click", function(){
		Start.render(dom);
	});
}

