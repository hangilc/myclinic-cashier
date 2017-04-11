"use strict";

var Compiler = require("myclinic-drawer").Compiler;
var Box = require("myclinic-drawer").Box;
var kanjidate = require("kanjidate");

var util = {
	dateToKanji: function(d){
		kanjidate.format(kanjidate.f2, d);
	},
	formatNumber: function(n){
		return n.toLocaleString();
	}
};

function ReceiptForm(data){
    if( data === undefined ) data = {};
    this.compiler = new Compiler();
    this.setupFonts();
    this.setupPens();
    this.frameBox = new Box(0, 0, 148, 104);
    this.compiler.setPen("regular");
    //this.compiler.box(this.frameBox);
    var titleBox = this.frameBox.clone().shiftDown(4).setWidth(28, "center").setHeight(6, "top");
    var row1 = this.frameBox.innerBox(13, 14, 73, 23);
    var row2 = this.frameBox.clone().shiftDown(row1.bottom()+3)
        .setHeight(4, "top").setLeft(13).setWidth(60, "left");
    var row3 = this.frameBox.clone().setTop(row2.bottom()+3)
        .setHeight(10, "top").setLeft(13).setWidth(120, "left");
    var row4 = this.frameBox.clone().setTop(row3.bottom()+3)
        .setHeight(10, "top").setLeft(13).setWidth(120, "left");
    var row5 = this.frameBox.clone().setTop(row4.bottom()+1)
        .setHeight(10, "top").setLeft(13).setWidth(120, "left");
    var hokengaiBox = this.frameBox.clone().setTop(row5.bottom()+3)
        .setHeight(25, "top").setLeft(13).setWidth(48, "left");
    var instituteBox = hokengaiBox.clone().flipRight().shiftToRight(11)
        .setHeight(25, "top").setWidth(30, "left");
    var ryoushuuBox = instituteBox.clone().flipRight().shiftToRight(7)
        .setHeight(29, "top").setWidth(24, "left");
    this.mainTitle(titleBox);
    this.row1(row1, data["名前"], data["領収金額"]);
    this.row2(row2, data["診察日"], data["発効日"]);
    this.row3(row3, data["患者番号"], data["保険種別"], data["負担割合"]);
    this.row4(row4, data["初・再診料"], data["医学管理等"], data["在宅医療"], data["検査"], data["画像診断"]);
    this.row5(row5, data["投薬"], data["注射"], data["処置"], data["その他"], data["診療総点数"]);
    this.hokengai(hokengaiBox, data["保険外１"], data["保険外２"], data["保険外３"], data["保険外４"]);
    this.institute(instituteBox, data["clinic-name"], data["clinic-addr"]);
    this.ryoushuu(ryoushuuBox);
}
module.exports = ReceiptForm;

ReceiptForm.prototype.getOps = function(){
    return this.compiler.getOps();
};

ReceiptForm.prototype.setupFonts = function(){
    var c = this.compiler;
    c.createFont("mincho-6", "MS Mincho", 6);
    c.createFont("mincho-4", "MS Mincho", 4);
    c.createFont("gothic-5", "MS Gothic", 5);
    c.createFont("gothic-4", "MS Gothic", 4);
    c.createFont("gothic-2.6", "MS Gothic", 2.6);
};

ReceiptForm.prototype.setupPens = function(){
    var c = this.compiler;
    c.createPen("regular", 0, 0, 0, 0.1);    
};

ReceiptForm.prototype.mainTitle = function(box){
    var c = this.compiler;
    c.setFont("mincho-6");
    c.textIn("領収証", box, "justified", "top");
};

ReceiptForm.prototype.row1 = function(box, name, charge){
    name = name || "";
    charge = charge || "";
    if( typeof charge === "number" ){
        charge = util.formatNumber(charge);
    }
    var c = this.compiler;
    c.setFont("mincho-6");
    c.frameBottom(box);
    c.textIn("様", box, "right", "bottom");
    var nameBox = box.clone().shrinkWidth(8, "left");
    c.textIn(name, nameBox, "center", "bottom");
    var chargeBox = box.flipRight().shiftToRight(8).setWidth(52, "left");
    c.textIn("領収金額", chargeBox, "left", "bottom");
    c.textIn("円", chargeBox, "right", "bottom");
    c.frameBottom(chargeBox);
    var kingakuBox = chargeBox.clone().displaceLeftEdge(24).displaceRightEdge(-6.9);
    c.setFont("gothic-5");
    c.textIn(charge, kingakuBox, "right", "bottom");
};

ReceiptForm.prototype.row2 = function(box, date, issue){
    var c = this.compiler;
    date = date || "";
    if( typeof date === "string" && date.match(/^\d{4}-\d{2}-\d{2}$/) ){
        date = util.dateToKanji(date);
    }
    c.setFont("mincho-4");
    c.textIn("診察日", box, "left", "center");
    var dateBox = box.clone().displaceLeftEdge(16, "right");
    c.textIn(date, dateBox, "left", "center");
    var issueBox = box.flipRight().shiftToRight(6);
    c.textIn("発効日", issueBox, "left", "center");
    issue = issue || "";
    if( typeof issue === "string" && issue.match(/^\d{4}-\d{2}-\d{2}$/) ){
        issue = util.dateToKanji(issue);
    }
    c.textIn(issue, issueBox.clone().displaceLeftEdge(16), "left", "center");
};

