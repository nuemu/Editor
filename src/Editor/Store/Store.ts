import { createRoot } from "solid-js"
import Blocks from "./Blocks"
import Paragraphs from "./Paragraphs"

import { BlocksSample, ParagraphsSample } from "./Sample"

const Store = () => {
  const blocks = new Blocks(BlocksSample)
  const paragraphs = new Paragraphs(ParagraphsSample)
  return { blocks, paragraphs }
}

export default createRoot(Store)