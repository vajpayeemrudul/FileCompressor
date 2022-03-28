import React from 'react';
import getBitStrings, { changeMapToString } from './Compressor';
import convertDataToBitString from './ConvertDataToBitString';
import {saveAs} from 'file-saver';
import decompress from './Decompressor';

const Upload = () => (
  <div className="upload">
    <h2>Upload the file to Compress</h2>
    <form>
      <label for="myfile">Select your file: </label>
      <input type="file" id="myfile" name="myfile"/>
      {/* <br/><br/> */}
      <button onClick={processFile}>Submit</button>
    </form>
    <h2>Upload the file to Decompress</h2>
    <form>
      <label for="myfile">Select your file: </label>
      <input type="file" id="myfile" name="myfile"/>
      {/* <br/><br/> */}
      <button onClick={processFile}>Submit</button>
    </form>
  </div>
);

// Once the submit button is clicked we will start processing the file here
const processFile = (event) => {
  // here we are storing the data of the file provided by the user into temp variable
  let temp = document.getElementById('myfile').files[0];
  
  // to check whether the file is provided to compress or not
  if(temp === undefined) {
    alert('Please enter a file to process');
  }
  else {
    // Using FileReader to read the file as text
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
      // storing the file data into the result variable
      const result = event.target.result;
      
      // getting the map of characters to the bit string with which to replace them
      let charBitMap = getBitStrings(result);

      // getting the actual data after replacing the characters with their bit strings 
      // and converting them to their ascii values by using 7 bits from them at each time
      let bitData = convertDataToBitString(result, charBitMap);

      // storing the map to use it for decompression
      bitData += "/" + changeMapToString(charBitMap);

      // let decompressedData = decompress(bitData, charBitMap);
      // using Blob to create a file and provide it to the user to share 
      let blob = new Blob([bitData], {type: "text/plain;charset=utf-8" });
      saveAs(blob, getFileName(temp.name));
    });
    reader.readAsText(temp);
  } 
  // to prevent the default reloading of the page
  event.preventDefault();
}

// to get the actual file name and convert it into filename_compressed.txt
const getFileName = (originalName) => {
  return originalName.split('.')[0] + "_compressed.txt";
}

export default Upload;