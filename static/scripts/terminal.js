var term = new Terminal({
    cursorBlink: "true"
});

term.open(document.getElementById('terminal'));
term.write('nilu\'s portfolio $: ')

const ws = new WebSocket('ws://localhost:8082'); //the websocket on port 8082.

var command = "";
term.onKey(e=>{
    command += e.key;
    term.write(e.key);
    if(e.key == '\r'){
        term.write('\n');
        ws.send(command)
    }
})