/*
 * The server for the terminal.
 *
 */

express = require("express")
var cors = require('cors')
app = express()
app.use(cors())

//add app listening on port 8080.
const port = 8080

app.listen(port, function(error, response){
    if(error)
        console.log(error)
    else
        console.log("Successful server connection for port ", port)
})

const commands = {
    'ls': 'Project1\nProject2\nProject3',
    'cat Project1': 'This is a description of Project1...',
    'cat Project2': 'This is a description of Project2...'
}

//route for command "help"
app.get("/help", function(req, res){
    console.log("help command executed")

    res.send(commands)
})
