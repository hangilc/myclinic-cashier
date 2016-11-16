/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var service = __webpack_require__(1);
	var wqueue = __webpack_require__(6);

	wqueue.render(document.getElementById("main"));


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	__webpack_require__(2);
	var conti = __webpack_require__(4);

	var timeout = 15000;

	function request(service, data, method, cb){
		data = data || {};
		method = method || "GET";
		var url = window.location.origin + "/service";
		var searchParams = new URLSearchParams();
		searchParams.append("_q", service);
		var opt = {
			method: method,
			headers: {}
		};
		if( method === "GET" ){
			Object.keys(data).forEach(function(key){
				searchParams.append(key, data[key]);
			});
		}
		if( method === "POST" ){
			if( typeof data === "string" ){
				opt.body = data;
			} else {
				opt.body = JSON.stringify(data);
			}
			opt.headers["content-type"] = "application/json";
		}
		var done = false;
		var timer = setTimeout(function(){
			timer = null;
			if( !done ){
				done = true;
				cb("TIMEOUT");
			}
		}, timeout);
		url += "?" + searchParams.toString();
		conti.fetchJson(url, opt, function(err, result){
			if( timer ){
				clearTimeout()
			}
			if( !done ){
				done = true;
				cb(err, result);
			}
		});
	}

	// function request(service, data, method, cb){
	// 	data = data || {};
	// 	method = method || "GET";
	// 	var config = {
	// 		url: "./service?_q=" + service,
	//         type: method,
	// 		data: data,
	// 		dataType: "json",
	// 		success: function(list){
	// 			cb(undefined, list);
	// 		},
	// 		error: function(xhr, err, errThrown){
	// 			cb("ERROR: " + (xhr.responseText || err || errThrown));
	// 		},
	// 		timeout: 10000
	// 	};
	// 	if( method === "POST" && typeof data === "string" ){
	// 		config.contentType = "application/json";
	// 	}
	// 	$.ajax(config);
	// }

	exports.recentVisits = function(cb){
		request("recent_visits", "", "GET", cb);
	};

	exports.getPatient = function(patientId, cb){
		request("get_patient", {patient_id: patientId}, "GET", cb);
	};

	exports.calcVisits = function(patientId, cb){
		request("calc_visits", {patient_id: patientId}, "GET", cb);
	};

	exports.listFullVisits = function(patientId, offset, n, cb){
		request("list_full_visits", {patient_id: patientId, offset: offset, n: n}, "GET", cb);
	};

	exports.startExam = function(visitId, done){
		request("start_exam", {visit_id: visitId}, "POST", done);
	};

	exports.suspendExam = function(visitId, done){
		request("suspend_exam", {visit_id: visitId}, "POST", done);
	};

	exports.endExam = function(visitId, charge, done){
		request("end_exam", {visit_id: visitId, charge: charge}, "POST", done);
	};

	exports.listCurrentFullDiseases = function(patientId, cb){
		request("list_current_full_diseases", {patient_id: patientId}, "GET", cb);
	};

	exports.listFullWqueueForExam = function(cb){
		request("list_full_wqueue_for_exam", {}, "GET", cb);
	};

	exports.listFullWqueueForCashier = function(cb){
		request("list_full_wqueue_for_cashier", {}, "GET", cb);
	};

	exports.getVisit = function(visitId, cb){
		request("get_visit", {visit_id: +visitId}, "GET", cb);
	};

	exports.searchPatient = function(text, cb){
		request("search_patient", {text: text}, "GET", cb);
	};

	exports.listTodaysVisits = function(cb){
		request("list_todays_visits", {}, "GET", cb);
	};

	exports.startVisit = function(patientId, at, done){
		request("start_visit", {patient_id: patientId, at: at}, "POST", done);
	};

	exports.deleteVisit = function(visitId, done){
		request("delete_visit", {visit_id: visitId}, "POST", done);
	};

	exports.getText = function(textId, cb){
		request("get_text", {text_id: textId}, "GET", cb);
	};

	exports.updateText = function(text, done){
		request("update_text", text, "POST", done);
	};

	exports.deleteText = function(textId, done){
		request("delete_text", {text_id: textId}, "POST", done);
	};

	exports.enterText = function(text, cb){
		request("enter_text", text, "POST", cb);
	};

	exports.listAvailableHoken = function(patientId, at, cb){
		request("list_available_hoken", {patient_id: patientId, at: at}, "GET", cb);
	};

	exports.updateVisit = function(visit, done){
		request("update_visit", visit, "POST", done);
	};

	exports.getVisitWithFullHoken = function(visitId, cb){
		request("get_visit_with_full_hoken", {visit_id: visitId}, "GET", cb);
	};

	exports.searchIyakuhinMaster = function(text, at, cb){
		request("search_iyakuhin_master", {text: text, at: at}, "GET", cb);
	};

	exports.searchPrescExample = function(text, cb){
		request("search_presc_example", {text: text}, "GET", cb);
	};

	exports.searchFullDrugForPatient = function(patientId, text, cb){
		request("search_full_drug_for_patient", {patient_id: patientId, text: text}, "GET", cb);
	};

	exports.resolveIyakuhinMasterAt = function(iyakuhincode, at, cb){
		request("resolve_iyakuhin_master_at", {iyakuhincode: iyakuhincode, at: at}, "GET", cb);
	};

	exports.getIyakuhinMaster = function(iyakuhincode, at, cb){
		request("get_iyakuhin_master", {iyakuhincode: iyakuhincode, at: at}, "GET", cb);
	};

	exports.enterDrug = function(drug, cb){
		request("enter_drug", drug, "POST", cb);
	};

	exports.getFullDrug = function(drugId, at, cb){
		request("get_full_drug", {drug_id: drugId, at: at}, "GET", cb);
	};

	exports.listFullDrugsForVisit = function(visitId, at, cb){
		request("list_full_drugs_for_visit", {visit_id: visitId, at: at}, "GET", cb);
	};

	exports.batchEnterDrugs = function(drugs, cb){
		request("batch_enter_drugs", JSON.stringify(drugs), "POST", cb);
	};

	exports.batchDeleteDrugs = function(drugIds, done){
		request("batch_delete_drugs", JSON.stringify(drugIds), "POST", done);
	};

	exports.batchUpdateDrugsDays = function(drugIds, days, done){
		var data = {
			drug_ids: drugIds,
			days: days
		};
		request("batch_update_drugs_days", JSON.stringify(data), "POST", done);
	};

	exports.modifyDrug = function(drug, done){
		request("modify_drug", JSON.stringify(drug), "POST", done);
	};

	exports.batchResolveShinryouNamesAt = function(names, at, cb){
		var body = JSON.stringify({
			names: names,
			at: at
		});
		request("batch_resolve_shinryou_names_at", body, "POST", cb);
	};

	exports.batchEnterShinryou = function(shinryouList, cb){
		var body = JSON.stringify(shinryouList);
		request("batch_enter_shinryou", body, "POST", cb);
	};

	exports.getShinryou = function(shinryouId, cb){
		request("get_shinryou", {shinryou_id: shinryouId}, "GET", cb);
	};

	exports.getFullShinryou = function(shinryouId, at, cb){
		request("get_full_shinryou", {shinryou_id: shinryouId, at: at}, "GET", cb);
	};

	exports.listFullShinryouForVisit = function(visitId, at, cb){
		request("list_full_shinryou_for_visit", {visit_id: visitId, at: at}, "GET", cb);
	};

	exports.batchDeleteShinryou = function(shinryouIds, done){
		request("batch_delete_shinryou", JSON.stringify(shinryouIds), "POST", done);
	};

	exports.searchShinryouMaster = function(text, at, cb){
		request("search_shinryou_master", {text: text, at: at}, "GET", cb);
	};

	exports.resolveShinryouMasterAt = function(shinryoucode, at, cb){
		request("resolve_shinryou_master_at", {shinryoucode: shinryoucode, at: at}, "GET", cb);
	};

	exports.getShinryouMaster = function(shinryoucode, at, cb){
		request("get_shinryou_master", {shinryoucode: shinryoucode, at: at}, "GET", cb);
	};

	exports.enterConduct = function(conduct, cb){
		request("enter_conduct", JSON.stringify(conduct), "POST", cb);
	};

	exports.enterGazouLabel = function(gazouLabel, done){
		request("enter_gazou_label", JSON.stringify(gazouLabel), "POST", done);
	};

	exports.enterConductDrug = function(conductDrug, cb){
		request("enter_conduct_drug", JSON.stringify(conductDrug), "POST", cb);
	};

	exports.enterConductKizai = function(conductKizai, cb){
		request("enter_conduct_kizai", JSON.stringify(conductKizai), "POST", cb);
	};

	exports.resolveKizaiNameAt = function(name, at, cb){
		var data = {
			name: name,
			at: at
		};
		request("resolve_kizai_name_at", data, "GET", cb);
	};

	exports.batchEnterConductShinryou = function(conductShinryouList, cb){
		request("batch_enter_conduct_shinryou", JSON.stringify(conductShinryouList), "POST", cb);
	};

	exports.getFullConduct = function(conductId, at, cb){
		request("get_full_conduct", {conduct_id: conductId, at: at}, "GET", cb);
	};

	exports.enterConductShinryou = function(conductShinryou, cb){
		request("enter_conduct_shinryou", JSON.stringify(conductShinryou), "POST", cb);
	};

	exports.enterConductDrug = function(conductDrug, cb){
		request("enter_conduct_drug", JSON.stringify(conductDrug), "POST", cb);
	};

	exports.copyConducts = function(srcVisitId, dstVisitId, cb){
		request("copy_conducts", {src_visit_id: srcVisitId, dst_visit_id: dstVisitId}, "POST", cb);
	};

	exports.deleteConduct = function(conductId, done){
		request("delete_conduct", {conduct_id: conductId}, "POST", done);
	};

	exports.deleteConductShinryou = function(conductShinryouId, done){
		request("delete_conduct_shinryou", {conduct_shinryou_id: conductShinryouId}, "POST", done);
	}

	exports.deleteConductDrug = function(conductDrugId, done){
		request("delete_conduct_drug", {conduct_drug_id: conductDrugId}, "POST", done);
	}

	exports.deleteConductKizai = function(conductKizaiId, done){
		request("delete_conduct_kizai", {conduct_kizai_id: conductKizaiId}, "POST", done);
	}

	exports.getKizaiMaster = function(kizaicode, at, cb){
		request("get_kizai_master", {kizaicode: kizaicode, at: at}, "GET", cb);
	};

	exports.searchKizaiMaster = function(text, at, cb){
		request("search_kizai_master", {text: text, at: at}, "GET", cb);
	};

	exports.changeConductKind = function(conductId, kind, done){
		request("change_conduct_kind", {conduct_id: conductId, kind: kind}, "POST", done);
	};

	exports.setGazouLabel = function(conductId, label, done){
		request("set_gazou_label", {conduct_id: conductId, label: label}, "POST", done);
	};

	exports.enterShinryouByNames = function(visitId, names, cb){
		var data = {
			visit_id: visitId,
			names: names
		};
		request("enter_shinryou_by_names", JSON.stringify(data), "POST", cb);
	};

	exports.calcMeisai = function(visitId, cb){
		request("calc_meisai", {visit_id: visitId}, "GET", cb);
	};

	exports.findCharge = function(visitId, cb){
		request("find_charge", {visit_id: visitId}, "GET", cb);
	};

	exports.updateCharge = function(charge, done){
		request("update_charge", JSON.stringify(charge), "POST", done);
	};

	exports.getCharge = function(visitId, cb){
		request("get_charge", {visit_id: visitId}, "GET", cb);
	};

	exports.searchShoubyoumeiMaster = function(text, at, cb){
		request("search_shoubyoumei_master", {text: text, at: at}, "GET", cb);
	};

	exports.searchShuushokugoMaster = function(text, cb){
		request("search_shuushokugo_master", {text: text}, "GET", cb);
	};

	exports.getShoubyoumeiMaster = function(shoubyoumeicode, at, cb){
		request("get_shoubyoumei_master", {shoubyoumeicode: shoubyoumeicode, at: at}, "GET", cb);
	};

	exports.getShuushokugoMaster = function(shuushokugocode, cb){
		request("get_shuushokugo_master", {shuushokugocode: shuushokugocode}, "GET", cb);
	};

	exports.getShoubyoumeiMasterByName = function(name, at, cb){
		request("get_shoubyoumei_master_by_name", {name: name, at: at}, "GET", cb);
	};

	exports.getShuushokugoMasterByName = function(name, cb){
		request("get_shuushokugo_master_by_name", {name: name}, "GET", cb);
	};

	exports.enterDisease = function(shoubyoumeicode, patientId, startDate, shuushokugocodes, cb){
		var data = {
			shoubyoumeicode: shoubyoumeicode,
			patient_id: patientId,
			start_date: startDate,
			shuushokugocodes: shuushokugocodes
		};
		request("enter_disease", JSON.stringify(data), "POST", cb);
	};

	exports.getFullDisease = function(diseaseId, cb){
		request("get_full_disease", {disease_id: diseaseId}, "GET", cb);
	};

	exports.getDisease = function(diseaseId, cb){
		request("get_disease", {disease_id: diseaseId}, "GET", cb);
	};

	exports.batchUpdateDiseases = function(diseases, done){
		request("batch_update_diseases", JSON.stringify(diseases), "POST", done);
	};

	exports.listAllFullDiseases = function(patientId, cb){
		request("list_all_full_diseases", {patient_id: patientId}, "GET", cb);
	};

	exports.updateDiseaseWithAdj = function(disease, done){
		request("update_disease_with_adj", JSON.stringify(disease), "POST", done);
	};

	exports.deleteDiseaseWithAdj = function(diseaseId, done){
		request("delete_disease_with_adj", {disease_id: diseaseId}, "POST", done);
	};

	exports.searchTextForPatient = function(patientId, text, cb){
		request("search_text_for_patient", {patient_id: patientId, text: text}, "GET", cb);
	};

	exports.searchWholeText = function(text, cb){
		request("search_whole_text", {text: text}, "GET", cb);
	};

	// added for pharma

	exports.listFullPharmaQueue = function(cb){
		request("list_full_pharma_queue", {}, "GET", cb);
	};

	exports.listTodaysVisitsForPharma = function(cb){ 
		request("list_todays_visits_for_pharma", {}, "GET", cb);
	};

	exports.listDrugs = function(visitId, cb){
		request("list_drugs", {visit_id: visitId}, "GET", cb);
	};

	exports.listVisits = function(patientId, offset, n, cb){
		request("list_visits", {
			patient_id: patientId,
			offset: offset,
			n: n
		}, "GET", cb);
	};

	exports.listIyakuhinByPatient = function(patientId, cb){
		request("list_iyakuhin_by_patient", {patient_id: patientId}, "GET", cb);
	};

	exports.countVisitsByIyakuhincode = function(patientId, iyakuhincode, cb){
		request("count_visits_by_iyakuhincode", {
			patient_id: patientId,
			iyakuhincode: iyakuhincode
		}, "GET", cb);
	};

	exports.listFullVisitsByIyakuhincode = function(patientId, iyakuhincode, offset, n, cb){
		request("list_full_visits_by_iyakuhincode", {
			patient_id: patientId,
			iyakuhincode: iyakuhincode,
			offset: offset,
			n: n
		}, "GET", cb);
	};

	exports.findPharmaDrug = function(iyakuhincode, cb){
		request("find_pharma_drug", {
			iyakuhincode: iyakuhincode
		}, "GET", cb);
	};

	exports.prescDone = function(visitId, done){
		request("presc_done", {
			visit_id: visitId
		}, "POST", done);
	};

	exports.getDrug = function(drugId, cb){
		request("get_drug", {
			drug_id: drugId
		}, "GET", cb);
	};

	exports.enterPayment = function(visitId, amount, paytime, done){
		request("enter_payment", {
			visit_id: visitId,
			amount: amount,
			paytime: paytime
		}, "POST", done);
	};

	exports.listPayments = function(visitId, cb){
		request("list_payment", { visit_id: visitId }, "GET", cb);
	};




