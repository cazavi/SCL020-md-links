#!/usr/bin/env node
const process = require('process');
const mdlinks = require('mdlinks');
const { validate } = require('./md-links');

const cli = () =>{
    const opt = process.argv[2]
    
    let options = {
        validate: false,
        stats: false,
    }
    if(process.argv[3]==='--validate'){
        options.validate=true;
    }
}   