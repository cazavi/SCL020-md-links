const fs = require('fs');
const axios = require('axios').default;
const chalk = require('chalk');
const cheerio = require('cheerio');
const marked = require('marked');

//get an archive
const fs = require('fs');
NOMBRE_ARCHIVO = "readme.md";

fs.readFileSync(NOMBRE_ARCHIVO, 'utf8', (error, data) => {
    if (error) throw error;
    console.log("El contenido es: ", data);
});

//marked call
document.getElementById('content').innerHTML =
marked.parse('# Marked in the browser\n\nRendered by **marked**.');

//cheerio
const $ = cheerio.load('<h2 class="title">Hello world</h2>');