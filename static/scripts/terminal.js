const term = new Terminal({
    cursorBlink: true,
    cols: 145,
    rows: 15
  });
  

term.open(document.getElementById('terminal'));

let input = '';
let server_url = "http://127.0.0.1:8080"

const available_commands = ["help", "who", "ls", "clear", "cat"]


function ask_again() {
    term.write('\x1b[92m\r\n\r\nnilu\'s portfolio $: \x1b[0m'); // \x1b[92m is the ANSI escape code for bright green text. The \x1b[0m at the end of the string resets the terminal color back to the default, so that only the specified text is in green.
}


function execute_command(command_name, param_1 = ""){
    let temp_server_url = server_url + "/" + command_name

    //special case for the cat command.
    if(command_name == "cat"){

        temp_server_url += "/" + param_1
        console.log(temp_server_url)

    }   

    fetch(temp_server_url)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
    })
    .then(data => {
        term.write(data);
        ask_again()
    })
    .catch(error => {
        term.write('Error: ' + error);
    });
}

//by default execute the help command. 
ask_again()
term.write("help\r\n")
execute_command("help")

term.onData(data => {
    switch (data) {
        case '\r': // Enter key
            term.write('\r\n');

            let isCommand = false;

            let inputWords = input.trim().split(" ");

            for (command_name of available_commands) {
                if (inputWords[0] == command_name) {
                    let param = inputWords[1];

                    if (command_name == "cat") {
                        execute_command(command_name, param); //special case for cat command with parameter.
                    } 
                    else if(command_name == "clear"){
                        term.clear(); //special case for clear command. 
                        execute_command(command_name) //still calling the execute command to communicate with server to get a response saying its cleared. 
                    }
                    else if (param != undefined) {
                        term.write("The command '" + command_name + "' does not accept a parameter.");
                        ask_again()
                    } else {
                        execute_command(command_name);
                    }
                    isCommand = true;
                    break; // break out of the loop; no more commands need to be searched for.
                }
            }

            if (!isCommand) {
                term.write("Please enter a valid command.\r\nUse 'help' to see list of available commands and usage.")
                ask_again()
            }

            input = ''; // clear the input right after processing the command

            break;
        case '\u007F': // Backspace/Delete key
            if (input.length > 0) {
                term.write('\b \b');
                input = input.slice(0, -1);
            }
            break;
        case '\u001B[A': // Up arrow key
            term.write("Whats up ? 😳\r\n")
            ask_again()
            break;
        case '\u001B[B': // Down arrow key
            term.write("Going down ? 😳\r\n")
            ask_again()
            break;
        default: // Normal character input
            term.write(data);
            input += data;
            break;
    }
});
