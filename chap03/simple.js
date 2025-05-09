// This is in the traditional commonJS module format

var count = 0;  // is not attached to the exports object
// this can be thought of as a local variable to the module therefore it is not accessible from outside the module
exports.next = function () { return ++count; }; // is attached to the exports object
exports.hello = function () { return "Hello, World"; }; 

// count is a p[rivate implementation detail and are not exported => not accessible from outside the module
// const s = require('./simple.js');
// s.hello(); ---> "Hello, World"
// s.next(); ---> 1
// s.next(); ---> 2
// s.count; ---> undefined
// s.count = 100; ---> undefined
// s.count; ---> undefined