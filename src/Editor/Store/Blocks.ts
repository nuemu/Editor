import { createStore, produce } from "solid-js/store";

type Block = {
  id: string
  config : {
    indent: number,
    type: string
  },
  data: any
}

const generateInitialBlock = (id: string, type: string, data?: any) => {
  return {
    id: id,
    config: {indent: 0, type: type},
    data: {text: data ? data : ""},
  }
}

export default class Blocks {
  blocks: Block[]
  setBlocks: any
  constructor(blocks: Block[]){
    [this.blocks, this.setBlocks] = createStore<Block[]>(blocks);
  }

  get = (id: string) => {
    return this.blocks.find(block => block.id === id)
  }

  update = (id: string, newBlock: Block) => {
    this.setBlocks(
      (block: Block) => block.id === id,
      newBlock
    );
  };

  update_data = (id: string, newData: any) => {
    this.setBlocks(
      (block: Block) => block.id === id,
      produce((block: Block) => block.data = newData)
    );
  };

  add = (id: string, type: string, data?: any) => {
    this.setBlocks(
      produce((store: Block[]) => {
        if(data)store.push(generateInitialBlock(id, type, data))
        else store.push(generateInitialBlock(id, type))
      }
    ))
  }
}
