const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('PCS.txt', {encoding: 'latin1'});

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  let newQuestion;
  let output = [];
  let type = '';

  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    // console.log(`Line from file: ${line}`);
    if (line.startsWith('Identificador')) {
        type = 'Identificador';
        newQuestion = { identifier: line.split(':')[1].trim()};
        continue;
    }
    if (line.startsWith('Enunciado:')) {
        type = 'Enunciado:';
        continue;
    }
    if (line.startsWith('1.-')) {
        type = '1.-';
        newQuestion[1] = line.split('1.-')[1].trim();
        continue;
    }
    if (line.startsWith('2.-')) {
        type = '2.-';
        newQuestion[2] = line.split('2.-')[1].trim();
        continue;
    }
    if (line.startsWith('3.-')) {
        type = '3.-';
        newQuestion[3] = line.split('3.-')[1].trim();
        continue;
    }
    if (line.startsWith('4.-')) {
        type = '4.-';
        newQuestion[4] = line.split('4.-')[1].trim();
        continue;
    }
    if (line.startsWith('Respuesta')) {
        type = 'Respuesta';
        newQuestion.answer = line.split(':')[1].trim();
        continue;
    }
    if (line.startsWith('Norma')) {
        newQuestion.norma = line.split(':')[1].trim();
        output.push(newQuestion);
        continue;
    }
    if (type === '1.-') {
        newQuestion[1] = (newQuestion[1] || '') + ' ' + line.trim();
    }
    if (type === '2.-') {
        newQuestion[2] = (newQuestion[2] || '') + ' ' +  line.trim();
    }
    if (type === '3.-') {
        newQuestion[3] = (newQuestion[3] || '') + ' ' +  line.trim();
    }
    if (type === '4.-') {
        newQuestion[4] = (newQuestion[4] || '') + ' ' +  line.trim();
    }
    if (type === 'Enunciado:') {
        newQuestion.question = (newQuestion.question || '') + line.trim();
    }
    
  }
//   console.log(output);

  fs.writeFile("output.json", JSON.stringify(output, null, 2), function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
}); 
}

processLineByLine();