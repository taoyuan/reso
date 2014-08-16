"use strict";

module.exports = function (index) {
    // see https://code.google.com/p/v8/wiki/JavaScriptStackTraceApi
    var _ = Error.prepareStackTrace;
    Error.prepareStackTrace = function (_, stack) { return stack };
    var stack = new Error().stack.slice(1);
    Error.prepareStackTrace = _;
    return arguments.length > 0 ? stack[index] : stack;
};
