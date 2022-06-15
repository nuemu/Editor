import { createRoot } from "solid-js";
import { createStore, produce } from "solid-js/store";
import { ulid } from 'ulid'

type Block = {
  id: string
  config : {
    indent: number,
    type: string
  },
  data: any
}

type actions = {
  [key: string]: any
}

const getterMethods = (key: string, blocks: Block[]) => {
  const getBlock = (id: string) => {
    return blocks.find(block => block.id === id)
  };

  const getters: actions = {
    get: getBlock
  }

  return getters[key]
}

const mutationMethods = (key: string, setStore: any) => {
  const patchBlock = (id: string, newBlock: Block) => {
    setStore('blocks', produce((blocks: Block[]) => {
      const index = blocks.findIndex((block: Block)=> block.id === id);
      blocks[index] = newBlock;
    }));
  };

  const mutations: actions = {
    patch: patchBlock
  }

  return mutations[key]
}

const blocksStore = () => {
  const [store, setStore] = createStore<{blocks: Block[]}>({
    blocks: [
      {
        id: "01G4FQHW27SQ4AYTNTQV1E7PND",
        config: {indent: 0, type: 'Text'},
        data: {text: "PLAIN**~~BOLD~~**$c=\\pm\\sqrt{a^2+b^2}$~~Sam**ple**~~"},
      }
    ]
  });

  const getters = (key: string) => {
    return getterMethods(key, JSON.parse(JSON.stringify(store.blocks)))
  }

  const mutations = (key: string) => {
    return mutationMethods(key, setStore)
  }

  return {getters, mutations}
}

export default createRoot(blocksStore)