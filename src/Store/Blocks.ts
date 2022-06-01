import { createStore, unwrap } from "solid-js/store";
import { ulid } from 'ulid'
import axios from "axios";

const [blocks, setBlocks] = createStore([{
  "id": "01G4FQHW27SQ4AYTNTQV1E7PND",
  "data": "PLAIN**~~BOLD~~**$c=\\pm\\sqrt{a^2+b^2}$~~Sam**ple**~~"
}]);

export const addBlock = (type: string) => {
  setBlocks([{id: ulid(), data: 'PLAIN**~~BOLD~~**$c=\\pm\\sqrt{a^2+b^2}$~~Sam**ple**~~'}])
}

export const getBlock  = async (id: string) => {
  const response = await axios.get('https://httpbin.org/get')
  return unwrap(blocks.find(block => block.id === id))
}