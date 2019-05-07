// readline module is generally used to read the user inputs from command line
// this is used in making the CLI tools
const readline = require('readline');

function completer(line) {
    const completions = '.help .error .exit .quit .q'.split(' ');
    const hits = completions.filter((c) => c.startsWith(line));
    // show all completions if none found
    return [hits.length ? hits : completions, line];
  }

// readline.createInterface creates and returns and instance of readline.Interface class
// readline.Interface class extends the EventEmitter class, hence has all the methods related to that
const rl = readline.createInterface({
    input: process.stdin, // stream from which to take the user input
    output: process.stdout, // stream to which send the output
    prompt: 'Nitin', // optional, used to show initial msg on terminal,
    completer:completer // used for completing the inputs on pressing tab
});


rl.setPrompt('What is 1 +2 ?\n'); // sets the content to be prompted
rl.prompt(); // prompts to terminal whetever content is already set by setPrompt()
rl.on('line', (input) => {
    if (input.trim() == 3) {
        rl.setPrompt('Correct !!');
        rl.prompt();
        rl.close();
    }else{
    rl.setPrompt('Incorrect !!.Please try again\n');
    rl.prompt();
    }

}     );
