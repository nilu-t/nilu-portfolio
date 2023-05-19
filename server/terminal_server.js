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
    'ls': 'Project1\nProject2\nProject3',
    'cat Project1': 'This is a description of Project1...',
    'cat Project2': 'This is a description of Project2...',
    'who': 'This is a description of who I am and why I created the site',
}

//A projects objects which shows descriptions of each project I made.
const projects = {
    "BudgetVision": "BudgetVision is an Android application that enables the creation of an effective daily budget, monitors individual expenditures, tracks the spending of others, and generates a user expense spreadsheet through Google Sign-In. It also features currency conversion capabilities via an asynchronous call to the Bank of Canada's website.",

}

//route for command "help"
app.get("/help", function(req, res){
    console.log("help command executed")

    res.send(commands)
})

//route for command "who"
app.get("/who", function(req, res){
    console.log("who command executed")

    res.send("My name is Nilushanth Thiruchelvam. I'm a third year computer science student at York University. I created this site to create an interactive portfolio project demonstrating my skills and work experience I have accumulated. ")
})

//route for command "ls"
app.get("/ls", function(req, res){
    console.log("ls command executed")

    res.send(commands["ls"])
})

//route for command "cat" with an optional parameter like "project nilu-website", "project BudgetVision", etc.
app.get("/cat/:projectName", function(req, res){

    let projectName = req.params.projectName
    console.log("cat " + projectName + " executed")

    for (avail_project of projects){
        if(avail_project == projectName){
            res.send(projects[avail_project])
        }
    }

})