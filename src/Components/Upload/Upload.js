import React from 'react';
import compress from './Compressor';

function Upload() {
  return (
    <div className="upload">
      <h2>Upload the file to Compress</h2>
      <form>
        <label for="myfile">Select your file: </label>
        <input type="file" id="myfile" name="myfile"/>
        <br/><br/>
        <button onClick={processFile}>Submit</button>
      </form>
    </div>
  )
}

function processFile(event) {
  let temp = document.getElementById('myfile').files[0];
  const reader = new FileReader();
  reader.addEventListener('load', (event) => {
    const result = event.target.result;
    let compressedData = compress(result);
    console.log(compressedData);
  });
  reader.readAsDataURL(temp);
  event.preventDefault();
}

export default Upload