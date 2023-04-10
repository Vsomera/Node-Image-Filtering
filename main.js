const path = require("path");
/*
 * Project: Milestone 1
 * File Name: main.js
 * Description: Image Filtering
 *
 * Created Date: 04/09/23
 * Author: Vilmor Somera
 *
 */

const IOhandler = require("./IOhandler");
const zipFilePath = path.join(__dirname, "myfile.zip");
const pathUnzipped = path.join(__dirname, "unzipped");
const pathProcessed = path.join(__dirname, "grayscaled");


// Unzips zipFilePath (myfile.zip) and extracts to unzipped (pathUnzipped)
IOhandler.unzip(zipFilePath, pathUnzipped)

// // array containing file paths
const filesToProcess = IOhandler.readDir(pathUnzipped)

// uses file path array to convert images to greyscale, then puts them into the greyscaled folder
for (let i = 0; i < filesToProcess.length; i ++) {
    const fileName = path.basename(filesToProcess[i]); // extract the filename from the full path
    const outputPath = path.join(pathProcessed, fileName); // create the output file path
    IOhandler.grayScale(filesToProcess[i], outputPath);
}
  


