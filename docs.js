const { program } = require('commander');
program.version('0.0.1');
const docMethods =  require('./index');
const apiFileName = 'apidocs.json';

program
  .option('-p, --port', 'display port number of this api.')
  .option('-f, --file', 'display file name where api documentations are written.')
  .option('-l, --list', 'list all apis.')
  .option('-e, --explain <items>', 'explain API(s), you can provide a single value or comma seperates string values for mutitple APIs.')
  .option('-d, --describe item', 'describe / change an API description.');


program.parse(process.argv);

const options = program.opts();
if (options.port) console.log(`Port Number is : ${docMethods.port}`);
if (options.file) console.log(`API documentation file is : ${docMethods.apiDocsFileName}`);
if (options.list) docMethods.manageAPIDocs(null, 'list');
if (options.explain) docMethods.manageAPIDocs(options.explain, 'explain');



// sample commands
// npm run docs -- -h  -> help command.
// npm run docs -- -p -> shows port number.
// npm run docs -- -e /,as,/get-all-animals -> explain APIs.