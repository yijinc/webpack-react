'use strict';
require('@babel/polyfill');

if (typeof Promise === 'undefined') {
    require('promise/lib/rejection-tracking').enable();
    window.Promise = require('promise/lib/es6-extensions.js');
}

Object.assign = require('object-assign');

// window.fetch polyfill
// require('whatwg-fetch');  