ReceiptForm.prototype.row3 = function(box, patientId, hoken, futanWari){
    var c = this.compiler;
    var cells = box.splitToEvenCells(2, 3);
    c.frameCells(cells);
    c.setFont("mincho-4");
    c.textIn("患者番号", cells[0][0], "center", "center");
    c.textIn("保険種別", cells[0][1], "center", "center");
    c.textIn("負担割合", cells[0][2], "center", "center");
    patientId = patientId || "";
    hoken = hoken || "";
    if( futanWari == null ) futanWari = "";
    c.textIn("" + patientId, cells[1][0], "center", "center");
    c.textIn("" + hoken, cells[1][1], "center", "center");
    c.textIn("" + futanWari, cells[1][2], "center", "center");
};

ReceiptForm.prototype.row4 = function(box, shoshin, kanri, zaitaku, kensa, gazou){
    shoshin = (shoshin || "") + "";
    kanri = (kanri || "") + "";
    zaitaku = (zaitaku || "") + "";
    kensa = (kensa || "") + "";
    gazou = (gazou || "") + "";
    var c = this.compiler;
    var cells = box.splitToEvenCells(2, 5);
    c.frameCells(cells);
    c.setFont("mincho-4");
    c.textIn("初・再診料", cells[0][0], "center", "center");
    c.textIn(shoshin , cells[1][0], "center", "center");
    c.textIn("医学管理等", cells[0][1], "center", "center");
    c.textIn(kanri , cells[1][1], "center", "center");
    c.textIn("在宅医療", cells[0][2], "center", "center");
    c.textIn(zaitaku , cells[1][2], "center", "center");
    c.textIn("検査", cells[0][3], "center", "center");
    c.textIn(kensa , cells[1][3], "center", "center");
    c.textIn("画像診断", cells[0][4], "center", "center");
    c.textIn(gazou , cells[1][4], "center", "center");
};

ReceiptForm.prototype.row5 = function(box, touyaku, chuusha, shochi, sonota, souten){
    touyaku = (touyaku || "") + "";
    chuusha = (chuusha || "") + "";
    shochi = (shochi || "") + "";
    sonota = (sonota || "") + "";
    souten = (souten || "") + "";
    var c = this.compiler;
    var cells = box.splitToEvenCells(2, 5);
    c.frameCells(cells);
    c.frameColumnsRight(cells, 3, { dx: -1 });
    c.setFont("mincho-4");
    c.textIn("投薬", cells[0][0], "center", "center");
    c.textIn(touyaku , cells[1][0], "center", "center");
    c.textIn("注射", cells[0][1], "center", "center");
    c.textIn(chuusha , cells[1][1], "center", "center");
    c.textIn("処置", cells[0][2], "center", "center");
    c.textIn(shochi , cells[1][2], "center", "center");
    c.textIn("その他", cells[0][3], "center", "center");
    c.textIn(sonota , cells[1][3], "center", "center");
    c.textIn("診療総点数", cells[0][4], "center", "center");
    c.textIn(souten , cells[1][4], "center", "center");
};

ReceiptForm.prototype.hokengai = function(box, text1, text2, text3, text4){
    text1 = (text1 || "") + "";
    text2 = (text2 || "") + "";
    text3 = (text3 || "") + "";
    text4 = (text4 || "") + "";
    var c = this.compiler;
    var cells = box.splitToEvenCells(5, 1);
    c.setFont("mincho-4");
    c.frameCells(cells);
    c.textIn("保険外", cells[0][0], "center", "center");
    c.textIn(text1, cells[1][0].clone().shrinkWidth(1, "right"), "left", "center");
    c.textIn(text3, cells[3][0].clone().shrinkWidth(1, "right"), "left", "center");
    c.textIn(text4, cells[4][0].clone().shrinkWidth(1, "right"), "left", "center");
    c.textIn(text2, cells[2][0].clone().shrinkWidth(1, "right"), "left", "center");
};

ReceiptForm.prototype.institute = function(box, clinicName, clinicAddr){
	if( clinicName == null ){
		clinicName = "";
	}
	if( clinicAddr == null ){
		clinicAddr = [];
	}
    var c = this.compiler;
    var lines = [
            "{postal-number}", 
            "{address}",
            "{tel}",
            "{fax}",
            "{home-page-url}"
    ];
    box.shiftToRight(-4);
    var bb = box.splitToRows(5);
    c.setFont("gothic-4");
    c.textIn(clinicName, bb[0], "left", "top");
    c.setFont("gothic-2.6");
    c.multilineText(clinicAddr, bb[1], "left", "top", 1);
};

ReceiptForm.prototype.ryoushuu = function(box){
    var c = this.compiler;
    c.box(box);
    var bb = box.splitToRows(5);
    c.frameBottom(bb[0]);
    c.setFont("mincho-4");
    c.textIn("領収印", bb[0], "center", "center");
};
