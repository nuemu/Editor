import { createStore, unwrap } from "solid-js/store";
import { ulid } from 'ulid'
//import axios from "axios";

const [blocks, setBlocks] = createStore([{
  id: "01G4FQHW27SQ4AYTNTQV1E7PND",
  config: {indent: 0, type: 'Text'},
  data: {text: "PLAIN**~~BOLD~~**$c=\\pm\\sqrt{a^2+b^2}$~~Sam**ple**~~"}
}]);

export const addBlock = (type: string) => {
  setBlocks([{id: ulid(), config: {indent: 0, type: 'Text'}, data: {text: 'PLAIN**~~BOLD~~**$c=\\pm\\sqrt{a^2+b^2}$~~Sam**ple**~~'}}])
}

export const getBlock  = (id: string) => {
  return unwrap(blocks.find(block => block.id === id))
}