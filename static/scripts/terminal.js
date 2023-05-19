var term = new Terminal({
    cursorBlink: "true"
});

term.open(document.getElementById('terminal'));
term.write('nilu\'s portfolio $: ');

let input = '';
let server_url = "http://127.0.0.1:8080"

const available_commands = ["help", "who", "ls", "cat"]

function execute_command(command_name){
    let temp_server_url = server_url + "/" + command_name

    fetch(temp_server_url)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
    })
    .then(data => {
        term.write(data);
        input = '';
        term.write("\n\rnilu's portfolio $: ");
    })
    .catch(error => {
        term.write('Error: ' + error);
    });
}

term.onKey(({ key }) => {
    switch (key) {
        case '\r': // Enter key
            term.write('\n\r');

            let isCommand = false

            for (command_name of available_commands){

                if(input.trim() == command_name){
                    execute_command(command_name)
                    isCommand = true
                }
            }
            
            if(!isCommand){
                input = '';
                term.write("\rnilu's portfolio $: ");
            }
            
            break;
        case '\u007F': // Backspace/Delete key
            if (input.length > 0) {
                term.write('\b \b');
                input = input.slice(0, -1);
            }
            break;
        default: // Normal character input
            term.write(key);
            input += key;
            break;
    }
});
