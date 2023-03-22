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

        let doesPathExists = fs.existsSync(dirPath);
        if(doesPathExists){
            // creatind a new directory to store the orgainized path
            let destpath = path.join(dirPath, "Organized_files");
            let flag = fs.existsSync(destpath);
            console.log(flag);

            if(!flag){
                fs.mkdirSync(destpath);
            }

            let content = fs.readdirSync(dirPath);
            // console.log(content);
            let i = 0
            for(let filename in content){
                console.log(content[filename]);
                // console.log(findutility(content[filename]));
                if(content[filename][0] != '.')
                cutandpaste(dirPath, content[filename], destpath);
                


                if(i > 10)
                    break;
                i++;
            }
        } else {
            console.log("Invalid Path");
        }
    }
}

function cutandpaste(dirpath, filename, destpath){

    let util = findutility(filename);
    // console.log(filename);
    // console.log(util);

    let path1 = path.join(dirpath, filename);
    let path2 = path.join(dirpath, "Organized_files", util);
    console.log(path1);
    console.log(path2);

    let util_folder_path = path.join(path2);
    let utilexist = fs.existsSync(util_folder_path);
    
    console.log(path2);
    if(!utilexist)
        fs.mkdirSync(util_folder_path);

    
    copyFile(dirpath, path2, filename);
}
async function copyFile(sourceDirPath, destDirPath, filename) {
    const sourceFilePath = path.join(sourceDirPath, filename);
    const destFilePath = path.join(destDirPath, filename);
    try {
      await fsp.access(sourceFilePath, fs.constants.R_OK);
      await fsp.access(destDirPath, fs.constants.W_OK);
      await fsp.copyFile(sourceFilePath, destFilePath);
  
      console.log("File copied successfully.");
    } catch (ex) {
      if (ex.errno === -2)
        console.error(`File "${sourceFilePath}" doesn't exist.`);
      else if (ex.errno === -13)
        console.error(`Could not access "${path.resolve(destDirPath)}"`);
      else
        console.error(`Could not copy "${sourceFilePath}" to "${destDirPath}"`);
  
      // console.log(ex);
    }
  }

function findutility(filename){
    let utility ={}
    utility.types = {
        media: ["mp4", "mkv"],
        archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
        documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
        app: ['exe', 'dmg', 'pkg', "deb"]
    }

    let findtype = path.extname(filename).slice(1);

    for(var i in utility.types){
        
        // console.log(i);
        if(utility.types[i].includes(findtype)){
            // console.log(utility.types[i]);
            // let name = utility.types[i];
            // console.log(i);
            // console.log(utility.types[name]);
            return i;
        }
    }

    return "other";
}
function helpFn(){
    console.log("Help command implemented for ");
    
}

