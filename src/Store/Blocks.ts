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

const generateInitialBlock = (id: string, type: string, data?: any) => {
  return {
    id: id,
    config: {indent: 0, type: type},
    data: {text: data ? data : ""},
  }
}

const initialBlocks: Block[] = [
  {
      "id": "01G4FQHW27SQ4AYTNTQV1E7PND",
      "config": {
          "indent": 0,
          "type": "Text"
      },
      "data": {
          "text": "Caretが装飾文字の上にいくと、Markdown記法で表示され修正できる"
      }
  },
  {
      "id": "01G5NWJ7P2EBTWADXT9ABQQTS7",
      "config": {
          "indent": 0,
          "type": "Code"
      },
      "data": {
          "text": "GFM、ブロック単位の描画、先頭要素は即座に変換。"
      }
  },
  {
      "id": "01G5NWK5FC5A3MBJK2MTYZ92J5",
      "config": {
          "indent": 0,
          "type": "Text"
      },
      "data": {
          "text": "インライン要素として、現状は**強調**、~~打ち消し~~、[URL](/Editor)、数式ブロック$\\sum_{n=0}^\\infty$を実装。**記号の[ネストも~~不~~可](/Editor)能**。なお、**のように閉じていない記号は無視される。"
      }
  },
  {
      "id": "01G5JBTCC1JN8S3G4T8AA2FP2J",
      "config": {
          "indent": 0,
          "type": "Text"
      },
      "data": {
        "text": "ディスプレイ要素？として、h1~h3は実装。"
      }
  },
  {
      "id": "01G5PB8BXGW8F5A6CGMD147F07",
      "config": {
          "indent": 0,
          "type": "Text"
      },
      "data": {
          "text": "[Typora(使ったことがない...)](https://typora.io/)と[Notion](https://www.notion.so/)を参考にしている。"
      }
  },
  {
      "id": "01G5PB8HYVNE8YQ527PZSXD94A",
      "config": {
          "indent": 0,
          "type": "H1"
      },
      "data": {
          "text": "# 鋭意開発中"
      }
  },
  {
      "id": "01G5PB8R161RT048NVJQPKKQVK",
      "config": {
          "indent": 0,
          "type": "Text"
      },
      "data": {
          "text": ""
      }
  }
]

type actions = {
  [key: string]: any
}

const getterMethods = (key: string, blocks: Block[]) => {
  const getBlock = (id: string) => {
    return blocks.find(block => block.id === id)
  };

  const getters: actions = {
    get: getBlock,
  }

  return getters[key]
}

const mutationMethods = (key: string, setStore: any) => {
  const patchBlock = (id: string, newBlock: Block) => {
    setStore(
      (block: Block) => block.id === id,
      newBlock
    );
  };

  const patchBlockData = (id: string, newData: any) => {
    setStore(
      (block: Block) => block.id === id,
      produce((block: Block) => block.data = newData)
    );
  };

  const addBlock = (id: string, type: string, data?: any) => {
    setStore(
      produce((store: Block[]) => {
        if(data)store.push(generateInitialBlock(id, type, data))
        else store.push(generateInitialBlock(id, type))
      }
    ))
  }

  const mutations: actions = {
    patch: patchBlock,
    patchData: patchBlockData,
    add: addBlock
  };

  return mutations[key]
}

const blocksStore = () => {
  const [store, setStore] = createStore<Block[]>(initialBlocks);

  const block_getters = (key: string) => {
    return getterMethods(key, JSON.parse(JSON.stringify(store)))
  }

  const block_mutations = (key: string) => {
    return mutationMethods(key, setStore)
  }

  return {block_getters, block_mutations}
}

export default createRoot(blocksStore)
