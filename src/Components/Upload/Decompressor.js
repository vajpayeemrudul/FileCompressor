import {bufferSize} from "./ConvertDataToBitString";

const decompress = (compressedData, hashmap) => {
  let bitData = "";
  for(let i=0; i<compressedData.length; i++) {
    bitData += convertToBits(compressedData.charCodeAt(i));
  }
  let reverseMap = {};
  for(let i=0; i<127; i++) {
    let temp = String.fromCharCode(i);
    if(hashmap[temp]) {
      reverseMap[hashmap[temp]] = temp;
    }
  }
  let len = bitData.length - 1;
  while(bitData[len] === '0') {
    len--;
  }
  let dataAfterDecompression = "", curString = "";
  for(let i=0; i<len; i++) {
    curString += bitData[i];
    if(reverseMap[curString]) {
      dataAfterDecompression += reverseMap[curString];
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