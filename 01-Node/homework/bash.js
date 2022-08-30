const commands = require ('./commands/index')
// Output un prompt
    const print = (output) => {
        process.stdout.write(output);
        process.stdout.write('\nprompt > ')
    }

    process.stdout.write('prompt > ');
    // El evento stdin 'data' se dispara cuando el user escribe una línea
    process.stdin.on('data', function(data) {

        let args = data.toString().trim().split(" ")
        let cmd = args.shift(); // remueve la nueva línea

        if(commands[cmd]){
            commands[cmd](args, print);
        }else{
            print('cmd not found')
        }

        // process.stdout.write('You typed: ' + cmd);
        // process.stdout.write('\nprompt > ');
    });