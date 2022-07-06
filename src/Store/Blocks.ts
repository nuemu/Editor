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
          "text": "Block Style Editor"
      }
  },
  {
      "id": "01G5NWJ7P2EBTWADXT9ABQQTS7",
      "config": {
          "indent": 0,
          "type": "Text"
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
          "text": "とりあえずで**強調**と~~打ち消し~~を実装、imageやurlのような特殊なものについては思案中。また、**記号のネストは~~不~~可能**。**のように閉じていない記号は無視される。"
      }
  },
  {
      "id": "01G5JBTCC1JN8S3G4T8AA2FP2J",
      "config": {
          "indent": 0,
          "type": "Text"
      },
      "data": {
        "text": "#include<iostream>\nusing namespace std;\n\nint main(){\n  cout << \"Hello Editor !\" << endl;\n}",
        "language": "cpp"
      }
  },
  {
      "id": "01G5PB8BXGW8F5A6CGMD147F07",
      "config": {
          "indent": 0,
          "type": "Text"
      },
      "data": {
          "text": "使ってないのでわからないが、Typora風？にしている。Caretが装飾文字の上にいくと、Markdown記法で表示され修正できる"
      }
  },
  {
      "id": "01G5PB8HYVNE8YQ527PZSXD94A",
      "config": {
          "indent": 0,
          "type": "Text"
      },
      "data": {
          "text": "鋭意開発中"
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
