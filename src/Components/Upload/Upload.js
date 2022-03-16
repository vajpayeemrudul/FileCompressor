import React from 'react'

function Upload() {
  return (
    <div className="upload">
        <h2>Upload the file to Compress</h2>
        <form>
            <label for="myfile">Select your file: </label>
            <input type="file" id="myfile" name="myfile"/>
            <br/><br/>
            <input type="submit"/>
        </form>
    </div>
  )
}

export default Upload