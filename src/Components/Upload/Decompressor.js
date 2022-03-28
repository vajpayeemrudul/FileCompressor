import {bufferSize} from "./ConvertDataToBitString";

const decompress = (compressedData, hashMap) => {
  let bitData = "";
  for(let i=0; i<compressedData.length; i++) {
    bitData += convertToBits(compressedData.charCodeAt(i));
  }
  
  let len = bitData.length - 1;
  while(bitData[len] === '0') {
    len--;
  }
  let dataAfterDecompression = "", curString = "";
  for(let i=0; i<len; i++) {
    curString += bitData[i];
    if(hashMap[curString]) {
      dataAfterDecompression += String.fromCharCode(hashMap[curString]);
      curString = "";
    }
  }
  return dataAfterDecompression;
}

const convertToBits = (asc) => {
  let bits = "";
  for(let i=0; i<bufferSize; i++) {
    bits += Math.floor(asc%2);
    asc/=2;
  }
  return bits;
}

export default decompress;