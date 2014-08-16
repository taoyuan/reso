"use strict";

var t = require('chai').assert;
var reso = require('../');

describe('reso', function () {

    var dir = __dirname + '/fixtures';
    it('bar', function () {
        var res = reso.resolve('./fixtures/bar/foo');
        t.equal(res, dir + '/bar/foo');

        res = reso.create().resolve('./fixtures/bar/foo');
        t.equal(res, dir + '/bar/foo');

        res = reso.load('./fixtures/bar/foo');
        t.equal(res.path, dir + '/bar/foo');
        t.equal(res.content, 'foo');
    })
});