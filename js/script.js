// TLM FOR ALL Website Script

console.log("TLM FOR ALL Loaded Successfully");


// Welcome message

window.onload = function(){

    console.log("Welcome to TLM FOR ALL");

};


// Button action

const buttons = document.querySelectorAll("button");

buttons.forEach(function(button){

    button.addEventListener("click", function(){

        alert("TLM FOR ALL - Learning Platform");

    });

});
