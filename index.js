"use strict";

var fs = require('fs');
var path = require('path');

module.exports = Reso;

function Reso(opts) {
    if (!(this instanceof Reso)) return new Reso(opts);

    if (!opts) opts = {};
    this._isFile = opts.isFile || function (file) {
        try { var stat = fs.statSync(file) }
        catch (err) { if (err && err.code === 'ENOENT') return false }
        return stat.isFile() || stat.isFIFO();
    };
    this._read = opts.read || fs.readFileSync;
    this.extensions = toArray(opts.extensions);
    this.dirs = toArray(opts.dirs || opts.dir);
    this.cache = {};
}

Reso.prototype.include = function load(dir) {
    if (typeof dir === 'string') this.dirs.push(dir);
};

Reso.prototype.load = function load(name) {
    var dirs = this.dirs;
    for (var i = dirs.length - 1; i >= 0; i--) {
        var dir = dirs[i];
        var p = this._findAsFile(path.join(dir, '/', name));
        if (p) return this._read(p, {encoding: 'utf-8'});
    }
};

Reso.prototype._findAsFile =function findAsFile (x) {
    if (this._isFile(x)) {
        return x;
    }

    var extensions = this.extensions;
    for (var i = 0; i < extensions.length; i++) {
        var file = x + extensions[i];
        if (this._isFile(file)) {
            return file;
        }
    }
};

function toArray(target) {
    if (!target) return [];
    if (!Array.isArray(target)) return [target];
    return target;
}



