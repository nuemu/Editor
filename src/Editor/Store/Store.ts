import { createRoot } from "solid-js"
import Blocks from "./Blocks"
import Paragraphs from "./Paragraphs"

import { BlocksDevData, ParagraphsSample } from "./Sample"
import { BlockTestData } from "../../tests/EditorTestData"

var BlockData = BlocksDevData

switch(import.meta.env.MODE){
  case('test'):
    BlockData = BlockTestData
    break
}

const Store = () => {
  const blocks = new Blocks(BlockData)
  const paragraphs = new Paragraphs(ParagraphsSample)
  return { blocks, paragraphs }
}

export default createRoot(Store)