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
      //"01G4FQHW27SQ4AYTNTQV1E7PND",
      //"01G5NWJ7P2EBTWADXT9ABQQTS7",
      "01G5PB8HYVNE8YQ527PZSXD94A",
      "01G5PB8BXGW8F5A6CGMD147F07",
      //"01G5PB8R161RT048NVJQPKKQVK",
      "01G5NWK5FC5A3MBJK2MTYZ92J5",
      //"01G5JBTCC1JN8S3G4T8AA2FP2J"
  ]}
]

type actions = {
  [key: string]: any
}

const getterMethods = (key: string, paragraphs: Paragraph[]) => {
  const getParagraph = (id: string) => {
    return paragraphs.find(paragraph => paragraph.id === id)
  };

  const getters: actions = {
    get: getParagraph,
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

  const mutations: actions = {
    add: addBlock
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
