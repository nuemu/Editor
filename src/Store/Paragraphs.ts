import { createRoot } from "solid-js";
import { createStore, produce } from "solid-js/store";
import { ulid } from 'ulid'

type Paragraph = {
  id: string
  blocks: string[]
}

const initialParagraphs: Paragraph[] = [
  {
    id: "01G5KAR1FY949SY0R2DV4RGR7M",
    blocks: [
      "01G5PB8HYVNE8YQ527PZSXD94A",
      "01G5PB8BXGW8F5A6CGMD147F07",
      "01G4FQHW27SQ4AYTNTQV1E7PND",
      "01G5NWK5FC5A3MBJK2MTYZ92J5",
      "01G5PB8R161RT048NVJQPKKQVK",
      "01G5JBTCC1JN8S3G4T8AA2FP2J",
      "01G5NWJ7P2EBTWADXT9ABQQTS7",
  ]}
]

type actions = {
  [key: string]: any
}

const getterMethods = (key: string, paragraphs: Paragraph[]) => {
  const getParagraph = (id: string) => {
    return paragraphs.find(paragraph => paragraph.id === id)
  };

  const getNextBlock = (paragraph_id: string, block_id: string) => {
    const paragraph = paragraphs.find(paragraph => paragraph.id === paragraph_id)
    const index = paragraph?.blocks.findIndex(id => id === block_id)
    if(index! < paragraph!.blocks.length) return paragraph!.blocks[index!+1]
    else return paragraph!.blocks[index!]
  }

  const getPreviousBlock = (paragraph_id: string, block_id: string) => {
    const paragraph = paragraphs.find(paragraph => paragraph.id === paragraph_id)
    const index = paragraph?.blocks.findIndex(id => id === block_id)
    if(index !== 0) return paragraph!.blocks[index!-1]
    else return paragraph!.blocks[index!]
  }

  const getters: actions = {
    get: getParagraph,
    prev: getPreviousBlock,
    next: getNextBlock
  }

  return getters[key]
}

const mutationMethods = (key: string, setStore: any) => {
  const addBlock = (id: string, blockId: string, newBlockId: string) => {
    setStore(
      (paragraph:Paragraph) => paragraph.id === id,
      produce((paragraph:Paragraph) => {
        const index = paragraph.blocks.findIndex(block => block === blockId)
        paragraph.blocks.splice(index+1, 0, newBlockId)
      })
    );
  };

  const removeBlock = (id: string, blockId: string) => {
    setStore(
      (paragraph:Paragraph) => paragraph.id === id,
      produce((paragraph:Paragraph) => {
        const index = paragraph.blocks.findIndex(block => block === blockId)
        paragraph.blocks.splice(index, 1)
      })
    );
  }

  const mutations: actions = {
    add: addBlock,
    remove: removeBlock,
  };

  return mutations[key]
}

const paragraphStore = () => {
  const [store, setStore] = createStore<Paragraph[]>(initialParagraphs);

  const paragraph_getters = (key: string) => {
    return getterMethods(key, JSON.parse(JSON.stringify(store)))
  }

  const paragraph_mutations = (key: string) => {
    return mutationMethods(key, setStore)
  }

  return {paragraph_getters, paragraph_mutations}
}

export default createRoot(paragraphStore)