/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
	    "use strict";

	    if (global.setImmediate) {
	        return;
	    }

	    var nextHandle = 1; // Spec says greater than zero
	    var tasksByHandle = {};
	    var currentlyRunningATask = false;
	    var doc = global.document;
	    var registerImmediate;

	    function setImmediate(callback) {
	      // Callback can either be a function or a string
	      if (typeof callback !== "function") {
	        callback = new Function("" + callback);
	      }
	      // Copy function arguments
	      var args = new Array(arguments.length - 1);
	      for (var i = 0; i < args.length; i++) {
	          args[i] = arguments[i + 1];
	      }
	      // Store and register the task
	      var task = { callback: callback, args: args };
	      tasksByHandle[nextHandle] = task;
	      registerImmediate(nextHandle);
	      return nextHandle++;
	    }

	    function clearImmediate(handle) {
	        delete tasksByHandle[handle];
	    }

	    function run(task) {
	        var callback = task.callback;
	        var args = task.args;
	        switch (args.length) {
	        case 0:
	            callback();
	            break;
	        case 1:
	            callback(args[0]);
	            break;
	        case 2:
	            callback(args[0], args[1]);
	            break;
	        case 3:
	            callback(args[0], args[1], args[2]);
	            break;
	        default:
	            callback.apply(undefined, args);
	            break;
	        }
	    }

	    function runIfPresent(handle) {
	        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
	        // So if we're currently running a task, we'll need to delay this invocation.
	        if (currentlyRunningATask) {
	            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
	            // "too much recursion" error.
	            setTimeout(runIfPresent, 0, handle);
	        } else {
	            var task = tasksByHandle[handle];
	            if (task) {
	                currentlyRunningATask = true;
	                try {
	                    run(task);
	                } finally {
	                    clearImmediate(handle);
	                    currentlyRunningATask = false;
	                }
	            }
	        }
	    }

	    function installNextTickImplementation() {
	        registerImmediate = function(handle) {
	            process.nextTick(function () { runIfPresent(handle); });
	        };
	    }

	    function canUsePostMessage() {
	        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
	        // where `global.postMessage` means something completely different and can't be used for this purpose.
	        if (global.postMessage && !global.importScripts) {
	            var postMessageIsAsynchronous = true;
	            var oldOnMessage = global.onmessage;
	            global.onmessage = function() {
	                postMessageIsAsynchronous = false;
	            };
	            global.postMessage("", "*");
	            global.onmessage = oldOnMessage;
	            return postMessageIsAsynchronous;
	        }
	    }

	    function installPostMessageImplementation() {
	        // Installs an event handler on `global` for the `message` event: see
	        // * https://developer.mozilla.org/en/DOM/window.postMessage
	        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

	        var messagePrefix = "setImmediate$" + Math.random() + "$";
	        var onGlobalMessage = function(event) {
	            if (event.source === global &&
	                typeof event.data === "string" &&
	                event.data.indexOf(messagePrefix) === 0) {
	                runIfPresent(+event.data.slice(messagePrefix.length));
	            }
	        };

	        if (global.addEventListener) {
	            global.addEventListener("message", onGlobalMessage, false);
	        } else {
	            global.attachEvent("onmessage", onGlobalMessage);
	        }

	        registerImmediate = function(handle) {
	            global.postMessage(messagePrefix + handle, "*");
	        };
	    }

	    function installMessageChannelImplementation() {
	        var channel = new MessageChannel();
	        channel.port1.onmessage = function(event) {
	            var handle = event.data;
	            runIfPresent(handle);
	        };

	        registerImmediate = function(handle) {
	            channel.port2.postMessage(handle);
	        };
	    }

	    function installReadyStateChangeImplementation() {
	        var html = doc.documentElement;
	        registerImmediate = function(handle) {
	            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
	            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
	            var script = doc.createElement("script");
	            script.onreadystatechange = function () {
	                runIfPresent(handle);
	                script.onreadystatechange = null;
	                html.removeChild(script);
	                script = null;
	            };
	            html.appendChild(script);
	        };
	    }

	    function installSetTimeoutImplementation() {
	        registerImmediate = function(handle) {
	            setTimeout(runIfPresent, 0, handle);
	        };
	    }

	    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
	    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
	    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

	    // Don't get fooled by e.g. browserify environments.
	    if ({}.toString.call(global.process) === "[object process]") {
	        // For Node.js before 0.9
	        installNextTickImplementation();

	    } else if (canUsePostMessage()) {
	        // For non-IE10 modern browsers
	        installPostMessageImplementation();

	    } else if (global.MessageChannel) {
	        // For web workers, where supported
	        installMessageChannelImplementation();

	    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
	        // For IE 6–8
	        installReadyStateChangeImplementation();

	    } else {
	        // For older browsers
	        installSetTimeoutImplementation();
	    }

	    attachTo.setImmediate = setImmediate;
	    attachTo.clearImmediate = clearImmediate;
	}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(3)))

