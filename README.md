# MD LINKS
MD LINKS its a project where I created a tool of command line (CLI) and a JavaScript library using Node.js, that reads and analyses archives on Markdown format (eg. README.md) to verify the links in it and report some statistics.<n>
This will allow us to execute JavaScript on the operative system environment, either on your local or in a server, which opens doors to interact with the system, files and networks.<n>

## DIAGRAMA DE FLUJO

<img src = "IMGS/diagrama de flujo.png">

## TECHNOLOGIES
  NodeJS, axios, chalk, axios, cheerio, marked.

## INSTALL
For installing this module, you will need to write on your console:

Locally:
npm i @cazavi/md-links

Globally:
npm install @cazavi/md-links -g


## USE
You have two commands to use on terminal adding it to the route you want to test, like this: 
  md-links route --validate

--validate
Response:

href: URL.
text: Inner link text.
file: link route.
status: HTTP response code.
statusText: error or ok (depending on link state).

--stats
Response:

total: total links tested on file.
unique: total not repeated links found.
