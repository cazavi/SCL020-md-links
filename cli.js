#!/usr/bin/env node
const process = require('process');
const { mdlinks } = require('./index');

const cli = () =>{
    
    let options = {
        validate: false,
        stats: false,
    }
    if(process.argv[3]==='--validate'){
        options.validate=true;
    } else if(process.argv[3]==='--stats'){
        options.stats=true;
    }
    mdlinks(process.argv[2],options).then((result)=> console.log(result))
}  ; 
cli();