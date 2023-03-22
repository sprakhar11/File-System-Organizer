let fs = require("fs");
let path = require("path");


let inputArr = process.argv.slice(2);

console.log(inputArr);

let command = inputArr[0];

switch(command){
    case "tree":
        treeFn(inputArr[1]);
        break;
    case "organize":
        organizeFn(inputArr[1]);
        break;
    
    case "help":
        helpFn();
        break;
    default:
        console.log("Please input right command");
}


function treeFn(dirPath){
    console.log("Tree command implemented for", dirPath);
    

}

function organizeFn(dirPath){
    if(dirPath == undefined){
        console.log("No path given");
        return;
    }else {
        let does
    }

    
}

function helpFn(){
    console.log("Help command implemented for ");
    
}