/***/ },
/* 3 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate) {"use strict";

	(function(exports){

	function iterExec(i, funs, done){
		if( i >= funs.length ){
			done();
			return;
		}
		var f = funs[i];
		f(function(err){
			if( err ){
				done(err);
				return;
			}
			iterExec(i+1, funs, done);
		})
	}

	exports.exec = function(funs, done){
		funs = funs.slice();
		iterExec(0, funs, done);
	};

	exports.execPara = function(funs, done){
		if( funs.length === 0 ){
			done();
			return;
		}
		funs = funs.slice();
		var n = funs.length;
		var no_more = false;
		funs.forEach(function(f){
			if( no_more ){
				return;
			}
			f(function(err){
				if( no_more ){
					return;
				}
				if( err ){
					no_more = true;
					done(err);
					return;
				}
				n -= 1;
				if( n === 0 ){
					done();
				}
			})
		})
	}

	function iterForEach(i, arr, fn, done){
		if( i >= arr.length ){
			done();
			return;
		}
		fn(arr[i], function(err){
			if( err ){
				done(err);
				return;
			}
			iterForEach(i+1, arr, fn, done);
		})
	}

	exports.forEach = function(arr, fn, done){
		arr = arr.slice();
		iterForEach(0, arr, fn, done);
	};

	exports.forEachPara = function(arr, fn, done){
		if( arr.length === 0 ){
			done();
			return;
		}
		arr = arr.slice();
		var n = arr.length;
		var no_more = false;
		arr.forEach(function(ele){
			if( no_more ){
				return;
			}
			fn(ele, function(err){
				if( no_more ){
					return;
				}
				if( err ){
					no_more = true;
					done(err);
					return;
				}
				n -= 1;
				if( n === 0 ){
					done();
				}
			})
		});
	};

	function Queue(){
		this.queue = [];
	}

	Queue.prototype.push = function(fn, cb){
		this.queue.push({
			fn: fn,
			cb: cb
		});
		if( this.queue.length === 1 ){
			this.run();
		}
	}

	Queue.prototype.run = function(){
		if( this.queue.length === 0 ){
			return;
		}
		var entry = this.queue[0];
		var fn = entry.fn;
		var cb = entry.cb;
		var self = this;
		fn(function(){
			var args = [].slice.call(arguments);
			cb.apply(undefined, args);
			if( self.queue.length > 0 && self.queue[0] === entry ){
				self.queue.shift();
				self.run();
			}
		})
	}

	var theQueue = new Queue();

	exports.enqueue = function(fn, cb){
		theQueue.push(fn, cb);
	};

	exports.mapPara = function(arr, fn, cb){
		var index = 0;
		var dataArr = arr.map(function(value){
			return {
				index: index++,
				value: value
			}
		});
		var retArr = [];
		exports.forEachPara(dataArr, function(data, done){
			var value = fn(data.value, function(err, result){
				if( err ){
					done(err);
					return;
				}
				retArr[data.index] = result;
				done();
			});
		}, function(err){
			if( err ){
				cb(err);
				return;
			}
			cb(undefined, retArr);
		})
	};

	exports.fetch = function(url, opt, op, cb){
		fetch(url, opt)
		.then(function(response){
			if( response.ok ){
				response[op]()
				.then(function(result){
					cb(undefined, result);
				})
				.catch(function(err){
					cb(err.message);
				})
			} else { 
				response.text()
				.then(function(text){
					cb(text);
				})
				.catch(function(err){
					cb(err.message);
				})
			}
		})
		.catch(function(err){
			cb(err.message);
		})
	}

	exports.fetchJson = function (url, opt, cb){
		exports.fetch(url, opt, "json", function(err, result){
			setImmediate(function(){
				cb(err, result);
			});
		});
	}

	exports.fetchText = function (url, opt, cb){
		exports.fetch(url, opt, "text", function(err, result){
			setImmediate(function(){
				cb(err, result);
			});
		});
	}

	})( true ? exports : (window.conti = {}));

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5).setImmediate))

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate, clearImmediate) {var nextTick = __webpack_require__(3).nextTick;
	var apply = Function.prototype.apply;
	var slice = Array.prototype.slice;
	var immediateIds = {};
	var nextImmediateId = 0;

	// DOM APIs, for completeness

	exports.setTimeout = function() {
	  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
	};
	exports.setInterval = function() {
	  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
	};
	exports.clearTimeout =
	exports.clearInterval = function(timeout) { timeout.close(); };

	function Timeout(id, clearFn) {
	  this._id = id;
	  this._clearFn = clearFn;
	}
	Timeout.prototype.unref = Timeout.prototype.ref = function() {};
	Timeout.prototype.close = function() {
	  this._clearFn.call(window, this._id);
	};

	// Does not start the time, just sets up the members needed.
	exports.enroll = function(item, msecs) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = msecs;
	};

	exports.unenroll = function(item) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = -1;
	};

	exports._unrefActive = exports.active = function(item) {
	  clearTimeout(item._idleTimeoutId);

	  var msecs = item._idleTimeout;
	  if (msecs >= 0) {
	    item._idleTimeoutId = setTimeout(function onTimeout() {
	      if (item._onTimeout)
	        item._onTimeout();
	    }, msecs);
	  }
	};

	// That's not how node.js implements it but the exposed api is the same.
	exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
	  var id = nextImmediateId++;
	  var args = arguments.length < 2 ? false : slice.call(arguments, 1);

	  immediateIds[id] = true;

	  nextTick(function onNextTick() {
	    if (immediateIds[id]) {
	      // fn.call() is faster so we optimize for the common use-case
	      // @see http://jsperf.com/call-apply-segu
	      if (args) {
	        fn.apply(null, args);
	      } else {
	        fn.call(null);
	      }
	      // Prevent ids from leaking
	      exports.clearImmediate(id);
	    }
	  });

	  return id;
	};

	exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
	  delete immediateIds[id];
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5).setImmediate, __webpack_require__(5).clearImmediate))

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var hogan = __webpack_require__(7);
	var tmplSrc = __webpack_require__(10);
	var tmpl = hogan.compile(tmplSrc);
	var service = __webpack_require__(1);
	var conti = __webpack_require__(11);
	var Detail = __webpack_require__(12);

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
				Detail.render(dom, visitId);
			});
		}
	}



/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 *  Copyright 2011 Twitter, Inc.
	 *  Licensed under the Apache License, Version 2.0 (the "License");
	 *  you may not use this file except in compliance with the License.
	 *  You may obtain a copy of the License at
	 *
	 *  http://www.apache.org/licenses/LICENSE-2.0
	 *
	 *  Unless required by applicable law or agreed to in writing, software
	 *  distributed under the License is distributed on an "AS IS" BASIS,
	 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 *  See the License for the specific language governing permissions and
	 *  limitations under the License.
	 */

	// This file is for use with Node.js. See dist/ for browser files.

	var Hogan = __webpack_require__(8);
	Hogan.Template = __webpack_require__(9).Template;
	Hogan.template = Hogan.Template;
	module.exports = Hogan;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 *  Copyright 2011 Twitter, Inc.
	 *  Licensed under the Apache License, Version 2.0 (the "License");
	 *  you may not use this file except in compliance with the License.
	 *  You may obtain a copy of the License at
	 *
	 *  http://www.apache.org/licenses/LICENSE-2.0
	 *
	 *  Unless required by applicable law or agreed to in writing, software
	 *  distributed under the License is distributed on an "AS IS" BASIS,
	 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 *  See the License for the specific language governing permissions and
	 *  limitations under the License.
	 */

	(function (Hogan) {
	  // Setup regex  assignments
	  // remove whitespace according to Mustache spec
	  var rIsWhitespace = /\S/,
	      rQuot = /\"/g,
	      rNewline =  /\n/g,
	      rCr = /\r/g,
	      rSlash = /\\/g,
	      rLineSep = /\u2028/,
	      rParagraphSep = /\u2029/;

	  Hogan.tags = {
	    '#': 1, '^': 2, '<': 3, '$': 4,
	    '/': 5, '!': 6, '>': 7, '=': 8, '_v': 9,
	    '{': 10, '&': 11, '_t': 12
	  };

	  Hogan.scan = function scan(text, delimiters) {
	    var len = text.length,
	        IN_TEXT = 0,
	        IN_TAG_TYPE = 1,
	        IN_TAG = 2,
	        state = IN_TEXT,
	        tagType = null,
	        tag = null,
	        buf = '',
	        tokens = [],
	        seenTag = false,
	        i = 0,
	        lineStart = 0,
	        otag = '{{',
	        ctag = '}}';

	    function addBuf() {
	      if (buf.length > 0) {
	        tokens.push({tag: '_t', text: new String(buf)});
	        buf = '';
	      }
	    }

	    function lineIsWhitespace() {
	      var isAllWhitespace = true;
	      for (var j = lineStart; j < tokens.length; j++) {
	        isAllWhitespace =
	          (Hogan.tags[tokens[j].tag] < Hogan.tags['_v']) ||
	          (tokens[j].tag == '_t' && tokens[j].text.match(rIsWhitespace) === null);
	        if (!isAllWhitespace) {
	          return false;
	        }
	      }

	      return isAllWhitespace;
	    }

	    function filterLine(haveSeenTag, noNewLine) {
	      addBuf();

	      if (haveSeenTag && lineIsWhitespace()) {
	        for (var j = lineStart, next; j < tokens.length; j++) {
	          if (tokens[j].text) {
	            if ((next = tokens[j+1]) && next.tag == '>') {
	              // set indent to token value
	              next.indent = tokens[j].text.toString()
	            }
	            tokens.splice(j, 1);
	          }
	        }
	      } else if (!noNewLine) {
	        tokens.push({tag:'\n'});
	      }

	      seenTag = false;
	      lineStart = tokens.length;
	    }

	    function changeDelimiters(text, index) {
	      var close = '=' + ctag,
	          closeIndex = text.indexOf(close, index),
	          delimiters = trim(
	            text.substring(text.indexOf('=', index) + 1, closeIndex)
	          ).split(' ');

	      otag = delimiters[0];
	      ctag = delimiters[delimiters.length - 1];

	      return closeIndex + close.length - 1;
	    }

	    if (delimiters) {
	      delimiters = delimiters.split(' ');
	      otag = delimiters[0];
	      ctag = delimiters[1];
	    }

	    for (i = 0; i < len; i++) {
	      if (state == IN_TEXT) {
	        if (tagChange(otag, text, i)) {
	          --i;
	          addBuf();
	          state = IN_TAG_TYPE;
	        } else {
	          if (text.charAt(i) == '\n') {
	            filterLine(seenTag);
	          } else {
	            buf += text.charAt(i);
	          }
	        }
	      } else if (state == IN_TAG_TYPE) {
	        i += otag.length - 1;
	        tag = Hogan.tags[text.charAt(i + 1)];
	        tagType = tag ? text.charAt(i + 1) : '_v';
	        if (tagType == '=') {
	          i = changeDelimiters(text, i);
	          state = IN_TEXT;
	        } else {
	          if (tag) {
	            i++;
	          }
	          state = IN_TAG;
	        }
	        seenTag = i;
	      } else {
	        if (tagChange(ctag, text, i)) {
	          tokens.push({tag: tagType, n: trim(buf), otag: otag, ctag: ctag,
	                       i: (tagType == '/') ? seenTag - otag.length : i + ctag.length});
	          buf = '';
	          i += ctag.length - 1;
	          state = IN_TEXT;
	          if (tagType == '{') {
	            if (ctag == '}}') {
	              i++;
	            } else {
	              cleanTripleStache(tokens[tokens.length - 1]);
	            }
	          }
	        } else {
	          buf += text.charAt(i);
	        }
	      }
	    }

	    filterLine(seenTag, true);

	    return tokens;
	  }

	  function cleanTripleStache(token) {
	    if (token.n.substr(token.n.length - 1) === '}') {
	      token.n = token.n.substring(0, token.n.length - 1);
	    }
	  }

	  function trim(s) {
	    if (s.trim) {
	      return s.trim();
	    }

	    return s.replace(/^\s*|\s*$/g, '');
	  }

	  function tagChange(tag, text, index) {
	    if (text.charAt(index) != tag.charAt(0)) {
	      return false;
	    }

	    for (var i = 1, l = tag.length; i < l; i++) {
	      if (text.charAt(index + i) != tag.charAt(i)) {
	        return false;
	      }
	    }

	    return true;
	  }

	  // the tags allowed inside super templates
	  var allowedInSuper = {'_t': true, '\n': true, '$': true, '/': true};

	  function buildTree(tokens, kind, stack, customTags) {
	    var instructions = [],
	        opener = null,
	        tail = null,
	        token = null;

	    tail = stack[stack.length - 1];

	    while (tokens.length > 0) {
	      token = tokens.shift();

	      if (tail && tail.tag == '<' && !(token.tag in allowedInSuper)) {
	        throw new Error('Illegal content in < super tag.');
	      }

	      if (Hogan.tags[token.tag] <= Hogan.tags['$'] || isOpener(token, customTags)) {
	        stack.push(token);
	        token.nodes = buildTree(tokens, token.tag, stack, customTags);
	      } else if (token.tag == '/') {
	        if (stack.length === 0) {
	          throw new Error('Closing tag without opener: /' + token.n);
	        }
	        opener = stack.pop();
	        if (token.n != opener.n && !isCloser(token.n, opener.n, customTags)) {
	          throw new Error('Nesting error: ' + opener.n + ' vs. ' + token.n);
	        }
	        opener.end = token.i;
	        return instructions;
	      } else if (token.tag == '\n') {
	        token.last = (tokens.length == 0) || (tokens[0].tag == '\n');
	      }

	      instructions.push(token);
	    }

	    if (stack.length > 0) {
	      throw new Error('missing closing tag: ' + stack.pop().n);
	    }

	    return instructions;
	  }

	  function isOpener(token, tags) {
	    for (var i = 0, l = tags.length; i < l; i++) {
	      if (tags[i].o == token.n) {
	        token.tag = '#';
	        return true;
	      }
	    }
	  }

	  function isCloser(close, open, tags) {
	    for (var i = 0, l = tags.length; i < l; i++) {
	      if (tags[i].c == close && tags[i].o == open) {
	        return true;
	      }
	    }
	  }

	  function stringifySubstitutions(obj) {
	    var items = [];
	    for (var key in obj) {
	      items.push('"' + esc(key) + '": function(c,p,t,i) {' + obj[key] + '}');
	    }
	    return "{ " + items.join(",") + " }";
	  }

	  function stringifyPartials(codeObj) {
	    var partials = [];
	    for (var key in codeObj.partials) {
	      partials.push('"' + esc(key) + '":{name:"' + esc(codeObj.partials[key].name) + '", ' + stringifyPartials(codeObj.partials[key]) + "}");
	    }
	    return "partials: {" + partials.join(",") + "}, subs: " + stringifySubstitutions(codeObj.subs);
	  }

	  Hogan.stringify = function(codeObj, text, options) {
	    return "{code: function (c,p,i) { " + Hogan.wrapMain(codeObj.code) + " }," + stringifyPartials(codeObj) +  "}";
	  }

	  var serialNo = 0;
	  Hogan.generate = function(tree, text, options) {
	    serialNo = 0;
	    var context = { code: '', subs: {}, partials: {} };
	    Hogan.walk(tree, context);

	    if (options.asString) {
	      return this.stringify(context, text, options);
	    }

	    return this.makeTemplate(context, text, options);
	  }

	  Hogan.wrapMain = function(code) {
	    return 'var t=this;t.b(i=i||"");' + code + 'return t.fl();';
	  }

	  Hogan.template = Hogan.Template;

	  Hogan.makeTemplate = function(codeObj, text, options) {
	    var template = this.makePartials(codeObj);
	    template.code = new Function('c', 'p', 'i', this.wrapMain(codeObj.code));
	    return new this.template(template, text, this, options);
	  }

	  Hogan.makePartials = function(codeObj) {
	    var key, template = {subs: {}, partials: codeObj.partials, name: codeObj.name};
	    for (key in template.partials) {
	      template.partials[key] = this.makePartials(template.partials[key]);
	    }
	    for (key in codeObj.subs) {
	      template.subs[key] = new Function('c', 'p', 't', 'i', codeObj.subs[key]);
	    }
	    return template;
	  }

	  function esc(s) {
	    return s.replace(rSlash, '\\\\')
	            .replace(rQuot, '\\\"')
	            .replace(rNewline, '\\n')
	            .replace(rCr, '\\r')
	            .replace(rLineSep, '\\u2028')
	            .replace(rParagraphSep, '\\u2029');
	  }

	  function chooseMethod(s) {
	    return (~s.indexOf('.')) ? 'd' : 'f';
	  }

	  function createPartial(node, context) {
	    var prefix = "<" + (context.prefix || "");
	    var sym = prefix + node.n + serialNo++;
	    context.partials[sym] = {name: node.n, partials: {}};
	    context.code += 't.b(t.rp("' +  esc(sym) + '",c,p,"' + (node.indent || '') + '"));';
	    return sym;
	  }

	  Hogan.codegen = {
	    '#': function(node, context) {
	      context.code += 'if(t.s(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,1),' +
	                      'c,p,0,' + node.i + ',' + node.end + ',"' + node.otag + " " + node.ctag + '")){' +
	                      't.rs(c,p,' + 'function(c,p,t){';
	      Hogan.walk(node.nodes, context);
	      context.code += '});c.pop();}';
	    },

	    '^': function(node, context) {
	      context.code += 'if(!t.s(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,1),c,p,1,0,0,"")){';
	      Hogan.walk(node.nodes, context);
	      context.code += '};';
	    },

	    '>': createPartial,
	    '<': function(node, context) {
	      var ctx = {partials: {}, code: '', subs: {}, inPartial: true};
	      Hogan.walk(node.nodes, ctx);
	      var template = context.partials[createPartial(node, context)];
	      template.subs = ctx.subs;
	      template.partials = ctx.partials;
	    },

	    '$': function(node, context) {
	      var ctx = {subs: {}, code: '', partials: context.partials, prefix: node.n};
	      Hogan.walk(node.nodes, ctx);
	      context.subs[node.n] = ctx.code;
	      if (!context.inPartial) {
	        context.code += 't.sub("' + esc(node.n) + '",c,p,i);';
	      }
	    },

	    '\n': function(node, context) {
	      context.code += write('"\\n"' + (node.last ? '' : ' + i'));
	    },

	    '_v': function(node, context) {
	      context.code += 't.b(t.v(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,0)));';
	    },

	    '_t': function(node, context) {
	      context.code += write('"' + esc(node.text) + '"');
	    },

	    '{': tripleStache,

	    '&': tripleStache
	  }

	  function tripleStache(node, context) {
	    context.code += 't.b(t.t(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,0)));';
	  }

	  function write(s) {
	    return 't.b(' + s + ');';
	  }

	  Hogan.walk = function(nodelist, context) {
	    var func;
	    for (var i = 0, l = nodelist.length; i < l; i++) {
	      func = Hogan.codegen[nodelist[i].tag];
	      func && func(nodelist[i], context);
	    }
	    return context;
	  }

	  Hogan.parse = function(tokens, text, options) {
	    options = options || {};
	    return buildTree(tokens, '', [], options.sectionTags || []);
	  }

	  Hogan.cache = {};

	  Hogan.cacheKey = function(text, options) {
	    return [text, !!options.asString, !!options.disableLambda, options.delimiters, !!options.modelGet].join('||');
	  }

	  Hogan.compile = function(text, options) {
	    options = options || {};
	    var key = Hogan.cacheKey(text, options);
	    var template = this.cache[key];

	    if (template) {
	      var partials = template.partials;
	      for (var name in partials) {
	        delete partials[name].instance;
	      }
	      return template;
	    }

	    template = this.generate(this.parse(this.scan(text, options.delimiters), text, options), text, options);
	    return this.cache[key] = template;
	  }
	})( true ? exports : Hogan);


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 *  Copyright 2011 Twitter, Inc.
	 *  Licensed under the Apache License, Version 2.0 (the "License");
	 *  you may not use this file except in compliance with the License.
	 *  You may obtain a copy of the License at
	 *
	 *  http://www.apache.org/licenses/LICENSE-2.0
	 *
	 *  Unless required by applicable law or agreed to in writing, software
	 *  distributed under the License is distributed on an "AS IS" BASIS,
	 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 *  See the License for the specific language governing permissions and
	 *  limitations under the License.
	 */

	var Hogan = {};

	(function (Hogan) {
	  Hogan.Template = function (codeObj, text, compiler, options) {
	    codeObj = codeObj || {};
	    this.r = codeObj.code || this.r;
	    this.c = compiler;
	    this.options = options || {};
	    this.text = text || '';
	    this.partials = codeObj.partials || {};
	    this.subs = codeObj.subs || {};
	    this.buf = '';
	  }

	  Hogan.Template.prototype = {
	    // render: replaced by generated code.
	    r: function (context, partials, indent) { return ''; },

	    // variable escaping
	    v: hoganEscape,

	    // triple stache
	    t: coerceToString,

	    render: function render(context, partials, indent) {
	      return this.ri([context], partials || {}, indent);
	    },

	    // render internal -- a hook for overrides that catches partials too
	    ri: function (context, partials, indent) {
	      return this.r(context, partials, indent);
	    },

	    // ensurePartial
	    ep: function(symbol, partials) {
	      var partial = this.partials[symbol];

	      // check to see that if we've instantiated this partial before
	      var template = partials[partial.name];
	      if (partial.instance && partial.base == template) {
	        return partial.instance;
	      }

	      if (typeof template == 'string') {
	        if (!this.c) {
	          throw new Error("No compiler available.");
	        }
	        template = this.c.compile(template, this.options);
	      }

	      if (!template) {
	        return null;
	      }

	      // We use this to check whether the partials dictionary has changed
	      this.partials[symbol].base = template;

	      if (partial.subs) {
	        // Make sure we consider parent template now
	        if (!partials.stackText) partials.stackText = {};
	        for (key in partial.subs) {
	          if (!partials.stackText[key]) {
	            partials.stackText[key] = (this.activeSub !== undefined && partials.stackText[this.activeSub]) ? partials.stackText[this.activeSub] : this.text;
	          }
	        }
	        template = createSpecializedPartial(template, partial.subs, partial.partials,
	          this.stackSubs, this.stackPartials, partials.stackText);
	      }
	      this.partials[symbol].instance = template;

	      return template;
	    },

	    // tries to find a partial in the current scope and render it
	    rp: function(symbol, context, partials, indent) {
	      var partial = this.ep(symbol, partials);
	      if (!partial) {
	        return '';
	      }

	      return partial.ri(context, partials, indent);
	    },

	    // render a section
	    rs: function(context, partials, section) {
	      var tail = context[context.length - 1];

	      if (!isArray(tail)) {
	        section(context, partials, this);
	        return;
	      }

	      for (var i = 0; i < tail.length; i++) {
	        context.push(tail[i]);
	        section(context, partials, this);
	        context.pop();
	      }
	    },

	    // maybe start a section
	    s: function(val, ctx, partials, inverted, start, end, tags) {
	      var pass;

	      if (isArray(val) && val.length === 0) {
	        return false;
	      }

	      if (typeof val == 'function') {
	        val = this.ms(val, ctx, partials, inverted, start, end, tags);
	      }

	      pass = !!val;

	      if (!inverted && pass && ctx) {
	        ctx.push((typeof val == 'object') ? val : ctx[ctx.length - 1]);
	      }

	      return pass;
	    },

	    // find values with dotted names
	    d: function(key, ctx, partials, returnFound) {
	      var found,
	          names = key.split('.'),
	          val = this.f(names[0], ctx, partials, returnFound),
	          doModelGet = this.options.modelGet,
	          cx = null;

	      if (key === '.' && isArray(ctx[ctx.length - 2])) {
	        val = ctx[ctx.length - 1];
	      } else {
	        for (var i = 1; i < names.length; i++) {
	          found = findInScope(names[i], val, doModelGet);
	          if (found !== undefined) {
	            cx = val;
	            val = found;
	          } else {
	            val = '';
	          }
	        }
	      }

	      if (returnFound && !val) {
	        return false;
	      }

	      if (!returnFound && typeof val == 'function') {
	        ctx.push(cx);
	        val = this.mv(val, ctx, partials);
	        ctx.pop();
	      }

	      return val;
	    },

	    // find values with normal names
	    f: function(key, ctx, partials, returnFound) {
	      var val = false,
	          v = null,
	          found = false,
	          doModelGet = this.options.modelGet;

	      for (var i = ctx.length - 1; i >= 0; i--) {
	        v = ctx[i];
	        val = findInScope(key, v, doModelGet);
	        if (val !== undefined) {
	          found = true;
	          break;
	        }
	      }

	      if (!found) {
	        return (returnFound) ? false : "";
	      }

	      if (!returnFound && typeof val == 'function') {
	        val = this.mv(val, ctx, partials);
	      }

	      return val;
	    },

	    // higher order templates
	    ls: function(func, cx, partials, text, tags) {
	      var oldTags = this.options.delimiters;

	      this.options.delimiters = tags;
	      this.b(this.ct(coerceToString(func.call(cx, text)), cx, partials));
	      this.options.delimiters = oldTags;

	      return false;
	    },

	    // compile text
	    ct: function(text, cx, partials) {
	      if (this.options.disableLambda) {
	        throw new Error('Lambda features disabled.');
	      }
	      return this.c.compile(text, this.options).render(cx, partials);
	    },

	    // template result buffering
	    b: function(s) { this.buf += s; },

	    fl: function() { var r = this.buf; this.buf = ''; return r; },

	    // method replace section
	    ms: function(func, ctx, partials, inverted, start, end, tags) {
	      var textSource,
	          cx = ctx[ctx.length - 1],
	          result = func.call(cx);

	      if (typeof result == 'function') {
	        if (inverted) {
	          return true;
	        } else {
	          textSource = (this.activeSub && this.subsText && this.subsText[this.activeSub]) ? this.subsText[this.activeSub] : this.text;
	          return this.ls(result, cx, partials, textSource.substring(start, end), tags);
	        }
	      }

	      return result;
	    },

	    // method replace variable
	    mv: function(func, ctx, partials) {
	      var cx = ctx[ctx.length - 1];
	      var result = func.call(cx);

	      if (typeof result == 'function') {
	        return this.ct(coerceToString(result.call(cx)), cx, partials);
	      }

	      return result;
	    },

	    sub: function(name, context, partials, indent) {
	      var f = this.subs[name];
	      if (f) {
	        this.activeSub = name;
	        f(context, partials, this, indent);
	        this.activeSub = false;
	      }
	    }

	  };

	  //Find a key in an object
	  function findInScope(key, scope, doModelGet) {
	    var val;

	    if (scope && typeof scope == 'object') {

	      if (scope[key] !== undefined) {
	        val = scope[key];

	      // try lookup with get for backbone or similar model data
	      } else if (doModelGet && scope.get && typeof scope.get == 'function') {
	        val = scope.get(key);
	      }
	    }

	    return val;
	  }

	  function createSpecializedPartial(instance, subs, partials, stackSubs, stackPartials, stackText) {
	    function PartialTemplate() {};
	    PartialTemplate.prototype = instance;
	    function Substitutions() {};
	    Substitutions.prototype = instance.subs;
	    var key;
	    var partial = new PartialTemplate();
	    partial.subs = new Substitutions();
	    partial.subsText = {};  //hehe. substext.
	    partial.buf = '';

	    stackSubs = stackSubs || {};
	    partial.stackSubs = stackSubs;
	    partial.subsText = stackText;
	    for (key in subs) {
	      if (!stackSubs[key]) stackSubs[key] = subs[key];
	    }
	    for (key in stackSubs) {
	      partial.subs[key] = stackSubs[key];
	    }

	    stackPartials = stackPartials || {};
	    partial.stackPartials = stackPartials;
	    for (key in partials) {
	      if (!stackPartials[key]) stackPartials[key] = partials[key];
	    }
	    for (key in stackPartials) {
	      partial.partials[key] = stackPartials[key];
	    }

	    return partial;
	  }

	  var rAmp = /&/g,
	      rLt = /</g,
	      rGt = />/g,
	      rApos = /\'/g,
	      rQuot = /\"/g,
	      hChars = /[&<>\"\']/;

	  function coerceToString(val) {
	    return String((val === null || val === undefined) ? '' : val);
	  }

	  function hoganEscape(str) {
	    str = coerceToString(str);
	    return hChars.test(str) ?
	      str
	        .replace(rAmp, '&amp;')
	        .replace(rLt, '&lt;')
	        .replace(rGt, '&gt;')
	        .replace(rApos, '&#39;')
	        .replace(rQuot, '&quot;') :
	      str;
	  }

	  var isArray = Array.isArray || function(a) {
	    return Object.prototype.toString.call(a) === '[object Array]';
	  };

	})( true ? exports : Hogan);


/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = "<div class=\"wqueue\">\r\n\t{{#list}}\r\n\t\t<div class=\"patient\">\r\n\t\t\t[{{patient_id_rep}}]\r\n\t\t\t{{last_name}} {{first_name}} \r\n\t\t\t({{last_name_yomi}} {{first_name_yomi}})\r\n\t\t\t<button data-visit-id=\"{{visit_id}}\" class=\"start-cashier-button\">会計</button>\r\n\t\t</div>\r\n\t{{/list}}\r\n</div>\r\n"

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate) {"use strict";

	(function(exports){

	function iterExec(i, funs, done){
		if( i >= funs.length ){
			done();
			return;
		}
		var f = funs[i];
		f(function(err){
			if( err ){
				done(err);
				return;
			}
			iterExec(i+1, funs, done);
		})
	}

	exports.exec = function(funs, done){
		funs = funs.slice();
		iterExec(0, funs, done);
	};

	exports.execPara = function(funs, done){
		if( funs.length === 0 ){
			done();
			return;
		}
		funs = funs.slice();
		var n = funs.length;
		var no_more = false;
		funs.forEach(function(f){
			if( no_more ){
				return;
			}
			f(function(err){
				if( no_more ){
					return;
				}
				if( err ){
					no_more = true;
					done(err);
					return;
				}
				n -= 1;
				if( n === 0 ){
					done();
				}
			})
		})
	}

	function iterForEach(i, arr, fn, done){
		if( i >= arr.length ){
			done();
			return;
		}
		fn(arr[i], function(err){
			if( err ){
				done(err);
				return;
			}
			iterForEach(i+1, arr, fn, done);
		})
	}

	exports.forEach = function(arr, fn, done){
		arr = arr.slice();
		iterForEach(0, arr, fn, done);
	};

	exports.forEachPara = function(arr, fn, done){
		if( arr.length === 0 ){
			done();
			return;
		}
		arr = arr.slice();
		var n = arr.length;
		var no_more = false;
		arr.forEach(function(ele){
			if( no_more ){
				return;
			}
			fn(ele, function(err){
				if( no_more ){
					return;
				}
				if( err ){
					no_more = true;
					done(err);
					return;
				}
				n -= 1;
				if( n === 0 ){
					done();
				}
			})
		});
	};

	function Queue(){
		this.queue = [];
	}

	Queue.prototype.push = function(fn, cb){
		this.queue.push({
			fn: fn,
			cb: cb
		});
		if( this.queue.length === 1 ){
			this.run();
		}
	}

	Queue.prototype.run = function(){
		if( this.queue.length === 0 ){
			return;
		}
		var entry = this.queue[0];
		var fn = entry.fn;
		var cb = entry.cb;
		var self = this;
		fn(function(){
			var args = [].slice.call(arguments);
			cb.apply(undefined, args);
			if( self.queue.length > 0 && self.queue[0] === entry ){
				self.queue.shift();
				self.run();
			}
		})
	}

	var theQueue = new Queue();

	exports.enqueue = function(fn, cb){
		theQueue.push(fn, cb);
	};

	exports.mapPara = function(arr, fn, cb){
		var index = 0;
		var dataArr = arr.map(function(value){
			return {
				index: index++,
				value: value
			}
		});
		var retArr = [];
		exports.forEachPara(dataArr, function(data, done){
			var value = fn(data.value, function(err, result){
				if( err ){
					done(err);
					return;
				}
				retArr[data.index] = result;
				done();
			});
		}, function(err){
			if( err ){
				cb(err);
				return;
			}
			cb(undefined, retArr);
		})
	};

	exports.fetch = function(url, opt, op, cb){
		fetch(url, opt)
		.then(function(response){
			if( response.ok ){
				response[op]()
				.then(function(result){
					cb(undefined, result);
				})
				.catch(function(err){
					cb(err.message);
				})
			} else { 
				response.text()
				.then(function(text){
					cb(text);
				})
				.catch(function(err){
					cb(err.message);
				})
			}
		})
		.catch(function(err){
			cb(err.message);
		})
	}

	exports.fetchJson = function (url, opt, cb){
		exports.fetch(url, opt, "json", function(err, result){
			setImmediate(function(){
				cb(err, result);
			});
		});
	}

	exports.fetchText = function (url, opt, cb){
		exports.fetch(url, opt, "text", function(err, result){
			setImmediate(function(){
				cb(err, result);
			});
		});
	}

	})( true ? exports : (window.conti = {}));

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5).setImmediate))

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var hogan = __webpack_require__(7);
	var tmplSrc = __webpack_require__(13);
	var tmpl = hogan.compile(tmplSrc);
	var service = __webpack_require__(1);
	var conti = __webpack_require__(11);
	var mConsts = __webpack_require__(14);
	var Wqueue = __webpack_require__(6);
	var Receipt = __webpack_require__(15);
	var kanjidate = __webpack_require__(17);

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
			bindGotoReceipt(dom, patient, visit, meisai);
			bindGotoStart(dom);
		});
	};

	function bindGotoReceipt(dom, patient, visit, meisai){
		dom.querySelector(".goto-receipt-button").addEventListener("click", function(){
			Receipt.render(dom);
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
			"発効日": dateToKanji(util.today()),
			"患者番号": patient.patient_id,
			"保険種別": util.hokenRep(visit),
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


/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = "<div class=\"detail\">\r\n<div style=\"font-size:20px\">\r\n\t{{#patient}}\r\n\t\t[{{patient_id}}]\r\n\t\t{{last_name}} {{first_name}}\r\n\t{{/patient}}\r\n</div>\r\n<table>\r\n<tbody>\r\n{{#sections}}\r\n\t<tr>\r\n\t\t<td colspan=\"3\" style=\"font-weight:bold\">{{name}}</td>\r\n\t</tr>\r\n\t{{#items}}\r\n\t\t<tr>\r\n\t\t\t<td style=\"width:2em\">&nbsp;</td>\r\n\t\t\t<td width=\"width:12em\">{{label}}</td>\r\n\t\t\t<td style=\"width:7em; text-align:right\">\r\n\t\t\t\t{{tanka}}x{{count}} = {{total}} 点\r\n\t\t\t</td>\r\n\t\t</tr>\r\n\t{{/items}}\r\n{{/sections}}\r\n\t<tr>\r\n\t\t<td colspan=\"3\" style=\"text-align:right;border-top:double #999\">\r\n\t\t\t総点 {{total_ten}} 点\r\n\t\t</td>\r\n\t</tr>\r\n</tbody>\r\n</table>\r\n<div style=\"font-size:20px\">\r\n\t請求額： <span mc-name=\"charge-disp\">{{charge}}</span> 円 （負担 {{futan_wari}} 割）\r\n\t<button class=\"goto-receipt-button\" style=\"font-size:16px\">次へ</button>\r\n\t<a href=\"javascript:void(0)\" class=\"goto-start-button\" \r\n\t\tstyle=\"color:#666;font-size:16px\">戻る</a>\r\n</div>\r\n</div>\r\n"

/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";

	exports.WqueueStateWaitExam = 0;
	exports.WqueueStateInExam = 1;
	exports.WqueueStateWaitCashier = 2;
	exports.WqueueStateWaitDrug = 3;
	exports.WqueueStateWaitReExam = 4;
	exports.WqueueStateWaitAppoint = 5;

	exports.PharmaQueueStateWaitPack = 0;
	exports.PharmaQueueStateInPack   = 1;
	exports.PharmaQueueStatePackDone = 2;

	exports.DiseaseEndReasonNotEnded = "N";
	exports.DiseaseEndReasonCured = "C";
	exports.DiseaseEndReasonStopped = "S";
	exports.DiseaseEndReasonDead = "D";

	exports.DrugCategoryNaifuku = 0;
	exports.DrugCategoryTonpuku = 1;
	exports.DrugCategoryGaiyou  = 2;

	exports.ConductKindHikaChuusha = 0;
	exports.ConductKindJoumyakuChuusha = 1;
	exports.ConductKindOtherChuusha = 2;
	exports.ConductKindGazou = 3;

	exports.ZaikeiNaifuku = 1;
	exports.ZaikeiOther = 3;
	exports.ZaikeiChuusha = 4;
	exports.ZaikeiGaiyou = 6;
	exports.ZaikeiShikaYakuzai = 8;
	exports.ZaikeiShikaTokutei = 9;

	exports.SmallestPostfixShuushokugoCode = 8000;
	exports.LargestPostfixShuushookugoCode = 8999;

	exports.MeisaiSections = [
	        "初・再診料", "医学管理等", "在宅医療", "検査", "画像診断",
	        "投薬", "注射", "処置", "その他"       
	    ];

	exports.SHUUKEI_SHOSHIN = "110";
	exports.SHUUKEI_SAISHIN_SAISHIN = "120";
	exports.SHUUKEI_SAISHIN_GAIRAIKANRI = "122";
	exports.SHUUKEI_SAISHIN_JIKANGAI = "123";
	exports.SHUUKEI_SAISHIN_KYUUJITSU = "124";
	exports.SHUUKEI_SAISHIN_SHINYA = "125";
	exports.SHUUKEI_SHIDO = "130";
	exports.SHUUKEI_ZAITAKU = "140";
	exports.SHUUKEI_TOYAKU_NAIFUKUTONPUKUCHOZAI = "210";
	exports.SHUUKEI_TOYAKU_GAIYOCHOZAI = "230";
	exports.SHUUKEI_TOYAKU_SHOHO = "250";
	exports.SHUUKEI_TOYAKU_MADOKU = "260";
	exports.SHUUKEI_TOYAKU_CHOKI = "270";
	exports.SHUUKEI_CHUSHA_SEIBUTSUETC = "300";
	exports.SHUUKEI_CHUSHA_HIKA = "311";
	exports.SHUUKEI_CHUSHA_JOMYAKU = "321";
	exports.SHUUKEI_CHUSHA_OTHERS = "331";
	exports.SHUUKEI_SHOCHI = "400";
	exports.SHUUKEI_SHUJUTSU_SHUJUTSU = "500";
	exports.SHUUKEI_SHUJUTSU_YUKETSU = "502";
	exports.SHUUKEI_MASUI = "540";
	exports.SHUUKEI_KENSA = "600";
	exports.SHUUKEI_GAZOSHINDAN = "700";
	exports.SHUUKEI_OTHERS = "800";

	exports.HOUKATSU_NONE = '00';
	exports.HOUKATSU_KETSUEKIKageKU = "01";
	exports.HOUKATSU_ENDOCRINE = "02";
	exports.HOUKATSU_HEPATITIS = "03";
	exports.HOUKATSU_TUMOR = "04";
	exports.HOUKATSU_TUMORMISC = "05";
	exports.HOUKATSU_COAGULO = "06";
	exports.HOUKATSU_AUTOANTIBODY = "07";
	exports.HOUKATSU_TOLERANCE = "08";


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var hogan = __webpack_require__(7);
	var tmplSrc = __webpack_require__(16);
	var tmpl = hogan.compile(tmplSrc);

	exports.render = function(dom, visitId){
		var html = tmpl.render({

		});
		dom.innerHTML = html
	};


/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = "<div class=\"receipt\">\r\nReceipt\r\n</div>\r\n"

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	(function(exports){

	"use strict";

	var trunc = Math.trunc || function(x){
		if( x >= 0 ){
			return Math.floor(x);
		} else {
			return Math.ceil(x);
		}
	};

	function ge(year1, month1, day1, year2, month2, day2){
		if( year1 > year2 ){
			return true;
		}
		if( year1 < year2 ){
			return false;
		}
		if( month1 > month2 ){
			return true;
		}
		if( month1 < month2 ){
			return false;
		}
		return day1 >= day2;
	}

	function gengouToAlpha(gengou){
		switch(gengou){
			case "平成": return "Heisei";
			case "昭和": return "Shouwa";
			case "大正": return "Taishou";
			case "明治": return "Meiji";
			default: throw new Error("unknown gengou: " + gengou);
		}
	}

	function padLeft(str, n, ch){
		var m = n - str.length;
		var pad = "";
		while( m-- > 0 ){
			pad += ch;
		}
		return pad + str;
	}

	var zenkakuDigits = ["０", "１", "２", "３", "４", "５", "６", "７", "８", "９"];
	var alphaDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

	function isZenkakuDigit(ch){
		return zenkakuDigits.indexOf(ch) >= 0;
	}

	function isAlphaDigit(ch){
		return alphaDigits.indexOf(ch) >= 0;
	}

	function alphaDigitToZenkaku(ch){
		var i = alphaDigits.indexOf(ch);
		return i >= 0 ? zenkakuDigits[i] : ch;
	}

	function isDateObject(obj){
		return obj instanceof Date;
	}

	function removeOpt(opts, what){
		var result = [];
		for(var i=0;i<opts.length;i++){
			var opt = opts[i];
			if( opt === what ){
				continue;
			} else {
				result.push(opt);
			}
		}
		return result;
	}

	function toGengou(year, month, day){
		if( ge(year, month, day, 1989, 1, 8) ){
			return { gengou:"平成", nen:year - 1988 };
		}
		if( ge(year, month, day, 1926, 12, 25) ){
			return { gengou:"昭和", nen:year - 1925 };
		}
		if( ge(year, month, day, 1912, 7, 30) ){
			return { gengou:"大正", nen:year - 1911 };
		}
		if( ge(year, month, day, 1873, 1, 1) ){
			return { gengou: "明治", nen: year - 1867 };
		}
		return { gengou: "西暦", nen: year };
	}

	exports.toGengou = toGengou;

	function fromGengou(gengou, nen){
	    nen = Math.floor(+nen);
	    if( nen < 0 ){
	    	throw new Error("invalid nen: " + nen);
	    }
	    switch (gengou) {
	        case "平成":
	            return 1988 + nen;
	        case "昭和":
	            return 1925 + nen;
	        case "大正":
	            return 1911 + nen;
	        case "明治":
	            return 1867 + nen;
	        case "西暦":
	            return nen;
	        default:
	            throw new Error("invalid gengou: " + gengou);
	    }
	}

	exports.fromGengou = fromGengou;

	var youbi = ["日", "月", "火", "水", "木", "金", "土"];

	function toYoubi(dayOfWeek){
		return youbi[dayOfWeek];
	}

	exports.toYoubi = toYoubi;

	function KanjiDate(date){
		this.year = date.getFullYear();
		this.month = date.getMonth()+1;
		this.day = date.getDate();
		this.hour = date.getHours();
		this.minute = date.getMinutes();
		this.second = date.getSeconds();
		this.msec = date.getMilliseconds();
		this.dayOfWeek = date.getDay();
		var g = toGengou(this.year, this.month, this.day);
		this.gengou = g.gengou;
		this.nen = g.nen;
		this.youbi = youbi[this.dayOfWeek];
	}

	function KanjiDateExplicit(year, month, day, hour, minute, second, millisecond){
		if( hour === undefined ) hour = 0;
		if( minute === undefined ) minute = 0;
		if( second === undefined ) second = 0;
		if( millisecond === undefined ) millisecond = 0;
		var date = new Date(year, month-1, day, hour, minute, second, millisecond);
		return new KanjiDate(date);
	}

	function KanjiDateFromString(str){
		var m;
		m = str.match(/^(\d{4})-(\d{2})-(\d{2})$/);
		if( m ){
			return KanjiDateExplicit(+m[1], +m[2], +m[3]);
		}
		m = str.match(/^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})$/);
		if( m ){
			return KanjiDateExplicit(+m[1], +m[2], +m[3], +m[4], +m[5], +m[6]);
		}
		throw new Error("cannot convert to KanjiDate");
	}

	function parseFormatString(fmtStr){
		var result = [];
		var parts = fmtStr.split(/(\{[^}]+)\}/);
		parts.forEach(function(part){
			if( part === "" ) return;
			if( part[0] === "{" ){
				part = part.substring(1);
				var token = {opts: []};
				var colon = part.indexOf(":");
				if( part.indexOf(":") >= 0 ){
					token.part = part.substring(0, colon);
					var optStr = part.substring(colon+1).trim();
					if( optStr !== "" ){
						if( optStr.indexOf(",") >= 0 ){
							token.opts = optStr.split(/\s*,\s*/);
						} else {
							token.opts = [optStr];
						}
					}
				} else {
					token.part = part;
				}
				result.push(token);
			} else {
				result.push(part);
			}
		});
		return result;
	}

	var format1 = "{G}{N}年{M}月{D}日（{W}）";
	var format2 = "{G}{N}年{M}月{D}日";
	var format3 = "{G:a}{N}.{M}.{D}";
	var format4 = "{G}{N:2}年{M:2}月{D:2}日（{W}）";
	var format5 = "{G}{N:2}年{M:2}月{D:2}日";
	var format6 = "{G:a}{N:2}.{M:2}.{D:2}";
	var format7 = "{G}{N}年{M}月{D}日（{W}） {a}{h:12}時{m}分{s}秒";
	var format8 = "{G}{N:2}年{M:2}月{D:2}日（{W}） {a}{h:12,2}時{m:2}分{s:2}秒";
	var format9 = "{G}{N}年{M}月{D}日（{W}） {a}{h:12}時{m}分";
	var format10 = "{G}{N:2}年{M:2}月{D:2}日（{W}） {a}{h:12,2}時{m:2}分";
	var format11 = "{G}{N:z}年{M:z}月{D:z}日";
	var format12 = "{G}{N:z,2}年{M:z,2}月{D:z,2}日";
	var format13 = "{Y}-{M:2}-{D:2}";
	var format14 = "{Y}-{M:2}-{D:2} {h:2}:{m:2}:{s:2}";

	exports.f1 = format1;
	exports.f2 = format2;
	exports.f3 = format3;
	exports.f4 = format4;
	exports.f5 = format5;
	exports.f6 = format6;
	exports.f7 = format7;
	exports.f8 = format8;
	exports.f9 = format9;
	exports.f10 = format10;
	exports.f11 = format11;
	exports.f12 = format12;
	exports.f13 = format13;
	exports.f14 = format14;
	exports.fSqlDate = format13;
	exports.fSqlDateTime = format14;

	function gengouPart(kdate, opts){
		var style = "2";
		opts.forEach(function(opt){
			if( ["2", "1", "a", "alpha"].indexOf(opt) >= 0 ){
				style = opt;
			}
		})
		switch(style){
			case "2": return kdate.gengou;
			case "1": return kdate.gengou[0]; 
			case "a": return gengouToAlpha(kdate.gengou)[0]; 
			case "alpha": return gengouToAlpha(kdate.gengou);
			default: return kdate.gengou;
		}
	}

	function numberPart(num, opts){
		var zenkaku = false;
		var width = 1;
		opts.forEach(function(opt){
			switch(opt){
				case "1": width = 1; break;
				case "2": width = 2; break;
				case "z": zenkaku = true; break;
			}
		});
		var result = num.toString();
		if( zenkaku ){
			result = result.split("").map(alphaDigitToZenkaku).join("");
		}
		if( width > 1 && num < 10 ){
			result = (zenkaku ? "０" : "0") + result;
		}
		return result;
	}

	function nenPart(kdate, opts){
		if( kdate.nen === 1 && opts.indexOf("g") >= 0 ){
			return "元";
		} else {
			return numberPart(kdate.nen, opts);
		}
	}

	function youbiPart(kdate, opts){
		var style;
		opts.forEach(function(opt){
			if( ["1", "2", "3", "alpha"].indexOf(opt) >= 0 ){
				style = opt;
			}
		})
		switch(style){
			case "1": return kdate.youbi;
			case "2": return kdate.youbi + "曜";
			case "3": return kdate.youbi + "曜日";
			case "alpha": return dayOfWeek[kdate.dayOfWeek];
			default: return kdate.youbi;
		}
	}

	function hourPart(hour, opts){
		var ampm = false;
		if( opts.indexOf("12") >= 0 ){
			ampm = true;
			opts = removeOpt(opts, "12");
		}
		if( ampm ){
			hour = hour % 12;
		}
		return numberPart(hour, opts);
	}

	function ampmPart(kdate, opts){
		var style = "kanji";
		opts.forEach(function(opt){
			switch(opt){
				case "am/pm": style = "am/pm"; break;
				case "AM/PM": style = "AM/PM"; break;
			}
		});
		var am = kdate.hour < 12;
		switch(style){
			case "kanji": return am ? "午前" : "午後";
			case "am/pm": return am ? "am" : "pm";
			case "AM/PM": return am ? "AM" : "PM";
			default : throw new Error("unknown style for AM/PM");
		}
	}

	function yearPart(year, opts){
		return year.toString();
	}

	function format(formatStr, kdate){
		var output = [];
		var tokens = parseFormatString(formatStr);
		tokens.forEach(function(token){
			if( typeof token === "string" ){
				output.push(token);
			} else {
				switch(token.part){
					case "G": output.push(gengouPart(kdate, token.opts)); break;
					case "N": output.push(nenPart(kdate, token.opts)); break;
					case "M": output.push(numberPart(kdate.month, token.opts)); break;
					case "D": output.push(numberPart(kdate.day, token.opts)); break;
					case "W": output.push(youbiPart(kdate, token.opts)); break;
					case "h": output.push(hourPart(kdate.hour, token.opts)); break;
					case "m": output.push(numberPart(kdate.minute, token.opts)); break;
					case "s": output.push(numberPart(kdate.second, token.opts)); break;
					case "a": output.push(ampmPart(kdate, token.opts)); break;
					case "Y": output.push(yearPart(kdate.year, token.opts)); break;
				}
			}
		})
		return output.join("");
	}

	exports.format = function(){
		var narg = arguments.length;
		var formatStr, args, i;
		if( narg === 0 ){
			return format(format1, new KanjiDate(new Date()));
		} else if( narg === 1 ){
			return format(format1, cvt(arguments[0]));
		} else {
			formatStr = arguments[0];
			if( formatStr == null ){
				formatStr = format1;
			}
			args = [];
			for(i=1;i<arguments.length;i++){
				args.push(arguments[i]);
			}
			if( args.length === 1 ){
				return format(formatStr, cvt(args[0]));
			} else {
				return format(formatStr, KanjiDateExplicit.apply(null, args));
			}
		}
		throw new Error("invalid format call");

		function cvt(x){
			if( isDateObject(x) ){
				return new KanjiDate(x);
			} else if( typeof x === "string" ){
				return KanjiDateFromString(x);
			}
			throw new Error("cannot convert to KanjiDate");
		}
	}

	})( false ? (window.kanjidate = {}) : exports);

/***/ }
/******/ ]);