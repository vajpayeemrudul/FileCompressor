const createMap = (original) => {
    let map = [];
    let keys = [];
    console.log(original);
    for(let i=0; i<original.length; i++) {
      if(!map[original[i]]) {
        map[original[i]] = 0;
        keys.push(original[i]);
      }
      map[original[i]]++;
    }
    return [map,keys];
  }
  
  export default createMap;