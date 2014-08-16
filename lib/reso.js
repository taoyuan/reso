"use strict";

var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var resolve = require('resolve');

var callsites = require('./callsites');

module.exports = Reso;

function Reso(opts) {
    if (!(this instanceof Reso)) return new Reso(opts);
    this.opts = opts || {};
}

Reso.create = function (opts) {
    return new Reso(opts);
};

Reso.prototype.site = function () {
    if (this._site) throw new Error('`site` has been called once, this function allow call only once before resolve');
    this._site = callsites(2);
    return this;
};

Reso.prototype.resolve = function (x, opts) {
    var options = _.assign({}, this.opts, opts);
    options.basedir = options.basedir || path.dirname((this._site || callsites(1)).getFileName());
    this._site = null;
    try {
        return resolve.sync(x, options);
    } catch (e) {
        throw new Error("Cannot find resource '" + x + "' from '" + options.basedir + "'");
    }
};

Reso.prototype.load = function (x, opts) {
    var fullpath = this.resolve(x, opts);
    return {path: fullpath, content: fs.readFileSync(fullpath, 'utf-8')};
};