#!/usr/bin/env node
const path =require('path');
const process = require('process');
const mdlinks = require('mdlinks');
const { validate } = require('./md-links');

const cli = () =>{
    
    let options = {
        validate: false,
        stats: false,
    }
    if(process.argv[2]==='--validate'){
        options.validate=true;
    } else if(process.argv[2]==='--validate'){
        options.stats=true;
    }
    mdlinks(options)
}   