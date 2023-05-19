var term = new Terminal({
    cursorBlink: "true"
});

term.open(document.getElementById('terminal'));
term.write('nilu\'s portfolio $: ');

let input = '';

term.onKey(({ key }) => {
    switch (key) {
        case '\r': // Enter key
            term.write('\n\r');
            
            if (input.trim() === 'help') {
                fetch('http://127.0.0.1:8080/help')
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
            else{
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
