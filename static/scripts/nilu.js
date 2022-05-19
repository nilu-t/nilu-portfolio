
//terminal words to represent my name.
const terminal_words = [
    /** Greetings */
    "Hello there ( •_•)",
    "I'm Nilu.",
    "Welcome to my corner of the internet.",
    
    /** Tell them about the site */
    "Navigate the site with the menu below.",
    "or you can use the terminal.",

    /** Programming lanuages I know */
    "I'm proficient in...",
    "Java development",
    "Bash scripting",
    "Javascript development",
    "Python development",
    "C programming",

    /** Soft skills I have */
    "I also have skills in...",
    "Creativity",
    "Problem-solving",
    "Time management",

    /** Telling them to check out the rest of the site */
    "Check out the rest of the site.",
    "Beware of Hulk below... (●´⌓`●)"

];

var delaySpeed = 30; //The delay speed in milliseconds.

var row = 0;
var col = 0;

/**
 * Helper function used for clearing and executing typeEachCharacter with delay.
 */
 function clear(){
    document.getElementById("full_name").innerHTML = "&nbsp"; //clear the inner HTML and a non-breaking space is added to the HTML.
    setTimeout(typeEachCharacter, delaySpeed); //type the next character with delayed speed.
}

/**
 * Function used for typing each terminal_words string character by character on the homepage.
 */
function typeEachCharacter(){

    if (col == terminal_words[row].length){
        col = 0; //reset the column.
        row++; //increment the row by 1.
        setTimeout(clear, 2500); //invoking the clear function after 2.5 second.

    }
    else if(col < terminal_words[row].length){
        if(col == 0){
            document.getElementById("full_name").innerHTML += "> <br>&nbsp>&nbsp";
        }
        document.getElementById("full_name").innerHTML += terminal_words[row][col];
        col++;
        setTimeout(typeEachCharacter, delaySpeed); //type the next character with delayed speed.
    }
}

typeEachCharacter(); //calling the method to type each terminal_words element by character.