var hogan = require("hogan.js");
var tmplSrc = require("raw!./finish.html");
var tmpl = hogan.compile(tmplSrc);
var kanjidate = require("kanjidate");
var moment = require("moment");

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
	console.log(sess.meisai);
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
	if( sess.payments.length > 0 ){
		data.shuusei = true;

	} else {
		data.seikyuu = true;
		data.seikyuu_gaku = meisai.charge;
	}
	dom.innerHTML = tmpl.render(data);
	bindDone(dom);
};

function bindDone(dom){
	dom.querySelector(".done").addEventListener("click", function(){
		console.log("done");
	});
}
