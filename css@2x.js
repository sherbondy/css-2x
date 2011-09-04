#!/usr/bin/env node

var program = require('commander');
var doubler = require('./doubler');

program
    .version('0.0.1')
    .parse(process.argv);

console.log(doubler.double(program.args));
