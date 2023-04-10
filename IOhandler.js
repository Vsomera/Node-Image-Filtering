/*
 * Project: Milestone 1
 * File Name: IOhandler.js
 * Description: Collection of functions for files input/output related operations
 *
 * Created Date: 04/09/2023
 * Author:
 *
 */

const unzipper = require("unzipper");
const fs = require("fs");
const PNG = require("pngjs").PNG;
const path = require("path");

/**
 * Description: decompress file from given pathIn, write to given pathOut
 *
 * @param {string} pathIn
 * @param {string} pathOut
 * @return {promise}
 */
const unzip = (pathIn, pathOut) => {
  // Unzips zipped files and extracts them to a directory
  try {
    fs.createReadStream(pathIn) // locates file to be unzipped
      .pipe(unzipper.Extract({ path: pathOut })); // extracts contents to path
    console.log("Extraction Operation Completed");
  } catch (err) {
    console.error("Error: Not a Zipped File or Invalid Path", err);
  }
};

/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path
 *
 * @param {string} path
 * @return {promise}
 */
const readDir = (dir) => {
  // Returns an array of all files in a directory
  return fs
    .readdirSync(dir)
    .map((fileName) => {
      return path.join(dir, fileName); // array containing all items in the folder
    })
    .filter((file) => fs.statSync(file).isFile()); // filters array to contain only files
};

/**
 * Description: Read in png file by given pathIn,
 * convert to grayscale and write to given pathOut
 *
 * @param {string} filePath
 * @param {string} pathProcessed
 * @return {promise}
 */
const grayScale = (pathIn, pathOut) => {
  // Creates a read stream to read the input png file
  fs.createReadStream(pathIn)
    .pipe(new PNG())
    // handle the 'parsed' event, which is emitted when the PNG has been fully parsed
    .on("parsed", function () {
      // loop through each pixel in the image
      for (let y = 0; y < this.height; y++) {
        for (let x = 0; x < this.width; x++) {
          // calculate the index of the current pixel in the pixel data array
          const idx = (this.width * y + x) << 2;
          // calculate the grayscale value for this pixel by averaging the RGB values
          const gray =
            (this.data[idx] + this.data[idx + 1] + this.data[idx + 2]) / 3;
          // set the RGB values of the pixel to the grayscale value
          this.data[idx] = gray;
          this.data[idx + 1] = gray;
          this.data[idx + 2] = gray;
        }
      }
      // pack the modified pixel data into a new PNG image and pipe it into a write stream
      this.pack().pipe(fs.createWriteStream(pathOut));
    });
};

module.exports = {
  unzip,
  readDir,
  grayScale,
};
