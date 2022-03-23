import PriorityQueue from "./PriorityQueue";
import createMap from "./CreateMap";

const compress = (original) => {
  let [hashMap, keys] = createMap(original);
  let queue = new PriorityQueue();

  keys.map(key => queue.push([hashMap[key], key]));

  return hashMap;
}

export default compress;
