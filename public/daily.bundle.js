// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"rtcStats.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = rtcStats;
exports.getBatchArray = getBatchArray;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct.bind(); } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var batchArray = [];
var bufferArray = [];
function getBatchArray() {
  return batchArray;
}
var propertyMapAvg = {
  'inbound-rtp': ['packetsLost', 'framesDecoded', 'framesReceived', 'keyFramesDecoded', 'bytesReceived', 'packetsReceived', 'jitterBufferDelay', 'jitterBufferEmittedCount', 'totalSamplesReceived', 'concealedSamples', 'silentConcealedSamples', 'insertedSamplesForDeceleration', 'removedSamplesForAcceleration', 'totalSamplesDuration', 'totalAudioEnergy', 'audioLevel', 'pauseCount', 'freezeCount', 'totalFreezesDuration', 'totalPausesDuration', 'framesPerSecond', 'frameHeight', 'frameWidth'],
  'outbound-rtp': ['packetsLost', 'framesEncoded', 'framesSent', 'keyFramesEncoded', 'packetsSent', 'bytesSent', 'qualityLimitationDurations', 'framesPerSecond', 'frameHeight', 'frameWidth', 'audioLevel'],
  'remote-inbound-rtp': ['packetsLost']
};
var propertyMapLastValue = {
  "inbound-rtp": ["jitter"],
  "outbound-rtp": ["jitter"],
  "remote-inbound-rtp": ["jitter", "roundTripTime"]
};
var idFilterValue = ["IT01V1234"];
function rtcStats() {
  if (window.rtcstats) {
    console.warn("[RTCStats] Already declared");
    return;
  }
  window.rtcstats = {};
  var _config = {
    interval: 1,
    logInterval: 10,
    maxBatches: 24,
    maxBuffer: 5
  };
  var pcArray = [];
  batchArray = [];
  function writeBatch(_x) {
    return _writeBatch.apply(this, arguments);
  }
  function _writeBatch() {
    _writeBatch = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(batchCollection) {
      var aggregatedReports, averageData;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            aggregatedReports = batchCollection.flat();
            if (aggregatedReports.length) {
              _context2.next = 3;
              break;
            }
            return _context2.abrupt("return");
          case 3:
            bufferArray.push(aggregatedReports);
            if (bufferArray.length === _config.maxBuffer) {
              averageData = computeAverage();
              batchArray.push(averageData);
              bufferArray = [];
            }
            if (batchArray.length > _config.maxBatches) {
              batchArray.shift();
            }
          case 6:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return _writeBatch.apply(this, arguments);
  }
  setInterval(function () {
    console.log("[RTCStats] batchArray", batchArray);
  }, _config.logInterval * 1000);
  console.info("[RTCStats] Init");
  RTCPeerConnection = new Proxy(RTCPeerConnection, {
    construct: function construct(target, args) {
      var pc = _construct(target, _toConsumableArray(args));
      var TICK = _config.interval * 1000;
      pc.batch = [];
      pc.reportNum = 0;
      pc.connectionId = crypto.randomUUID();
      pcArray.push(pc);
      console.warn("[RTCStats] PeerConnection instantiated", pc);
      pc._getStats = /*#__PURE__*/function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(getStatsPromise) {
          var stats, r, logData;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return getStatsPromise;
              case 2:
                stats = _context.sent;
                r = Object.fromEntries(stats.entries());
                if (r) {
                  _context.next = 6;
                  break;
                }
                return _context.abrupt("return");
              case 6:
                logData = _objectSpread({
                  connectionId: this.connectionId,
                  reportNum: this.reportNum
                }, r);
                this.batch.push(logData);
                this.reportNum += 1;
              case 9:
              case "end":
                return _context.stop();
            }
          }, _callee, this);
        }));
        return function (_x2) {
          return _ref.apply(this, arguments);
        };
      }();
      pc.addEventListener("connectionstatechange", function () {
        clearInterval(pc._statsInterval);
        if (pc.connectionState === "connected") {
          pc._getStats(pc.getStats());
          pc._statsInterval = setInterval(function () {
            if (pc.connectionState !== "connected") return clearInterval(pc._statsInterval);
            pc._getStats(pc.getStats());
          }, TICK);
        }
      });
      return pc;
    }
  });
  setInterval(function () {
    if (!pcArray.length) {
      console.log("[RTCStats] No pc array");
      return;
    }
    var batchCollection = pcArray.filter(function (pc) {
      return pc.batch.length;
    }).map(function (pc) {
      return pc.batch.splice(0, pc.batch.length);
    });
    if (batchCollection.length) {
      writeBatch(batchCollection);
      window.rtcstats.batchArray = batchArray;
    }
  }, _config.interval * 1000);
  function computeAverage() {
    var valueSum = {};
    var valueCount = {};
    var lastValues = {};
    var averageValues = {};
    var _iterator = _createForOfIteratorHelper(bufferArray),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var sublist = _step.value;
        var _iterator2 = _createForOfIteratorHelper(sublist),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var report = _step2.value;
            for (var _id2 in report) {
              if (_id2 === 'connectionId' || _id2 === 'reportNum') continue;
              var item = report[_id2];
              var propertiesAvg = propertyMapAvg[item.type];
              var propertiesLast = propertyMapLastValue[item.type];
              if (propertiesAvg) {
                var _iterator3 = _createForOfIteratorHelper(propertiesAvg),
                  _step3;
                try {
                  for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                    var _property3 = _step3.value;
                    if (item.hasOwnProperty(_property3)) {
                      if (!valueSum[item.type]) {
                        valueSum[item.type] = {};
                        valueCount[item.type] = {};
                      }
                      if (!valueSum[item.type][_property3]) {
                        valueSum[item.type][_property3] = {};
                        valueCount[item.type][_property3] = {};
                      }
                      if (!valueSum[item.type][_property3][item.id]) {
                        valueSum[item.type][_property3][item.id] = 0;
                        valueCount[item.type][_property3][item.id] = 0;
                      }
                      valueSum[item.type][_property3][item.id] += item[_property3];
                      valueCount[item.type][_property3][item.id] += 1;
                    }
                  }
                } catch (err) {
                  _iterator3.e(err);
                } finally {
                  _iterator3.f();
                }
              }
              if (propertiesLast) {
                var _iterator4 = _createForOfIteratorHelper(propertiesLast),
                  _step4;
                try {
                  for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                    var _property4 = _step4.value;
                    if (item.hasOwnProperty(_property4)) {
                      if (!lastValues[item.type]) {
                        lastValues[item.type] = {};
                      }
                      if (!lastValues[item.type][_property4]) {
                        lastValues[item.type][_property4] = {};
                      }
                      lastValues[item.type][_property4][item.id] = item[_property4];
                    }
                  }
                } catch (err) {
                  _iterator4.e(err);
                } finally {
                  _iterator4.f();
                }
              }
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    for (var type in valueSum) {
      for (var property in valueSum[type]) {
        var totalValues = valueSum[type][property];
        var count = valueCount[type][property];
        averageValues[type] = _objectSpread(_objectSpread({}, averageValues[type]), {}, _defineProperty({}, property, {}));
        for (var id in totalValues) {
          averageValues[type][property][id] = totalValues[id] / count[id];
        }
      }
    }

    // Add last values
    for (var _type in lastValues) {
      for (var _property in lastValues[_type]) {
        var lastValue = lastValues[_type][_property];
        averageValues[_type] = _objectSpread(_objectSpread({}, averageValues[_type]), {}, _defineProperty({}, _property, lastValue));
      }
    }

    // Filter out specific IDs
    for (var _type2 in averageValues) {
      for (var _property2 in averageValues[_type2]) {
        for (var _id in averageValues[_type2][_property2]) {
          if (idFilterValue.includes(_id)) {
            delete averageValues[_type2][_property2][_id];
          }
        }
      }
    }
    return averageValues;
  }
}
},{}],"../node_modules/@daily-co/daily-js/dist/daily-iframe-esm.js":[function(require,module,exports) {
var global = arguments[3];
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DAILY_TRACK_STATE_SENDABLE = exports.DAILY_TRACK_STATE_PLAYABLE = exports.DAILY_TRACK_STATE_OFF = exports.DAILY_TRACK_STATE_LOADING = exports.DAILY_TRACK_STATE_INTERRUPTED = exports.DAILY_TRACK_STATE_BLOCKED = exports.DAILY_STATE_NEW = exports.DAILY_STATE_LEFT = exports.DAILY_STATE_JOINING = exports.DAILY_STATE_JOINED = exports.DAILY_STATE_ERROR = exports.DAILY_RECEIVE_SETTINGS_BASE_KEY = exports.DAILY_RECEIVE_SETTINGS_ALL_PARTICIPANTS_KEY = exports.DAILY_FATAL_ERROR_NOT_ALLOWED = exports.DAILY_FATAL_ERROR_NBF_TOKEN = exports.DAILY_FATAL_ERROR_NBF_ROOM = exports.DAILY_FATAL_ERROR_MEETING_FULL = exports.DAILY_FATAL_ERROR_EXP_TOKEN = exports.DAILY_FATAL_ERROR_EXP_ROOM = exports.DAILY_FATAL_ERROR_EOL = exports.DAILY_FATAL_ERROR_EJECTED = exports.DAILY_FATAL_ERROR_CONNECTION = exports.DAILY_EVENT_WAITING_PARTICIPANT_UPDATED = exports.DAILY_EVENT_WAITING_PARTICIPANT_REMOVED = exports.DAILY_EVENT_WAITING_PARTICIPANT_ADDED = exports.DAILY_EVENT_TRANSCRIPTION_STOPPED = exports.DAILY_EVENT_TRANSCRIPTION_STARTED = exports.DAILY_EVENT_TRANSCRIPTION_ERROR = exports.DAILY_EVENT_TRACK_STOPPED = exports.DAILY_EVENT_TRACK_STARTED = exports.DAILY_EVENT_THEME_UPDATED = exports.DAILY_EVENT_STARTED_CAMERA = exports.DAILY_EVENT_REMOTE_MEDIA_PLAYER_UPDATED = exports.DAILY_EVENT_REMOTE_MEDIA_PLAYER_STOPPED = exports.DAILY_EVENT_REMOTE_MEDIA_PLAYER_STARTED = exports.DAILY_EVENT_RECORDING_UPLOAD_COMPLETED = exports.DAILY_EVENT_RECORDING_STOPPED = exports.DAILY_EVENT_RECORDING_STATS = exports.DAILY_EVENT_RECORDING_STARTED = exports.DAILY_EVENT_RECORDING_ERROR = exports.DAILY_EVENT_RECORDING_DATA = exports.DAILY_EVENT_RECEIVE_SETTINGS_UPDATED = exports.DAILY_EVENT_PARTICIPANT_UPDATED = exports.DAILY_EVENT_PARTICIPANT_LEFT = exports.DAILY_EVENT_PARTICIPANT_JOINED = exports.DAILY_EVENT_PARTICIPANT_COUNTS_UPDATED = exports.DAILY_EVENT_NONFATAL_ERROR = exports.DAILY_EVENT_NETWORK_QUALITY_CHANGE = exports.DAILY_EVENT_NETWORK_CONNECTION = exports.DAILY_EVENT_MEETING_SESSION_UPDATED = exports.DAILY_EVENT_MEETING_SESSION_STATE_UPDATED = exports.DAILY_EVENT_MEETING_SESSION_DATA_ERROR = exports.DAILY_EVENT_LOCAL_SCREEN_SHARE_STOPPED = exports.DAILY_EVENT_LOCAL_SCREEN_SHARE_STARTED = exports.DAILY_EVENT_LOAD_ATTEMPT_FAILED = exports.DAILY_EVENT_LOADING = exports.DAILY_EVENT_LOADED = exports.DAILY_EVENT_LIVE_STREAMING_UPDATED = exports.DAILY_EVENT_LIVE_STREAMING_STOPPED = exports.DAILY_EVENT_LIVE_STREAMING_STARTED = exports.DAILY_EVENT_LIVE_STREAMING_ERROR = exports.DAILY_EVENT_LEFT_MEETING = exports.DAILY_EVENT_LANG_UPDATED = exports.DAILY_EVENT_JOINING_MEETING = exports.DAILY_EVENT_JOINED_MEETING = exports.DAILY_EVENT_INPUT_SETTINGS_UPDATED = exports.DAILY_EVENT_IFRAME_READY_FOR_LAUNCH_CONFIG = exports.DAILY_EVENT_IFRAME_LAUNCH_CONFIG = exports.DAILY_EVENT_FULLSCREEN = exports.DAILY_EVENT_EXIT_FULLSCREEN = exports.DAILY_EVENT_ERROR = exports.DAILY_EVENT_CPU_LOAD_CHANGE = exports.DAILY_EVENT_CAMERA_ERROR = exports.DAILY_EVENT_APP_MSG = exports.DAILY_EVENT_ACTIVE_SPEAKER_MODE_CHANGE = exports.DAILY_EVENT_ACTIVE_SPEAKER_CHANGE = exports.DAILY_EVENT_ACCESS_STATE_UPDATED = exports.DAILY_CAMERA_ERROR_UNKNOWN = exports.DAILY_CAMERA_ERROR_UNDEF_MEDIADEVICES = exports.DAILY_CAMERA_ERROR_PERMISSIONS = exports.DAILY_CAMERA_ERROR_NOT_FOUND = exports.DAILY_CAMERA_ERROR_MIC_IN_USE = exports.DAILY_CAMERA_ERROR_CONSTRAINTS = exports.DAILY_CAMERA_ERROR_CAM_IN_USE = exports.DAILY_CAMERA_ERROR_CAM_AND_MIC_IN_USE = exports.DAILY_ACCESS_UNKNOWN = exports.DAILY_ACCESS_LEVEL_NONE = exports.DAILY_ACCESS_LEVEL_LOBBY = exports.DAILY_ACCESS_LEVEL_FULL = void 0;
function e(e, t) {
  if (null == e) return {};
  var r,
    n,
    i = function (e, t) {
      if (null == e) return {};
      var r,
        n,
        i = {},
        a = Object.keys(e);
      for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) >= 0 || (i[r] = e[r]);
      return i;
    }(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) >= 0 || Object.prototype.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function t(e, t, r, n, i, a, o) {
  try {
    var s = e[a](o),
      c = s.value;
  } catch (e) {
    return void r(e);
  }
  s.done ? t(c) : Promise.resolve(c).then(n, i);
}
function r(e) {
  return function () {
    var r = this,
      n = arguments;
    return new Promise(function (i, a) {
      var o = e.apply(r, n);
      function s(e) {
        t(o, i, a, s, c, "next", e);
      }
      function c(e) {
        t(o, i, a, s, c, "throw", e);
      }
      s(void 0);
    });
  };
}
function n(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function i(e) {
  return i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, i(e);
}
function a(e) {
  var t = function (e, t) {
    if ("object" !== i(e) || null === e) return e;
    var r = e[Symbol.toPrimitive];
    if (void 0 !== r) {
      var n = r.call(e, t || "default");
      if ("object" !== i(n)) return n;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === t ? String : Number)(e);
  }(e, "string");
  return "symbol" === i(t) ? t : String(t);
}
function o(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, a(n.key), n);
  }
}
function s(e, t, r) {
  return t && o(e.prototype, t), r && o(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
function c(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function l(e, t) {
  return l = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    return e.__proto__ = t, e;
  }, l(e, t);
}
function u(e, t) {
  if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(e, "prototype", {
    writable: !1
  }), t && l(e, t);
}
function d(e, t) {
  if (t && ("object" === i(t) || "function" == typeof t)) return t;
  if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
  return c(e);
}
function h(e) {
  return h = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, h(e);
}
function f(e, t, r) {
  return (t = a(t)) in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e;
}
function p(e, t) {
  (null == t || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function v(e, t) {
  return function (e) {
    if (Array.isArray(e)) return e;
  }(e) || function (e, t) {
    var r = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
    if (null != r) {
      var n,
        i,
        a,
        o,
        s = [],
        c = !0,
        l = !1;
      try {
        if (a = (r = r.call(e)).next, 0 === t) {
          if (Object(r) !== r) return;
          c = !1;
        } else for (; !(c = (n = a.call(r)).done) && (s.push(n.value), s.length !== t); c = !0);
      } catch (e) {
        l = !0, i = e;
      } finally {
        try {
          if (!c && null != r.return && (o = r.return(), Object(o) !== o)) return;
        } finally {
          if (l) throw i;
        }
      }
      return s;
    }
  }(e, t) || function (e, t) {
    if (e) {
      if ("string" == typeof e) return p(e, t);
      var r = Object.prototype.toString.call(e).slice(8, -1);
      return "Object" === r && e.constructor && (r = e.constructor.name), "Map" === r || "Set" === r ? Array.from(e) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? p(e, t) : void 0;
    }
  }(e, t) || function () {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
var g,
  m = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {},
  y = {},
  b = {
    get exports() {
      return y;
    },
    set exports(e) {
      y = e;
    }
  },
  w = "object" == typeof Reflect ? Reflect : null,
  _ = w && "function" == typeof w.apply ? w.apply : function (e, t, r) {
    return Function.prototype.apply.call(e, t, r);
  };
g = w && "function" == typeof w.ownKeys ? w.ownKeys : Object.getOwnPropertySymbols ? function (e) {
  return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e));
} : function (e) {
  return Object.getOwnPropertyNames(e);
};
var k = Number.isNaN || function (e) {
  return e != e;
};
function S() {
  S.init.call(this);
}
b.exports = S, y.once = function (e, t) {
  return new Promise(function (r, n) {
    function i(r) {
      e.removeListener(t, a), n(r);
    }
    function a() {
      "function" == typeof e.removeListener && e.removeListener("error", i), r([].slice.call(arguments));
    }
    F(e, t, a, {
      once: !0
    }), "error" !== t && function (e, t, r) {
      "function" == typeof e.on && F(e, "error", t, r);
    }(e, i, {
      once: !0
    });
  });
}, S.EventEmitter = S, S.prototype._events = void 0, S.prototype._eventsCount = 0, S.prototype._maxListeners = void 0;
var M = 10;
function C(e) {
  if ("function" != typeof e) throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof e);
}
function O(e) {
  return void 0 === e._maxListeners ? S.defaultMaxListeners : e._maxListeners;
}
function j(e, t, r, n) {
  var i, a, o, s;
  if (C(r), void 0 === (a = e._events) ? (a = e._events = Object.create(null), e._eventsCount = 0) : (void 0 !== a.newListener && (e.emit("newListener", t, r.listener ? r.listener : r), a = e._events), o = a[t]), void 0 === o) o = a[t] = r, ++e._eventsCount;else if ("function" == typeof o ? o = a[t] = n ? [r, o] : [o, r] : n ? o.unshift(r) : o.push(r), (i = O(e)) > 0 && o.length > i && !o.warned) {
    o.warned = !0;
    var c = new Error("Possible EventEmitter memory leak detected. " + o.length + " " + String(t) + " listeners added. Use emitter.setMaxListeners() to increase limit");
    c.name = "MaxListenersExceededWarning", c.emitter = e, c.type = t, c.count = o.length, s = c, console && console.warn && console.warn(s);
  }
  return e;
}
function T() {
  if (!this.fired) return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, 0 === arguments.length ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
}
function P(e, t, r) {
  var n = {
      fired: !1,
      wrapFn: void 0,
      target: e,
      type: t,
      listener: r
    },
    i = T.bind(n);
  return i.listener = r, n.wrapFn = i, i;
}
function A(e, t, r) {
  var n = e._events;
  if (void 0 === n) return [];
  var i = n[t];
  return void 0 === i ? [] : "function" == typeof i ? r ? [i.listener || i] : [i] : r ? function (e) {
    for (var t = new Array(e.length), r = 0; r < t.length; ++r) t[r] = e[r].listener || e[r];
    return t;
  }(i) : I(i, i.length);
}
function E(e) {
  var t = this._events;
  if (void 0 !== t) {
    var r = t[e];
    if ("function" == typeof r) return 1;
    if (void 0 !== r) return r.length;
  }
  return 0;
}
function I(e, t) {
  for (var r = new Array(t), n = 0; n < t; ++n) r[n] = e[n];
  return r;
}
function F(e, t, r, n) {
  if ("function" == typeof e.on) n.once ? e.once(t, r) : e.on(t, r);else {
    if ("function" != typeof e.addEventListener) throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof e);
    e.addEventListener(t, function i(a) {
      n.once && e.removeEventListener(t, i), r(a);
    });
  }
}
Object.defineProperty(S, "defaultMaxListeners", {
  enumerable: !0,
  get: function () {
    return M;
  },
  set: function (e) {
    if ("number" != typeof e || e < 0 || k(e)) throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + e + ".");
    M = e;
  }
}), S.init = function () {
  void 0 !== this._events && this._events !== Object.getPrototypeOf(this)._events || (this._events = Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
}, S.prototype.setMaxListeners = function (e) {
  if ("number" != typeof e || e < 0 || k(e)) throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + e + ".");
  return this._maxListeners = e, this;
}, S.prototype.getMaxListeners = function () {
  return O(this);
}, S.prototype.emit = function (e) {
  for (var t = [], r = 1; r < arguments.length; r++) t.push(arguments[r]);
  var n = "error" === e,
    i = this._events;
  if (void 0 !== i) n = n && void 0 === i.error;else if (!n) return !1;
  if (n) {
    var a;
    if (t.length > 0 && (a = t[0]), a instanceof Error) throw a;
    var o = new Error("Unhandled error." + (a ? " (" + a.message + ")" : ""));
    throw o.context = a, o;
  }
  var s = i[e];
  if (void 0 === s) return !1;
  if ("function" == typeof s) _(s, this, t);else {
    var c = s.length,
      l = I(s, c);
    for (r = 0; r < c; ++r) _(l[r], this, t);
  }
  return !0;
}, S.prototype.addListener = function (e, t) {
  return j(this, e, t, !1);
}, S.prototype.on = S.prototype.addListener, S.prototype.prependListener = function (e, t) {
  return j(this, e, t, !0);
}, S.prototype.once = function (e, t) {
  return C(t), this.on(e, P(this, e, t)), this;
}, S.prototype.prependOnceListener = function (e, t) {
  return C(t), this.prependListener(e, P(this, e, t)), this;
}, S.prototype.removeListener = function (e, t) {
  var r, n, i, a, o;
  if (C(t), void 0 === (n = this._events)) return this;
  if (void 0 === (r = n[e])) return this;
  if (r === t || r.listener === t) 0 == --this._eventsCount ? this._events = Object.create(null) : (delete n[e], n.removeListener && this.emit("removeListener", e, r.listener || t));else if ("function" != typeof r) {
    for (i = -1, a = r.length - 1; a >= 0; a--) if (r[a] === t || r[a].listener === t) {
      o = r[a].listener, i = a;
      break;
    }
    if (i < 0) return this;
    0 === i ? r.shift() : function (e, t) {
      for (; t + 1 < e.length; t++) e[t] = e[t + 1];
      e.pop();
    }(r, i), 1 === r.length && (n[e] = r[0]), void 0 !== n.removeListener && this.emit("removeListener", e, o || t);
  }
  return this;
}, S.prototype.off = S.prototype.removeListener, S.prototype.removeAllListeners = function (e) {
  var t, r, n;
  if (void 0 === (r = this._events)) return this;
  if (void 0 === r.removeListener) return 0 === arguments.length ? (this._events = Object.create(null), this._eventsCount = 0) : void 0 !== r[e] && (0 == --this._eventsCount ? this._events = Object.create(null) : delete r[e]), this;
  if (0 === arguments.length) {
    var i,
      a = Object.keys(r);
    for (n = 0; n < a.length; ++n) "removeListener" !== (i = a[n]) && this.removeAllListeners(i);
    return this.removeAllListeners("removeListener"), this._events = Object.create(null), this._eventsCount = 0, this;
  }
  if ("function" == typeof (t = r[e])) this.removeListener(e, t);else if (void 0 !== t) for (n = t.length - 1; n >= 0; n--) this.removeListener(e, t[n]);
  return this;
}, S.prototype.listeners = function (e) {
  return A(this, e, !0);
}, S.prototype.rawListeners = function (e) {
  return A(this, e, !1);
}, S.listenerCount = function (e, t) {
  return "function" == typeof e.listenerCount ? e.listenerCount(t) : E.call(e, t);
}, S.prototype.listenerCount = E, S.prototype.eventNames = function () {
  return this._eventsCount > 0 ? g(this._events) : [];
};
var L = "function" == typeof Map,
  D = "function" == typeof Set,
  B = "function" == typeof WeakSet,
  N = Object.keys,
  x = function (e, t) {
    return e && "object" == typeof e && t.add(e);
  },
  R = function (e, t, r, n) {
    for (var i, a = 0; a < e.length; a++) if (r((i = e[a])[0], t[0], n) && r(i[1], t[1], n)) return !0;
    return !1;
  },
  V = function (e, t, r, n) {
    for (var i = 0; i < e.length; i++) if (r(e[i], t, n)) return !0;
    return !1;
  },
  U = function (e, t) {
    return e === t || e != e && t != t;
  },
  z = function (e) {
    return e.constructor === Object;
  },
  J = function (e) {
    return "function" == typeof e.then;
  },
  W = function (e) {
    return !(!e.$$typeof || !e._store);
  },
  q = function (e) {
    return function (t) {
      var r = e || t;
      return function (e, t, n) {
        void 0 === n && (n = B ? new WeakSet() : Object.create({
          _values: [],
          add: function (e) {
            this._values.push(e);
          },
          has: function (e) {
            return !!~this._values.indexOf(e);
          }
        }));
        var i = n.has(e),
          a = n.has(t);
        return i || a ? i && a : (x(e, n), x(t, n), r(e, t, n));
      };
    };
  },
  G = function (e) {
    var t = [];
    return e.forEach(function (e, r) {
      return t.push([r, e]);
    }), t;
  },
  H = function (e) {
    var t = [];
    return e.forEach(function (e) {
      return t.push(e);
    }), t;
  },
  K = function (e, t, r, n) {
    var i,
      a = N(e),
      o = N(t);
    if (a.length !== o.length) return !1;
    for (var s = 0; s < a.length; s++) {
      if (i = a[s], !V(o, i, U)) return !1;
      if (("_owner" !== i || !W(e) || !W(t)) && !r(e[i], t[i], n)) return !1;
    }
    return !0;
  },
  Q = Array.isArray,
  $ = function (e) {
    var t = "function" == typeof e ? e(r) : r;
    function r(e, r, n) {
      if (U(e, r)) return !0;
      var i = typeof e;
      if (i !== typeof r || "object" !== i || !e || !r) return !1;
      if (z(e) && z(r)) return K(e, r, t, n);
      var a = Q(e),
        o = Q(r);
      if (a || o) return a === o && function (e, t, r, n) {
        if (e.length !== t.length) return !1;
        for (var i = 0; i < e.length; i++) if (!r(e[i], t[i], n)) return !1;
        return !0;
      }(e, r, t, n);
      var s = e instanceof Date,
        c = r instanceof Date;
      if (s || c) return s === c && U(e.getTime(), r.getTime());
      var l,
        u,
        d = e instanceof RegExp,
        h = r instanceof RegExp;
      if (d || h) return d === h && (u = r, (l = e).source === u.source && l.global === u.global && l.ignoreCase === u.ignoreCase && l.multiline === u.multiline && l.unicode === u.unicode && l.sticky === u.sticky && l.lastIndex === u.lastIndex);
      if (J(e) || J(r)) return e === r;
      if (L) {
        var f = e instanceof Map,
          p = r instanceof Map;
        if (f || p) return f === p && function (e, t, r, n) {
          if (e.size !== t.size) return !1;
          for (var i = G(e), a = G(t), o = 0; o < i.length; o++) if (!R(a, i[o], r, n) || !R(i, a[o], r, n)) return !1;
          return !0;
        }(e, r, t, n);
      }
      if (D) {
        var v = e instanceof Set,
          g = r instanceof Set;
        if (v || g) return v === g && function (e, t, r, n) {
          if (e.size !== t.size) return !1;
          for (var i = H(e), a = H(t), o = 0; o < i.length; o++) if (!V(a, i[o], r, n) || !V(i, a[o], r, n)) return !1;
          return !0;
        }(e, r, t, n);
      }
      return K(e, r, t, n);
    }
    return r;
  };
$(q()), $(q(U));
var Y = $();
$(function () {
  return U;
});
const Z = {
    "Amazon Silk": "amazon_silk",
    "Android Browser": "android",
    Bada: "bada",
    BlackBerry: "blackberry",
    Chrome: "chrome",
    Chromium: "chromium",
    Electron: "electron",
    Epiphany: "epiphany",
    Firefox: "firefox",
    Focus: "focus",
    Generic: "generic",
    "Google Search": "google_search",
    Googlebot: "googlebot",
    "Internet Explorer": "ie",
    "K-Meleon": "k_meleon",
    Maxthon: "maxthon",
    "Microsoft Edge": "edge",
    "MZ Browser": "mz",
    "NAVER Whale Browser": "naver",
    Opera: "opera",
    "Opera Coast": "opera_coast",
    PhantomJS: "phantomjs",
    Puffin: "puffin",
    QupZilla: "qupzilla",
    QQ: "qq",
    QQLite: "qqlite",
    Safari: "safari",
    Sailfish: "sailfish",
    "Samsung Internet for Android": "samsung_internet",
    SeaMonkey: "seamonkey",
    Sleipnir: "sleipnir",
    Swing: "swing",
    Tizen: "tizen",
    "UC Browser": "uc",
    Vivaldi: "vivaldi",
    "WebOS Browser": "webos",
    WeChat: "wechat",
    "Yandex Browser": "yandex",
    Roku: "roku"
  },
  X = {
    amazon_silk: "Amazon Silk",
    android: "Android Browser",
    bada: "Bada",
    blackberry: "BlackBerry",
    chrome: "Chrome",
    chromium: "Chromium",
    electron: "Electron",
    epiphany: "Epiphany",
    firefox: "Firefox",
    focus: "Focus",
    generic: "Generic",
    googlebot: "Googlebot",
    google_search: "Google Search",
    ie: "Internet Explorer",
    k_meleon: "K-Meleon",
    maxthon: "Maxthon",
    edge: "Microsoft Edge",
    mz: "MZ Browser",
    naver: "NAVER Whale Browser",
    opera: "Opera",
    opera_coast: "Opera Coast",
    phantomjs: "PhantomJS",
    puffin: "Puffin",
    qupzilla: "QupZilla",
    qq: "QQ Browser",
    qqlite: "QQ Browser Lite",
    safari: "Safari",
    sailfish: "Sailfish",
    samsung_internet: "Samsung Internet for Android",
    seamonkey: "SeaMonkey",
    sleipnir: "Sleipnir",
    swing: "Swing",
    tizen: "Tizen",
    uc: "UC Browser",
    vivaldi: "Vivaldi",
    webos: "WebOS Browser",
    wechat: "WeChat",
    yandex: "Yandex Browser"
  },
  ee = {
    tablet: "tablet",
    mobile: "mobile",
    desktop: "desktop",
    tv: "tv"
  },
  te = {
    WindowsPhone: "Windows Phone",
    Windows: "Windows",
    MacOS: "macOS",
    iOS: "iOS",
    Android: "Android",
    WebOS: "WebOS",
    BlackBerry: "BlackBerry",
    Bada: "Bada",
    Tizen: "Tizen",
    Linux: "Linux",
    ChromeOS: "Chrome OS",
    PlayStation4: "PlayStation 4",
    Roku: "Roku"
  },
  re = {
    EdgeHTML: "EdgeHTML",
    Blink: "Blink",
    Trident: "Trident",
    Presto: "Presto",
    Gecko: "Gecko",
    WebKit: "WebKit"
  };
class ne {
  static getFirstMatch(e, t) {
    const r = t.match(e);
    return r && r.length > 0 && r[1] || "";
  }
  static getSecondMatch(e, t) {
    const r = t.match(e);
    return r && r.length > 1 && r[2] || "";
  }
  static matchAndReturnConst(e, t, r) {
    if (e.test(t)) return r;
  }
  static getWindowsVersionName(e) {
    switch (e) {
      case "NT":
        return "NT";
      case "XP":
      case "NT 5.1":
        return "XP";
      case "NT 5.0":
        return "2000";
      case "NT 5.2":
        return "2003";
      case "NT 6.0":
        return "Vista";
      case "NT 6.1":
        return "7";
      case "NT 6.2":
        return "8";
      case "NT 6.3":
        return "8.1";
      case "NT 10.0":
        return "10";
      default:
        return;
    }
  }
  static getMacOSVersionName(e) {
    const t = e.split(".").splice(0, 2).map(e => parseInt(e, 10) || 0);
    if (t.push(0), 10 === t[0]) switch (t[1]) {
      case 5:
        return "Leopard";
      case 6:
        return "Snow Leopard";
      case 7:
        return "Lion";
      case 8:
        return "Mountain Lion";
      case 9:
        return "Mavericks";
      case 10:
        return "Yosemite";
      case 11:
        return "El Capitan";
      case 12:
        return "Sierra";
      case 13:
        return "High Sierra";
      case 14:
        return "Mojave";
      case 15:
        return "Catalina";
      default:
        return;
    }
  }
  static getAndroidVersionName(e) {
    const t = e.split(".").splice(0, 2).map(e => parseInt(e, 10) || 0);
    if (t.push(0), !(1 === t[0] && t[1] < 5)) return 1 === t[0] && t[1] < 6 ? "Cupcake" : 1 === t[0] && t[1] >= 6 ? "Donut" : 2 === t[0] && t[1] < 2 ? "Eclair" : 2 === t[0] && 2 === t[1] ? "Froyo" : 2 === t[0] && t[1] > 2 ? "Gingerbread" : 3 === t[0] ? "Honeycomb" : 4 === t[0] && t[1] < 1 ? "Ice Cream Sandwich" : 4 === t[0] && t[1] < 4 ? "Jelly Bean" : 4 === t[0] && t[1] >= 4 ? "KitKat" : 5 === t[0] ? "Lollipop" : 6 === t[0] ? "Marshmallow" : 7 === t[0] ? "Nougat" : 8 === t[0] ? "Oreo" : 9 === t[0] ? "Pie" : void 0;
  }
  static getVersionPrecision(e) {
    return e.split(".").length;
  }
  static compareVersions(e, t, r = !1) {
    const n = ne.getVersionPrecision(e),
      i = ne.getVersionPrecision(t);
    let a = Math.max(n, i),
      o = 0;
    const s = ne.map([e, t], e => {
      const t = a - ne.getVersionPrecision(e),
        r = e + new Array(t + 1).join(".0");
      return ne.map(r.split("."), e => new Array(20 - e.length).join("0") + e).reverse();
    });
    for (r && (o = a - Math.min(n, i)), a -= 1; a >= o;) {
      if (s[0][a] > s[1][a]) return 1;
      if (s[0][a] === s[1][a]) {
        if (a === o) return 0;
        a -= 1;
      } else if (s[0][a] < s[1][a]) return -1;
    }
  }
  static map(e, t) {
    const r = [];
    let n;
    if (Array.prototype.map) return Array.prototype.map.call(e, t);
    for (n = 0; n < e.length; n += 1) r.push(t(e[n]));
    return r;
  }
  static find(e, t) {
    let r, n;
    if (Array.prototype.find) return Array.prototype.find.call(e, t);
    for (r = 0, n = e.length; r < n; r += 1) {
      const n = e[r];
      if (t(n, r)) return n;
    }
  }
  static assign(e, ...t) {
    const r = e;
    let n, i;
    if (Object.assign) return Object.assign(e, ...t);
    for (n = 0, i = t.length; n < i; n += 1) {
      const e = t[n];
      if ("object" == typeof e && null !== e) {
        Object.keys(e).forEach(t => {
          r[t] = e[t];
        });
      }
    }
    return e;
  }
  static getBrowserAlias(e) {
    return Z[e];
  }
  static getBrowserTypeByAlias(e) {
    return X[e] || "";
  }
}
const ie = /version\/(\d+(\.?_?\d+)+)/i,
  ae = [{
    test: [/googlebot/i],
    describe(e) {
      const t = {
          name: "Googlebot"
        },
        r = ne.getFirstMatch(/googlebot\/(\d+(\.\d+))/i, e) || ne.getFirstMatch(ie, e);
      return r && (t.version = r), t;
    }
  }, {
    test: [/opera/i],
    describe(e) {
      const t = {
          name: "Opera"
        },
        r = ne.getFirstMatch(ie, e) || ne.getFirstMatch(/(?:opera)[\s/](\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t;
    }
  }, {
    test: [/opr\/|opios/i],
    describe(e) {
      const t = {
          name: "Opera"
        },
        r = ne.getFirstMatch(/(?:opr|opios)[\s/](\S+)/i, e) || ne.getFirstMatch(ie, e);
      return r && (t.version = r), t;
    }
  }, {
    test: [/SamsungBrowser/i],
    describe(e) {
      const t = {
          name: "Samsung Internet for Android"
        },
        r = ne.getFirstMatch(ie, e) || ne.getFirstMatch(/(?:SamsungBrowser)[\s/](\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t;
    }
  }, {
    test: [/Whale/i],
    describe(e) {
      const t = {
          name: "NAVER Whale Browser"
        },
        r = ne.getFirstMatch(ie, e) || ne.getFirstMatch(/(?:whale)[\s/](\d+(?:\.\d+)+)/i, e);
      return r && (t.version = r), t;
    }
  }, {
    test: [/MZBrowser/i],
    describe(e) {
      const t = {
          name: "MZ Browser"
        },
        r = ne.getFirstMatch(/(?:MZBrowser)[\s/](\d+(?:\.\d+)+)/i, e) || ne.getFirstMatch(ie, e);
      return r && (t.version = r), t;
    }
  }, {
    test: [/focus/i],
    describe(e) {
      const t = {
          name: "Focus"
        },
        r = ne.getFirstMatch(/(?:focus)[\s/](\d+(?:\.\d+)+)/i, e) || ne.getFirstMatch(ie, e);
      return r && (t.version = r), t;
    }
  }, {
    test: [/swing/i],
    describe(e) {
      const t = {
          name: "Swing"
        },
        r = ne.getFirstMatch(/(?:swing)[\s/](\d+(?:\.\d+)+)/i, e) || ne.getFirstMatch(ie, e);
      return r && (t.version = r), t;
    }
  }, {
    test: [/coast/i],
    describe(e) {
      const t = {
          name: "Opera Coast"
        },
        r = ne.getFirstMatch(ie, e) || ne.getFirstMatch(/(?:coast)[\s/](\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t;
    }
  }, {
    test: [/opt\/\d+(?:.?_?\d+)+/i],
    describe(e) {
      const t = {
          name: "Opera Touch"
        },
        r = ne.getFirstMatch(/(?:opt)[\s/](\d+(\.?_?\d+)+)/i, e) || ne.getFirstMatch(ie, e);
      return r && (t.version = r), t;
    }
  }, {
    test: [/yabrowser/i],
    describe(e) {
      const t = {
          name: "Yandex Browser"
        },
        r = ne.getFirstMatch(/(?:yabrowser)[\s/](\d+(\.?_?\d+)+)/i, e) || ne.getFirstMatch(ie, e);
      return r && (t.version = r), t;
    }
  }, {
    test: [/ucbrowser/i],
    describe(e) {
      const t = {
          name: "UC Browser"
        },
        r = ne.getFirstMatch(ie, e) || ne.getFirstMatch(/(?:ucbrowser)[\s/](\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t;
    }
  }, {
    test: [/Maxthon|mxios/i],
    describe(e) {
      const t = {
          name: "Maxthon"
        },
        r = ne.getFirstMatch(ie, e) || ne.getFirstMatch(/(?:Maxthon|mxios)[\s/](\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t;
    }
  }, {
    test: [/epiphany/i],
    describe(e) {
      const t = {
          name: "Epiphany"
        },
        r = ne.getFirstMatch(ie, e) || ne.getFirstMatch(/(?:epiphany)[\s/](\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t;
    }
  }, {
    test: [/puffin/i],
    describe(e) {
      const t = {
          name: "Puffin"
        },
        r = ne.getFirstMatch(ie, e) || ne.getFirstMatch(/(?:puffin)[\s/](\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t;
    }
  }, {
    test: [/sleipnir/i],
    describe(e) {
      const t = {
          name: "Sleipnir"
        },
        r = ne.getFirstMatch(ie, e) || ne.getFirstMatch(/(?:sleipnir)[\s/](\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t;
    }
  }, {
    test: [/k-meleon/i],
    describe(e) {
      const t = {
          name: "K-Meleon"
        },
        r = ne.getFirstMatch(ie, e) || ne.getFirstMatch(/(?:k-meleon)[\s/](\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t;
    }
  }, {
    test: [/micromessenger/i],
    describe(e) {
      const t = {
          name: "WeChat"
        },
        r = ne.getFirstMatch(/(?:micromessenger)[\s/](\d+(\.?_?\d+)+)/i, e) || ne.getFirstMatch(ie, e);
      return r && (t.version = r), t;
    }
  }, {
    test: [/qqbrowser/i],
    describe(e) {
      const t = {
          name: /qqbrowserlite/i.test(e) ? "QQ Browser Lite" : "QQ Browser"
        },
        r = ne.getFirstMatch(/(?:qqbrowserlite|qqbrowser)[/](\d+(\.?_?\d+)+)/i, e) || ne.getFirstMatch(ie, e);
      return r && (t.version = r), t;
    }
  }, {
    test: [/msie|trident/i],
    describe(e) {
      const t = {
          name: "Internet Explorer"
        },
        r = ne.getFirstMatch(/(?:msie |rv:)(\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t;
    }
  }, {
    test: [/\sedg\//i],
    describe(e) {
      const t = {
          name: "Microsoft Edge"
        },
        r = ne.getFirstMatch(/\sedg\/(\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t;
    }
  }, {
    test: [/edg([ea]|ios)/i],
    describe(e) {
      const t = {
          name: "Microsoft Edge"
        },
        r = ne.getSecondMatch(/edg([ea]|ios)\/(\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t;
    }
  }, {
    test: [/vivaldi/i],
    describe(e) {
      const t = {
          name: "Vivaldi"
        },
        r = ne.getFirstMatch(/vivaldi\/(\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t;
    }
  }, {
    test: [/seamonkey/i],
    describe(e) {
      const t = {
          name: "SeaMonkey"
        },
        r = ne.getFirstMatch(/seamonkey\/(\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t;
    }
  }, {
    test: [/sailfish/i],
    describe(e) {
      const t = {
          name: "Sailfish"
        },
        r = ne.getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i, e);
      return r && (t.version = r), t;
    }
  }, {
    test: [/silk/i],
    describe(e) {
      const t = {
          name: "Amazon Silk"
        },
        r = ne.getFirstMatch(/silk\/(\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t;
    }
  }, {
    test: [/phantom/i],
    describe(e) {
      const t = {
          name: "PhantomJS"
        },
        r = ne.getFirstMatch(/phantomjs\/(\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t;
    }
  }, {
    test: [/slimerjs/i],
    describe(e) {
      const t = {
          name: "SlimerJS"
        },
        r = ne.getFirstMatch(/slimerjs\/(\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t;
    }
  }, {
    test: [/blackberry|\bbb\d+/i, /rim\stablet/i],
    describe(e) {
      const t = {
          name: "BlackBerry"
        },
        r = ne.getFirstMatch(ie, e) || ne.getFirstMatch(/blackberry[\d]+\/(\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t;
    }
  }, {
    test: [/(web|hpw)[o0]s/i],
    describe(e) {
      const t = {
          name: "WebOS Browser"
        },
        r = ne.getFirstMatch(ie, e) || ne.getFirstMatch(/w(?:eb)?[o0]sbrowser\/(\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t;
    }
  }, {
    test: [/bada/i],
    describe(e) {
      const t = {
          name: "Bada"
        },
        r = ne.getFirstMatch(/dolfin\/(\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t;
    }
  }, {
    test: [/tizen/i],
    describe(e) {
      const t = {
          name: "Tizen"
        },
        r = ne.getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.?_?\d+)+)/i, e) || ne.getFirstMatch(ie, e);
      return r && (t.version = r), t;
    }
  }, {
    test: [/qupzilla/i],
    describe(e) {
      const t = {
          name: "QupZilla"
        },
        r = ne.getFirstMatch(/(?:qupzilla)[\s/](\d+(\.?_?\d+)+)/i, e) || ne.getFirstMatch(ie, e);
      return r && (t.version = r), t;
    }
  }, {
    test: [/firefox|iceweasel|fxios/i],
    describe(e) {
      const t = {
          name: "Firefox"
        },
        r = ne.getFirstMatch(/(?:firefox|iceweasel|fxios)[\s/](\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t;
    }
  }, {
    test: [/electron/i],
    describe(e) {
      const t = {
          name: "Electron"
        },
        r = ne.getFirstMatch(/(?:electron)\/(\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t;
    }
  }, {
    test: [/MiuiBrowser/i],
    describe(e) {
      const t = {
          name: "Miui"
        },
        r = ne.getFirstMatch(/(?:MiuiBrowser)[\s/](\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t;
    }
  }, {
    test: [/chromium/i],
    describe(e) {
      const t = {
          name: "Chromium"
        },
        r = ne.getFirstMatch(/(?:chromium)[\s/](\d+(\.?_?\d+)+)/i, e) || ne.getFirstMatch(ie, e);
      return r && (t.version = r), t;
    }
  }, {
    test: [/chrome|crios|crmo/i],
    describe(e) {
      const t = {
          name: "Chrome"
        },
        r = ne.getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t;
    }
  }, {
    test: [/GSA/i],
    describe(e) {
      const t = {
          name: "Google Search"
        },
        r = ne.getFirstMatch(/(?:GSA)\/(\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t;
    }
  }, {
    test(e) {
      const t = !e.test(/like android/i),
        r = e.test(/android/i);
      return t && r;
    },
    describe(e) {
      const t = {
          name: "Android Browser"
        },
        r = ne.getFirstMatch(ie, e);
      return r && (t.version = r), t;
    }
  }, {
    test: [/playstation 4/i],
    describe(e) {
      const t = {
          name: "PlayStation 4"
        },
        r = ne.getFirstMatch(ie, e);
      return r && (t.version = r), t;
    }
  }, {
    test: [/safari|applewebkit/i],
    describe(e) {
      const t = {
          name: "Safari"
        },
        r = ne.getFirstMatch(ie, e);
      return r && (t.version = r), t;
    }
  }, {
    test: [/.*/i],
    describe(e) {
      const t = -1 !== e.search("\\(") ? /^(.*)\/(.*)[ \t]\((.*)/ : /^(.*)\/(.*) /;
      return {
        name: ne.getFirstMatch(t, e),
        version: ne.getSecondMatch(t, e)
      };
    }
  }];
var oe = [{
    test: [/Roku\/DVP/],
    describe(e) {
      const t = ne.getFirstMatch(/Roku\/DVP-(\d+\.\d+)/i, e);
      return {
        name: te.Roku,
        version: t
      };
    }
  }, {
    test: [/windows phone/i],
    describe(e) {
      const t = ne.getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i, e);
      return {
        name: te.WindowsPhone,
        version: t
      };
    }
  }, {
    test: [/windows /i],
    describe(e) {
      const t = ne.getFirstMatch(/Windows ((NT|XP)( \d\d?.\d)?)/i, e),
        r = ne.getWindowsVersionName(t);
      return {
        name: te.Windows,
        version: t,
        versionName: r
      };
    }
  }, {
    test: [/Macintosh(.*?) FxiOS(.*?)\//],
    describe(e) {
      const t = {
          name: te.iOS
        },
        r = ne.getSecondMatch(/(Version\/)(\d[\d.]+)/, e);
      return r && (t.version = r), t;
    }
  }, {
    test: [/macintosh/i],
    describe(e) {
      const t = ne.getFirstMatch(/mac os x (\d+(\.?_?\d+)+)/i, e).replace(/[_\s]/g, "."),
        r = ne.getMacOSVersionName(t),
        n = {
          name: te.MacOS,
          version: t
        };
      return r && (n.versionName = r), n;
    }
  }, {
    test: [/(ipod|iphone|ipad)/i],
    describe(e) {
      const t = ne.getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i, e).replace(/[_\s]/g, ".");
      return {
        name: te.iOS,
        version: t
      };
    }
  }, {
    test(e) {
      const t = !e.test(/like android/i),
        r = e.test(/android/i);
      return t && r;
    },
    describe(e) {
      const t = ne.getFirstMatch(/android[\s/-](\d+(\.\d+)*)/i, e),
        r = ne.getAndroidVersionName(t),
        n = {
          name: te.Android,
          version: t
        };
      return r && (n.versionName = r), n;
    }
  }, {
    test: [/(web|hpw)[o0]s/i],
    describe(e) {
      const t = ne.getFirstMatch(/(?:web|hpw)[o0]s\/(\d+(\.\d+)*)/i, e),
        r = {
          name: te.WebOS
        };
      return t && t.length && (r.version = t), r;
    }
  }, {
    test: [/blackberry|\bbb\d+/i, /rim\stablet/i],
    describe(e) {
      const t = ne.getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i, e) || ne.getFirstMatch(/blackberry\d+\/(\d+([_\s]\d+)*)/i, e) || ne.getFirstMatch(/\bbb(\d+)/i, e);
      return {
        name: te.BlackBerry,
        version: t
      };
    }
  }, {
    test: [/bada/i],
    describe(e) {
      const t = ne.getFirstMatch(/bada\/(\d+(\.\d+)*)/i, e);
      return {
        name: te.Bada,
        version: t
      };
    }
  }, {
    test: [/tizen/i],
    describe(e) {
      const t = ne.getFirstMatch(/tizen[/\s](\d+(\.\d+)*)/i, e);
      return {
        name: te.Tizen,
        version: t
      };
    }
  }, {
    test: [/linux/i],
    describe: () => ({
      name: te.Linux
    })
  }, {
    test: [/CrOS/],
    describe: () => ({
      name: te.ChromeOS
    })
  }, {
    test: [/PlayStation 4/],
    describe(e) {
      const t = ne.getFirstMatch(/PlayStation 4[/\s](\d+(\.\d+)*)/i, e);
      return {
        name: te.PlayStation4,
        version: t
      };
    }
  }],
  se = [{
    test: [/googlebot/i],
    describe: () => ({
      type: "bot",
      vendor: "Google"
    })
  }, {
    test: [/huawei/i],
    describe(e) {
      const t = ne.getFirstMatch(/(can-l01)/i, e) && "Nova",
        r = {
          type: ee.mobile,
          vendor: "Huawei"
        };
      return t && (r.model = t), r;
    }
  }, {
    test: [/nexus\s*(?:7|8|9|10).*/i],
    describe: () => ({
      type: ee.tablet,
      vendor: "Nexus"
    })
  }, {
    test: [/ipad/i],
    describe: () => ({
      type: ee.tablet,
      vendor: "Apple",
      model: "iPad"
    })
  }, {
    test: [/Macintosh(.*?) FxiOS(.*?)\//],
    describe: () => ({
      type: ee.tablet,
      vendor: "Apple",
      model: "iPad"
    })
  }, {
    test: [/kftt build/i],
    describe: () => ({
      type: ee.tablet,
      vendor: "Amazon",
      model: "Kindle Fire HD 7"
    })
  }, {
    test: [/silk/i],
    describe: () => ({
      type: ee.tablet,
      vendor: "Amazon"
    })
  }, {
    test: [/tablet(?! pc)/i],
    describe: () => ({
      type: ee.tablet
    })
  }, {
    test(e) {
      const t = e.test(/ipod|iphone/i),
        r = e.test(/like (ipod|iphone)/i);
      return t && !r;
    },
    describe(e) {
      const t = ne.getFirstMatch(/(ipod|iphone)/i, e);
      return {
        type: ee.mobile,
        vendor: "Apple",
        model: t
      };
    }
  }, {
    test: [/nexus\s*[0-6].*/i, /galaxy nexus/i],
    describe: () => ({
      type: ee.mobile,
      vendor: "Nexus"
    })
  }, {
    test: [/[^-]mobi/i],
    describe: () => ({
      type: ee.mobile
    })
  }, {
    test: e => "blackberry" === e.getBrowserName(!0),
    describe: () => ({
      type: ee.mobile,
      vendor: "BlackBerry"
    })
  }, {
    test: e => "bada" === e.getBrowserName(!0),
    describe: () => ({
      type: ee.mobile
    })
  }, {
    test: e => "windows phone" === e.getBrowserName(),
    describe: () => ({
      type: ee.mobile,
      vendor: "Microsoft"
    })
  }, {
    test(e) {
      const t = Number(String(e.getOSVersion()).split(".")[0]);
      return "android" === e.getOSName(!0) && t >= 3;
    },
    describe: () => ({
      type: ee.tablet
    })
  }, {
    test: e => "android" === e.getOSName(!0),
    describe: () => ({
      type: ee.mobile
    })
  }, {
    test: e => "macos" === e.getOSName(!0),
    describe: () => ({
      type: ee.desktop,
      vendor: "Apple"
    })
  }, {
    test: e => "windows" === e.getOSName(!0),
    describe: () => ({
      type: ee.desktop
    })
  }, {
    test: e => "linux" === e.getOSName(!0),
    describe: () => ({
      type: ee.desktop
    })
  }, {
    test: e => "playstation 4" === e.getOSName(!0),
    describe: () => ({
      type: ee.tv
    })
  }, {
    test: e => "roku" === e.getOSName(!0),
    describe: () => ({
      type: ee.tv
    })
  }],
  ce = [{
    test: e => "microsoft edge" === e.getBrowserName(!0),
    describe(e) {
      if (/\sedg\//i.test(e)) return {
        name: re.Blink
      };
      const t = ne.getFirstMatch(/edge\/(\d+(\.?_?\d+)+)/i, e);
      return {
        name: re.EdgeHTML,
        version: t
      };
    }
  }, {
    test: [/trident/i],
    describe(e) {
      const t = {
          name: re.Trident
        },
        r = ne.getFirstMatch(/trident\/(\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t;
    }
  }, {
    test: e => e.test(/presto/i),
    describe(e) {
      const t = {
          name: re.Presto
        },
        r = ne.getFirstMatch(/presto\/(\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t;
    }
  }, {
    test(e) {
      const t = e.test(/gecko/i),
        r = e.test(/like gecko/i);
      return t && !r;
    },
    describe(e) {
      const t = {
          name: re.Gecko
        },
        r = ne.getFirstMatch(/gecko\/(\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t;
    }
  }, {
    test: [/(apple)?webkit\/537\.36/i],
    describe: () => ({
      name: re.Blink
    })
  }, {
    test: [/(apple)?webkit/i],
    describe(e) {
      const t = {
          name: re.WebKit
        },
        r = ne.getFirstMatch(/webkit\/(\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t;
    }
  }];
class le {
  constructor(e, t = !1) {
    if (null == e || "" === e) throw new Error("UserAgent parameter can't be empty");
    this._ua = e, this.parsedResult = {}, !0 !== t && this.parse();
  }
  getUA() {
    return this._ua;
  }
  test(e) {
    return e.test(this._ua);
  }
  parseBrowser() {
    this.parsedResult.browser = {};
    const e = ne.find(ae, e => {
      if ("function" == typeof e.test) return e.test(this);
      if (e.test instanceof Array) return e.test.some(e => this.test(e));
      throw new Error("Browser's test function is not valid");
    });
    return e && (this.parsedResult.browser = e.describe(this.getUA())), this.parsedResult.browser;
  }
  getBrowser() {
    return this.parsedResult.browser ? this.parsedResult.browser : this.parseBrowser();
  }
  getBrowserName(e) {
    return e ? String(this.getBrowser().name).toLowerCase() || "" : this.getBrowser().name || "";
  }
  getBrowserVersion() {
    return this.getBrowser().version;
  }
  getOS() {
    return this.parsedResult.os ? this.parsedResult.os : this.parseOS();
  }
  parseOS() {
    this.parsedResult.os = {};
    const e = ne.find(oe, e => {
      if ("function" == typeof e.test) return e.test(this);
      if (e.test instanceof Array) return e.test.some(e => this.test(e));
      throw new Error("Browser's test function is not valid");
    });
    return e && (this.parsedResult.os = e.describe(this.getUA())), this.parsedResult.os;
  }
  getOSName(e) {
    const {
      name: t
    } = this.getOS();
    return e ? String(t).toLowerCase() || "" : t || "";
  }
  getOSVersion() {
    return this.getOS().version;
  }
  getPlatform() {
    return this.parsedResult.platform ? this.parsedResult.platform : this.parsePlatform();
  }
  getPlatformType(e = !1) {
    const {
      type: t
    } = this.getPlatform();
    return e ? String(t).toLowerCase() || "" : t || "";
  }
  parsePlatform() {
    this.parsedResult.platform = {};
    const e = ne.find(se, e => {
      if ("function" == typeof e.test) return e.test(this);
      if (e.test instanceof Array) return e.test.some(e => this.test(e));
      throw new Error("Browser's test function is not valid");
    });
    return e && (this.parsedResult.platform = e.describe(this.getUA())), this.parsedResult.platform;
  }
  getEngine() {
    return this.parsedResult.engine ? this.parsedResult.engine : this.parseEngine();
  }
  getEngineName(e) {
    return e ? String(this.getEngine().name).toLowerCase() || "" : this.getEngine().name || "";
  }
  parseEngine() {
    this.parsedResult.engine = {};
    const e = ne.find(ce, e => {
      if ("function" == typeof e.test) return e.test(this);
      if (e.test instanceof Array) return e.test.some(e => this.test(e));
      throw new Error("Browser's test function is not valid");
    });
    return e && (this.parsedResult.engine = e.describe(this.getUA())), this.parsedResult.engine;
  }
  parse() {
    return this.parseBrowser(), this.parseOS(), this.parsePlatform(), this.parseEngine(), this;
  }
  getResult() {
    return ne.assign({}, this.parsedResult);
  }
  satisfies(e) {
    const t = {};
    let r = 0;
    const n = {};
    let i = 0;
    if (Object.keys(e).forEach(a => {
      const o = e[a];
      "string" == typeof o ? (n[a] = o, i += 1) : "object" == typeof o && (t[a] = o, r += 1);
    }), r > 0) {
      const e = Object.keys(t),
        r = ne.find(e, e => this.isOS(e));
      if (r) {
        const e = this.satisfies(t[r]);
        if (void 0 !== e) return e;
      }
      const n = ne.find(e, e => this.isPlatform(e));
      if (n) {
        const e = this.satisfies(t[n]);
        if (void 0 !== e) return e;
      }
    }
    if (i > 0) {
      const e = Object.keys(n),
        t = ne.find(e, e => this.isBrowser(e, !0));
      if (void 0 !== t) return this.compareVersion(n[t]);
    }
  }
  isBrowser(e, t = !1) {
    const r = this.getBrowserName().toLowerCase();
    let n = e.toLowerCase();
    const i = ne.getBrowserTypeByAlias(n);
    return t && i && (n = i.toLowerCase()), n === r;
  }
  compareVersion(e) {
    let t = [0],
      r = e,
      n = !1;
    const i = this.getBrowserVersion();
    if ("string" == typeof i) return ">" === e[0] || "<" === e[0] ? (r = e.substr(1), "=" === e[1] ? (n = !0, r = e.substr(2)) : t = [], ">" === e[0] ? t.push(1) : t.push(-1)) : "=" === e[0] ? r = e.substr(1) : "~" === e[0] && (n = !0, r = e.substr(1)), t.indexOf(ne.compareVersions(i, r, n)) > -1;
  }
  isOS(e) {
    return this.getOSName(!0) === String(e).toLowerCase();
  }
  isPlatform(e) {
    return this.getPlatformType(!0) === String(e).toLowerCase();
  }
  isEngine(e) {
    return this.getEngineName(!0) === String(e).toLowerCase();
  }
  is(e, t = !1) {
    return this.isBrowser(e, t) || this.isOS(e) || this.isPlatform(e);
  }
  some(e = []) {
    return e.some(e => this.is(e));
  }
}
/*!
 * Bowser - a browser detector
 * https://github.com/lancedikson/bowser
 * MIT License | (c) Dustin Diaz 2012-2015
 * MIT License | (c) Denis Demchenko 2015-2019
 */
class ue {
  static getParser(e, t = !1) {
    if ("string" != typeof e) throw new Error("UserAgent should be a string");
    return new le(e, t);
  }
  static parse(e) {
    return new le(e).getResult();
  }
  static get BROWSER_MAP() {
    return X;
  }
  static get ENGINE_MAP() {
    return re;
  }
  static get OS_MAP() {
    return te;
  }
  static get PLATFORMS_MAP() {
    return ee;
  }
}
var de = "new",
  he = "loading",
  fe = "loaded",
  pe = "joining-meeting",
  ve = "joined-meeting",
  ge = "left-meeting",
  me = "error",
  ye = "blocked",
  be = "off",
  we = "sendable",
  _e = "loading",
  ke = "interrupted",
  Se = "playable",
  Me = "unknown",
  Ce = "full",
  Oe = "lobby",
  je = "none",
  Te = "base",
  Pe = "*",
  Ae = "ejected",
  Ee = "nbf-room",
  Ie = "nbf-token",
  Fe = "exp-room",
  Le = "exp-token",
  De = "meeting-full",
  Be = "end-of-life",
  Ne = "not-allowed",
  xe = "connection-error",
  Re = "cam-in-use",
  Ve = "mic-in-use",
  Ue = "cam-mic-in-use",
  ze = "permissions",
  Je = "undefined-mediadevices",
  We = "not-found",
  qe = "constraints",
  Ge = "unknown",
  He = "iframe-ready-for-launch-config",
  Ke = "iframe-launch-config",
  Qe = "theme-updated",
  $e = "loading",
  Ye = "load-attempt-failed",
  Ze = "loaded",
  Xe = "started-camera",
  et = "camera-error",
  tt = "joining-meeting",
  rt = "joined-meeting",
  nt = "left-meeting",
  it = "available-devices-updated",
  at = "participant-joined",
  ot = "participant-updated",
  st = "participant-left",
  ct = "participant-counts-updated",
  lt = "access-state-updated",
  ut = "meeting-session-updated",
  dt = "meeting-session-state-updated",
  ht = "meeting-session-data-error",
  ft = "waiting-participant-added",
  pt = "waiting-participant-updated",
  vt = "waiting-participant-removed",
  gt = "track-started",
  mt = "track-stopped",
  yt = "transcription-started",
  bt = "transcription-stopped",
  wt = "transcription-error",
  _t = "recording-started",
  kt = "recording-stopped",
  St = "recording-stats",
  Mt = "recording-error",
  Ct = "recording-upload-completed",
  Ot = "recording-data",
  jt = "app-message",
  Tt = "remote-media-player-started",
  Pt = "remote-media-player-updated",
  At = "remote-media-player-stopped",
  Et = "local-screen-share-started",
  It = "local-screen-share-stopped",
  Ft = "active-speaker-change",
  Lt = "active-speaker-mode-change",
  Dt = "network-quality-change",
  Bt = "network-connection",
  Nt = "cpu-load-change",
  xt = "fullscreen",
  Rt = "exited-fullscreen",
  Vt = "live-streaming-started",
  Ut = "live-streaming-updated",
  zt = "live-streaming-stopped",
  Jt = "live-streaming-error",
  Wt = "lang-updated",
  qt = "receive-settings-updated",
  Gt = "input-settings-updated",
  Ht = "nonfatal-error",
  Kt = "error",
  Qt = 102400,
  $t = "iframe-call-message",
  Yt = "register-input-handler",
  Zt = "daily-method-update-live-streaming-endpoints",
  Xt = "transmit-log",
  er = "daily-custom-track",
  tr = {
    NONE: "none",
    BGBLUR: "background-blur",
    BGIMAGE: "background-image"
  },
  rr = {
    NONE: "none",
    NOISE_CANCELLATION: "noise-cancellation"
  },
  nr = {
    PLAY: "play",
    PAUSE: "pause"
  },
  ir = 10,
  ar = ["jpg", "png", "jpeg"],
  or = "add-endpoints",
  sr = "remove-endpoints";
exports.DAILY_EVENT_ERROR = Kt;
exports.DAILY_EVENT_NONFATAL_ERROR = Ht;
exports.DAILY_EVENT_INPUT_SETTINGS_UPDATED = Gt;
exports.DAILY_EVENT_RECEIVE_SETTINGS_UPDATED = qt;
exports.DAILY_EVENT_LANG_UPDATED = Wt;
exports.DAILY_EVENT_LIVE_STREAMING_ERROR = Jt;
exports.DAILY_EVENT_LIVE_STREAMING_STOPPED = zt;
exports.DAILY_EVENT_LIVE_STREAMING_UPDATED = Ut;
exports.DAILY_EVENT_LIVE_STREAMING_STARTED = Vt;
exports.DAILY_EVENT_EXIT_FULLSCREEN = Rt;
exports.DAILY_EVENT_FULLSCREEN = xt;
exports.DAILY_EVENT_CPU_LOAD_CHANGE = Nt;
exports.DAILY_EVENT_NETWORK_CONNECTION = Bt;
exports.DAILY_EVENT_NETWORK_QUALITY_CHANGE = Dt;
exports.DAILY_EVENT_ACTIVE_SPEAKER_MODE_CHANGE = Lt;
exports.DAILY_EVENT_ACTIVE_SPEAKER_CHANGE = Ft;
exports.DAILY_EVENT_LOCAL_SCREEN_SHARE_STOPPED = It;
exports.DAILY_EVENT_LOCAL_SCREEN_SHARE_STARTED = Et;
exports.DAILY_EVENT_REMOTE_MEDIA_PLAYER_STOPPED = At;
exports.DAILY_EVENT_REMOTE_MEDIA_PLAYER_UPDATED = Pt;
exports.DAILY_EVENT_REMOTE_MEDIA_PLAYER_STARTED = Tt;
exports.DAILY_EVENT_APP_MSG = jt;
exports.DAILY_EVENT_RECORDING_DATA = Ot;
exports.DAILY_EVENT_RECORDING_UPLOAD_COMPLETED = Ct;
exports.DAILY_EVENT_RECORDING_ERROR = Mt;
exports.DAILY_EVENT_RECORDING_STATS = St;
exports.DAILY_EVENT_RECORDING_STOPPED = kt;
exports.DAILY_EVENT_RECORDING_STARTED = _t;
exports.DAILY_EVENT_TRANSCRIPTION_ERROR = wt;
exports.DAILY_EVENT_TRANSCRIPTION_STOPPED = bt;
exports.DAILY_EVENT_TRANSCRIPTION_STARTED = yt;
exports.DAILY_EVENT_TRACK_STOPPED = mt;
exports.DAILY_EVENT_TRACK_STARTED = gt;
exports.DAILY_EVENT_WAITING_PARTICIPANT_REMOVED = vt;
exports.DAILY_EVENT_WAITING_PARTICIPANT_UPDATED = pt;
exports.DAILY_EVENT_WAITING_PARTICIPANT_ADDED = ft;
exports.DAILY_EVENT_MEETING_SESSION_DATA_ERROR = ht;
exports.DAILY_EVENT_MEETING_SESSION_STATE_UPDATED = dt;
exports.DAILY_EVENT_MEETING_SESSION_UPDATED = ut;
exports.DAILY_EVENT_ACCESS_STATE_UPDATED = lt;
exports.DAILY_EVENT_PARTICIPANT_COUNTS_UPDATED = ct;
exports.DAILY_EVENT_PARTICIPANT_LEFT = st;
exports.DAILY_EVENT_PARTICIPANT_UPDATED = ot;
exports.DAILY_EVENT_PARTICIPANT_JOINED = at;
exports.DAILY_EVENT_LEFT_MEETING = nt;
exports.DAILY_EVENT_JOINED_MEETING = rt;
exports.DAILY_EVENT_JOINING_MEETING = tt;
exports.DAILY_EVENT_CAMERA_ERROR = et;
exports.DAILY_EVENT_STARTED_CAMERA = Xe;
exports.DAILY_EVENT_LOADED = Ze;
exports.DAILY_EVENT_LOAD_ATTEMPT_FAILED = Ye;
exports.DAILY_EVENT_LOADING = $e;
exports.DAILY_EVENT_THEME_UPDATED = Qe;
exports.DAILY_EVENT_IFRAME_LAUNCH_CONFIG = Ke;
exports.DAILY_EVENT_IFRAME_READY_FOR_LAUNCH_CONFIG = He;
exports.DAILY_CAMERA_ERROR_UNKNOWN = Ge;
exports.DAILY_CAMERA_ERROR_CONSTRAINTS = qe;
exports.DAILY_CAMERA_ERROR_NOT_FOUND = We;
exports.DAILY_CAMERA_ERROR_UNDEF_MEDIADEVICES = Je;
exports.DAILY_CAMERA_ERROR_PERMISSIONS = ze;
exports.DAILY_CAMERA_ERROR_CAM_AND_MIC_IN_USE = Ue;
exports.DAILY_CAMERA_ERROR_MIC_IN_USE = Ve;
exports.DAILY_CAMERA_ERROR_CAM_IN_USE = Re;
exports.DAILY_FATAL_ERROR_CONNECTION = xe;
exports.DAILY_FATAL_ERROR_NOT_ALLOWED = Ne;
exports.DAILY_FATAL_ERROR_EOL = Be;
exports.DAILY_FATAL_ERROR_MEETING_FULL = De;
exports.DAILY_FATAL_ERROR_EXP_TOKEN = Le;
exports.DAILY_FATAL_ERROR_EXP_ROOM = Fe;
exports.DAILY_FATAL_ERROR_NBF_TOKEN = Ie;
exports.DAILY_FATAL_ERROR_NBF_ROOM = Ee;
exports.DAILY_FATAL_ERROR_EJECTED = Ae;
exports.DAILY_RECEIVE_SETTINGS_ALL_PARTICIPANTS_KEY = Pe;
exports.DAILY_RECEIVE_SETTINGS_BASE_KEY = Te;
exports.DAILY_ACCESS_LEVEL_NONE = je;
exports.DAILY_ACCESS_LEVEL_LOBBY = Oe;
exports.DAILY_ACCESS_LEVEL_FULL = Ce;
exports.DAILY_ACCESS_UNKNOWN = Me;
exports.DAILY_TRACK_STATE_PLAYABLE = Se;
exports.DAILY_TRACK_STATE_INTERRUPTED = ke;
exports.DAILY_TRACK_STATE_LOADING = _e;
exports.DAILY_TRACK_STATE_SENDABLE = we;
exports.DAILY_TRACK_STATE_OFF = be;
exports.DAILY_TRACK_STATE_BLOCKED = ye;
exports.DAILY_STATE_ERROR = me;
exports.DAILY_STATE_LEFT = ge;
exports.DAILY_STATE_JOINED = ve;
exports.DAILY_STATE_JOINING = pe;
exports.DAILY_STATE_NEW = de;
function cr() {
  return !lr() && "undefined" != typeof window && window.navigator && window.navigator.userAgent ? window.navigator.userAgent : "";
}
function lr() {
  return "undefined" != typeof navigator && navigator.product && "ReactNative" === navigator.product;
}
function ur() {
  return navigator && navigator.mediaDevices && navigator.mediaDevices.getUserMedia;
}
function dr() {
  return !!(navigator && navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) && function (e, t) {
    if (!e || !t) return !0;
    switch (e) {
      case "Chrome":
        return t.major >= 75;
      case "Safari":
        return RTCRtpTransceiver.prototype.hasOwnProperty("currentDirection") && !(13 === t.major && 0 === t.minor && 0 === t.point);
      case "Firefox":
        return t.major >= 67;
    }
    return !0;
  }(br(), function () {
    switch (br()) {
      case "Chrome":
        return wr();
      case "Safari":
        return kr();
      case "Firefox":
        return Sr();
      case "Edge":
        return function () {
          var e = 0,
            t = 0;
          if ("undefined" != typeof window) {
            var r = cr().match(/Edge\/(\d+).(\d+)/);
            if (r) try {
              e = parseInt(r[1]), t = parseInt(r[2]);
            } catch (e) {}
          }
          return {
            major: e,
            minor: t
          };
        }();
    }
  }());
}
function hr() {
  if (lr()) return !1;
  if (!document) return !1;
  var e = document.createElement("iframe");
  return !!e.requestFullscreen || !!e.webkitRequestFullscreen;
}
var fr = ["Chrome", "Firefox"];
function pr() {
  return !lr() && !yr() && fr.includes(br());
}
var vr = ["Chrome", "Firefox"];
function gr() {
  return !lr() && !yr() && "undefined" != typeof AudioWorkletNode && vr.includes(br());
}
function mr() {
  return ur() && !function () {
    var e,
      t = br();
    if (!cr()) return !0;
    switch (t) {
      case "Chrome":
        return (e = wr()).major && e.major > 0 && e.major < 61;
      case "Firefox":
        return (e = Sr()).major < 78;
      case "Safari":
        return (e = kr()).major < 12;
      default:
        return !0;
    }
  }();
}
function yr() {
  var e,
    t,
    r = cr(),
    n = r.match(/Mac/) && (!lr() && "undefined" != typeof window && null !== (e = window) && void 0 !== e && null !== (t = e.navigator) && void 0 !== t && t.maxTouchPoints ? window.navigator.maxTouchPoints : 0) >= 5;
  return !!(r.match(/Mobi/) || r.match(/Android/) || n) || !!cr().match(/DailyAnd\//) || void 0;
}
function br() {
  if ("undefined" != typeof window) {
    var e = cr();
    return _r() ? "Safari" : e.indexOf("Edge") > -1 ? "Edge" : e.match(/Chrome\//) ? "Chrome" : e.indexOf("Safari") > -1 ? "Safari" : e.indexOf("Firefox") > -1 ? "Firefox" : e.indexOf("MSIE") > -1 || e.indexOf(".NET") > -1 ? "IE" : "Unknown Browser";
  }
}
function wr() {
  var e = 0,
    t = 0,
    r = 0,
    n = 0,
    i = !1;
  if ("undefined" != typeof window) {
    var a = cr(),
      o = a.match(/Chrome\/(\d+).(\d+).(\d+).(\d+)/);
    if (o) try {
      e = parseInt(o[1]), t = parseInt(o[2]), r = parseInt(o[3]), n = parseInt(o[4]), i = a.indexOf("OPR/") > -1;
    } catch (e) {}
  }
  return {
    major: e,
    minor: t,
    build: r,
    patch: n,
    opera: i
  };
}
function _r() {
  return !!cr().match(/iPad|iPhone|iPod/i) && ur();
}
function kr() {
  var e = 0,
    t = 0,
    r = 0;
  if ("undefined" != typeof window) {
    var n = cr().match(/Version\/(\d+).(\d+)(.(\d+))?/);
    if (n) try {
      e = parseInt(n[1]), t = parseInt(n[2]), r = parseInt(n[4]);
    } catch (e) {} else _r() && (e = 14, t = 0, r = 3);
  }
  return {
    major: e,
    minor: t,
    point: r
  };
}
function Sr() {
  var e = 0,
    t = 0;
  if ("undefined" != typeof window) {
    var r = cr().match(/Firefox\/(\d+).(\d+)/);
    if (r) try {
      e = parseInt(r[1]), t = parseInt(r[2]);
    } catch (e) {}
  }
  return {
    major: e,
    minor: t
  };
}
function Mr() {
  return Date.now() + Math.random().toString();
}
function Cr() {
  throw new Error("Method must be implemented in subclass");
}
function Or() {
  return window._dailyConfig && window._dailyConfig.callObjectBundleUrlOverride ? window._dailyConfig.callObjectBundleUrlOverride : "https://c.daily.co/call-machine/versioned/".concat("0.47.0", "/static/call-machine-object-bundle.js");
}
function jr(e) {
  try {
    new URL(e);
  } catch (e) {
    return !1;
  }
  return !0;
}
var Tr = function () {
  function e() {
    n(this, e);
  }
  return s(e, [{
    key: "addListenerForMessagesFromCallMachine",
    value: function (e, t, r) {
      Cr();
    }
  }, {
    key: "addListenerForMessagesFromDailyJs",
    value: function (e, t, r) {
      Cr();
    }
  }, {
    key: "sendMessageToCallMachine",
    value: function (e, t, r, n) {
      Cr();
    }
  }, {
    key: "sendMessageToDailyJs",
    value: function (e, t) {
      Cr();
    }
  }, {
    key: "removeListener",
    value: function (e) {
      Cr();
    }
  }]), e;
}();
function Pr(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function (t) {
      return Object.getOwnPropertyDescriptor(e, t).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Ar(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = null != arguments[t] ? arguments[t] : {};
    t % 2 ? Pr(Object(r), !0).forEach(function (t) {
      f(e, t, r[t]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Pr(Object(r)).forEach(function (t) {
      Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
    });
  }
  return e;
}
function Er(e) {
  var t = function () {
    if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
    if (Reflect.construct.sham) return !1;
    if ("function" == typeof Proxy) return !0;
    try {
      return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0;
    } catch (e) {
      return !1;
    }
  }();
  return function () {
    var r,
      n = h(e);
    if (t) {
      var i = h(this).constructor;
      r = Reflect.construct(n, arguments, i);
    } else r = n.apply(this, arguments);
    return d(this, r);
  };
}
var Ir = function (e) {
  u(r, Tr);
  var t = Er(r);
  function r() {
    var e;
    return n(this, r), (e = t.call(this))._wrappedListeners = {}, e._messageCallbacks = {}, e;
  }
  return s(r, [{
    key: "addListenerForMessagesFromCallMachine",
    value: function (e, t, r) {
      var n = this,
        i = function (i) {
          if (i.data && "iframe-call-message" === i.data.what && (!i.data.callFrameId || i.data.callFrameId === t) && (!i.data.from || "module" !== i.data.from)) {
            var a = Ar({}, i.data);
            if (delete a.from, a.callbackStamp && n._messageCallbacks[a.callbackStamp]) {
              var o = a.callbackStamp;
              n._messageCallbacks[o].call(r, a), delete n._messageCallbacks[o];
            }
            delete a.what, delete a.callbackStamp, e.call(r, a);
          }
        };
      this._wrappedListeners[e] = i, window.addEventListener("message", i);
    }
  }, {
    key: "addListenerForMessagesFromDailyJs",
    value: function (e, t, r) {
      var n = function (n) {
        if (!(!n.data || n.data.what !== $t || !n.data.action || n.data.from && "module" !== n.data.from || n.data.callFrameId && t && n.data.callFrameId !== t)) {
          var i = n.data;
          e.call(r, i);
        }
      };
      this._wrappedListeners[e] = n, window.addEventListener("message", n);
    }
  }, {
    key: "sendMessageToCallMachine",
    value: function (e, t, r, n) {
      if (!n) throw new Error("undefined callFrameId. Are you trying to use a dailyIFrame instance previously destroyed?");
      var i = Ar({}, e);
      if (i.what = $t, i.from = "module", i.callFrameId = n, t) {
        var a = Mr();
        this._messageCallbacks[a] = t, i.callbackStamp = a;
      }
      (r ? r.contentWindow : window).postMessage(i, "*");
    }
  }, {
    key: "sendMessageToDailyJs",
    value: function (e, t) {
      e.what = $t, e.callFrameId = t, e.from = "embedded", window.postMessage(e, "*");
    }
  }, {
    key: "removeListener",
    value: function (e) {
      var t = this._wrappedListeners[e];
      t && (window.removeEventListener("message", t), delete this._wrappedListeners[e]);
    }
  }, {
    key: "forwardPackagedMessageToCallMachine",
    value: function (e, t, r) {
      var n = Ar({}, e);
      n.callFrameId = r, (t ? t.contentWindow : window).postMessage(n, "*");
    }
  }, {
    key: "addListenerForPackagedMessagesFromCallMachine",
    value: function (e, t) {
      var r = function (r) {
        if (r.data && "iframe-call-message" === r.data.what && (!r.data.callFrameId || r.data.callFrameId === t) && (!r.data.from || "module" !== r.data.from)) {
          var n = r.data;
          e(n);
        }
      };
      return this._wrappedListeners[e] = r, window.addEventListener("message", r), e;
    }
  }, {
    key: "removeListenerForPackagedMessagesFromCallMachine",
    value: function (e) {
      var t = this._wrappedListeners[e];
      t && (window.removeEventListener("message", t), delete this._wrappedListeners[e]);
    }
  }]), r;
}();
function Fr(e) {
  var t = function () {
    if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
    if (Reflect.construct.sham) return !1;
    if ("function" == typeof Proxy) return !0;
    try {
      return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0;
    } catch (e) {
      return !1;
    }
  }();
  return function () {
    var r,
      n = h(e);
    if (t) {
      var i = h(this).constructor;
      r = Reflect.construct(n, arguments, i);
    } else r = n.apply(this, arguments);
    return d(this, r);
  };
}
var Lr = function (e) {
    u(r, Tr);
    var t = Fr(r);
    function r() {
      var e;
      return n(this, r), e = t.call(this), global.callMachineToDailyJsEmitter = global.callMachineToDailyJsEmitter || new y.EventEmitter(), global.dailyJsToCallMachineEmitter = global.dailyJsToCallMachineEmitter || new y.EventEmitter(), e._wrappedListeners = {}, e._messageCallbacks = {}, e;
    }
    return s(r, [{
      key: "addListenerForMessagesFromCallMachine",
      value: function (e, t, r) {
        this._addListener(e, global.callMachineToDailyJsEmitter, r, "received call machine message");
      }
    }, {
      key: "addListenerForMessagesFromDailyJs",
      value: function (e, t, r) {
        this._addListener(e, global.dailyJsToCallMachineEmitter, r, "received daily-js message");
      }
    }, {
      key: "sendMessageToCallMachine",
      value: function (e, t) {
        this._sendMessage(e, global.dailyJsToCallMachineEmitter, "sending message to call machine", t);
      }
    }, {
      key: "sendMessageToDailyJs",
      value: function (e) {
        this._sendMessage(e, global.callMachineToDailyJsEmitter, "sending message to daily-js");
      }
    }, {
      key: "removeListener",
      value: function (e) {
        var t = this._wrappedListeners[e];
        t && (global.callMachineToDailyJsEmitter.removeListener("message", t), global.dailyJsToCallMachineEmitter.removeListener("message", t), delete this._wrappedListeners[e]);
      }
    }, {
      key: "_addListener",
      value: function (e, t, r, n) {
        var i = this,
          a = function (t) {
            if (t.callbackStamp && i._messageCallbacks[t.callbackStamp]) {
              var n = t.callbackStamp;
              i._messageCallbacks[n].call(r, t), delete i._messageCallbacks[n];
            }
            e.call(r, t);
          };
        this._wrappedListeners[e] = a, t.addListener("message", a);
      }
    }, {
      key: "_sendMessage",
      value: function (e, t, r, n) {
        if (n) {
          var i = Mr();
          this._messageCallbacks[i] = n, e.callbackStamp = i;
        }
        t.emit("message", e);
      }
    }]), r;
  }(),
  Dr = Object.prototype.hasOwnProperty;
function Br(e, t, r) {
  for (r of e.keys()) if (Nr(r, t)) return r;
}
function Nr(e, t) {
  var r, n, i;
  if (e === t) return !0;
  if (e && t && (r = e.constructor) === t.constructor) {
    if (r === Date) return e.getTime() === t.getTime();
    if (r === RegExp) return e.toString() === t.toString();
    if (r === Array) {
      if ((n = e.length) === t.length) for (; n-- && Nr(e[n], t[n]););
      return -1 === n;
    }
    if (r === Set) {
      if (e.size !== t.size) return !1;
      for (n of e) {
        if ((i = n) && "object" == typeof i && !(i = Br(t, i))) return !1;
        if (!t.has(i)) return !1;
      }
      return !0;
    }
    if (r === Map) {
      if (e.size !== t.size) return !1;
      for (n of e) {
        if ((i = n[0]) && "object" == typeof i && !(i = Br(t, i))) return !1;
        if (!Nr(n[1], t.get(i))) return !1;
      }
      return !0;
    }
    if (r === ArrayBuffer) e = new Uint8Array(e), t = new Uint8Array(t);else if (r === DataView) {
      if ((n = e.byteLength) === t.byteLength) for (; n-- && e.getInt8(n) === t.getInt8(n););
      return -1 === n;
    }
    if (ArrayBuffer.isView(e)) {
      if ((n = e.byteLength) === t.byteLength) for (; n-- && e[n] === t[n];);
      return -1 === n;
    }
    if (!r || "object" == typeof e) {
      for (r in n = 0, e) {
        if (Dr.call(e, r) && ++n && !Dr.call(t, r)) return !1;
        if (!(r in t) || !Nr(e[r], t[r])) return !1;
      }
      return Object.keys(t).length === n;
    }
  }
  return e != e && t != t;
}
var xr = "replace",
  Rr = "shallow-merge",
  Vr = [xr, Rr];
var Ur = function () {
  function e() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
      r = t.data,
      i = t.mergeStrategy,
      a = void 0 === i ? xr : i;
    n(this, e), e._validateMergeStrategy(a), e._validateData(r, a), this.mergeStrategy = a, this.data = r;
  }
  return s(e, [{
    key: "isNoOp",
    value: function () {
      return e.isNoOpUpdate(this.data, this.mergeStrategy);
    }
  }], [{
    key: "isNoOpUpdate",
    value: function (e, t) {
      return 0 === Object.keys(e).length && t === Rr;
    }
  }, {
    key: "_validateMergeStrategy",
    value: function (e) {
      if (!Vr.includes(e)) throw Error("Unrecognized mergeStrategy provided. Options are: [".concat(Vr, "]"));
    }
  }, {
    key: "_validateData",
    value: function (e, t) {
      if (!function (e) {
        if (null == e || "object" !== i(e)) return !1;
        var t = Object.getPrototypeOf(e);
        return null == t || t === Object.prototype;
      }(e)) throw Error("Meeting session data must be a plain (map-like) object");
      var r;
      try {
        if (r = JSON.stringify(e), t === xr) {
          var n = JSON.parse(r);
          Nr(n, e) || console.warn("The meeting session data provided will be modified when serialized.", n, e);
        } else if (t === Rr) for (var a in e) if (Object.hasOwnProperty.call(e, a) && void 0 !== e[a]) {
          var o = JSON.parse(JSON.stringify(e[a]));
          Nr(e[a], o) || console.warn("At least one key in the meeting session data provided will be modified when serialized.", o, e[a]);
        }
      } catch (e) {
        throw Error("Meeting session data must be serializable to JSON: ".concat(e));
      }
      if (r.length > Qt) throw Error("Meeting session data is too large (".concat(r.length, " characters). Maximum size suppported is ").concat(Qt, "."));
    }
  }]), e;
}();
function zr(e, t, r) {
  return zr = function () {
    if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
    if (Reflect.construct.sham) return !1;
    if ("function" == typeof Proxy) return !0;
    try {
      return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0;
    } catch (e) {
      return !1;
    }
  }() ? Reflect.construct.bind() : function (e, t, r) {
    var n = [null];
    n.push.apply(n, t);
    var i = new (Function.bind.apply(e, n))();
    return r && l(i, r.prototype), i;
  }, zr.apply(null, arguments);
}
function Jr(e) {
  var t = "function" == typeof Map ? new Map() : void 0;
  return Jr = function (e) {
    if (null === e || (r = e, -1 === Function.toString.call(r).indexOf("[native code]"))) return e;
    var r;
    if ("function" != typeof e) throw new TypeError("Super expression must either be null or a function");
    if (void 0 !== t) {
      if (t.has(e)) return t.get(e);
      t.set(e, n);
    }
    function n() {
      return zr(e, arguments, h(this).constructor);
    }
    return n.prototype = Object.create(e.prototype, {
      constructor: {
        value: n,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }), l(n, e);
  }, Jr(e);
}
function Wr(e) {
  var t = function () {
    if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
    if (Reflect.construct.sham) return !1;
    if ("function" == typeof Proxy) return !0;
    try {
      return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0;
    } catch (e) {
      return !1;
    }
  }();
  return function () {
    var r,
      n = h(e);
    if (t) {
      var i = h(this).constructor;
      r = Reflect.construct(n, arguments, i);
    } else r = n.apply(this, arguments);
    return d(this, r);
  };
}
var qr = function () {
    function e() {
      n(this, e), this._currentLoad = null;
    }
    return s(e, [{
      key: "load",
      value: function (e, t, r, n) {
        if (this.loaded) return window._dailyCallObjectSetup(e), void r(!0);
        !function (e, t) {
          window._dailyConfig || (window._dailyConfig = {}), window._dailyConfig.callFrameId = e, window._dailyConfig.avoidEval = t;
        }(e, t), this._currentLoad && this._currentLoad.cancel(), this._currentLoad = new Gr(function () {
          r(!1);
        }, n), this._currentLoad.start();
      }
    }, {
      key: "cancel",
      value: function () {
        this._currentLoad && this._currentLoad.cancel();
      }
    }, {
      key: "loaded",
      get: function () {
        return this._currentLoad && this._currentLoad.succeeded;
      }
    }]), e;
  }(),
  Gr = function () {
    function e(t, r) {
      n(this, e), this._attemptsRemaining = 3, this._currentAttempt = null, this._successCallback = t, this._failureCallback = r;
    }
    return s(e, [{
      key: "start",
      value: function () {
        var e = this;
        if (!this._currentAttempt) {
          this._currentAttempt = new Qr(this._successCallback, function t(r) {
            e._currentAttempt.cancelled || (e._attemptsRemaining--, e._failureCallback(r, e._attemptsRemaining > 0), e._attemptsRemaining <= 0 || setTimeout(function () {
              e._currentAttempt.cancelled || (e._currentAttempt = new Qr(e._successCallback, t), e._currentAttempt.start());
            }, 3e3));
          }), this._currentAttempt.start();
        }
      }
    }, {
      key: "cancel",
      value: function () {
        this._currentAttempt && this._currentAttempt.cancel();
      }
    }, {
      key: "cancelled",
      get: function () {
        return this._currentAttempt && this._currentAttempt.cancelled;
      }
    }, {
      key: "succeeded",
      get: function () {
        return this._currentAttempt && this._currentAttempt.succeeded;
      }
    }]), e;
  }(),
  Hr = function (e) {
    u(r, Jr(Error));
    var t = Wr(r);
    function r() {
      return n(this, r), t.apply(this, arguments);
    }
    return s(r);
  }(),
  Kr = 2e4,
  Qr = function () {
    function e(t, r) {
      n(this, e), this._loadAttemptImpl = lr() || !_dailyConfig.avoidEval ? new $r(t, r) : new Yr(t, r);
    }
    var t;
    return s(e, [{
      key: "start",
      value: (t = r(function* () {
        return this._loadAttemptImpl.start();
      }), function () {
        return t.apply(this, arguments);
      })
    }, {
      key: "cancel",
      value: function () {
        this._loadAttemptImpl.cancel();
      }
    }, {
      key: "cancelled",
      get: function () {
        return this._loadAttemptImpl.cancelled;
      }
    }, {
      key: "succeeded",
      get: function () {
        return this._loadAttemptImpl.succeeded;
      }
    }]), e;
  }(),
  $r = function () {
    function e(t, r) {
      n(this, e), this.cancelled = !1, this.succeeded = !1, this._networkTimedOut = !1, this._networkTimeout = null, this._iosCache = "undefined" != typeof iOSCallObjectBundleCache && iOSCallObjectBundleCache, this._refetchHeaders = null, this._successCallback = t, this._failureCallback = r;
    }
    var t, i, a, o;
    return s(e, [{
      key: "start",
      value: (o = r(function* () {
        var e = Or();
        !(yield this._tryLoadFromIOSCache(e)) && this._loadFromNetwork(e);
      }), function () {
        return o.apply(this, arguments);
      })
    }, {
      key: "cancel",
      value: function () {
        clearTimeout(this._networkTimeout), this.cancelled = !0;
      }
    }, {
      key: "_tryLoadFromIOSCache",
      value: (a = r(function* (e) {
        if (!this._iosCache) return !1;
        try {
          var t = yield this._iosCache.get(e);
          return !!this.cancelled || !!t && (t.code ? (Function('"use strict";' + t.code)(), this.succeeded = !0, this._successCallback(), !0) : (this._refetchHeaders = t.refetchHeaders, !1));
        } catch (e) {
          return !1;
        }
      }), function (e) {
        return a.apply(this, arguments);
      })
    }, {
      key: "_loadFromNetwork",
      value: (i = r(function* (e) {
        var t = this;
        this._networkTimeout = setTimeout(function () {
          t._networkTimedOut = !0, t._failureCallback("Timed out (>".concat(Kr, " ms) when loading call object bundle ").concat(e));
        }, Kr);
        try {
          var r = this._refetchHeaders ? {
              headers: this._refetchHeaders
            } : {},
            n = yield fetch(e, r);
          if (clearTimeout(this._networkTimeout), this.cancelled || this._networkTimedOut) throw new Hr();
          var i = yield this._getBundleCodeFromResponse(e, n);
          if (this.cancelled) throw new Hr();
          Function('"use strict";' + i)(), this._iosCache && this._iosCache.set(e, i, n.headers), this.succeeded = !0, this._successCallback();
        } catch (t) {
          if (clearTimeout(this._networkTimeout), t instanceof Hr || this.cancelled || this._networkTimedOut) return;
          this._failureCallback("Failed to load call object bundle ".concat(e, ": ").concat(t));
        }
      }), function (e) {
        return i.apply(this, arguments);
      })
    }, {
      key: "_getBundleCodeFromResponse",
      value: (t = r(function* (e, t) {
        if (t.ok) return yield t.text();
        if (this._iosCache && 304 === t.status) return (yield this._iosCache.renew(e, t.headers)).code;
        throw new Error("Received ".concat(t.status, " response"));
      }), function (e, r) {
        return t.apply(this, arguments);
      })
    }]), e;
  }(),
  Yr = function () {
    function e(t, r) {
      n(this, e), this.cancelled = !1, this.succeeded = !1, this._successCallback = t, this._failureCallback = r, this._attemptId = Mr(), this._networkTimeout = null, this._scriptElement = null;
    }
    var t;
    return s(e, [{
      key: "start",
      value: (t = r(function* () {
        window._dailyCallMachineLoadWaitlist || (window._dailyCallMachineLoadWaitlist = new Set());
        var e = Or();
        "object" === ("undefined" == typeof document ? "undefined" : i(document)) ? this._startLoading(e) : this._failureCallback("Call object bundle must be loaded in a DOM/web context");
      }), function () {
        return t.apply(this, arguments);
      })
    }, {
      key: "cancel",
      value: function () {
        this._stopLoading(), this.cancelled = !0;
      }
    }, {
      key: "_startLoading",
      value: function (e) {
        var t = this;
        this._signUpForCallMachineLoadWaitlist(), this._networkTimeout = setTimeout(function () {
          t._stopLoading(), t._failureCallback("Timed out (>".concat(Kr, " ms) when loading call object bundle ").concat(e));
        }, Kr);
        var n = document.getElementsByTagName("head")[0],
          i = document.createElement("script");
        this._scriptElement = i, i.onload = r(function* () {
          t._stopLoading(), t.succeeded = !0, t._successCallback();
        }), i.onerror = function () {
          var e = r(function* (e) {
            t._stopLoading(), t._failureCallback("Failed to load call object bundle ".concat(e.target.src));
          });
          return function (t) {
            return e.apply(this, arguments);
          };
        }(), i.src = e, n.appendChild(i);
      }
    }, {
      key: "_stopLoading",
      value: function () {
        this._withdrawFromCallMachineLoadWaitlist(), clearTimeout(this._networkTimeout), this._scriptElement && (this._scriptElement.onload = null, this._scriptElement.onerror = null);
      }
    }, {
      key: "_signUpForCallMachineLoadWaitlist",
      value: function () {
        window._dailyCallMachineLoadWaitlist.add(this._attemptId);
      }
    }, {
      key: "_withdrawFromCallMachineLoadWaitlist",
      value: function () {
        window._dailyCallMachineLoadWaitlist.delete(this._attemptId);
      }
    }]), e;
  }();
var Zr = function (e, t) {
  for (var r = -1, n = null == e ? 0 : e.length, i = 0, a = []; ++r < n;) {
    var o = e[r];
    t(o, r, e) && (a[i++] = o);
  }
  return a;
};
var Xr = function (e) {
  return function (t, r, n) {
    for (var i = -1, a = Object(t), o = n(t), s = o.length; s--;) {
      var c = o[e ? s : ++i];
      if (!1 === r(a[c], c, a)) break;
    }
    return t;
  };
}();
var en = function (e, t) {
    for (var r = -1, n = Array(e); ++r < e;) n[r] = t(r);
    return n;
  },
  tn = "object" == typeof m && m && m.Object === Object && m,
  rn = tn,
  nn = "object" == typeof self && self && self.Object === Object && self,
  an = rn || nn || Function("return this")(),
  on = an.Symbol,
  sn = on,
  cn = Object.prototype,
  ln = cn.hasOwnProperty,
  un = cn.toString,
  dn = sn ? sn.toStringTag : void 0;
var hn = function (e) {
    var t = ln.call(e, dn),
      r = e[dn];
    try {
      e[dn] = void 0;
      var n = !0;
    } catch (e) {}
    var i = un.call(e);
    return n && (t ? e[dn] = r : delete e[dn]), i;
  },
  fn = Object.prototype.toString;
var pn = hn,
  vn = function (e) {
    return fn.call(e);
  },
  gn = on ? on.toStringTag : void 0;
var mn = function (e) {
  return null == e ? void 0 === e ? "[object Undefined]" : "[object Null]" : gn && gn in Object(e) ? pn(e) : vn(e);
};
var yn = function (e) {
    return null != e && "object" == typeof e;
  },
  bn = mn,
  wn = yn;
var _n = function (e) {
    return wn(e) && "[object Arguments]" == bn(e);
  },
  kn = yn,
  Sn = Object.prototype,
  Mn = Sn.hasOwnProperty,
  Cn = Sn.propertyIsEnumerable,
  On = _n(function () {
    return arguments;
  }()) ? _n : function (e) {
    return kn(e) && Mn.call(e, "callee") && !Cn.call(e, "callee");
  },
  jn = Array.isArray,
  Tn = {};
var Pn = function () {
  return !1;
};
!function (e, t) {
  var r = an,
    n = Pn,
    i = t && !t.nodeType && t,
    a = i && e && !e.nodeType && e,
    o = a && a.exports === i ? r.Buffer : void 0,
    s = (o ? o.isBuffer : void 0) || n;
  e.exports = s;
}({
  get exports() {
    return Tn;
  },
  set exports(e) {
    Tn = e;
  }
}, Tn);
var An = /^(?:0|[1-9]\d*)$/;
var En = function (e, t) {
  var r = typeof e;
  return !!(t = null == t ? 9007199254740991 : t) && ("number" == r || "symbol" != r && An.test(e)) && e > -1 && e % 1 == 0 && e < t;
};
var In = function (e) {
    return "number" == typeof e && e > -1 && e % 1 == 0 && e <= 9007199254740991;
  },
  Fn = mn,
  Ln = In,
  Dn = yn,
  Bn = {};
Bn["[object Float32Array]"] = Bn["[object Float64Array]"] = Bn["[object Int8Array]"] = Bn["[object Int16Array]"] = Bn["[object Int32Array]"] = Bn["[object Uint8Array]"] = Bn["[object Uint8ClampedArray]"] = Bn["[object Uint16Array]"] = Bn["[object Uint32Array]"] = !0, Bn["[object Arguments]"] = Bn["[object Array]"] = Bn["[object ArrayBuffer]"] = Bn["[object Boolean]"] = Bn["[object DataView]"] = Bn["[object Date]"] = Bn["[object Error]"] = Bn["[object Function]"] = Bn["[object Map]"] = Bn["[object Number]"] = Bn["[object Object]"] = Bn["[object RegExp]"] = Bn["[object Set]"] = Bn["[object String]"] = Bn["[object WeakMap]"] = !1;
var Nn = function (e) {
  return Dn(e) && Ln(e.length) && !!Bn[Fn(e)];
};
var xn = function (e) {
    return function (t) {
      return e(t);
    };
  },
  Rn = {};
!function (e, t) {
  var r = tn,
    n = t && !t.nodeType && t,
    i = n && e && !e.nodeType && e,
    a = i && i.exports === n && r.process,
    o = function () {
      try {
        var e = i && i.require && i.require("util").types;
        return e || a && a.binding && a.binding("util");
      } catch (e) {}
    }();
  e.exports = o;
}({
  get exports() {
    return Rn;
  },
  set exports(e) {
    Rn = e;
  }
}, Rn);
var Vn = Nn,
  Un = xn,
  zn = Rn && Rn.isTypedArray,
  Jn = zn ? Un(zn) : Vn,
  Wn = en,
  qn = On,
  Gn = jn,
  Hn = Tn,
  Kn = En,
  Qn = Jn,
  $n = Object.prototype.hasOwnProperty;
var Yn = function (e, t) {
    var r = Gn(e),
      n = !r && qn(e),
      i = !r && !n && Hn(e),
      a = !r && !n && !i && Qn(e),
      o = r || n || i || a,
      s = o ? Wn(e.length, String) : [],
      c = s.length;
    for (var l in e) !t && !$n.call(e, l) || o && ("length" == l || i && ("offset" == l || "parent" == l) || a && ("buffer" == l || "byteLength" == l || "byteOffset" == l) || Kn(l, c)) || s.push(l);
    return s;
  },
  Zn = Object.prototype;
var Xn = function (e) {
  var t = e && e.constructor;
  return e === ("function" == typeof t && t.prototype || Zn);
};
var ei = function (e, t) {
    return function (r) {
      return e(t(r));
    };
  }(Object.keys, Object),
  ti = Xn,
  ri = ei,
  ni = Object.prototype.hasOwnProperty;
var ii = function (e) {
    var t = typeof e;
    return null != e && ("object" == t || "function" == t);
  },
  ai = mn,
  oi = ii;
var si = function (e) {
    if (!oi(e)) return !1;
    var t = ai(e);
    return "[object Function]" == t || "[object GeneratorFunction]" == t || "[object AsyncFunction]" == t || "[object Proxy]" == t;
  },
  ci = si,
  li = In;
var ui = function (e) {
    return null != e && li(e.length) && !ci(e);
  },
  di = Yn,
  hi = function (e) {
    if (!ti(e)) return ri(e);
    var t = [];
    for (var r in Object(e)) ni.call(e, r) && "constructor" != r && t.push(r);
    return t;
  },
  fi = ui;
var pi = function (e) {
    return fi(e) ? di(e) : hi(e);
  },
  vi = Xr,
  gi = pi;
var mi = ui;
var yi = function (e, t) {
    return function (r, n) {
      if (null == r) return r;
      if (!mi(r)) return e(r, n);
      for (var i = r.length, a = t ? i : -1, o = Object(r); (t ? a-- : ++a < i) && !1 !== n(o[a], a, o););
      return r;
    };
  }(function (e, t) {
    return e && vi(e, t, gi);
  }),
  bi = yi;
var wi = function (e, t) {
  var r = [];
  return bi(e, function (e, n, i) {
    t(e, n, i) && r.push(e);
  }), r;
};
var _i = function () {
  this.__data__ = [], this.size = 0;
};
var ki = function (e, t) {
    return e === t || e != e && t != t;
  },
  Si = ki;
var Mi = function (e, t) {
    for (var r = e.length; r--;) if (Si(e[r][0], t)) return r;
    return -1;
  },
  Ci = Mi,
  Oi = Array.prototype.splice;
var ji = Mi;
var Ti = Mi;
var Pi = Mi;
var Ai = _i,
  Ei = function (e) {
    var t = this.__data__,
      r = Ci(t, e);
    return !(r < 0) && (r == t.length - 1 ? t.pop() : Oi.call(t, r, 1), --this.size, !0);
  },
  Ii = function (e) {
    var t = this.__data__,
      r = ji(t, e);
    return r < 0 ? void 0 : t[r][1];
  },
  Fi = function (e) {
    return Ti(this.__data__, e) > -1;
  },
  Li = function (e, t) {
    var r = this.__data__,
      n = Pi(r, e);
    return n < 0 ? (++this.size, r.push([e, t])) : r[n][1] = t, this;
  };
function Di(e) {
  var t = -1,
    r = null == e ? 0 : e.length;
  for (this.clear(); ++t < r;) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
Di.prototype.clear = Ai, Di.prototype.delete = Ei, Di.prototype.get = Ii, Di.prototype.has = Fi, Di.prototype.set = Li;
var Bi = Di,
  Ni = Bi;
var xi = function () {
  this.__data__ = new Ni(), this.size = 0;
};
var Ri = function (e) {
  var t = this.__data__,
    r = t.delete(e);
  return this.size = t.size, r;
};
var Vi = function (e) {
  return this.__data__.get(e);
};
var Ui,
  zi = function (e) {
    return this.__data__.has(e);
  },
  Ji = an["__core-js_shared__"],
  Wi = (Ui = /[^.]+$/.exec(Ji && Ji.keys && Ji.keys.IE_PROTO || "")) ? "Symbol(src)_1." + Ui : "";
var qi = function (e) {
    return !!Wi && Wi in e;
  },
  Gi = Function.prototype.toString;
var Hi = function (e) {
    if (null != e) {
      try {
        return Gi.call(e);
      } catch (e) {}
      try {
        return e + "";
      } catch (e) {}
    }
    return "";
  },
  Ki = si,
  Qi = qi,
  $i = ii,
  Yi = Hi,
  Zi = /^\[object .+?Constructor\]$/,
  Xi = Function.prototype,
  ea = Object.prototype,
  ta = Xi.toString,
  ra = ea.hasOwnProperty,
  na = RegExp("^" + ta.call(ra).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
var ia = function (e) {
    return !(!$i(e) || Qi(e)) && (Ki(e) ? na : Zi).test(Yi(e));
  },
  aa = function (e, t) {
    return null == e ? void 0 : e[t];
  };
var oa = function (e, t) {
    var r = aa(e, t);
    return ia(r) ? r : void 0;
  },
  sa = oa(an, "Map"),
  ca = oa(Object, "create"),
  la = ca;
var ua = function () {
  this.__data__ = la ? la(null) : {}, this.size = 0;
};
var da = function (e) {
    var t = this.has(e) && delete this.__data__[e];
    return this.size -= t ? 1 : 0, t;
  },
  ha = ca,
  fa = Object.prototype.hasOwnProperty;
var pa = function (e) {
    var t = this.__data__;
    if (ha) {
      var r = t[e];
      return "__lodash_hash_undefined__" === r ? void 0 : r;
    }
    return fa.call(t, e) ? t[e] : void 0;
  },
  va = ca,
  ga = Object.prototype.hasOwnProperty;
var ma = ca;
var ya = ua,
  ba = da,
  wa = pa,
  _a = function (e) {
    var t = this.__data__;
    return va ? void 0 !== t[e] : ga.call(t, e);
  },
  ka = function (e, t) {
    var r = this.__data__;
    return this.size += this.has(e) ? 0 : 1, r[e] = ma && void 0 === t ? "__lodash_hash_undefined__" : t, this;
  };
function Sa(e) {
  var t = -1,
    r = null == e ? 0 : e.length;
  for (this.clear(); ++t < r;) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
Sa.prototype.clear = ya, Sa.prototype.delete = ba, Sa.prototype.get = wa, Sa.prototype.has = _a, Sa.prototype.set = ka;
var Ma = Sa,
  Ca = Bi,
  Oa = sa;
var ja = function (e) {
  var t = typeof e;
  return "string" == t || "number" == t || "symbol" == t || "boolean" == t ? "__proto__" !== e : null === e;
};
var Ta = function (e, t) {
    var r = e.__data__;
    return ja(t) ? r["string" == typeof t ? "string" : "hash"] : r.map;
  },
  Pa = Ta;
var Aa = Ta;
var Ea = Ta;
var Ia = Ta;
var Fa = function () {
    this.size = 0, this.__data__ = {
      hash: new Ma(),
      map: new (Oa || Ca)(),
      string: new Ma()
    };
  },
  La = function (e) {
    var t = Pa(this, e).delete(e);
    return this.size -= t ? 1 : 0, t;
  },
  Da = function (e) {
    return Aa(this, e).get(e);
  },
  Ba = function (e) {
    return Ea(this, e).has(e);
  },
  Na = function (e, t) {
    var r = Ia(this, e),
      n = r.size;
    return r.set(e, t), this.size += r.size == n ? 0 : 1, this;
  };
function xa(e) {
  var t = -1,
    r = null == e ? 0 : e.length;
  for (this.clear(); ++t < r;) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
xa.prototype.clear = Fa, xa.prototype.delete = La, xa.prototype.get = Da, xa.prototype.has = Ba, xa.prototype.set = Na;
var Ra = xa,
  Va = Bi,
  Ua = sa,
  za = Ra;
var Ja = Bi,
  Wa = xi,
  qa = Ri,
  Ga = Vi,
  Ha = zi,
  Ka = function (e, t) {
    var r = this.__data__;
    if (r instanceof Va) {
      var n = r.__data__;
      if (!Ua || n.length < 199) return n.push([e, t]), this.size = ++r.size, this;
      r = this.__data__ = new za(n);
    }
    return r.set(e, t), this.size = r.size, this;
  };
function Qa(e) {
  var t = this.__data__ = new Ja(e);
  this.size = t.size;
}
Qa.prototype.clear = Wa, Qa.prototype.delete = qa, Qa.prototype.get = Ga, Qa.prototype.has = Ha, Qa.prototype.set = Ka;
var $a = Qa;
var Ya = Ra,
  Za = function (e) {
    return this.__data__.set(e, "__lodash_hash_undefined__"), this;
  },
  Xa = function (e) {
    return this.__data__.has(e);
  };
function eo(e) {
  var t = -1,
    r = null == e ? 0 : e.length;
  for (this.__data__ = new Ya(); ++t < r;) this.add(e[t]);
}
eo.prototype.add = eo.prototype.push = Za, eo.prototype.has = Xa;
var to = eo,
  ro = function (e, t) {
    for (var r = -1, n = null == e ? 0 : e.length; ++r < n;) if (t(e[r], r, e)) return !0;
    return !1;
  },
  no = function (e, t) {
    return e.has(t);
  };
var io = function (e, t, r, n, i, a) {
  var o = 1 & r,
    s = e.length,
    c = t.length;
  if (s != c && !(o && c > s)) return !1;
  var l = a.get(e),
    u = a.get(t);
  if (l && u) return l == t && u == e;
  var d = -1,
    h = !0,
    f = 2 & r ? new to() : void 0;
  for (a.set(e, t), a.set(t, e); ++d < s;) {
    var p = e[d],
      v = t[d];
    if (n) var g = o ? n(v, p, d, t, e, a) : n(p, v, d, e, t, a);
    if (void 0 !== g) {
      if (g) continue;
      h = !1;
      break;
    }
    if (f) {
      if (!ro(t, function (e, t) {
        if (!no(f, t) && (p === e || i(p, e, r, n, a))) return f.push(t);
      })) {
        h = !1;
        break;
      }
    } else if (p !== v && !i(p, v, r, n, a)) {
      h = !1;
      break;
    }
  }
  return a.delete(e), a.delete(t), h;
};
var ao = an.Uint8Array,
  oo = ki,
  so = io,
  co = function (e) {
    var t = -1,
      r = Array(e.size);
    return e.forEach(function (e, n) {
      r[++t] = [n, e];
    }), r;
  },
  lo = function (e) {
    var t = -1,
      r = Array(e.size);
    return e.forEach(function (e) {
      r[++t] = e;
    }), r;
  },
  uo = on ? on.prototype : void 0,
  ho = uo ? uo.valueOf : void 0;
var fo = function (e, t, r, n, i, a, o) {
  switch (r) {
    case "[object DataView]":
      if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset) return !1;
      e = e.buffer, t = t.buffer;
    case "[object ArrayBuffer]":
      return !(e.byteLength != t.byteLength || !a(new ao(e), new ao(t)));
    case "[object Boolean]":
    case "[object Date]":
    case "[object Number]":
      return oo(+e, +t);
    case "[object Error]":
      return e.name == t.name && e.message == t.message;
    case "[object RegExp]":
    case "[object String]":
      return e == t + "";
    case "[object Map]":
      var s = co;
    case "[object Set]":
      var c = 1 & n;
      if (s || (s = lo), e.size != t.size && !c) return !1;
      var l = o.get(e);
      if (l) return l == t;
      n |= 2, o.set(e, t);
      var u = so(s(e), s(t), n, i, a, o);
      return o.delete(e), u;
    case "[object Symbol]":
      if (ho) return ho.call(e) == ho.call(t);
  }
  return !1;
};
var po = function (e, t) {
    for (var r = -1, n = t.length, i = e.length; ++r < n;) e[i + r] = t[r];
    return e;
  },
  vo = jn;
var go = function (e, t, r) {
  var n = t(e);
  return vo(e) ? n : po(n, r(e));
};
var mo = Zr,
  yo = function () {
    return [];
  },
  bo = Object.prototype.propertyIsEnumerable,
  wo = Object.getOwnPropertySymbols,
  _o = go,
  ko = wo ? function (e) {
    return null == e ? [] : (e = Object(e), mo(wo(e), function (t) {
      return bo.call(e, t);
    }));
  } : yo,
  So = pi;
var Mo = function (e) {
    return _o(e, So, ko);
  },
  Co = Object.prototype.hasOwnProperty;
var Oo = function (e, t, r, n, i, a) {
    var o = 1 & r,
      s = Mo(e),
      c = s.length;
    if (c != Mo(t).length && !o) return !1;
    for (var l = c; l--;) {
      var u = s[l];
      if (!(o ? u in t : Co.call(t, u))) return !1;
    }
    var d = a.get(e),
      h = a.get(t);
    if (d && h) return d == t && h == e;
    var f = !0;
    a.set(e, t), a.set(t, e);
    for (var p = o; ++l < c;) {
      var v = e[u = s[l]],
        g = t[u];
      if (n) var m = o ? n(g, v, u, t, e, a) : n(v, g, u, e, t, a);
      if (!(void 0 === m ? v === g || i(v, g, r, n, a) : m)) {
        f = !1;
        break;
      }
      p || (p = "constructor" == u);
    }
    if (f && !p) {
      var y = e.constructor,
        b = t.constructor;
      y == b || !("constructor" in e) || !("constructor" in t) || "function" == typeof y && y instanceof y && "function" == typeof b && b instanceof b || (f = !1);
    }
    return a.delete(e), a.delete(t), f;
  },
  jo = oa(an, "DataView"),
  To = sa,
  Po = oa(an, "Promise"),
  Ao = oa(an, "Set"),
  Eo = oa(an, "WeakMap"),
  Io = mn,
  Fo = Hi,
  Lo = "[object Map]",
  Do = "[object Promise]",
  Bo = "[object Set]",
  No = "[object WeakMap]",
  xo = "[object DataView]",
  Ro = Fo(jo),
  Vo = Fo(To),
  Uo = Fo(Po),
  zo = Fo(Ao),
  Jo = Fo(Eo),
  Wo = Io;
(jo && Wo(new jo(new ArrayBuffer(1))) != xo || To && Wo(new To()) != Lo || Po && Wo(Po.resolve()) != Do || Ao && Wo(new Ao()) != Bo || Eo && Wo(new Eo()) != No) && (Wo = function (e) {
  var t = Io(e),
    r = "[object Object]" == t ? e.constructor : void 0,
    n = r ? Fo(r) : "";
  if (n) switch (n) {
    case Ro:
      return xo;
    case Vo:
      return Lo;
    case Uo:
      return Do;
    case zo:
      return Bo;
    case Jo:
      return No;
  }
  return t;
});
var qo = $a,
  Go = io,
  Ho = fo,
  Ko = Oo,
  Qo = Wo,
  $o = jn,
  Yo = Tn,
  Zo = Jn,
  Xo = "[object Arguments]",
  es = "[object Array]",
  ts = "[object Object]",
  rs = Object.prototype.hasOwnProperty;
var ns = function (e, t, r, n, i, a) {
    var o = $o(e),
      s = $o(t),
      c = o ? es : Qo(e),
      l = s ? es : Qo(t),
      u = (c = c == Xo ? ts : c) == ts,
      d = (l = l == Xo ? ts : l) == ts,
      h = c == l;
    if (h && Yo(e)) {
      if (!Yo(t)) return !1;
      o = !0, u = !1;
    }
    if (h && !u) return a || (a = new qo()), o || Zo(e) ? Go(e, t, r, n, i, a) : Ho(e, t, c, r, n, i, a);
    if (!(1 & r)) {
      var f = u && rs.call(e, "__wrapped__"),
        p = d && rs.call(t, "__wrapped__");
      if (f || p) {
        var v = f ? e.value() : e,
          g = p ? t.value() : t;
        return a || (a = new qo()), i(v, g, r, n, a);
      }
    }
    return !!h && (a || (a = new qo()), Ko(e, t, r, n, i, a));
  },
  is = yn;
var as = function e(t, r, n, i, a) {
    return t === r || (null == t || null == r || !is(t) && !is(r) ? t != t && r != r : ns(t, r, n, i, e, a));
  },
  os = $a,
  ss = as;
var cs = ii;
var ls = function (e) {
    return e == e && !cs(e);
  },
  us = ls,
  ds = pi;
var hs = function (e, t) {
    return function (r) {
      return null != r && r[e] === t && (void 0 !== t || e in Object(r));
    };
  },
  fs = function (e, t, r, n) {
    var i = r.length,
      a = i,
      o = !n;
    if (null == e) return !a;
    for (e = Object(e); i--;) {
      var s = r[i];
      if (o && s[2] ? s[1] !== e[s[0]] : !(s[0] in e)) return !1;
    }
    for (; ++i < a;) {
      var c = (s = r[i])[0],
        l = e[c],
        u = s[1];
      if (o && s[2]) {
        if (void 0 === l && !(c in e)) return !1;
      } else {
        var d = new os();
        if (n) var h = n(l, u, c, e, t, d);
        if (!(void 0 === h ? ss(u, l, 3, n, d) : h)) return !1;
      }
    }
    return !0;
  },
  ps = function (e) {
    for (var t = ds(e), r = t.length; r--;) {
      var n = t[r],
        i = e[n];
      t[r] = [n, i, us(i)];
    }
    return t;
  },
  vs = hs;
var gs = function (e) {
    var t = ps(e);
    return 1 == t.length && t[0][2] ? vs(t[0][0], t[0][1]) : function (r) {
      return r === e || fs(r, e, t);
    };
  },
  ms = mn,
  ys = yn;
var bs = function (e) {
    return "symbol" == typeof e || ys(e) && "[object Symbol]" == ms(e);
  },
  ws = jn,
  _s = bs,
  ks = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
  Ss = /^\w*$/;
var Ms = function (e, t) {
    if (ws(e)) return !1;
    var r = typeof e;
    return !("number" != r && "symbol" != r && "boolean" != r && null != e && !_s(e)) || Ss.test(e) || !ks.test(e) || null != t && e in Object(t);
  },
  Cs = Ra;
function Os(e, t) {
  if ("function" != typeof e || null != t && "function" != typeof t) throw new TypeError("Expected a function");
  var r = function () {
    var n = arguments,
      i = t ? t.apply(this, n) : n[0],
      a = r.cache;
    if (a.has(i)) return a.get(i);
    var o = e.apply(this, n);
    return r.cache = a.set(i, o) || a, o;
  };
  return r.cache = new (Os.Cache || Cs)(), r;
}
Os.Cache = Cs;
var js = Os;
var Ts = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
  Ps = /\\(\\)?/g,
  As = function (e) {
    var t = js(e, function (e) {
        return 500 === r.size && r.clear(), e;
      }),
      r = t.cache;
    return t;
  }(function (e) {
    var t = [];
    return 46 === e.charCodeAt(0) && t.push(""), e.replace(Ts, function (e, r, n, i) {
      t.push(n ? i.replace(Ps, "$1") : r || e);
    }), t;
  });
var Es = function (e, t) {
    for (var r = -1, n = null == e ? 0 : e.length, i = Array(n); ++r < n;) i[r] = t(e[r], r, e);
    return i;
  },
  Is = Es,
  Fs = jn,
  Ls = bs,
  Ds = on ? on.prototype : void 0,
  Bs = Ds ? Ds.toString : void 0;
var Ns = function e(t) {
    if ("string" == typeof t) return t;
    if (Fs(t)) return Is(t, e) + "";
    if (Ls(t)) return Bs ? Bs.call(t) : "";
    var r = t + "";
    return "0" == r && 1 / t == -Infinity ? "-0" : r;
  },
  xs = Ns;
var Rs = jn,
  Vs = Ms,
  Us = As,
  zs = function (e) {
    return null == e ? "" : xs(e);
  };
var Js = function (e, t) {
    return Rs(e) ? e : Vs(e, t) ? [e] : Us(zs(e));
  },
  Ws = bs;
var qs = function (e) {
    if ("string" == typeof e || Ws(e)) return e;
    var t = e + "";
    return "0" == t && 1 / e == -Infinity ? "-0" : t;
  },
  Gs = Js,
  Hs = qs;
var Ks = function (e, t) {
    for (var r = 0, n = (t = Gs(t, e)).length; null != e && r < n;) e = e[Hs(t[r++])];
    return r && r == n ? e : void 0;
  },
  Qs = Ks;
var $s = Js,
  Ys = On,
  Zs = jn,
  Xs = En,
  ec = In,
  tc = qs;
var rc = function (e, t) {
    return null != e && t in Object(e);
  },
  nc = function (e, t, r) {
    for (var n = -1, i = (t = $s(t, e)).length, a = !1; ++n < i;) {
      var o = tc(t[n]);
      if (!(a = null != e && r(e, o))) break;
      e = e[o];
    }
    return a || ++n != i ? a : !!(i = null == e ? 0 : e.length) && ec(i) && Xs(o, i) && (Zs(e) || Ys(e));
  };
var ic = as,
  ac = function (e, t, r) {
    var n = null == e ? void 0 : Qs(e, t);
    return void 0 === n ? r : n;
  },
  oc = function (e, t) {
    return null != e && nc(e, t, rc);
  },
  sc = Ms,
  cc = ls,
  lc = hs,
  uc = qs;
var dc = function (e) {
  return e;
};
var hc = Ks;
var fc = function (e) {
    return function (t) {
      return null == t ? void 0 : t[e];
    };
  },
  pc = function (e) {
    return function (t) {
      return hc(t, e);
    };
  },
  vc = Ms,
  gc = qs;
var mc = gs,
  yc = function (e, t) {
    return sc(e) && cc(t) ? lc(uc(e), t) : function (r) {
      var n = ac(r, e);
      return void 0 === n && n === t ? oc(r, e) : ic(t, n, 3);
    };
  },
  bc = dc,
  wc = jn,
  _c = function (e) {
    return vc(e) ? fc(gc(e)) : pc(e);
  };
var kc = function (e) {
    return "function" == typeof e ? e : null == e ? bc : "object" == typeof e ? wc(e) ? yc(e[0], e[1]) : mc(e) : _c(e);
  },
  Sc = Zr,
  Mc = wi,
  Cc = kc,
  Oc = jn;
var jc = function (e, t) {
    return (Oc(e) ? Sc : Mc)(e, Cc(t));
  },
  Tc = yi,
  Pc = ui;
var Ac = bs;
var Ec = function (e, t) {
  if (e !== t) {
    var r = void 0 !== e,
      n = null === e,
      i = e == e,
      a = Ac(e),
      o = void 0 !== t,
      s = null === t,
      c = t == t,
      l = Ac(t);
    if (!s && !l && !a && e > t || a && o && c && !s && !l || n && o && c || !r && c || !i) return 1;
    if (!n && !a && !l && e < t || l && r && i && !n && !a || s && r && i || !o && i || !c) return -1;
  }
  return 0;
};
var Ic = Es,
  Fc = Ks,
  Lc = kc,
  Dc = function (e, t) {
    var r = -1,
      n = Pc(e) ? Array(e.length) : [];
    return Tc(e, function (e, i, a) {
      n[++r] = t(e, i, a);
    }), n;
  },
  Bc = function (e, t) {
    var r = e.length;
    for (e.sort(t); r--;) e[r] = e[r].value;
    return e;
  },
  Nc = xn,
  xc = function (e, t, r) {
    for (var n = -1, i = e.criteria, a = t.criteria, o = i.length, s = r.length; ++n < o;) {
      var c = Ec(i[n], a[n]);
      if (c) return n >= s ? c : c * ("desc" == r[n] ? -1 : 1);
    }
    return e.index - t.index;
  },
  Rc = dc,
  Vc = jn;
var Uc = function (e, t, r) {
    t = t.length ? Ic(t, function (e) {
      return Vc(e) ? function (t) {
        return Fc(t, 1 === e.length ? e[0] : e);
      } : e;
    }) : [Rc];
    var n = -1;
    t = Ic(t, Nc(Lc));
    var i = Dc(e, function (e, r, i) {
      return {
        criteria: Ic(t, function (t) {
          return t(e);
        }),
        index: ++n,
        value: e
      };
    });
    return Bc(i, function (e, t) {
      return xc(e, t, r);
    });
  },
  zc = jn;
var Jc = function (e, t, r, n) {
    return null == e ? [] : (zc(t) || (t = null == t ? [] : [t]), zc(r = n ? void 0 : r) || (r = null == r ? [] : [r]), Uc(e, t, r));
  },
  Wc = function (e, t, r) {
    return !0 === Hc(e.local, t, r);
  },
  qc = function (e, t, r) {
    return e.local.streams && e.local.streams[t] && e.local.streams[t].stream && e.local.streams[t].stream["get".concat("video" === r ? "Video" : "Audio", "Tracks")]()[0];
  },
  Gc = function (e, t, r, n) {
    var i = Kc(e, t, r, n);
    return i && i.pendingTrack;
  },
  Hc = function (e, t, r) {
    if (!e) return !1;
    var n = function (e) {
        switch (e) {
          case "avatar":
            return !0;
          case "staged":
            return e;
          default:
            return !!e;
        }
      },
      i = e.public.subscribedTracks;
    return i && i[t] ? -1 === ["cam-audio", "cam-video", "screen-video", "screen-audio", "rmpAudio", "rmpVideo"].indexOf(r) && i[t].custom ? [!0, "staged"].includes(i[t].custom) ? n(i[t].custom) : n(i[t].custom[r]) : n(i[t][r]) : !i || n(i.ALL);
  },
  Kc = function (e, t, r, n) {
    var i = Jc(jc(e.streams, function (e) {
      return e.participantId === t && e.type === r && e.pendingTrack && e.pendingTrack.kind === n;
    }), "starttime", "desc");
    return i && i[0];
  },
  Qc = function (e, t) {
    var r = e.local.public.customTracks;
    if (r && r[t]) return r[t].track;
  };
function $c(e) {
  for (var t = store.getState(), r = 0, n = ["cam", "screen"]; r < n.length; r++) for (var i = n[r], a = 0, o = ["video", "audio"]; a < o.length; a++) {
    var s = o[a],
      c = "cam" === i ? s : "screen".concat(s.charAt(0).toUpperCase() + s.slice(1)),
      l = e.tracks[c];
    if (l) {
      var u = e.local ? qc(t, i, s) : Gc(t, e.session_id, i, s);
      "playable" === l.state && (l.track = u), l.persistentTrack = u;
    }
  }
}
function Yc(e) {
  try {
    var t = store.getState();
    for (var r in e.tracks) if (!Zc(r)) {
      var n = e.tracks[r].kind;
      if (n) {
        var i = e.tracks[r];
        if (i) {
          var a = e.local ? Qc(t, r) : Gc(t, e.session_id, r, n);
          "playable" === i.state && (e.tracks[r].track = a), i.persistentTrack = a;
        }
      } else console.error("unknown type for custom track");
    }
  } catch (e) {
    console.error(e);
  }
}
function Zc(e) {
  return ["video", "audio", "screenVideo", "screenAudio"].includes(e);
}
function Xc(e, t) {
  var r = store.getState();
  if (e.local) {
    if (e.audio) try {
      e.audioTrack = r.local.streams.cam.stream.getAudioTracks()[0], e.audioTrack || (e.audio = !1);
    } catch (e) {}
    if (e.video) try {
      e.videoTrack = r.local.streams.cam.stream.getVideoTracks()[0], e.videoTrack || (e.video = !1);
    } catch (e) {}
    if (e.screen) try {
      e.screenVideoTrack = r.local.streams.screen.stream.getVideoTracks()[0], e.screenAudioTrack = r.local.streams.screen.stream.getAudioTracks()[0], e.screenVideoTrack || e.screenAudioTrack || (e.screen = !1);
    } catch (e) {}
  } else {
    var n = !0;
    try {
      var i = r.participants[e.session_id];
      i && i.public && i.public.rtcType && "peer-to-peer" === i.public.rtcType.impl && i.private && !["connected", "completed"].includes(i.private.peeringState) && (n = !1);
    } catch (e) {
      console.error(e);
    }
    if (!n) return e.audio = !1, e.audioTrack = !1, e.video = !1, e.videoTrack = !1, e.screen = !1, void (e.screenTrack = !1);
    try {
      r.streams;
      if (e.audio && Wc(r, e.session_id, "cam-audio")) {
        var a = Gc(r, e.session_id, "cam", "audio");
        a && (t && t.audioTrack && t.audioTrack.id === a.id ? e.audioTrack = a : a.muted || (e.audioTrack = a)), e.audioTrack || (e.audio = !1);
      }
      if (e.video && Wc(r, e.session_id, "cam-video")) {
        var o = Gc(r, e.session_id, "cam", "video");
        o && (t && t.videoTrack && t.videoTrack.id === o.id ? e.videoTrack = o : o.muted || (e.videoTrack = o)), e.videoTrack || (e.video = !1);
      }
      if (e.screen && Wc(r, e.session_id, "screen-audio")) {
        var s = Gc(r, e.session_id, "screen", "audio");
        s && (t && t.screenAudioTrack && t.screenAudioTrack.id === s.id ? e.screenAudioTrack = s : s.muted || (e.screenAudioTrack = s));
      }
      if (e.screen && Wc(r, e.session_id, "screen-video")) {
        var c = Gc(r, e.session_id, "screen", "video");
        c && (t && t.screenVideoTrack && t.screenVideoTrack.id === c.id ? e.screenVideoTrack = c : c.muted || (e.screenVideoTrack = c));
      }
      e.screenVideoTrack || e.screenAudioTrack || (e.screen = !1);
    } catch (e) {
      console.error("unexpected error matching up tracks", e);
    }
  }
}
function el(e, t) {
  var r = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
  if (!r) {
    if (Array.isArray(e) || (r = function (e, t) {
      if (!e) return;
      if ("string" == typeof e) return tl(e, t);
      var r = Object.prototype.toString.call(e).slice(8, -1);
      "Object" === r && e.constructor && (r = e.constructor.name);
      if ("Map" === r || "Set" === r) return Array.from(e);
      if ("Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return tl(e, t);
    }(e)) || t && e && "number" == typeof e.length) {
      r && (e = r);
      var n = 0,
        i = function () {};
      return {
        s: i,
        n: function () {
          return n >= e.length ? {
            done: !0
          } : {
            done: !1,
            value: e[n++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: i
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var a,
    o = !0,
    s = !1;
  return {
    s: function () {
      r = r.call(e);
    },
    n: function () {
      var e = r.next();
      return o = e.done, e;
    },
    e: function (e) {
      s = !0, a = e;
    },
    f: function () {
      try {
        o || null == r.return || r.return();
      } finally {
        if (s) throw a;
      }
    }
  };
}
function tl(e, t) {
  (null == t || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
var rl = new Map(),
  nl = null;
function il(e, t) {
  var r = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
  if (!r) {
    if (Array.isArray(e) || (r = function (e, t) {
      if (!e) return;
      if ("string" == typeof e) return al(e, t);
      var r = Object.prototype.toString.call(e).slice(8, -1);
      "Object" === r && e.constructor && (r = e.constructor.name);
      if ("Map" === r || "Set" === r) return Array.from(e);
      if ("Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return al(e, t);
    }(e)) || t && e && "number" == typeof e.length) {
      r && (e = r);
      var n = 0,
        i = function () {};
      return {
        s: i,
        n: function () {
          return n >= e.length ? {
            done: !0
          } : {
            done: !1,
            value: e[n++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: i
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var a,
    o = !0,
    s = !1;
  return {
    s: function () {
      r = r.call(e);
    },
    n: function () {
      var e = r.next();
      return o = e.done, e;
    },
    e: function (e) {
      s = !0, a = e;
    },
    f: function () {
      try {
        o || null == r.return || r.return();
      } finally {
        if (s) throw a;
      }
    }
  };
}
function al(e, t) {
  (null == t || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
var ol = new Map(),
  sl = null,
  cl = 3e3;
function ll(e) {
  dl() ? function (e) {
    rl.has(e) || (rl.set(e, {}), navigator.mediaDevices.enumerateDevices().then(function (t) {
      rl.has(e) && (rl.get(e).lastDevicesString = JSON.stringify(t), nl || (nl = function () {
        var e = r(function* () {
          var e,
            t = yield navigator.mediaDevices.enumerateDevices(),
            r = el(rl.keys());
          try {
            for (r.s(); !(e = r.n()).done;) {
              var n = e.value,
                i = JSON.stringify(t);
              i !== rl.get(n).lastDevicesString && (rl.get(n).lastDevicesString = i, n(t));
            }
          } catch (e) {
            r.e(e);
          } finally {
            r.f();
          }
        });
        return function () {
          return e.apply(this, arguments);
        };
      }(), navigator.mediaDevices.addEventListener("devicechange", nl)));
    }));
  }(e) : function (e) {
    ol.has(e) || (ol.set(e, {}), navigator.mediaDevices.enumerateDevices().then(function (t) {
      ol.has(e) && (ol.get(e).lastDevicesString = JSON.stringify(t), sl || (sl = setInterval(r(function* () {
        var e,
          t = yield navigator.mediaDevices.enumerateDevices(),
          r = il(ol.keys());
        try {
          for (r.s(); !(e = r.n()).done;) {
            var n = e.value,
              i = JSON.stringify(t);
            i !== ol.get(n).lastDevicesString && (ol.get(n).lastDevicesString = i, n(t));
          }
        } catch (e) {
          r.e(e);
        } finally {
          r.f();
        }
      }), cl)));
    }));
  }(e);
}
function ul(e) {
  dl() ? function (e) {
    rl.has(e) && (rl.delete(e), 0 === rl.size && nl && (navigator.mediaDevices.removeEventListener("devicechange", nl), nl = null));
  }(e) : function (e) {
    ol.has(e) && (ol.delete(e), 0 === ol.size && sl && (clearInterval(sl), sl = null));
  }(e);
}
function dl() {
  return lr() || void 0 !== navigator.mediaDevices.ondevicechange;
}
var hl,
  fl = ["preserveIframe"];
function pl(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function (t) {
      return Object.getOwnPropertyDescriptor(e, t).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function vl(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = null != arguments[t] ? arguments[t] : {};
    t % 2 ? pl(Object(r), !0).forEach(function (t) {
      f(e, t, r[t]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : pl(Object(r)).forEach(function (t) {
      Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
    });
  }
  return e;
}
function gl(e) {
  var t = function () {
    if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
    if (Reflect.construct.sham) return !1;
    if ("function" == typeof Proxy) return !0;
    try {
      return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0;
    } catch (e) {
      return !1;
    }
  }();
  return function () {
    var r,
      n = h(e);
    if (t) {
      var i = h(this).constructor;
      r = Reflect.construct(n, arguments, i);
    } else r = n.apply(this, arguments);
    return d(this, r);
  };
}
function ml(e, t) {
  var r = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
  if (!r) {
    if (Array.isArray(e) || (r = function (e, t) {
      if (!e) return;
      if ("string" == typeof e) return yl(e, t);
      var r = Object.prototype.toString.call(e).slice(8, -1);
      "Object" === r && e.constructor && (r = e.constructor.name);
      if ("Map" === r || "Set" === r) return Array.from(e);
      if ("Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return yl(e, t);
    }(e)) || t && e && "number" == typeof e.length) {
      r && (e = r);
      var n = 0,
        i = function () {};
      return {
        s: i,
        n: function () {
          return n >= e.length ? {
            done: !0
          } : {
            done: !1,
            value: e[n++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: i
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var a,
    o = !0,
    s = !1;
  return {
    s: function () {
      r = r.call(e);
    },
    n: function () {
      var e = r.next();
      return o = e.done, e;
    },
    e: function (e) {
      s = !0, a = e;
    },
    f: function () {
      try {
        o || null == r.return || r.return();
      } finally {
        if (s) throw a;
      }
    }
  };
}
function yl(e, t) {
  (null == t || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
var bl = "video",
  wl = "voice",
  _l = lr() ? {
    data: {}
  } : {
    data: {},
    topology: "none"
  },
  kl = {
    present: 0,
    hidden: 0
  },
  Sl = {
    maxBitrate: {
      min: 1e5,
      max: 25e5
    },
    maxFramerate: {
      min: 1,
      max: 30
    },
    scaleResolutionDownBy: {
      min: 1,
      max: 8
    }
  },
  Ml = Object.keys(Sl),
  Cl = ["state", "volume", "simulcastEncodings"],
  Ol = {
    androidInCallNotification: {
      title: "string",
      subtitle: "string",
      iconName: "string",
      disableForCustomOverride: "boolean"
    },
    disableAutoDeviceManagement: {
      audio: "boolean",
      video: "boolean"
    }
  },
  jl = {
    id: {
      iconPath: "string",
      iconPathDarkMode: "string",
      label: "string",
      tooltip: "string"
    }
  },
  Tl = {
    id: {
      allow: "string",
      controlledBy: "'*' | 'owners' | string[]",
      csp: "string",
      iconURL: "string",
      label: "string",
      loading: "'eager' | 'lazy'",
      location: "'main' | 'sidebar'",
      name: "string",
      referrerPolicy: "string",
      sandbox: "string",
      src: "string",
      srcdoc: "string",
      shared: "string[] | 'owners' | boolean"
    }
  },
  Pl = {
    customIntegrations: {
      validate: Gl,
      help: Wl()
    },
    customTrayButtons: {
      validate: ql,
      help: "customTrayButtons should be a dictionary of the type ".concat(JSON.stringify(jl))
    },
    url: {
      validate: function (e) {
        return "string" == typeof e;
      },
      help: "url should be a string"
    },
    baseUrl: {
      validate: function (e) {
        return "string" == typeof e;
      },
      help: "baseUrl should be a string"
    },
    token: {
      validate: function (e) {
        return "string" == typeof e;
      },
      help: "token should be a string",
      queryString: "t"
    },
    dailyConfig: {
      validate: function (e, t) {
        try {
          return t.validateDailyConfig(e), window._dailyConfig || (window._dailyConfig = {}), window._dailyConfig.experimentalGetUserMediaConstraintsModify = e.experimentalGetUserMediaConstraintsModify, window._dailyConfig.userMediaVideoConstraints = e.userMediaVideoConstraints, window._dailyConfig.userMediaAudioConstraints = e.userMediaAudioConstraints, window._dailyConfig.callObjectBundleUrlOverride = e.callObjectBundleUrlOverride, !0;
        } catch (e) {
          console.error("Failed to validate dailyConfig", e);
        }
        return !1;
      },
      help: "Unsupported dailyConfig. Check error logs for detailed info."
    },
    reactNativeConfig: {
      validate: function (e) {
        return Hl(e, Ol);
      },
      help: "reactNativeConfig should look like ".concat(JSON.stringify(Ol), ", all fields optional")
    },
    lang: {
      validate: function (e) {
        return ["de", "en-us", "en", "es", "fi", "fr", "it", "jp", "ka", "nl", "no", "pl", "pt", "ru", "sv", "tr", "user"].includes(e);
      },
      help: "language not supported. Options are: de, en-us, en, es, fi, fr, it, jp, ka, nl, no, pl, pt, ru, sv, tr, user"
    },
    userName: !0,
    userData: {
      validate: function (e) {
        try {
          return xl(e), !0;
        } catch (e) {
          return console.error(e), !1;
        }
      },
      help: "invalid userData type provided"
    },
    startVideoOff: !0,
    startAudioOff: !0,
    activeSpeakerMode: !0,
    showLeaveButton: !0,
    showLocalVideo: !0,
    showParticipantsBar: !0,
    showFullscreenButton: !0,
    showUserNameChangeUI: !0,
    iframeStyle: !0,
    customLayout: !0,
    cssFile: !0,
    cssText: !0,
    bodyClass: !0,
    videoSource: {
      validate: function (e, t) {
        return t._preloadCache.videoDeviceId = e, !0;
      }
    },
    audioSource: {
      validate: function (e, t) {
        return t._preloadCache.audioDeviceId = e, !0;
      }
    },
    subscribeToTracksAutomatically: {
      validate: function (e, t) {
        return t._preloadCache.subscribeToTracksAutomatically = e, !0;
      }
    },
    theme: {
      validate: function (e) {
        var t = ["accent", "accentText", "background", "backgroundAccent", "baseText", "border", "mainAreaBg", "mainAreaBgAccent", "mainAreaText", "supportiveText"],
          r = function (e) {
            for (var r = 0, n = Object.keys(e); r < n.length; r++) {
              var i = n[r];
              if (!t.includes(i)) return console.error('unsupported color "'.concat(i, '". Valid colors: ').concat(t.join(", "))), !1;
              if (!e[i].match(/^#[0-9a-f]{6}|#[0-9a-f]{3}$/i)) return console.error("".concat(i, ' theme color should be provided in valid hex color format. Received: "').concat(e[i], '"')), !1;
            }
            return !0;
          };
        return "object" === i(e) && ("light" in e && "dark" in e || "colors" in e) ? "light" in e && "dark" in e ? "colors" in e.light ? "colors" in e.dark ? r(e.light.colors) && r(e.dark.colors) : (console.error('Dark theme is missing "colors" property.', e), !1) : (console.error('Light theme is missing "colors" property.', e), !1) : r(e.colors) : (console.error('Theme must contain either both "light" and "dark" properties, or "colors".', e), !1);
      },
      help: "unsupported theme configuration. Check error logs for detailed info."
    },
    layoutConfig: {
      validate: function (e) {
        if ("grid" in e) {
          var t = e.grid;
          if ("maxTilesPerPage" in t) {
            if (!Number.isInteger(t.maxTilesPerPage)) return console.error("grid.maxTilesPerPage should be an integer. You passed ".concat(t.maxTilesPerPage, ".")), !1;
            if (t.maxTilesPerPage > 49) return console.error("grid.maxTilesPerPage can't be larger than 49 without sacrificing browser performance. Please contact us at https://www.daily.co/contact to talk about your use case."), !1;
          }
          if ("minTilesPerPage" in t) {
            if (!Number.isInteger(t.minTilesPerPage)) return console.error("grid.minTilesPerPage should be an integer. You passed ".concat(t.minTilesPerPage, ".")), !1;
            if (t.minTilesPerPage < 1) return console.error("grid.minTilesPerPage can't be lower than 1."), !1;
            if ("maxTilesPerPage" in t && t.minTilesPerPage > t.maxTilesPerPage) return console.error("grid.minTilesPerPage can't be higher than grid.maxTilesPerPage."), !1;
          }
        }
        return !0;
      },
      help: "unsupported layoutConfig. Check error logs for detailed info."
    },
    receiveSettings: {
      validate: function (e) {
        return Rl(e, {
          allowAllParticipantsKey: !1
        });
      },
      help: Jl({
        allowAllParticipantsKey: !1
      })
    },
    sendSettings: {
      validate: function (e, t) {
        return !!function (e, t) {
          try {
            return t.validateUpdateSendSettings(e), !0;
          } catch (e) {
            return console.error("Failed to validate send settings", e), !1;
          }
        }(e, t) && (t._preloadCache.sendSettings = e, !0);
      },
      help: "Invalid sendSettings provided. Check error logs for detailed info."
    },
    inputSettings: {
      validate: function (e, t) {
        return !!Vl(e) && (t._preloadCache.inputSettings || (t._preloadCache.inputSettings = {}), Ul(e), e.audio && (t._preloadCache.inputSettings.audio = e.audio), e.video && (t._preloadCache.inputSettings.video = e.video), !0);
      },
      help: zl()
    },
    layout: {
      validate: function (e) {
        return "custom-v1" === e || "browser" === e || "none" === e;
      },
      help: 'layout may only be set to "custom-v1"',
      queryString: "layout"
    },
    emb: {
      queryString: "emb"
    },
    embHref: {
      queryString: "embHref"
    },
    dailyJsVersion: {
      queryString: "dailyJsVersion"
    },
    strictMode: !0
  },
  Al = {
    styles: {
      validate: function (e) {
        for (var t in e) if ("cam" !== t && "screen" !== t) return !1;
        if (e.cam) for (var r in e.cam) if ("div" !== r && "video" !== r) return !1;
        if (e.screen) for (var n in e.screen) if ("div" !== n && "video" !== n) return !1;
        return !0;
      },
      help: "styles format should be a subset of: { cam: {div: {}, video: {}}, screen: {div: {}, video: {}} }"
    },
    setSubscribedTracks: {
      validate: function (e, t) {
        if (t._preloadCache.subscribeToTracksAutomatically) return !1;
        var r = [!0, !1, "staged"];
        if (r.includes(e) || !lr() && "avatar" === e) return !0;
        var n = ["audio", "video", "screenAudio", "screenVideo", "rmpAudio", "rmpVideo"];
        return function e(t) {
          var i = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
          for (var a in t) if ("custom" === a) {
            if (!r.includes(t[a]) && !e(t[a], !0)) return !1;
          } else {
            var o = !i && !n.includes(a),
              s = !r.includes(t[a]);
            if (o || s) return !1;
          }
          return !0;
        }(e);
      },
      help: "setSubscribedTracks cannot be used when setSubscribeToTracksAutomatically is enabled, and should be of the form: " + "true".concat(lr() ? "" : " | 'avatar'", " | false | 'staged' | { [audio: true|false|'staged'], [video: true|false|'staged'], [screenAudio: true|false|'staged'], [screenVideo: true|false|'staged'] }")
    },
    setAudio: !0,
    setVideo: !0,
    eject: !0,
    updatePermissions: {
      validate: function (e) {
        for (var t = 0, r = Object.entries(e); t < r.length; t++) {
          var n = v(r[t], 2),
            i = n[0],
            a = n[1];
          switch (i) {
            case "hasPresence":
              if ("boolean" != typeof a) return !1;
              break;
            case "canSend":
              if (a instanceof Set) {
                var o,
                  s = ["video", "audio", "screenVideo", "screenAudio", "customVideo", "customAudio"],
                  c = ml(a);
                try {
                  for (c.s(); !(o = c.n()).done;) {
                    var l = o.value;
                    if (!s.includes(l)) return !1;
                  }
                } catch (e) {
                  c.e(e);
                } finally {
                  c.f();
                }
              } else if ("boolean" != typeof a) return !1;
              break;
            default:
              return !1;
          }
        }
        return !0;
      },
      help: "updatePermissions can take hasPresence and canSend permissions. hasPresence must be a boolean. canSend can be a boolean or an array of media types (video, audio, screenVideo, screenAudio, customVideo, customAudio)."
    }
  },
  El = function (t) {
    u(V, y);
    var a,
      o,
      l,
      d,
      h,
      p,
      g,
      m,
      b,
      w,
      _,
      k,
      S,
      M,
      C,
      O,
      j,
      T,
      P,
      A,
      E,
      I,
      F,
      L,
      D,
      B,
      N,
      x,
      R = gl(V);
    function V(e) {
      var t,
        r,
        i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
      if (n(this, V), f(c(t = R.call(this)), "startListeningForDeviceChanges", function () {
        ll(t.handleDeviceChange);
      }), f(c(t), "stopListeningForDeviceChanges", function () {
        ul(t.handleDeviceChange);
      }), f(c(t), "handleDeviceChange", function (e) {
        e = e.map(function (e) {
          return JSON.parse(JSON.stringify(e));
        }), t.emit(it, {
          action: it,
          availableDevices: e
        });
      }), f(c(t), "handleNativeAppActiveStateChange", function (e) {
        t.disableReactNativeAutoDeviceManagement("video") || (e ? t.camUnmutedBeforeLosingNativeActiveState && t.setLocalVideo(!0) : (t.camUnmutedBeforeLosingNativeActiveState = t.localVideo(), t.camUnmutedBeforeLosingNativeActiveState && t.setLocalVideo(!1)));
      }), f(c(t), "handleNativeAudioFocusChange", function (e) {
        t.disableReactNativeAutoDeviceManagement("audio") || (t._hasNativeAudioFocus = e, t.toggleParticipantAudioBasedOnNativeAudioFocus(), t._hasNativeAudioFocus ? t.micUnmutedBeforeLosingNativeAudioFocus && t.setLocalAudio(!0) : (t.micUnmutedBeforeLosingNativeAudioFocus = t.localAudio(), t.setLocalAudio(!1)));
      }), t.strictMode = void 0 === i.strictMode || i.strictMode, hl) {
        if (t._logDuplicateInstanceAttempt(), t.strictMode) throw new Error("Duplicate DailyIframe instances are not allowed");
      } else r = c(t), hl = r;
      if (i.dailyJsVersion = V.version(), t._iframe = e, t._callObjectMode = "none" === i.layout && !t._iframe, t._preloadCache = {
        subscribeToTracksAutomatically: !0,
        audioDeviceId: null,
        videoDeviceId: null,
        outputDeviceId: null,
        inputSettings: null,
        sendSettings: null
      }, t._callObjectMode && (window._dailyPreloadCache = t._preloadCache), void 0 !== i.showLocalVideo ? t._callObjectMode ? console.error("showLocalVideo is not available in call object mode") : t._showLocalVideo = !!i.showLocalVideo : t._showLocalVideo = !0, void 0 !== i.showParticipantsBar ? t._callObjectMode ? console.error("showParticipantsBar is not available in call object mode") : t._showParticipantsBar = !!i.showParticipantsBar : t._showParticipantsBar = !0, void 0 !== i.customIntegrations ? t._callObjectMode ? console.error("customIntegrations is not available in call object mode") : t._customIntegrations = i.customIntegrations : t._customIntegrations = {}, void 0 !== i.customTrayButtons ? t._callObjectMode ? console.error("customTrayButtons is not available in call object mode") : t._customTrayButtons = i.customTrayButtons : t._customTrayButtons = {}, void 0 !== i.activeSpeakerMode ? t._callObjectMode ? console.error("activeSpeakerMode is not available in call object mode") : t._activeSpeakerMode = !!i.activeSpeakerMode : t._activeSpeakerMode = !1, i.receiveSettings ? t._callObjectMode ? t._receiveSettings = i.receiveSettings : console.error("receiveSettings is only available in call object mode") : t._receiveSettings = {}, t.validateProperties(i), t.properties = vl({}, i), t._preloadCache.inputSettings || (t._preloadCache.inputSettings = {}), i.inputSettings && i.inputSettings.audio && (t._preloadCache.inputSettings.audio = i.inputSettings.audio), i.inputSettings && i.inputSettings.video && (t._preloadCache.inputSettings.video = i.inputSettings.video), t._callObjectLoader = t._callObjectMode ? new qr() : null, t._callState = de, t._isPreparingToJoin = !1, t._accessState = {
        access: Me
      }, t._meetingSessionState = $l(_l, t._callObjectMode), t._nativeInCallAudioMode = bl, t._participants = {}, t._participantCounts = kl, t._rmpPlayerState = {}, t._waitingParticipants = {}, t._inputEventsOn = {}, t._network = {
        threshold: "good",
        quality: 100
      }, t._activeSpeaker = {}, t._callFrameId = Mr(), t._messageChannel = lr() ? new Lr() : new Ir(), t._iframe && (t._iframe.requestFullscreen ? t._iframe.addEventListener("fullscreenchange", function () {
        document.fullscreenElement === t._iframe ? (t.emit(xt, {
          action: xt
        }), t.sendMessageToCallMachine({
          action: xt
        })) : (t.emit(Rt, {
          action: Rt
        }), t.sendMessageToCallMachine({
          action: Rt
        }));
      }) : t._iframe.webkitRequestFullscreen && t._iframe.addEventListener("webkitfullscreenchange", function () {
        document.webkitFullscreenElement === t._iframe ? (t.emit(xt, {
          action: xt
        }), t.sendMessageToCallMachine({
          action: xt
        })) : (t.emit(Rt, {
          action: Rt
        }), t.sendMessageToCallMachine({
          action: Rt
        }));
      })), lr()) {
        var a = t.nativeUtils();
        a.addAudioFocusChangeListener && a.removeAudioFocusChangeListener && a.addAppActiveStateChangeListener && a.removeAppActiveStateChangeListener || console.warn("expected (add|remove)(AudioFocus|AppActiveState)ChangeListener to be available in React Native"), t._hasNativeAudioFocus = !0, a.addAudioFocusChangeListener(t.handleNativeAudioFocusChange), a.addAppActiveStateChangeListener(t.handleNativeAppActiveStateChange);
      }
      return t._callObjectMode && t.startListeningForDeviceChanges(), t._messageChannel.addListenerForMessagesFromCallMachine(t.handleMessageFromCallMachine, t._callFrameId, c(t)), t;
    }
    return s(V, [{
      key: "destroy",
      value: (x = r(function* () {
        try {
          yield this.leave();
        } catch (e) {}
        var e = this._iframe;
        if (e) {
          var t = e.parentElement;
          t && t.removeChild(e);
        }
        if (this._messageChannel.removeListener(this.handleMessageFromCallMachine), lr()) {
          var r = this.nativeUtils();
          r.removeAudioFocusChangeListener(this.handleNativeAudioFocusChange), r.removeAppActiveStateChangeListener(this.handleNativeAppActiveStateChange);
        }
        this._callObjectMode && this.stopListeningForDeviceChanges(), this.resetMeetingDependentVars(), this._destroyed = !0;
        try {
          this.emit("call-instance-destroyed", {
            action: "call-instance-destroyed"
          });
        } catch (e) {
          console.log("could not emit call-instance-destroyed");
        }
        this.strictMode && (this._callFrameId = void 0), hl = void 0;
      }), function () {
        return x.apply(this, arguments);
      })
    }, {
      key: "isDestroyed",
      value: function () {
        return !!this._destroyed;
      }
    }, {
      key: "loadCss",
      value: function (e) {
        var t = e.bodyClass,
          r = e.cssFile,
          n = e.cssText;
        return Bl(), this.sendMessageToCallMachine({
          action: "load-css",
          cssFile: this.absoluteUrl(r),
          bodyClass: t,
          cssText: n
        }), this;
      }
    }, {
      key: "iframe",
      value: function () {
        return Bl(), this._iframe;
      }
    }, {
      key: "meetingState",
      value: function () {
        return this._callState;
      }
    }, {
      key: "accessState",
      value: function () {
        return Ll(this._callObjectMode, "accessState()"), this._accessState;
      }
    }, {
      key: "participants",
      value: function () {
        return this._participants;
      }
    }, {
      key: "participantCounts",
      value: function () {
        return this._participantCounts;
      }
    }, {
      key: "waitingParticipants",
      value: function () {
        return Ll(this._callObjectMode, "waitingParticipants()"), this._waitingParticipants;
      }
    }, {
      key: "validateParticipantProperties",
      value: function (e, t) {
        for (var r in t) {
          if (!Al[r]) throw new Error("unrecognized updateParticipant property ".concat(r));
          if (Al[r].validate && !Al[r].validate(t[r], this, this._participants[e])) throw new Error(Al[r].help);
        }
      }
    }, {
      key: "updateParticipant",
      value: function (e, t) {
        return this._participants.local && this._participants.local.session_id === e && (e = "local"), e && t && (this.validateParticipantProperties(e, t), this.sendMessageToCallMachine({
          action: "update-participant",
          id: e,
          properties: t
        })), this;
      }
    }, {
      key: "updateParticipants",
      value: function (e) {
        var t = this._participants.local && this._participants.local.session_id;
        for (var r in e) r === t && (r = "local"), r && e[r] && this.validateParticipantProperties(r, e[r]);
        return this.sendMessageToCallMachine({
          action: "update-participants",
          participants: e
        }), this;
      }
    }, {
      key: "updateWaitingParticipant",
      value: (N = r(function* () {
        var e = this,
          t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
          r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        if (Ll(this._callObjectMode, "updateWaitingParticipant()"), Fl(this._callState, "updateWaitingParticipant()"), "string" != typeof t || "object" !== i(r)) throw new Error("updateWaitingParticipant() must take an id string and a updates object");
        return new Promise(function (n, i) {
          e.sendMessageToCallMachine({
            action: "daily-method-update-waiting-participant",
            id: t,
            updates: r
          }, function (e) {
            e.error && i(e.error), e.id || i(new Error("unknown error in updateWaitingParticipant()")), n({
              id: e.id
            });
          });
        });
      }), function () {
        return N.apply(this, arguments);
      })
    }, {
      key: "updateWaitingParticipants",
      value: (B = r(function* () {
        var e = this,
          t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        if (Ll(this._callObjectMode, "updateWaitingParticipants()"), Fl(this._callState, "updateWaitingParticipants()"), "object" !== i(t)) throw new Error("updateWaitingParticipants() must take a mapping between ids and update objects");
        return new Promise(function (r, n) {
          e.sendMessageToCallMachine({
            action: "daily-method-update-waiting-participants",
            updatesById: t
          }, function (e) {
            e.error && n(e.error), e.ids || n(new Error("unknown error in updateWaitingParticipants()")), r({
              ids: e.ids
            });
          });
        });
      }), function () {
        return B.apply(this, arguments);
      })
    }, {
      key: "requestAccess",
      value: (D = r(function* () {
        var e = this,
          t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          r = t.access,
          n = void 0 === r ? {
            level: Ce
          } : r,
          i = t.name,
          a = void 0 === i ? "" : i;
        return Ll(this._callObjectMode, "requestAccess()"), Fl(this._callState, "requestAccess()"), new Promise(function (t, r) {
          e.sendMessageToCallMachine({
            action: "daily-method-request-access",
            access: n,
            name: a
          }, function (e) {
            e.error && r(e.error), e.access || r(new Error("unknown error in requestAccess()")), t({
              access: e.access,
              granted: e.granted
            });
          });
        });
      }), function () {
        return D.apply(this, arguments);
      })
    }, {
      key: "localAudio",
      value: function () {
        return this._participants.local ? this._participants.local.audio : null;
      }
    }, {
      key: "localVideo",
      value: function () {
        return this._participants.local ? this._participants.local.video : null;
      }
    }, {
      key: "setLocalAudio",
      value: function (e) {
        return this.sendMessageToCallMachine({
          action: "local-audio",
          state: e
        }), this;
      }
    }, {
      key: "setLocalVideo",
      value: function (e) {
        return this.sendMessageToCallMachine({
          action: "local-video",
          state: e
        }), this;
      }
    }, {
      key: "getReceiveSettings",
      value: (L = r(function* (e) {
        var t = this,
          r = (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}).showInheritedValues,
          n = void 0 !== r && r;
        switch (Ll(this._callObjectMode, "getReceiveSettings()"), i(e)) {
          case "string":
            return new Promise(function (r) {
              t.sendMessageToCallMachine({
                action: "get-single-participant-receive-settings",
                id: e,
                showInheritedValues: n
              }, function (e) {
                r(e.receiveSettings);
              });
            });
          case "undefined":
            return this._receiveSettings;
          default:
            throw new Error('first argument to getReceiveSettings() must be a participant id (or "base"), or there should be no arguments');
        }
      }), function (e) {
        return L.apply(this, arguments);
      })
    }, {
      key: "updateReceiveSettings",
      value: (F = r(function* (e) {
        var t = this;
        if (Ll(this._callObjectMode, "updateReceiveSettings()"), !Rl(e, {
          allowAllParticipantsKey: !0
        })) throw new Error(Jl({
          allowAllParticipantsKey: !0
        }));
        return Fl(this._callState, "updateReceiveSettings()", "To specify receive settings earlier, use the receiveSettings config property."), new Promise(function (r) {
          t.sendMessageToCallMachine({
            action: "update-receive-settings",
            receiveSettings: e
          }, function (e) {
            r({
              receiveSettings: e.receiveSettings
            });
          });
        });
      }), function (e) {
        return F.apply(this, arguments);
      })
    }, {
      key: "_prepInputSettingsToPresentToUser",
      value: function (e) {
        var t, r, n, i, a, o, s, c;
        if (e) {
          var l = {},
            u = "none" === (null === (t = e.audio) || void 0 === t || null === (r = t.processor) || void 0 === r ? void 0 : r.type) && (null === (n = e.audio) || void 0 === n || null === (i = n.processor) || void 0 === i ? void 0 : i._isDefaultWhenNone);
          if (e.audio && !u) {
            var d = vl({}, e.audio.processor);
            delete d._isDefaultWhenNone, l.audio = vl(vl({}, e.audio), {}, {
              processor: d
            });
          }
          var h = "none" === (null === (a = e.video) || void 0 === a || null === (o = a.processor) || void 0 === o ? void 0 : o.type) && (null === (s = e.video) || void 0 === s || null === (c = s.processor) || void 0 === c ? void 0 : c._isDefaultWhenNone);
          if (e.video && !h) {
            var f = vl({}, e.video.processor);
            delete f._isDefaultWhenNone, l.video = vl(vl({}, e.video), {}, {
              processor: f
            });
          }
          return l;
        }
      }
    }, {
      key: "getInputSettings",
      value: function () {
        var e = this;
        return new Promise(function (t) {
          t(e._getInputSettings());
        });
      }
    }, {
      key: "_getInputSettings",
      value: function () {
        var e,
          t,
          r,
          n,
          i,
          a,
          o,
          s,
          c = {
            processor: {
              type: "none",
              _isDefaultWhenNone: !0
            }
          };
        this._inputSettings ? (e = (null === (r = this._inputSettings) || void 0 === r ? void 0 : r.video) || c, t = (null === (n = this._inputSettings) || void 0 === n ? void 0 : n.audio) || c) : (e = (null === (i = this._preloadCache) || void 0 === i || null === (a = i.inputSettings) || void 0 === a ? void 0 : a.video) || c, t = (null === (o = this._preloadCache) || void 0 === o || null === (s = o.inputSettings) || void 0 === s ? void 0 : s.audio) || c);
        var l = {
          audio: t,
          video: e
        };
        return this._prepInputSettingsToPresentToUser(l);
      }
    }, {
      key: "updateInputSettings",
      value: (I = r(function* (e) {
        var t = this;
        return Vl(e) ? (e && (this._preloadCache.inputSettings || (this._preloadCache.inputSettings = {}), Ul(e), e.audio && (this._preloadCache.inputSettings.audio = e.audio), e.video && (this._preloadCache.inputSettings.video = e.video)), Vl(e) ? this._callObjectMode && this.needsLoad() ? this._getInputSettings() : new Promise(function (r, n) {
          t.sendMessageToCallMachine({
            action: "update-input-settings",
            inputSettings: e
          }, function (e) {
            e.error ? n(e.error) : r({
              inputSettings: t._prepInputSettingsToPresentToUser(e.inputSettings)
            });
          });
        }) : this._getInputSettings()) : (console.error(zl()), Promise.reject(zl()));
      }), function (e) {
        return I.apply(this, arguments);
      })
    }, {
      key: "setBandwidth",
      value: function (e) {
        var t = e.kbs,
          r = e.trackConstraints;
        return Bl(), this.sendMessageToCallMachine({
          action: "set-bandwidth",
          kbs: t,
          trackConstraints: r
        }), this;
      }
    }, {
      key: "getDailyLang",
      value: function () {
        var e = this;
        return Bl(), new Promise(function () {
          var t = r(function* (t) {
            e.sendMessageToCallMachine({
              action: "get-daily-lang"
            }, function (e) {
              delete e.action, delete e.callbackStamp, t(e);
            });
          });
          return function (e) {
            return t.apply(this, arguments);
          };
        }());
      }
    }, {
      key: "setDailyLang",
      value: function (e) {
        return Bl(), this.sendMessageToCallMachine({
          action: "set-daily-lang",
          lang: e
        }), this;
      }
    }, {
      key: "getMeetingSession",
      value: (E = r(function* () {
        var e = this;
        return Fl(this._callState, "getMeetingSession()"), new Promise(function () {
          var t = r(function* (t) {
            e.sendMessageToCallMachine({
              action: "get-meeting-session"
            }, function (e) {
              delete e.action, delete e.callbackStamp, delete e.callFrameId, t(e);
            });
          });
          return function (e) {
            return t.apply(this, arguments);
          };
        }());
      }), function () {
        return E.apply(this, arguments);
      })
    }, {
      key: "meetingSessionState",
      value: function () {
        if (this._callState !== ve) throw new Error("meetingSessionState() is only available when joined");
        return this._meetingSessionState;
      }
    }, {
      key: "setMeetingSessionData",
      value: function (e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "replace";
        if (Ll(this._callObjectMode, "setMeetingSessionData()"), this._callState !== ve) throw new Error("setMeetingSessionData() is only available when joined");
        try {
          !function (e, t) {
            new Ur({
              data: e,
              mergeStrategy: t
            });
          }(e, t);
        } catch (e) {
          throw console.error(e), e;
        }
        try {
          this.sendMessageToCallMachine({
            action: "set-session-data",
            data: e,
            mergeStrategy: t
          });
        } catch (e) {
          throw new Error("Error setting meeting session data: ".concat(e));
        }
      }
    }, {
      key: "setUserName",
      value: function (e, t) {
        var r = this;
        return this.properties.userName = e, new Promise(function (n) {
          r.sendMessageToCallMachine({
            action: "set-user-name",
            name: null != e ? e : "",
            thisMeetingOnly: lr() || !!t && !!t.thisMeetingOnly
          }, function (e) {
            delete e.action, delete e.callbackStamp, n(e);
          });
        });
      }
    }, {
      key: "setUserData",
      value: (A = r(function* (e) {
        var t = this;
        try {
          xl(e);
        } catch (e) {
          throw console.error(e), e;
        }
        return this.properties.userData = e, new Promise(function (r) {
          try {
            t.sendMessageToCallMachine({
              action: "set-user-data",
              userData: e
            }, function (e) {
              delete e.action, delete e.callbackStamp, delete e.callFrameId, r(e);
            });
          } catch (e) {
            throw new Error("Error setting user data: ".concat(e));
          }
        });
      }), function (e) {
        return A.apply(this, arguments);
      })
    }, {
      key: "startCamera",
      value: (P = r(function* () {
        var e = this,
          t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        if (Ll(this._callObjectMode, "startCamera()"), [pe, ve].includes(this._callState)) throw new Error("startCamera() not supported after joining a meeting: did you mean to use setLocalAudio() and/or setLocalVideo() instead?");
        if (this.needsLoad()) try {
          yield this.load(t);
        } catch (e) {
          return Promise.reject(e);
        } else {
          if (this._didPreAuth) {
            if (t.url && t.url !== this.properties.url) return console.error("url in startCamera() is different than the one used in preAuth()"), Promise.reject();
            if (t.token && t.token !== this.properties.token) return console.error("token in startCamera() is different than the one used in preAuth()"), Promise.reject();
          }
          this.validateProperties(t), this.properties = vl(vl({}, this.properties), t);
        }
        return new Promise(function (t) {
          e.sendMessageToCallMachine({
            action: "start-camera",
            properties: Il(e.properties),
            preloadCache: Il(e._preloadCache)
          }, function (e) {
            delete e.action, delete e.callbackStamp, t(e);
          });
        });
      }), function () {
        return P.apply(this, arguments);
      })
    }, {
      key: "validateCustomTrack",
      value: function (e, t, r) {
        if (r && r.length > 50) throw new Error("Custom track `trackName` must not be more than 50 characters");
        if (t && "music" !== t && "speech" !== t && !(t instanceof Object)) throw new Error("Custom track `mode` must be either `music` | `speech` | `DailyMicAudioModeSettings` or `undefined`");
        if (!!r && ["cam-audio", "cam-video", "screen-video", "screen-audio", "rmpAudio", "rmpVideo", "customVideoDefaults"].includes(r)) throw new Error("Custom track `trackName` must not match a track name already used by daily: cam-audio, cam-video, customVideoDefaults, screen-video, screen-audio, rmpAudio, rmpVideo");
        if (!(e instanceof MediaStreamTrack)) throw new Error("Custom tracks provided must be instances of MediaStreamTrack");
      }
    }, {
      key: "startCustomTrack",
      value: function () {
        var e = this,
          t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {
            track: track,
            mode: mode,
            trackName: trackName
          };
        if (Bl(), this.validateCustomTrack(t.track, t.mode, t.trackName), this._callState !== ve) throw new Error("startCustomTrack() is only allowed when joined");
        return new Promise(function (r, n) {
          window._dailyPreloadCache.customTrack = t.track, t.track = er, e.sendMessageToCallMachine({
            action: "start-custom-track",
            properties: t
          }, function (e) {
            e.error ? n({
              error: e.error
            }) : r(e.mediaTag);
          });
        });
      }
    }, {
      key: "stopCustomTrack",
      value: function (e) {
        var t = this;
        if (Bl(), this._callState !== ve) throw new Error("stopCustomTrack() is only allowed when joined");
        return new Promise(function (r) {
          t.sendMessageToCallMachine({
            action: "stop-custom-track",
            mediaTag: e
          }, function (e) {
            r(e.mediaTag);
          });
        });
      }
    }, {
      key: "setCamera",
      value: function (e) {
        var t = this;
        if (Nl(), this.needsLoad()) throw new Error("Before you can invoke setCamera, first you need to invoke one of these methods: join, startCamera, or preAuth");
        return new Promise(function (r) {
          t.sendMessageToCallMachine({
            action: "set-camera",
            cameraDeviceId: e
          }, function (e) {
            r({
              device: e.device
            });
          });
        });
      }
    }, {
      key: "setAudioDevice",
      value: (T = r(function* (e) {
        return Nl(), this.nativeUtils().setAudioDevice(e), {
          deviceId: yield this.nativeUtils().getAudioDevice()
        };
      }), function (e) {
        return T.apply(this, arguments);
      })
    }, {
      key: "cycleCamera",
      value: function () {
        var e = this;
        return new Promise(function (t) {
          e.sendMessageToCallMachine({
            action: "cycle-camera"
          }, function (e) {
            t({
              device: e.device
            });
          });
        });
      }
    }, {
      key: "cycleMic",
      value: function () {
        var e = this;
        return Bl(), new Promise(function (t) {
          e.sendMessageToCallMachine({
            action: "cycle-mic"
          }, function (e) {
            t({
              device: e.device
            });
          });
        });
      }
    }, {
      key: "getCameraFacingMode",
      value: function () {
        var e = this;
        return Nl(), new Promise(function (t) {
          e.sendMessageToCallMachine({
            action: "get-camera-facing-mode"
          }, function (e) {
            t(e.facingMode);
          });
        });
      }
    }, {
      key: "setInputDevices",
      value: function (e) {
        var t = e.audioDeviceId,
          r = e.videoDeviceId,
          n = e.audioSource,
          i = e.videoSource;
        return console.warn("setInputDevices() is deprecated: instead use setInputDevicesAsync(), which returns a Promise"), this.setInputDevicesAsync({
          audioDeviceId: t,
          videoDeviceId: r,
          audioSource: n,
          videoSource: i
        }), this;
      }
    }, {
      key: "setInputDevicesAsync",
      value: (j = r(function* (e) {
        var t = this,
          r = e.audioDeviceId,
          n = e.videoDeviceId,
          i = e.audioSource,
          a = e.videoSource;
        return Bl(), void 0 !== i && (r = i), void 0 !== a && (n = a), r && (this._preloadCache.audioDeviceId = r), n && (this._preloadCache.videoDeviceId = n), this._callObjectMode && this.needsLoad() ? {
          camera: {
            deviceId: this._preloadCache.videoDeviceId
          },
          mic: {
            deviceId: this._preloadCache.audioDeviceId
          },
          speaker: {
            deviceId: this._preloadCache.outputDeviceId
          }
        } : (r instanceof MediaStreamTrack && (r = er), n instanceof MediaStreamTrack && (n = er), new Promise(function (e) {
          t.sendMessageToCallMachine({
            action: "set-input-devices",
            audioDeviceId: r,
            videoDeviceId: n
          }, function (r) {
            delete r.action, delete r.callbackStamp, r.returnPreloadCache ? e({
              camera: {
                deviceId: t._preloadCache.videoDeviceId
              },
              mic: {
                deviceId: t._preloadCache.audioDeviceId
              },
              speaker: {
                deviceId: t._preloadCache.outputDeviceId
              }
            }) : e(r);
          });
        }));
      }), function (e) {
        return j.apply(this, arguments);
      })
    }, {
      key: "setOutputDevice",
      value: function (e) {
        var t = e.outputDeviceId;
        return console.warn("setOutputDevice() is deprecated: instead use setOutputDeviceAsync(), which returns a Promise"), this.setOutputDeviceAsync({
          outputDeviceId: t
        }), this;
      }
    }, {
      key: "setOutputDeviceAsync",
      value: (O = r(function* (e) {
        var t = this,
          r = e.outputDeviceId;
        return Bl(), r && (this._preloadCache.outputDeviceId = r), this._callObjectMode && this.needsLoad() ? {
          camera: {
            deviceId: this._preloadCache.videoDeviceId
          },
          mic: {
            deviceId: this._preloadCache.audioDeviceId
          },
          speaker: {
            deviceId: this._preloadCache.outputDeviceId
          }
        } : new Promise(function (e) {
          t.sendMessageToCallMachine({
            action: "set-output-device",
            outputDeviceId: r
          }, function (r) {
            delete r.action, delete r.callbackStamp, r.returnPreloadCache ? e({
              camera: {
                deviceId: t._preloadCache.videoDeviceId
              },
              mic: {
                deviceId: t._preloadCache.audioDeviceId
              },
              speaker: {
                deviceId: t._preloadCache.outputDeviceId
              }
            }) : e(r);
          });
        });
      }), function (e) {
        return O.apply(this, arguments);
      })
    }, {
      key: "getInputDevices",
      value: (C = r(function* () {
        var e = this;
        return this._callObjectMode && this.needsLoad() ? {
          camera: {
            deviceId: this._preloadCache.videoDeviceId
          },
          mic: {
            deviceId: this._preloadCache.audioDeviceId
          },
          speaker: {
            deviceId: this._preloadCache.outputDeviceId
          }
        } : new Promise(function (t) {
          e.sendMessageToCallMachine({
            action: "get-input-devices"
          }, function (r) {
            delete r.action, delete r.callbackStamp, r.returnPreloadCache ? t({
              camera: {
                deviceId: e._preloadCache.videoDeviceId
              },
              mic: {
                deviceId: e._preloadCache.audioDeviceId
              },
              speaker: {
                deviceId: e._preloadCache.outputDeviceId
              }
            }) : t(r);
          });
        });
      }), function () {
        return C.apply(this, arguments);
      })
    }, {
      key: "nativeInCallAudioMode",
      value: function () {
        return Nl(), this._nativeInCallAudioMode;
      }
    }, {
      key: "setNativeInCallAudioMode",
      value: function (e) {
        if (Nl(), [bl, wl].includes(e)) {
          if (e !== this._nativeInCallAudioMode) return this._nativeInCallAudioMode = e, !this.disableReactNativeAutoDeviceManagement("audio") && this._isCallPendingOrOngoing(this._callState, this._isPreparingToJoin) && this.nativeUtils().setAudioMode(this._nativeInCallAudioMode), this;
        } else console.error("invalid in-call audio mode specified: ", e);
      }
    }, {
      key: "preAuth",
      value: (M = r(function* () {
        var e = this,
          t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        if (Ll(this._callObjectMode, "preAuth()"), [pe, ve].includes(this._callState)) throw new Error("preAuth() not supported after joining a meeting");
        if (this.needsLoad() && (yield this.load(t)), !t.url) throw new Error("preAuth() requires at least a url to be provided");
        return this.validateProperties(t), this.properties = vl(vl({}, this.properties), t), new Promise(function (t, r) {
          e.sendMessageToCallMachine({
            action: "daily-method-preauth",
            properties: Il(e.properties)
          }, function (n) {
            return n.error ? r(n.error) : n.access ? (e._didPreAuth = !0, void t({
              access: n.access
            })) : r(new Error("unknown error in preAuth()"));
          });
        });
      }), function () {
        return M.apply(this, arguments);
      })
    }, {
      key: "load",
      value: (S = r(function* (e) {
        var t = this;
        if (this.needsLoad()) {
          if (this._destroyed && (this._logUseAfterDestroy(), this.strictMode)) throw new Error("Use after destroy");
          if (e && (this.validateProperties(e), this.properties = vl(vl({}, this.properties), e)), !this._callObjectMode && !this.properties.url) throw new Error("can't load iframe meeting because url property isn't set");
          this._updateCallState(he);
          try {
            this.emit($e, {
              action: $e
            });
          } catch (e) {
            console.log("could not emit 'loading'", e);
          }
          return this._callObjectMode ? new Promise(function (e, r) {
            t._callObjectLoader.cancel(), t._callObjectLoader.load(t._callFrameId, t.properties.dailyConfig && t.properties.dailyConfig.avoidEval, function (r) {
              t._updateCallState(fe), r && t.emit(Ze, {
                action: Ze
              }), e();
            }, function (e, n) {
              t.emit(Ye, {
                action: Ye,
                errorMsg: e
              }), n || (t._updateCallState(me), t.resetMeetingDependentVars(), t.emit(Kt, {
                action: Kt,
                errorMsg: e
              }), r(e));
            });
          }) : (this._iframe.src = this.assembleMeetingUrl(), new Promise(function (e, r) {
            t._loadedCallback = function (n) {
              if (t._callState !== me) {
                for (var i in t._updateCallState(fe), (t.properties.cssFile || t.properties.cssText) && t.loadCss(t.properties), t._inputEventsOn) t.sendMessageToCallMachine({
                  action: Yt,
                  on: i
                });
                e();
              } else r(n);
            };
          }));
        }
      }), function (e) {
        return S.apply(this, arguments);
      })
    }, {
      key: "join",
      value: (k = r(function* () {
        var e = this,
          t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          r = !1;
        if (this.needsLoad()) {
          this.updateIsPreparingToJoin(!0);
          try {
            yield this.load(t);
          } catch (e) {
            return this.updateIsPreparingToJoin(!1), Promise.reject(e);
          }
        } else {
          if (r = !(!this.properties.cssFile && !this.properties.cssText), this._didPreAuth) {
            if (t.url && t.url !== this.properties.url) return console.error("url in join() is different than the one used in preAuth()"), this.updateIsPreparingToJoin(!1), Promise.reject();
            if (t.token && t.token !== this.properties.token) return console.error("token in join() is different than the one used in preAuth()"), this.updateIsPreparingToJoin(!1), Promise.reject();
          }
          if (t.url && !this._callObjectMode && t.url && t.url !== this.properties.url) return console.error("url in join() is different than the one used in load() (".concat(this.properties.url, " -> ").concat(t.url, ")")), this.updateIsPreparingToJoin(!1), Promise.reject();
          this.validateProperties(t), this.properties = vl(vl({}, this.properties), t);
        }
        if (void 0 !== t.showLocalVideo && (this._callObjectMode ? console.error("showLocalVideo is not available in callObject mode") : this._showLocalVideo = !!t.showLocalVideo), void 0 !== t.showParticipantsBar && (this._callObjectMode ? console.error("showParticipantsBar is not available in callObject mode") : this._showParticipantsBar = !!t.showParticipantsBar), this._callState === ve || this._callState === pe) return console.warn("already joined meeting, call leave() before joining again"), void this.updateIsPreparingToJoin(!1);
        this._updateCallState(pe, !1);
        try {
          this.emit(tt, {
            action: tt
          });
        } catch (e) {
          console.log("could not emit 'joining-meeting'", e);
        }
        return this._preloadCache.inputSettings || (this._preloadCache.inputSettings = {}), t.inputSettings && t.inputSettings.audio && (this._preloadCache.inputSettings.audio = t.inputSettings.audio), t.inputSettings && t.inputSettings.video && (this._preloadCache.inputSettings.video = t.inputSettings.video), this.sendMessageToCallMachine({
          action: "join-meeting",
          properties: Il(this.properties),
          preloadCache: Il(this._preloadCache)
        }), new Promise(function (t, n) {
          e._joinedCallback = function (i, a) {
            if (e._callState !== me) {
              if (e._updateCallState(ve), i) for (var o in i) e._callObjectMode && ($c(i[o]), Yc(i[o]), Xc(i[o], e._participants[o])), e._participants[o] = vl({}, i[o]), e.toggleParticipantAudioBasedOnNativeAudioFocus();
              r && e.loadCss(e.properties), t(i);
            } else n(a);
          };
        });
      }), function () {
        return k.apply(this, arguments);
      })
    }, {
      key: "leave",
      value: (_ = r(function* () {
        var e = this;
        return new Promise(function (t) {
          if (e._callState === ge || e._callState === me) t();else if (e._callObjectLoader && !e._callObjectLoader.loaded) {
            e._callObjectLoader.cancel(), e._updateCallState(ge), e.resetMeetingDependentVars();
            try {
              e.emit(ge, {
                action: ge
              });
            } catch (e) {
              console.log("could not emit 'left-meeting'", e);
            }
            t();
          } else e._resolveLeave = t, e.sendMessageToCallMachine({
            action: "leave-meeting"
          });
        });
      }), function () {
        return _.apply(this, arguments);
      })
    }, {
      key: "startScreenShare",
      value: function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        Bl(), e.screenVideoSendSettings && this._validateVideoSendSettings("screenVideo", e.screenVideoSendSettings), e.mediaStream && (this._preloadCache.screenMediaStream = e.mediaStream, e.mediaStream = er), this.sendMessageToCallMachine({
          action: "local-screen-start",
          captureOptions: e
        });
      }
    }, {
      key: "stopScreenShare",
      value: function () {
        Bl(), this.sendMessageToCallMachine({
          action: "local-screen-stop"
        });
      }
    }, {
      key: "startRecording",
      value: function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        this.sendMessageToCallMachine(vl({
          action: "local-recording-start"
        }, e));
      }
    }, {
      key: "updateRecording",
      value: function (e) {
        var t = e.layout,
          r = void 0 === t ? {
            preset: "default"
          } : t,
          n = e.instanceId;
        this.sendMessageToCallMachine({
          action: "daily-method-update-recording",
          layout: r,
          instanceId: n
        });
      }
    }, {
      key: "stopRecording",
      value: function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        this.sendMessageToCallMachine(vl({
          action: "local-recording-stop"
        }, e));
      }
    }, {
      key: "startLiveStreaming",
      value: function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        this.sendMessageToCallMachine(vl({
          action: "daily-method-start-live-streaming"
        }, e));
      }
    }, {
      key: "updateLiveStreaming",
      value: function (e) {
        var t = e.layout,
          r = void 0 === t ? {
            preset: "default"
          } : t,
          n = e.instanceId;
        this.sendMessageToCallMachine({
          action: "daily-method-update-live-streaming",
          layout: r,
          instanceId: n
        });
      }
    }, {
      key: "addLiveStreamingEndpoints",
      value: function (e) {
        var t = e.endpoints,
          r = e.instanceId;
        this.sendMessageToCallMachine({
          action: Zt,
          endpointsOp: or,
          endpoints: t,
          instanceId: r
        });
      }
    }, {
      key: "removeLiveStreamingEndpoints",
      value: function (e) {
        var t = e.endpoints,
          r = e.instanceId;
        this.sendMessageToCallMachine({
          action: Zt,
          endpointsOp: sr,
          endpoints: t,
          instanceId: r
        });
      }
    }, {
      key: "stopLiveStreaming",
      value: function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        this.sendMessageToCallMachine(vl({
          action: "daily-method-stop-live-streaming"
        }, e));
      }
    }, {
      key: "validateDailyConfig",
      value: function (e) {
        e.camSimulcastEncodings && this.validateSimulcastEncodings(e.camSimulcastEncodings);
      }
    }, {
      key: "validateSimulcastEncodings",
      value: function (e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
          r = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
        if (e) {
          if (!(e instanceof Array)) throw new Error("encodings must be an Array");
          if (!Ql(e.length, 1, 3)) throw new Error("encodings must be an Array with between 1 to ".concat(3, " layers"));
          for (var n = 0; n < e.length; n++) {
            var i = e[n];
            for (var a in i) {
              if (!Ml.includes(a)) throw new Error("Invalid key ".concat(a, ", valid keys are:") + Object.values(Ml));
              if ("number" != typeof i[a]) throw new Error("".concat(a, " must be a number"));
              if (t) {
                var o = t[a],
                  s = o.min,
                  c = o.max;
                if (!Ql(i[a], s, c)) throw new Error("".concat(a, " value not in range. valid range: ").concat(s, " to ").concat(c));
              }
            }
            if (r && !i.hasOwnProperty("maxBitrate")) throw new Error("maxBitrate is not specified");
          }
        }
      }
    }, {
      key: "startRemoteMediaPlayer",
      value: (w = r(function* (e) {
        var t = this,
          n = e.url,
          i = e.settings,
          a = void 0 === i ? {
            state: nr.PLAY
          } : i;
        try {
          !function (e) {
            if ("string" != typeof e) throw new Error('url parameter must be "string" type');
          }(n), Kl(a), function (e) {
            for (var t in e) if (!Cl.includes(t)) throw new Error("Invalid key ".concat(t, ", valid keys are: ").concat(Cl));
            e.simulcastEncodings && this.validateSimulcastEncodings(e.simulcastEncodings, Sl, !0);
          }(a);
        } catch (e) {
          throw console.error("invalid argument Error: ".concat(e)), console.error('startRemoteMediaPlayer arguments must be of the form: \n  { url: "playback url", \n  settings?: \n  {state: "play"|"pause", simulcastEncodings?: [{}] } }'), e;
        }
        return new Promise(function () {
          var e = r(function* (e, r) {
            t.sendMessageToCallMachine({
              action: "daily-method-start-remote-media-player",
              url: n,
              settings: a
            }, function (t) {
              t.error ? r({
                error: t.error,
                errorMsg: t.errorMsg
              }) : e({
                session_id: t.session_id,
                remoteMediaPlayerState: {
                  state: t.state,
                  settings: t.settings
                }
              });
            });
          });
          return function (t, r) {
            return e.apply(this, arguments);
          };
        }());
      }), function (e) {
        return w.apply(this, arguments);
      })
    }, {
      key: "stopRemoteMediaPlayer",
      value: (b = r(function* (e) {
        var t = this;
        if ("string" != typeof e) throw new Error(" remotePlayerID must be of type string");
        return new Promise(function () {
          var n = r(function* (r, n) {
            t.sendMessageToCallMachine({
              action: "daily-method-stop-remote-media-player",
              session_id: e
            }, function (e) {
              e.error ? n({
                error: e.error,
                errorMsg: e.errorMsg
              }) : r();
            });
          });
          return function (e, t) {
            return n.apply(this, arguments);
          };
        }());
      }), function (e) {
        return b.apply(this, arguments);
      })
    }, {
      key: "updateRemoteMediaPlayer",
      value: (m = r(function* (e) {
        var t = this,
          n = e.session_id,
          i = e.settings;
        try {
          Kl(i);
        } catch (e) {
          throw console.error("invalid argument Error: ".concat(e)), console.error('updateRemoteMediaPlayer arguments must be of the form: \n  session_id: "participant session", \n  { settings?: {state: "play"|"pause"} }'), e;
        }
        return new Promise(function () {
          var e = r(function* (e, r) {
            t.sendMessageToCallMachine({
              action: "daily-method-update-remote-media-player",
              session_id: n,
              settings: i
            }, function (t) {
              t.error ? r({
                error: t.error,
                errorMsg: t.errorMsg
              }) : e({
                session_id: t.session_id,
                remoteMediaPlayerState: {
                  state: t.state,
                  settings: t.settings
                }
              });
            });
          });
          return function (t, r) {
            return e.apply(this, arguments);
          };
        }());
      }), function (e) {
        return m.apply(this, arguments);
      })
    }, {
      key: "startTranscription",
      value: function (e) {
        this.sendMessageToCallMachine(vl({
          action: "daily-method-start-transcription"
        }, e));
      }
    }, {
      key: "stopTranscription",
      value: function () {
        this.sendMessageToCallMachine({
          action: "daily-method-stop-transcription"
        });
      }
    }, {
      key: "getNetworkStats",
      value: function () {
        var e = this;
        if (this._callState !== ve) {
          return {
            stats: {
              latest: {}
            }
          };
        }
        return new Promise(function (t) {
          e.sendMessageToCallMachine({
            action: "get-calc-stats"
          }, function (r) {
            t(vl({
              stats: r.stats
            }, e._network));
          });
        });
      }
    }, {
      key: "getCpuLoadStats",
      value: function () {
        var e = this;
        return this._callState !== ve ? {
          cpuLoadState: void 0,
          stats: {}
        } : new Promise(function (t, r) {
          e.sendMessageToCallMachine({
            action: "get-cpu-load-stats"
          }, function (e) {
            t(e.cpuStats);
          });
        });
      }
    }, {
      key: "_validateVideoSendSettings",
      value: function (e, t) {
        var r = "screenVideo" === e ? ["default-screen-video", "detail-optimized", "motion-optimized", "motion-and-detail-balanced"] : ["default-video", "bandwidth-optimized", "bandwidth-and-quality-balanced", "quality-optimized"],
          n = "Video send settings should be either an object or one of the supported presets: ".concat(r.join());
        if ("string" == typeof t) {
          if (!r.includes(t)) throw new Error(n);
        } else {
          if ("object" !== i(t)) throw new Error(n);
          if (!t.maxQuality && !t.encodings) throw new Error("Video send settings must contain at least maxQuality or encodings attribute");
          if (t.maxQuality && -1 === ["low", "medium", "high"].indexOf(t.maxQuality)) throw new Error("maxQuality must be either low, medium or high");
          if (t.encodings) {
            var a = !1;
            switch (Object.keys(t.encodings).length) {
              case 1:
                a = !t.encodings.low;
                break;
              case 2:
                a = !t.encodings.low || !t.encodings.medium;
                break;
              case 3:
                a = !t.encodings.low || !t.encodings.medium || !t.encodings.high;
                break;
              default:
                a = !0;
            }
            if (a) throw new Error("Encodings must be defined as: low, low and medium, or low, medium and high.");
          }
        }
      }
    }, {
      key: "validateUpdateSendSettings",
      value: function (e) {
        var t = this;
        if (!e || 0 === Object.keys(e).length) throw new Error("Send settings must contain at least information for one track!");
        Object.entries(e).forEach(function (e) {
          var r = v(e, 2),
            n = r[0],
            i = r[1];
          t._validateVideoSendSettings(n, i);
        });
      }
    }, {
      key: "updateSendSettings",
      value: function (e) {
        var t = this;
        return this.validateUpdateSendSettings(e), this.needsLoad() ? (this._preloadCache.sendSettings = e, {
          sendSettings: this._preloadCache.sendSettings
        }) : new Promise(function (r, n) {
          t.sendMessageToCallMachine({
            action: "update-send-settings",
            sendSettings: e
          }, function (e) {
            e.error ? n(e.error) : r(e.sendSettings);
          });
        });
      }
    }, {
      key: "getSendSettings",
      value: function () {
        return this._sendSettings || this._preloadCache.sendSettings;
      }
    }, {
      key: "getActiveSpeaker",
      value: function () {
        return Bl(), this._activeSpeaker;
      }
    }, {
      key: "setActiveSpeakerMode",
      value: function (e) {
        return Bl(), this.sendMessageToCallMachine({
          action: "set-active-speaker-mode",
          enabled: e
        }), this;
      }
    }, {
      key: "activeSpeakerMode",
      value: function () {
        return Bl(), this._activeSpeakerMode;
      }
    }, {
      key: "subscribeToTracksAutomatically",
      value: function () {
        return this._preloadCache.subscribeToTracksAutomatically;
      }
    }, {
      key: "setSubscribeToTracksAutomatically",
      value: function (e) {
        return Fl(this._callState, "setSubscribeToTracksAutomatically()", "Use the subscribeToTracksAutomatically configuration property."), this._preloadCache.subscribeToTracksAutomatically = e, this.sendMessageToCallMachine({
          action: "daily-method-subscribe-to-tracks-automatically",
          enabled: e
        }), this;
      }
    }, {
      key: "enumerateDevices",
      value: (g = r(function* () {
        var e = this;
        return this._callObjectMode ? {
          devices: (yield navigator.mediaDevices.enumerateDevices()).map(function (e) {
            return JSON.parse(JSON.stringify(e));
          })
        } : new Promise(function (t) {
          e.sendMessageToCallMachine({
            action: "enumerate-devices"
          }, function (e) {
            t({
              devices: e.devices
            });
          });
        });
      }), function () {
        return g.apply(this, arguments);
      })
    }, {
      key: "sendAppMessage",
      value: function (e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "*";
        if (JSON.stringify(e).length > 4096) throw new Error("Message data too large. Max size is 4096");
        return this.sendMessageToCallMachine({
          action: "app-msg",
          data: e,
          to: t
        }), this;
      }
    }, {
      key: "addFakeParticipant",
      value: function (e) {
        return Bl(), this.sendMessageToCallMachine(vl({
          action: "add-fake-participant"
        }, e)), this;
      }
    }, {
      key: "setShowNamesMode",
      value: function (e) {
        return Dl(this._callObjectMode, "setShowNamesMode()"), Bl(), e && "always" !== e && "never" !== e ? (console.error('setShowNamesMode argument should be "always", "never", or false'), this) : (this.sendMessageToCallMachine({
          action: "set-show-names",
          mode: e
        }), this);
      }
    }, {
      key: "setShowLocalVideo",
      value: function () {
        var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
        return Dl(this._callObjectMode, "setShowLocalVideo()"), Bl(), Fl(this._callState, "setShowLocalVideo()"), "boolean" != typeof e ? (console.error("setShowLocalVideo only accepts a boolean value"), this) : (this.sendMessageToCallMachine({
          action: "set-show-local-video",
          show: e
        }), this._showLocalVideo = e, this);
      }
    }, {
      key: "showLocalVideo",
      value: function () {
        return Dl(this._callObjectMode, "showLocalVideo()"), Bl(), this._showLocalVideo;
      }
    }, {
      key: "setShowParticipantsBar",
      value: function () {
        var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
        return Dl(this._callObjectMode, "setShowParticipantsBar()"), Bl(), Fl(this._callState, "setShowParticipantsBar()"), "boolean" != typeof e ? (console.error("setShowParticipantsBar only accepts a boolean value"), this) : (this.sendMessageToCallMachine({
          action: "set-show-participants-bar",
          show: e
        }), this._showParticipantsBar = e, this);
      }
    }, {
      key: "showParticipantsBar",
      value: function () {
        return Dl(this._callObjectMode, "showParticipantsBar()"), Bl(), this._showParticipantsBar;
      }
    }, {
      key: "customIntegrations",
      value: function () {
        return Bl(), Dl(this._callObjectMode, "customIntegrations()"), this._customIntegrations;
      }
    }, {
      key: "setCustomIntegrations",
      value: function (e) {
        return Bl(), Dl(this._callObjectMode, "setCustomIntegrations()"), Fl(this._callState, "setCustomIntegrations()"), Gl(e) ? (this.sendMessageToCallMachine({
          action: "set-custom-integrations",
          integrations: e
        }), this._customIntegrations = e, this) : this;
      }
    }, {
      key: "startCustomIntegrations",
      value: function (e) {
        var t = this;
        if (Bl(), Dl(this._callObjectMode, "startCustomIntegrations()"), Fl(this._callState, "startCustomIntegrations()"), Array.isArray(e) && e.some(function (e) {
          return "string" != typeof e;
        }) || !Array.isArray(e) && "string" != typeof e) return console.error("startCustomIntegrations() only accepts string | string[]"), this;
        var r = "string" == typeof e ? [e] : e,
          n = r.filter(function (e) {
            return !(e in t._customIntegrations);
          });
        return n.length ? (console.error("Can't find custom integration(s): \"".concat(n.join(", "), '"')), this) : (this.sendMessageToCallMachine({
          action: "start-custom-integrations",
          ids: r
        }), this);
      }
    }, {
      key: "stopCustomIntegrations",
      value: function (e) {
        var t = this;
        if (Bl(), Dl(this._callObjectMode, "stopCustomIntegrations()"), Fl(this._callState, "stopCustomIntegrations()"), Array.isArray(e) && e.some(function (e) {
          return "string" != typeof e;
        }) || !Array.isArray(e) && "string" != typeof e) return console.error("stopCustomIntegrations() only accepts string | string[]"), this;
        var r = "string" == typeof e ? [e] : e,
          n = r.filter(function (e) {
            return !(e in t._customIntegrations);
          });
        return n.length ? (console.error("Can't find custom integration(s): \"".concat(n.join(", "), '"')), this) : (this.sendMessageToCallMachine({
          action: "stop-custom-integrations",
          ids: r
        }), this);
      }
    }, {
      key: "customTrayButtons",
      value: function () {
        return Dl(this._callObjectMode, "customTrayButtons()"), Bl(), this._customTrayButtons;
      }
    }, {
      key: "updateCustomTrayButtons",
      value: function (e) {
        return Dl(this._callObjectMode, "updateCustomTrayButtons()"), Bl(), Fl(this._callState, "updateCustomTrayButtons()"), ql(e) ? (this.sendMessageToCallMachine({
          action: "update-custom-tray-buttons",
          btns: e
        }), this._customTrayButtons = e, this) : (console.error("updateCustomTrayButtons only accepts a dictionary of the type ".concat(JSON.stringify(jl))), this);
      }
    }, {
      key: "theme",
      value: function () {
        return Dl(this._callObjectMode, "theme()"), this.properties.theme;
      }
    }, {
      key: "setTheme",
      value: function (e) {
        var t = this;
        return Dl(this._callObjectMode, "setTheme()"), new Promise(function (r, n) {
          try {
            t.validateProperties({
              theme: e
            }), t.properties.theme = vl({}, e), t.sendMessageToCallMachine({
              action: "set-theme",
              theme: t.properties.theme
            });
            try {
              t.emit(Qe, {
                action: Qe,
                theme: t.properties.theme
              });
            } catch (e) {
              console.log("could not emit 'theme-updated'", e);
            }
            r(t.properties.theme);
          } catch (e) {
            n(e);
          }
        });
      }
    }, {
      key: "detectAllFaces",
      value: function () {
        var e = this;
        return Bl(), new Promise(function (t) {
          e.sendMessageToCallMachine({
            action: "detect-all-faces"
          }, function (e) {
            delete e.action, delete e.callbackStamp, t(e);
          });
        });
      }
    }, {
      key: "requestFullscreen",
      value: (p = r(function* () {
        if (Bl(), this._iframe && !document.fullscreenElement && hr()) try {
          (yield this._iframe.requestFullscreen) ? this._iframe.requestFullscreen() : this._iframe.webkitRequestFullscreen();
        } catch (e) {
          console.log("could not make video call fullscreen", e);
        }
      }), function () {
        return p.apply(this, arguments);
      })
    }, {
      key: "exitFullscreen",
      value: function () {
        Bl(), document.fullscreenElement ? document.exitFullscreen() : document.webkitFullscreenElement && document.webkitExitFullscreen();
      }
    }, {
      key: "getSidebarView",
      value: (h = r(function* () {
        var e = this;
        return this._callObjectMode ? (console.error("getSidebarView is not available in callObject mode"), Promise.resolve(null)) : new Promise(function (t) {
          e.sendMessageToCallMachine({
            action: "get-sidebar-view"
          }, function (e) {
            t(e.view);
          });
        });
      }), function () {
        return h.apply(this, arguments);
      })
    }, {
      key: "setSidebarView",
      value: function (e) {
        return this._callObjectMode ? (console.error("setSidebarView is not available in callObject mode"), this) : (this.sendMessageToCallMachine({
          action: "set-sidebar-view",
          view: e
        }), this);
      }
    }, {
      key: "room",
      value: (d = r(function* () {
        var e = this,
          t = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).includeRoomConfigDefaults,
          r = void 0 === t || t;
        return this._accessState.access === Me || this.needsLoad() ? this.properties.url ? {
          roomUrlPendingJoin: this.properties.url
        } : null : new Promise(function (t) {
          e.sendMessageToCallMachine({
            action: "lib-room-info",
            includeRoomConfigDefaults: r
          }, function (e) {
            delete e.action, delete e.callbackStamp, t(e);
          });
        });
      }), function () {
        return d.apply(this, arguments);
      })
    }, {
      key: "geo",
      value: (l = r(function* () {
        return new Promise(function () {
          var e = r(function* (e) {
            try {
              var t = yield fetch("https://gs.daily.co/_ks_/x-swsl/:");
              e({
                current: (yield t.json()).geo
              });
            } catch (t) {
              console.error("geo lookup failed", t), e({
                current: ""
              });
            }
          });
          return function (t) {
            return e.apply(this, arguments);
          };
        }());
      }), function () {
        return l.apply(this, arguments);
      })
    }, {
      key: "setNetworkTopology",
      value: (o = r(function* (e) {
        var t = this;
        return Bl(), new Promise(function () {
          var n = r(function* (r, n) {
            t.sendMessageToCallMachine({
              action: "set-network-topology",
              opts: e
            }, function (e) {
              e.error ? n({
                error: e.error
              }) : r({
                workerId: e.workerId
              });
            });
          });
          return function (e, t) {
            return n.apply(this, arguments);
          };
        }());
      }), function (e) {
        return o.apply(this, arguments);
      })
    }, {
      key: "getNetworkTopology",
      value: (a = r(function* () {
        var e = this;
        return new Promise(function () {
          var t = r(function* (t, r) {
            e.sendMessageToCallMachine({
              action: "get-network-topology"
            }, function (e) {
              e.error ? r({
                error: e.error
              }) : t({
                topology: e.topology
              });
            });
          });
          return function (e, r) {
            return t.apply(this, arguments);
          };
        }());
      }), function () {
        return a.apply(this, arguments);
      })
    }, {
      key: "setPlayNewParticipantSound",
      value: function (e) {
        if (Bl(), "number" != typeof e && !0 !== e && !1 !== e) throw new Error("argument to setShouldPlayNewParticipantSound should be true, false, or a number, but is ".concat(e));
        this.sendMessageToCallMachine({
          action: "daily-method-set-play-ding",
          arg: e
        });
      }
    }, {
      key: "on",
      value: function (e, t) {
        return this._inputEventsOn[e] = {}, this.sendMessageToCallMachine({
          action: Yt,
          on: e
        }), y.prototype.on.call(this, e, t);
      }
    }, {
      key: "once",
      value: function (e, t) {
        return this._inputEventsOn[e] = {}, this.sendMessageToCallMachine({
          action: Yt,
          on: e
        }), y.prototype.once.call(this, e, t);
      }
    }, {
      key: "off",
      value: function (e, t) {
        return delete this._inputEventsOn[e], this.isDestroyed() || this.sendMessageToCallMachine({
          action: Yt,
          off: e
        }), y.prototype.off.call(this, e, t);
      }
    }, {
      key: "validateProperties",
      value: function (e) {
        for (var t in e) {
          if (!Pl[t]) throw new Error("unrecognized property '".concat(t, "'"));
          if (Pl[t].validate && !Pl[t].validate(e[t], this)) throw new Error("property '".concat(t, "': ").concat(Pl[t].help));
        }
      }
    }, {
      key: "assembleMeetingUrl",
      value: function () {
        var e = vl(vl({}, this.properties), {}, {
            emb: this._callFrameId,
            embHref: encodeURIComponent(window.location.href)
          }),
          t = e.url.match(/\?/) ? "&" : "?";
        return e.url + t + Object.keys(Pl).filter(function (t) {
          return Pl[t].queryString && void 0 !== e[t];
        }).map(function (t) {
          return "".concat(Pl[t].queryString, "=").concat(e[t]);
        }).join("&");
      }
    }, {
      key: "needsLoad",
      value: function () {
        return [de, he, ge, me].includes(this._callState);
      }
    }, {
      key: "sendMessageToCallMachine",
      value: function (e, t) {
        if (this._destroyed && (this._logUseAfterDestroy(), this.strictMode)) throw new Error("Use after destroy");
        this._messageChannel.sendMessageToCallMachine(e, t, this._iframe, this._callFrameId);
      }
    }, {
      key: "forwardPackagedMessageToCallMachine",
      value: function (e) {
        this._messageChannel.forwardPackagedMessageToCallMachine(e, this._iframe, this._callFrameId);
      }
    }, {
      key: "addListenerForPackagedMessagesFromCallMachine",
      value: function (e) {
        return this._messageChannel.addListenerForPackagedMessagesFromCallMachine(e, this._callFrameId);
      }
    }, {
      key: "removeListenerForPackagedMessagesFromCallMachine",
      value: function (e) {
        this._messageChannel.removeListenerForPackagedMessagesFromCallMachine(e);
      }
    }, {
      key: "handleMessageFromCallMachine",
      value: function (t) {
        switch (t.action) {
          case He:
            this.sendMessageToCallMachine(vl({
              action: Ke
            }, this.properties));
            break;
          case Ze:
            this._loadedCallback && (this._loadedCallback(), this._loadedCallback = null);
            try {
              this.emit(t.action, t);
            } catch (e) {
              console.log("could not emit", t, e);
            }
            break;
          case rt:
            this._joinedCallback && (this._joinedCallback(t.participants), this._joinedCallback = null);
            try {
              this.emit(t.action, t);
            } catch (e) {
              console.log("could not emit", t, e);
            }
            break;
          case at:
          case ot:
            if (this._callState === ge) return;
            if (t.participant && t.participant.session_id) {
              var r = t.participant.local ? "local" : t.participant.session_id;
              this._callObjectMode && ($c(t.participant), Yc(t.participant), Xc(t.participant, this._participants[r]));
              try {
                this.maybeParticipantTracksStopped(this._participants[r], t.participant), this.maybeParticipantTracksStarted(this._participants[r], t.participant), this.maybeEventRecordingStopped(this._participants[r], t.participant), this.maybeEventRecordingStarted(this._participants[r], t.participant);
              } catch (e) {
                console.error("track events error", e);
              }
              if (!this.compareEqualForParticipantUpdateEvent(t.participant, this._participants[r])) {
                this._participants[r] = vl({}, t.participant), this.toggleParticipantAudioBasedOnNativeAudioFocus();
                try {
                  this.emit(t.action, t);
                } catch (e) {
                  console.log("could not emit", t, e);
                }
              }
            }
            break;
          case st:
            if (t.participant && t.participant.session_id) {
              var n = this._participants[t.participant.session_id];
              n && this.maybeParticipantTracksStopped(n, null), delete this._participants[t.participant.session_id];
              try {
                this.emit(t.action, t);
              } catch (e) {
                console.log("could not emit", t, e);
              }
            }
            break;
          case ct:
            if (!Y(this._participantCounts, t.participantCounts)) {
              this._participantCounts = t.participantCounts;
              try {
                this.emit(t.action, t);
              } catch (e) {
                console.log("could not emit", t, e);
              }
            }
            break;
          case lt:
            var i = {
              access: t.access
            };
            if (t.awaitingAccess && (i.awaitingAccess = t.awaitingAccess), !Y(this._accessState, i)) {
              this._accessState = i;
              try {
                this.emit(t.action, t);
              } catch (e) {
                console.log("could not emit", t, e);
              }
            }
            break;
          case ut:
            if (t.meetingSession) try {
              delete t.callFrameId, this.emit(t.action, t);
            } catch (e) {
              console.log("could not emit", t, e);
            }
            break;
          case Kt:
            var a, o;
            this._iframe && !t.preserveIframe && (this._iframe.src = ""), this._updateCallState(me), this.resetMeetingDependentVars(), this._loadedCallback && (this._loadedCallback(t.errorMsg), this._loadedCallback = null), t.preserveIframe;
            var s = e(t, fl);
            null != s && null !== (a = s.error) && void 0 !== a && null !== (o = a.details) && void 0 !== o && o.sourceError && (s.error.details.sourceError = JSON.parse(s.error.details.sourceError)), this._joinedCallback && (this._joinedCallback(null, s), this._joinedCallback = null);
            try {
              this.emit(t.action, s);
            } catch (e) {
              console.log("could not emit", t, e);
            }
            break;
          case nt:
            this._callState !== me && this._updateCallState(ge), this.resetMeetingDependentVars(), this._resolveLeave && (this._resolveLeave(), this._resolveLeave = null);
            try {
              this.emit(t.action, t);
            } catch (e) {
              console.log("could not emit", t, e);
            }
            break;
          case "selected-devices-updated":
            if (t.devices) try {
              this.emit(t.action, t);
            } catch (e) {
              console.log("could not emit", t, e);
            }
            break;
          case Dt:
            var c = t.threshold,
              l = t.quality;
            if (c !== this._network.threshold || l !== this._network.quality) {
              this._network.quality = l, this._network.threshold = c;
              try {
                this.emit(t.action, t);
              } catch (e) {
                console.log("could not emit", t, e);
              }
            }
            break;
          case Nt:
            if (t && t.cpuLoadState) try {
              this.emit(t.action, t);
            } catch (e) {
              console.log("could not emit", t, e);
            }
            break;
          case Ft:
            var u = t.activeSpeaker;
            if (this._activeSpeaker.peerId !== u.peerId) {
              this._activeSpeaker.peerId = u.peerId;
              try {
                this.emit(t.action, {
                  action: t.action,
                  activeSpeaker: this._activeSpeaker
                });
              } catch (e) {
                console.log("could not emit", t, e);
              }
            }
            break;
          case "show-local-video-changed":
            if (this._callObjectMode) return;
            var d = t.show;
            this._showLocalVideo = d;
            try {
              this.emit(t.action, {
                action: t.action,
                show: d
              });
            } catch (e) {
              console.log("could not emit", t, e);
            }
            break;
          case Lt:
            var h = t.enabled;
            if (this._activeSpeakerMode !== h) {
              this._activeSpeakerMode = h;
              try {
                this.emit(t.action, {
                  action: t.action,
                  enabled: this._activeSpeakerMode
                });
              } catch (e) {
                console.log("could not emit", t, e);
              }
            }
            break;
          case ft:
          case pt:
          case vt:
            this._waitingParticipants = t.allWaitingParticipants;
            try {
              this.emit(t.action, {
                action: t.action,
                participant: t.participant
              });
            } catch (e) {
              console.log("could not emit", t, e);
            }
            break;
          case qt:
            if (!Y(this._receiveSettings, t.receiveSettings)) {
              this._receiveSettings = t.receiveSettings;
              try {
                this.emit(t.action, {
                  action: t.action,
                  receiveSettings: t.receiveSettings
                });
              } catch (e) {
                console.log("could not emit", t, e);
              }
            }
            break;
          case Gt:
            if (!Y(this._inputSettings, t.inputSettings)) {
              var f = this._getInputSettings();
              if (this._inputSettings = t.inputSettings, this._preloadCache.inputSettings = {}, !Y(f, this._getInputSettings())) try {
                this.emit(t.action, {
                  action: t.action,
                  inputSettings: this._getInputSettings()
                });
              } catch (e) {
                console.log("could not emit", t, e);
              }
            }
            break;
          case "send-settings-updated":
            if (!Y(this._sendSettings, t.sendSettings)) {
              this._sendSettings = t.sendSettings, this._preloadCache.sendSettings = null;
              try {
                this.emit(t.action, {
                  action: t.action,
                  sendSettings: t.sendSettings
                });
              } catch (e) {
                console.log("could not emit", t, e);
              }
            }
            break;
          case Tt:
            var p = t.session_id;
            this._rmpPlayerState[p] = t.playerState, this.emitDailyJSEvent(t);
            break;
          case At:
            delete this._rmpPlayerState[t.session_id], this.emitDailyJSEvent(t);
            break;
          case Pt:
            var v = t.session_id,
              g = this._rmpPlayerState[v];
            g && this.compareEqualForRMPUpdateEvent(g, t.remoteMediaPlayerState) || (this._rmpPlayerState[v] = t.remoteMediaPlayerState, this.emitDailyJSEvent(t));
            break;
          case "custom-button-click":
          case "sidebar-view-changed":
            this.emitDailyJSEvent(t);
            break;
          case dt:
            var m = this._meetingSessionState.topology !== (t.meetingSessionState && t.meetingSessionState.topology);
            this._meetingSessionState = $l(t.meetingSessionState, this._callObjectMode), (this._callObjectMode || m) && this.emitDailyJSEvent(t);
            break;
          case _t:
          case kt:
          case St:
          case Mt:
          case Ct:
          case yt:
          case bt:
          case wt:
          case Xe:
          case et:
          case jt:
          case Et:
          case It:
          case Bt:
          case Ot:
          case Vt:
          case Ut:
          case zt:
          case Jt:
          case Ht:
          case Wt:
            try {
              this.emit(t.action, t);
            } catch (e) {
              console.log("could not emit", t, e);
            }
            break;
          case "request-fullscreen":
            this.requestFullscreen();
            break;
          case "request-exit-fullscreen":
            this.exitFullscreen();
        }
      }
    }, {
      key: "maybeEventRecordingStopped",
      value: function (e, t) {
        var r = "record";
        if (e && !t.local && !1 === t[r] && e[r] !== t[r]) try {
          this.emit(kt, {
            action: kt
          });
        } catch (e) {
          console.log("could not emit", e);
        }
      }
    }, {
      key: "maybeEventRecordingStarted",
      value: function (e, t) {
        var r = "record";
        if (e && !t.local && !0 === t[r] && e[r] !== t[r]) try {
          this.emit(_t, {
            action: _t
          });
        } catch (e) {
          console.log("could not emit", e);
        }
      }
    }, {
      key: "maybeEventTrackStopped",
      value: function (e, t, r, n) {
        if (e && ("ended" === e.readyState || !t || e.id !== t.id)) try {
          this.emit(mt, {
            action: mt,
            track: e,
            participant: r,
            type: n
          });
        } catch (e) {
          console.log("maybeEventTrackStopped: could not emit", e);
        }
      }
    }, {
      key: "maybeEventTrackStarted",
      value: function (e, t, r, n) {
        if (t && (!e || "ended" === e.readyState || t.id !== e.id)) try {
          this.emit(gt, {
            action: gt,
            track: t,
            participant: r,
            type: n
          });
        } catch (e) {
          console.log("maybeEventTrackStarted: could not emit", e);
        }
      }
    }, {
      key: "maybeParticipantTracksStopped",
      value: function (e, t) {
        if (e) for (var r in e.tracks) this.maybeEventTrackStopped(e.tracks[r].track, t && t.tracks[r] ? t.tracks[r].track : null, t, r);
      }
    }, {
      key: "maybeParticipantTracksStarted",
      value: function (e, t) {
        if (t) for (var r in t.tracks) this.maybeEventTrackStarted(e && e.tracks[r] ? e.tracks[r].track : null, t.tracks[r].track, t, r);
      }
    }, {
      key: "compareEqualForRMPUpdateEvent",
      value: function (e, t) {
        var r, n;
        return e.state === t.state && (null === (r = e.settings) || void 0 === r ? void 0 : r.volume) === (null === (n = t.settings) || void 0 === n ? void 0 : n.volume);
      }
    }, {
      key: "emitDailyJSEvent",
      value: function (e) {
        try {
          this.emit(e.action, e);
        } catch (t) {
          console.log("could not emit", e, t);
        }
      }
    }, {
      key: "compareEqualForParticipantUpdateEvent",
      value: function (e, t) {
        return !!Y(e, t) && (!e.videoTrack || !t.videoTrack || e.videoTrack.id === t.videoTrack.id && e.videoTrack.muted === t.videoTrack.muted && e.videoTrack.enabled === t.videoTrack.enabled) && (!e.audioTrack || !t.audioTrack || e.audioTrack.id === t.audioTrack.id && e.audioTrack.muted === t.audioTrack.muted && e.audioTrack.enabled === t.audioTrack.enabled);
      }
    }, {
      key: "nativeUtils",
      value: function () {
        return lr() ? "undefined" == typeof DailyNativeUtils ? (console.warn("in React Native, DailyNativeUtils is expected to be available"), null) : DailyNativeUtils : null;
      }
    }, {
      key: "updateIsPreparingToJoin",
      value: function (e) {
        this._updateCallState(this._callState, e);
      }
    }, {
      key: "_updateCallState",
      value: function (e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this._isPreparingToJoin;
        if (e !== this._callState || t !== this._isPreparingToJoin) {
          var r = this._callState,
            n = this._isPreparingToJoin;
          this._callState = e, this._isPreparingToJoin = t;
          var i = this._isCallPendingOrOngoing(r, n),
            a = this._isCallPendingOrOngoing(this._callState, this._isPreparingToJoin);
          i !== a && (this.updateKeepDeviceAwake(a), this.updateDeviceAudioMode(a), this.updateShowAndroidOngoingMeetingNotification(a), this.updateNoOpRecordingEnsuringBackgroundContinuity(a));
        }
      }
    }, {
      key: "resetMeetingDependentVars",
      value: function () {
        this._participants = {}, this._participantCounts = kl, this._waitingParticipants = {}, this._activeSpeaker = {}, this._activeSpeakerMode = !1, this._didPreAuth = !1, this._accessState = {
          access: Me
        }, this._meetingSessionState = $l(_l, this._callObjectMode), this._receiveSettings = {}, this._inputSettings = void 0, this._sendSettings = {}, this._preloadCache;
      }
    }, {
      key: "updateKeepDeviceAwake",
      value: function (e) {
        lr() && this.nativeUtils().setKeepDeviceAwake(e, this._callFrameId);
      }
    }, {
      key: "updateDeviceAudioMode",
      value: function (e) {
        if (lr() && !this.disableReactNativeAutoDeviceManagement("audio")) {
          var t = e ? this._nativeInCallAudioMode : "idle";
          this.nativeUtils().setAudioMode(t);
        }
      }
    }, {
      key: "updateShowAndroidOngoingMeetingNotification",
      value: function (e) {
        if (lr() && this.nativeUtils().setShowOngoingMeetingNotification) {
          var t, r, n, i;
          if (this.properties.reactNativeConfig && this.properties.reactNativeConfig.androidInCallNotification) {
            var a = this.properties.reactNativeConfig.androidInCallNotification;
            t = a.title, r = a.subtitle, n = a.iconName, i = a.disableForCustomOverride;
          }
          i && (e = !1), this.nativeUtils().setShowOngoingMeetingNotification(e, t, r, n, this._callFrameId);
        }
      }
    }, {
      key: "updateNoOpRecordingEnsuringBackgroundContinuity",
      value: function (e) {
        lr() && this.nativeUtils().enableNoOpRecordingEnsuringBackgroundContinuity && this.nativeUtils().enableNoOpRecordingEnsuringBackgroundContinuity(e);
      }
    }, {
      key: "_isCallPendingOrOngoing",
      value: function (e, t) {
        return [pe, ve].includes(e) || t;
      }
    }, {
      key: "toggleParticipantAudioBasedOnNativeAudioFocus",
      value: function () {
        if (lr()) {
          var e = store.getState();
          for (var t in e.streams) {
            var r = e.streams[t];
            r && r.pendingTrack && "audio" === r.pendingTrack.kind && (r.pendingTrack.enabled = this._hasNativeAudioFocus);
          }
        }
      }
    }, {
      key: "disableReactNativeAutoDeviceManagement",
      value: function (e) {
        return this.properties.reactNativeConfig && this.properties.reactNativeConfig.disableAutoDeviceManagement && this.properties.reactNativeConfig.disableAutoDeviceManagement[e];
      }
    }, {
      key: "absoluteUrl",
      value: function (e) {
        if (void 0 !== e) {
          var t = document.createElement("a");
          return t.href = e, t.href;
        }
      }
    }, {
      key: "sayHello",
      value: function () {
        var e = "hello, world.";
        return console.log(e), e;
      }
    }, {
      key: "_logUseAfterDestroy",
      value: function () {
        if (this.needsLoad()) {
          if (hl && !hl.needsLoad()) {
            var e = {
              action: Xt,
              level: "error",
              code: this.strictMode ? 9995 : 9997
            };
            hl.sendMessageToCallMachine(e);
          } else if (!this.strictMode) {
            console.error("You are are attempting to use a call instance that was previously destroyed, which is unsupported. Please remove `strictMode: false` from your constructor properties to enable strict mode to track down and fix this unsupported usage.");
          }
        } else {
          var t = {
            action: Xt,
            level: "error",
            code: this.strictMode ? 9995 : 9997
          };
          this._messageChannel.sendMessageToCallMachine(t, null, this._iframe, this._callFrameId);
        }
      }
    }, {
      key: "_logDuplicateInstanceAttempt",
      value: function () {
        if (hl.needsLoad()) {
          if (!this.strictMode) {
            console.error("You are attempting to use multiple call instances simultaneously. This is unsupported and will result in unknown errors. Previous instances should be destroyed before creating new ones. Please remove `strictMode: false` from your constructor properties to enable strict mode to track down and fix these attempts.");
          }
        } else hl.sendMessageToCallMachine({
          action: Xt,
          level: "error",
          code: this.strictMode ? 9990 : 9992
        });
      }
    }], [{
      key: "supportedBrowser",
      value: function () {
        if (lr()) return {
          supported: !0,
          mobile: !0,
          name: "React Native",
          version: null,
          supportsScreenShare: !1,
          supportsSfu: !0,
          supportsVideoProcessing: !1,
          supportsAudioProcessing: !1
        };
        var e = ue.getParser(cr());
        return {
          supported: !!mr(),
          mobile: "mobile" === e.getPlatformType(),
          name: e.getBrowserName(),
          version: e.getBrowserVersion(),
          supportsFullscreen: !!hr(),
          supportsScreenShare: !!dr(),
          supportsSfu: !!mr(),
          supportsVideoProcessing: pr(),
          supportsAudioProcessing: gr()
        };
      }
    }, {
      key: "version",
      value: function () {
        return "0.47.0";
      }
    }, {
      key: "createCallObject",
      value: function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        return e.layout = "none", new V(null, e);
      }
    }, {
      key: "wrap",
      value: function (e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        if (Bl(), !e || !e.contentWindow || "string" != typeof e.src) throw new Error("DailyIframe::Wrap needs an iframe-like first argument");
        return t.layout || (t.customLayout ? t.layout = "custom-v1" : t.layout = "browser"), new V(e, t);
      }
    }, {
      key: "createFrame",
      value: function (e, t) {
        var r, n;
        Bl(), e && t ? (r = e, n = t) : e && e.append ? (r = e, n = {}) : (r = document.body, n = e || {});
        var i = n.iframeStyle;
        i || (i = r === document.body ? {
          position: "fixed",
          border: "1px solid black",
          backgroundColor: "white",
          width: "375px",
          height: "450px",
          right: "1em",
          bottom: "1em"
        } : {
          border: 0,
          width: "100%",
          height: "100%"
        });
        var a = document.createElement("iframe");
        window.navigator && window.navigator.userAgent.match(/Chrome\/61\./) ? a.allow = "microphone, camera" : a.allow = "microphone; camera; autoplay; display-capture", a.style.visibility = "hidden", r.appendChild(a), a.style.visibility = null, Object.keys(i).forEach(function (e) {
          return a.style[e] = i[e];
        }), n.layout || (n.customLayout ? n.layout = "custom-v1" : n.layout = "browser");
        try {
          return new V(a, n);
        } catch (e) {
          throw r.removeChild(a), e;
        }
      }
    }, {
      key: "createTransparentFrame",
      value: function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        Bl();
        var t = document.createElement("iframe");
        return t.allow = "microphone; camera; autoplay", t.style.cssText = "\n      position: fixed;\n      top: 0;\n      left: 0;\n      width: 100%;\n      height: 100%;\n      border: 0;\n      pointer-events: none;\n    ", document.body.appendChild(t), e.layout || (e.layout = "custom-v1"), V.wrap(t, e);
      }
    }, {
      key: "getCallInstance",
      value: function () {
        return hl;
      }
    }]), V;
  }();
exports.default = El;
function Il(e) {
  var t = {};
  for (var r in e) e[r] instanceof MediaStreamTrack ? t[r] = er : "dailyConfig" === r ? (e[r].modifyLocalSdpHook && (window._dailyConfig && (window._dailyConfig.modifyLocalSdpHook = e[r].modifyLocalSdpHook), delete e[r].modifyLocalSdpHook), e[r].modifyRemoteSdpHook && (window._dailyConfig && (window._dailyConfig.modifyRemoteSdpHook = e[r].modifyRemoteSdpHook), delete e[r].modifyRemoteSdpHook), t[r] = e[r]) : t[r] = e[r];
  return t;
}
function Fl(e) {
  var t = arguments.length > 2 ? arguments[2] : void 0;
  if (e !== ve) {
    var r = "".concat(arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "This daily-js method", " only supported after join.");
    throw t && (r += " ".concat(t)), console.error(r), new Error(r);
  }
}
function Ll(e) {
  if (!e) {
    var t = "".concat(arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "This daily-js method", " is only supported on custom callObject instances");
    throw console.error(t), new Error(t);
  }
}
function Dl(e) {
  if (e) {
    var t = "".concat(arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "This daily-js method", " is only supported as part of Daily's Prebuilt");
    throw console.error(t), new Error(t);
  }
}
function Bl() {
  if (lr()) throw new Error("This daily-js method is not currently supported in React Native");
}
function Nl() {
  if (!lr()) throw new Error("This daily-js method is only supported in React Native");
}
function xl(e) {
  if (void 0 === e) return !0;
  var t;
  if ("string" == typeof e) t = e;else try {
    t = JSON.stringify(e), Y(JSON.parse(t), e) || console.warn("The userData provided will be modified when serialized.");
  } catch (e) {
    throw Error("userData must be serializable to JSON: ".concat(e));
  }
  if (t.length > 4096) throw Error("userData is too large (".concat(t.length, " characters). Maximum size suppported is ").concat(4096, "."));
  return !0;
}
function Rl(e, t) {
  for (var r = t.allowAllParticipantsKey, n = function (e) {
      var t = ["local"];
      return r || t.push("*"), e && !t.includes(e);
    }, i = function (e) {
      return !!(void 0 === e.layer || Number.isInteger(e.layer) && e.layer >= 0 || "inherit" === e.layer);
    }, a = function (e) {
      return !!e && !(e.video && !i(e.video)) && !(e.screenVideo && !i(e.screenVideo));
    }, o = 0, s = Object.entries(e); o < s.length; o++) {
    var c = v(s[o], 2),
      l = c[0],
      u = c[1];
    if (!n(l) || !a(u)) return !1;
  }
  return !0;
}
function Vl(e) {
  return "object" === i(e) && !!(e.video && "object" === i(e.video) || e.audio && "object" === i(e.audio)) && !(e.video && !function (e) {
    var t = ["type", "config", "publish"];
    if (!e) return !1;
    if ("object" !== i(e)) return !1;
    if (!function (e) {
      if ("string" != typeof e) return !1;
      if (!Object.values(tr).includes(e)) return console.error("inputSettings video processor type invalid"), !1;
      return !0;
    }(e.type)) return !1;
    if (void 0 !== e.publish && "boolean" != typeof e.publish) return !1;
    "boolean" == typeof e.publish && console.warn("inputSettings.video.processor: publish key has been deprecated; it will be ignored");
    if (e.config) {
      if ("object" !== i(e.config)) return !1;
      if (!function (e, t) {
        var r = Object.keys(t);
        if (0 === r.length) return !0;
        var n = "invalid object in inputSettings -> video -> processor -> config";
        switch (e) {
          case tr.BGBLUR:
            return r.length > 1 || "strength" !== r[0] ? (console.error(n), !1) : !("number" != typeof t.strength || t.strength <= 0 || t.strength > 1 || isNaN(t.strength)) || (console.error("".concat(n, "; expected: {0 < strength <= 1}, got: ").concat(t.strength)), !1);
          case tr.BGIMAGE:
            return !(void 0 !== t.source && !function (e) {
              if ("default" === e.source) return e.type = "default", !0;
              if (jr(e.source)) return e.type = "url", !!function (e) {
                var t = new URL(e),
                  r = t.pathname;
                if ("data:" === t.protocol) try {
                  var n = r.substring(r.indexOf(":") + 1, r.indexOf(";")).split("/")[1];
                  return ar.includes(n);
                } catch (e) {
                  return console.error("failed to deduce blob content type", e), !1;
                }
                var i = r.split(".").at(-1).toLowerCase().trim();
                return ar.includes(i);
              }(e.source) || (console.error("invalid image type; supported types: [".concat(ar.join(", "), "]")), !1);
              return t = e.source, r = Number(t), isNaN(r) || !Number.isInteger(r) || r <= 0 || r > ir ? (console.error("invalid image selection; must be an int, > 0, <= ".concat(ir)), !1) : (e.type = "daily-preselect", !0);
              var t, r;
            }(t));
          default:
            return !0;
        }
      }(e.type, e.config)) return !1;
    }
    return Object.keys(e).filter(function (e) {
      return !t.includes(e);
    }).forEach(function (t) {
      console.warn("invalid key inputSettings -> video -> processor : ".concat(t)), delete e[t];
    }), !0;
  }(e.video.processor)) && !(e.audio && (r = e.audio.processor, n = ["type"], !r || "object" !== i(r) || (Object.keys(r).filter(function (e) {
    return !n.includes(e);
  }).forEach(function (e) {
    console.warn("invalid key inputSettings -> audio -> processor : ".concat(e)), delete r[e];
  }), t = r.type, "string" != typeof t || !Object.values(rr).includes(t) && (console.error("inputSettings audio processor type invalid"), 1))));
  var t, r, n;
}
function Ul(e) {
  var t = [];
  e.video && !pr() && (delete e.video, t.push("video")), e.audio && !gr() && (delete e.audio, t.push("audio")), t.length > 0 && console.error("Ignoring settings for browser- or platform-unsupported input processor(s): ".concat(t.join(", ")));
}
function zl() {
  var e = Object.values(tr).join(" | "),
    t = Object.values(rr).join(" | ");
  return "inputSettings must be of the form: { video?: { processor: { type: [ ".concat(e, " ], config?: {} } }, audio?: { processor: {type: [ ").concat(t, " ] } } }");
}
function Jl(e) {
  var t = e.allowAllParticipantsKey;
  return "receiveSettings must be of the form { [<remote participant id> | ".concat(Te).concat(t ? ' | "'.concat(Pe, '"') : "", "]: ") + '{ [video: [{ layer: [<non-negative integer> | "inherit"] } | "inherit"]], [screenVideo: [{ layer: [<non-negative integer> | "inherit"] } | "inherit"]] }}}';
}
function Wl() {
  return "customIntegrations should be an object of type ".concat(JSON.stringify(Tl), ".");
}
function ql(e) {
  if (e && "object" !== i(e) || Array.isArray(e)) return console.error("customTrayButtons should be an Object of the type ".concat(JSON.stringify(jl), ".")), !1;
  if (e) for (var t = 0, r = Object.entries(e); t < r.length; t++) for (var n = v(r[t], 1)[0], a = 0, o = Object.entries(e[n]); a < o.length; a++) {
    var s = v(o[a], 2),
      c = s[0],
      l = s[1];
    if ("iconPath" === c && !jr(l)) return console.error("customTrayButton ".concat(c, " should be a url.")), !1;
    if ("iconPathDarkMode" === c && !jr(l)) return console.error("customTrayButton ".concat(c, " should be a url.")), !1;
    var u = jl.id[c];
    if (!u) return console.error("customTrayButton does not support key ".concat(c)), !1;
    if (i(l) !== u) return console.error("customTrayButton ".concat(c, " should be a ").concat(u, ".")), !1;
  }
  return !0;
}
function Gl(e) {
  if (!e || e && "object" !== i(e) || Array.isArray(e)) return console.error(Wl()), !1;
  for (var t = function (e) {
      return "".concat(e, " should be ").concat(Tl.id[e]);
    }, r = function (e, t) {
      return console.error("customIntegration ".concat(e, ": ").concat(t));
    }, n = 0, a = Object.entries(e); n < a.length; n++) {
    var o = v(a[n], 1)[0];
    if (!("label" in e[o])) return r(o, "label is required"), !1;
    if (!("location" in e[o])) return r(o, "location is required"), !1;
    if (!("src" in e[o]) && !("srcdoc" in e[o])) return r(o, "src or srcdoc is required"), !1;
    for (var s = 0, c = Object.entries(e[o]); s < c.length; s++) {
      var l = v(c[s], 2),
        u = l[0],
        d = l[1];
      switch (u) {
        case "allow":
        case "csp":
        case "name":
        case "referrerPolicy":
        case "sandbox":
          if ("string" != typeof d) return r(o, t(u)), !1;
          break;
        case "iconURL":
          if (!jr(d)) return r(o, "".concat(u, " should be a url")), !1;
          break;
        case "src":
          if ("srcdoc" in e[o]) return r(o, "cannot have both src and srcdoc"), !1;
          if (!jr(d)) return r(o, 'src "'.concat(d, '" is not a valid URL')), !1;
          break;
        case "srcdoc":
          if ("src" in e[o]) return r(o, "cannot have both src and srcdoc"), !1;
          if ("string" != typeof d) return r(o, t(u)), !1;
          break;
        case "location":
          if (!["main", "sidebar"].includes(d)) return r(o, t(u)), !1;
          break;
        case "controlledBy":
          if ("*" !== d && "owners" !== d && (!Array.isArray(d) || d.some(function (e) {
            return "string" != typeof e;
          }))) return r(o, t(u)), !1;
          break;
        case "shared":
          if ((!Array.isArray(d) || d.some(function (e) {
            return "string" != typeof e;
          })) && "owners" !== d && "boolean" != typeof d) return r(o, t(u)), !1;
          break;
        default:
          if (!Tl.id[u]) return console.error("customIntegration does not support key ".concat(u)), !1;
      }
    }
  }
  return !0;
}
function Hl(e, t) {
  if (void 0 === t) return !1;
  switch (i(t)) {
    case "string":
      return i(e) === t;
    case "object":
      if ("object" !== i(e)) return !1;
      for (var r in e) if (!Hl(e[r], t[r])) return !1;
      return !0;
    default:
      return !1;
  }
}
function Kl(e) {
  if ("object" !== i(e)) throw new Error('RemoteMediaPlayerSettings: must be "object" type');
  if (e.state && !Object.values(nr).includes(e.state)) throw new Error("Invalid value for RemoteMediaPlayerSettings.state, valid values are: " + JSON.stringify(nr));
  if (e.volume) {
    if ("number" != typeof e.volume) throw new Error('RemoteMediaPlayerSettings.volume: must be "number" type');
    if (e.volume < 0 || e.volume > 2) throw new Error("RemoteMediaPlayerSettings.volume: must be between 0.0 - 2.0");
  }
}
function Ql(e, t, r) {
  return !("number" != typeof e || e < t || e > r);
}
function $l(e, t) {
  return e && !t && delete e.data, e;
}
},{}],"daily.js":[function(require,module,exports) {
"use strict";

var _rtcStats = _interopRequireDefault(require("./rtcStats.js"));
var _dailyJs = _interopRequireDefault(require("@daily-co/daily-js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
console.log("Daily version: %s", _dailyJs.default.version());
var ROOM_URL = "https://bdom.staging.daily.co/sync";
var callObject;
function initializeCallObject() {
  return _initializeCallObject.apply(this, arguments);
}
function _initializeCallObject() {
  _initializeCallObject = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          callObject = _dailyJs.default.createCallObject({
            subscribeToTracksAutomatically: true
          });
          _context3.next = 3;
          return fillVideoDevicesDropDown();
        case 3:
          _context3.next = 5;
          return fillAudioDevicesDropDown();
        case 5:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return _initializeCallObject.apply(this, arguments);
}
initializeCallObject();

// Event listeners
callObject.once("joined-meeting", meetingJoined);
callObject.on("track-started", startTrack);
callObject.on("track-stopped", stopTrack);
callObject.on("participant-joined", participantJoined);
callObject.on("participant-updated", updateParticipant);
callObject.on("camera-error", cameraError);
window.callObject = callObject;
function createAndJoin() {
  callObject.join({
    url: ROOM_URL
  });
  (0, _rtcStats.default)();
}
;

// Function to handle track started event
function startTrack(evt) {
  console.log("Track started: ", evt);
  if (evt.track.kind === "audio" && evt.participant.local === false) {
    var audiosDiv = document.getElementById("audios");
    var audioEl = document.createElement("audio");
    audiosDiv.appendChild(audioEl);
    audioEl.style.width = "100%";
    audioEl.srcObject = new MediaStream([evt.track]);
    audioEl.play();
  } else if (evt.track.kind === "video") {
    var videosDiv = document.getElementById("videos");
    var videoEl = document.createElement("video");
    videosDiv.appendChild(videoEl);
    videoEl.style.width = "100%";
    videoEl.srcObject = new MediaStream([evt.track]);
    videoEl.play();
  }
}

// Function to handle track stopped event
function stopTrack(evt) {
  console.log("Track stopped: ", evt);
  if (evt.track.kind === "audio") {
    var audios = document.getElementsByTagName("audio");
    var _iterator = _createForOfIteratorHelper(audios),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var audio = _step.value;
        if (audio.srcObject && audio.srcObject.getAudioTracks()[0] === evt.track) {
          audio.remove();
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  } else if (evt.track.kind === "video") {
    var vids = document.getElementsByTagName("video");
    var _iterator2 = _createForOfIteratorHelper(vids),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var vid = _step2.value;
        if (vid.srcObject && vid.srcObject.getVideoTracks()[0] === evt.track) {
          vid.remove();
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  }
}
function fillVideoDevicesDropDown() {
  return _fillVideoDevicesDropDown.apply(this, arguments);
}
function _fillVideoDevicesDropDown() {
  _fillVideoDevicesDropDown = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
    var video_devices, currentDeviceId, selectEl;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return callObject.enumerateDevices();
        case 2:
          video_devices = _context4.sent.devices.filter(function (d) {
            return d.kind === "videoinput";
          });
          _context4.next = 5;
          return callObject.getInputDevices();
        case 5:
          currentDeviceId = _context4.sent.camera.deviceId;
          console.log("current", currentDeviceId, "cameras", video_devices);
          selectEl = document.getElementById("video-devices");
          selectEl.innerHTML = "";
          video_devices.forEach(function (d) {
            var optionEl = document.createElement("option");
            optionEl.value = d.deviceId;
            optionEl.innerHTML = d.label;
            optionEl.selected = d.deviceId === currentDeviceId;
            selectEl.appendChild(optionEl);
          });

          // set the selected device as default
          _context4.next = 12;
          return changeVideoDevice();
        case 12:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return _fillVideoDevicesDropDown.apply(this, arguments);
}
function fillAudioDevicesDropDown() {
  return _fillAudioDevicesDropDown.apply(this, arguments);
}
function _fillAudioDevicesDropDown() {
  _fillAudioDevicesDropDown = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
    var audio_devices, currentDeviceId, selectEl;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return callObject.enumerateDevices();
        case 2:
          audio_devices = _context5.sent.devices.filter(function (d) {
            return d.kind === "audioinput";
          });
          _context5.next = 5;
          return callObject.getInputDevices();
        case 5:
          currentDeviceId = _context5.sent.mic.deviceId;
          console.log("current", currentDeviceId, "mic", audio_devices);
          selectEl = document.getElementById("audio-devices");
          selectEl.innerHTML = "";
          audio_devices.forEach(function (d) {
            var optionEl = document.createElement("option");
            optionEl.value = d.deviceId;
            optionEl.innerHTML = d.label;
            optionEl.selected = d.deviceId === currentDeviceId;
            selectEl.appendChild(optionEl);
          });

          // set the selected device as default
          _context5.next = 12;
          return changeAudioDevice();
        case 12:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return _fillAudioDevicesDropDown.apply(this, arguments);
}
window.changeVideoDevice = /*#__PURE__*/function () {
  var _changeVideoDevice = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var selectEl;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          selectEl = document.getElementById("video-devices");
          console.log("!!! changing video device");
          callObject.setInputDevicesAsync({
            videoDeviceId: selectEl.value
          });
        case 3:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  function changeVideoDevice() {
    return _changeVideoDevice.apply(this, arguments);
  }
  return changeVideoDevice;
}();
window.changeAudioDevice = /*#__PURE__*/function () {
  var _changeAudioDevice = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    var selectEl;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          selectEl = document.getElementById("audio-devices");
          console.log("!!! changing audio device");
          callObject.setInputDevicesAsync({
            AudioDeviceId: selectEl.value
          });
        case 3:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  function changeAudioDevice() {
    return _changeAudioDevice.apply(this, arguments);
  }
  return changeAudioDevice;
}();
function turnMicrophoneOn() {
  callObject.setLocalAudio(true);
}
function turnCameraOn() {
  callObject.setLocalVideo(true);
}
function turnMicrophoneOff() {
  callObject.setLocalAudio(false);
}
function turnCameraOff() {
  callObject.setLocalVideo(false);
}
function leaveCall() {
  return _leaveCall.apply(this, arguments);
}
function _leaveCall() {
  _leaveCall = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
    var vids, _i, _vids, vid, audios, _i2, _audios, audio;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          vids = Array.from(document.getElementsByTagName("video"));
          for (_i = 0, _vids = vids; _i < _vids.length; _i++) {
            vid = _vids[_i];
            vid.remove();
          }
          audios = Array.from(document.getElementsByTagName("audio"));
          for (_i2 = 0, _audios = audios; _i2 < _audios.length; _i2++) {
            audio = _audios[_i2];
            audio.remove();
          }
          _context6.next = 6;
          return callObject.leave();
        case 6:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return _leaveCall.apply(this, arguments);
}
function cameraError(evt) {
  console.log("Your device error was: ", evt);
}
function meetingJoined(evt) {
  console.log("You joined the meeting: ", evt);
}
function participantJoined(evt) {
  console.log("Participant joined meeting: ", evt);
}
function updateParticipant(evt) {
  console.log("Participant updated: ", evt);
}
document.addEventListener('DOMContentLoaded', function (event) {
  var joinButton = document.getElementById('joinCall');
  joinButton.addEventListener('click', createAndJoin);
  var cameraOnButton = document.getElementById('cameraOn');
  cameraOnButton.addEventListener('click', turnCameraOn);
  var microphoneOnButton = document.getElementById('microphoneOn');
  microphoneOnButton.addEventListener('click', turnMicrophoneOn);
  var cameraOffButton = document.getElementById('cameraOff');
  cameraOffButton.addEventListener('click', turnCameraOff);
  var microphoneOffButton = document.getElementById('microphoneOff');
  microphoneOffButton.addEventListener('click', turnMicrophoneOff);
  var leaveCallButton = document.getElementById('leaveCall');
  leaveCallButton.addEventListener('click', leaveCall);
  var videoDevicesSelect = document.getElementById('video-devices');
  videoDevicesSelect.addEventListener('change', changeVideoDevice);
  var audioDevicesSelect = document.getElementById('audio-devices');
  audioDevicesSelect.addEventListener('change', changeAudioDevice);
});
},{"./rtcStats.js":"rtcStats.js","@daily-co/daily-js":"../node_modules/@daily-co/daily-js/dist/daily-iframe-esm.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55518" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","daily.js"], null)
//# sourceMappingURL=/daily.bundle.js.map