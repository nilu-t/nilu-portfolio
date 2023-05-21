/*
 * The server for the terminal.
 *
 */

express = require("express")
var cors = require('cors') //cors needed for fetch requests made on this server. 
app = express()
app.use(cors()) //the app uses the cors. 

//add app listening on port 8080.
const port = 8080

app.listen(port, function(error, response){
    if(error)
        console.log(error)
    else
        console.log("Successful server connection for port ", port)
})

//A commands object which shows all the commands that can be used in the terminal. 
const commands = {
    'ls': 'Lists the available projects',
    'cat "Project_Name"': 'Short description of the "Project_Name"',
    'who': 'Short description of me and why I created the site',
    'clear': 'Clear the terminal'
}

//A projects objects which shows descriptions of each project I made.
const projects = {
    "BudgetVision": "BudgetVision is an Android application that enables the creation of an effective daily budget. It monitors individual expenditures, tracks the spending of others, and generates a user expense spreadsheet through Google Sign-In. It also features currency conversion capabilities via an asynchronous call to the Bank of Canada's website.",
    "nilu-website": "This portfolio website! I made it using Node.JS, Javascript, Particle.JS, Flask, Python, CSS and HTML. This project was made to show my projects and experience I have accumulated over university, personal projects and internships.",
    "game-tier": "Flask web application in which users can query game information from various popular gaming companies."
}

//route for command "help"
app.get("/help", function(req, res){
    console.log("help command executed")

    let result = ""

    for (let command in commands){
        result += command + ": " + commands[command] + "\r\n"
    }

    res.send(result)
})

//route for command "who"
app.get("/who", function(req, res){
    console.log("who command executed")

    let result = "My name is Nilushanth Thiruchelvam. I'm a third year computer science student at York University. I created this site to create an interactive portfolio project demonstrating my skills and work experience I have accumulated. I made this site using Node.JS, Javascript, Xterm.JS, Particle.JS, Flask, Python, CSS and HTML"

    result = result.split(". ").join(".\r\n")

    res.send(result)
})

//route for command "ls"
app.get("/ls", function(req, res){
    console.log("ls command executed")

    let result = ""

    for (project in projects){
        result += project + "\r\n"
    }

    res.send(result)
})

//route for command "cat" with no optional parameter. This is a mistake so a response is sent saying so.
app.get("/cat", function(req,res){

    res.send("Please provide the project name. i.e, cat BudgetVision")
})

//route for command "cat" with an optional parameter like "project nilu-website", "project BudgetVision", etc.
app.get("/cat/:projectName", function(req, res){

    let projectName = req.params.projectName
    console.log("cat " + projectName + " executed")

    for (avail_project in projects){
        if(avail_project == projectName){
            res.send(projects[avail_project].split(". ").join(".\r\n"))
            return; //exit the function after sending the resonse.
        }
    }

    res.send("The project '" + projectName + "' does not exist")

})

//route for clear command.
app.get('/clear', function(req,res){
    res.send("And just like that, the terminal has forgotten more things than it ever knew.")
})