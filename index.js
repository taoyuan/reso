"use strict";

var Reso = require('./lib/reso');

exports = module.exports = Reso;

exports.resolve = function (x, opts) {
    return Reso.create(opts).site().resolve(x);
};

exports.load = function (x, opts) {
    return Reso.create(opts).site().load(x);
};