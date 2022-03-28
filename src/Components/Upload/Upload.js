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
      <input type="file" id="compress" name="myfile"/>
      {/* <br/><br/> */}
      <button onClick={compressFile}>Submit</button>
    </form>
    <h2>Upload the file to Decompress</h2>
    <form>
      <label for="myfile">Select your file: </label>
      <input type="file" id="decompress" name="myfile"/>
      {/* <br/><br/> */}
      <button onClick={decompressFile}>Submit</button>
    </form>
  </div>
);

// Once the submit button is clicked we will start processing the file here
const compressFile = (event) => {
  // here we are storing the data of the file provided by the user into temp variable
  let temp = document.getElementById('compress').files[0];
  
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
      saveAs(blob, getCompressFileName(temp.name));
    });
    reader.readAsText(temp);
  } 
  // to prevent the default reloading of the page
  event.preventDefault();
}

// Once the submit button is clicked we will start processing the file here
const decompressFile = (event) => {
  // here we are storing the data of the file provided by the user into temp variable
  let temp = document.getElementById('decompress').files[0];
  
  // to check whether the file is provided to compress or not
  if(temp === undefined) {
    alert('Please enter a file to decompress');
  }
  else {
    // Using FileReader to read the file as text
    const reader = new FileReader();
    const esc='/';
    reader.addEventListener('load', (event) => {
      // storing the file data into the result variable
      const result = event.target.result;
      
      //Splitting the input file using '/' to remove the stored hashmap from the compressed file.
      let arr =result.split(esc);
      let data="";
      for(let i=0;i<arr.length-2;i++)
      {
        data+=arr[i]+"/";
      }
      data+=arr[arr.length-2];

      //calling decompress function by passing input file and hashmap stored.
      let decompressedData = decompress(data, JSON.parse(arr[arr.length-1]));
      
      // using Blob to create a file and provide it to the user to share 
      let blob = new Blob([decompressedData], {type: "text/plain;charset=utf-8" });
      saveAs(blob, getDecompressFileName(temp.name));
    });
    reader.readAsText(temp);
  } 
  // to prevent the default reloading of the page
  event.preventDefault();
}

// to get the actual file name and convert it into filename_compressed.txt
const getCompressFileName = (originalName) => {
  return originalName.split('.')[0] + "_compressed.txt";
}

// to get the actual file name and convert it into filename_decompressed.txt
const getDecompressFileName = (originalName) => {
  return originalName.split('.')[0] + "_decompressed.txt";
}

export default Upload;