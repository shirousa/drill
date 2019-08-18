"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Drill = (function () {
    function Drill(obj) {
        this._obj = obj;
        this._lambda = function (obj, callback) { return callback(obj); };
    }
    Drill._query = function (obj, query) {
        var key = query.shift();
        var value;
        if (typeof (key) === "number" && Array.isArray(obj)) {
            if (0 <= key && key < obj.length) {
                value = obj[key];
            }
            else {
                value = undefined;
            }
        }
        if (typeof (key) === "string" && typeof (obj) === "object") {
            if (key in obj) {
                value = obj[key];
            }
            else {
                value = undefined;
            }
        }
        if (typeof (key) === "function") {
            value = key(obj);
        }
        if (query.length === 0) {
            return value;
        }
        else {
            return Drill._query(value, query);
        }
    };
    Drill.prototype.q = function (query) {
        return this.query(query);
    };
    Drill.prototype.query = function (query) {
        var drill = new Drill(null);
        drill._parent = this;
        drill._debug = query;
        drill._lambda = function (obj, callback) {
            var result = Drill._query(obj, query.slice());
            return callback(result);
        };
        return drill;
    };
    Drill.prototype.sq = function (query) {
        return this.subquery(query);
    };
    Drill.prototype.subquery = function (query) {
        var drill = new Drill(null);
        drill._parent = this;
        drill._debug = query;
        drill._lambda = function (obj, callback) {
            if (Array.isArray(obj)) {
                return obj.map(function (n) { return callback(Drill._query(n, query.slice())); });
            }
            else {
                return null;
            }
        };
        return drill;
    };
    Drill.prototype.f = function (query, value) {
        return this.find(query, value);
    };
    Drill.prototype.find = function (query, value) {
        var drill = new Drill(null);
        drill._parent = this;
        drill._debug = query;
        drill._lambda = function (obj, callback) {
            if (Array.isArray(obj)) {
                var filter = obj.filter(function (n) { return Drill._query(n, query.slice()) === value; });
                return filter.map(function (n) { return callback(n); });
            }
            else {
                return null;
            }
        };
        return drill;
    };
    Drill.prototype._dig = function (callback) {
        var _this = this;
        var lambda = function (obj) {
            var _callback;
            if (callback) {
                _callback = callback;
            }
            else {
                _callback = function (obj) { return obj; };
            }
            var result = _this._lambda(obj, _callback);
            return result;
        };
        if (this._parent) {
            return this._parent._dig(lambda);
        }
        else {
            if (lambda) {
                return lambda(this._obj);
            }
            else {
                return this._obj;
            }
        }
    };
    Drill.prototype.value = function (def) {
        var result = this._dig();
        if (result) {
            return result;
        }
        else {
            return def;
        }
    };
    return Drill;
}());
exports.default = Drill;
