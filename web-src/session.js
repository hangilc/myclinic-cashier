var service = require("myclinic-service-api");
var conti = require("conti");

exports.fetch = function(visitId, cb){
	var sess = {visitId: visitId};
	conti.exec([
		function(done){
			service.calcMeisai(visitId, function(err, result){
				if( err ){
					done(err);
					return;
				}
				sess.meisai = result;
				done();
			});
		},
		function(done){
			service.getVisitWithFullHoken(visitId, function(err, result){
				if( err ){
					done(err);
					return;
				}
				sess.visit = result;
				done();
			});
		},
		function(done){
			service.getPatient(sess.visit.patient_id, function(err, result){
				if( err ){
					done(err);
					return;
				}
				sess.patient = result;
				done();
			});
		},
		function(done){
			service.listPayments(visitId, function(err, result){
				if( err ){
					done(err);
					return;
				}
				if( !result ){
					result = [];
				}
				result.sort(function(a, b){
					return (new Date(b.paytime)) - (new Date(a.paytime));
				});
				sess.payments = result;
				done();
			});
		}
	], function(err){
		if( err ){
			cb(err);
			return;
		}
		cb(undefined, sess);
	});
};
