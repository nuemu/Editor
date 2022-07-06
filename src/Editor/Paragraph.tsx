import { Component, createMemo, For } from 'solid-js';

import BlockBase from './Blocks/BlockBase'
import ParagraphStore from '../Store/Paragraphs';

const Paragraph: Component = () => {
  const { paragraph_getters } = ParagraphStore
  const paragraph = createMemo(() => paragraph_getters('get')("01G5KAR1FY949SY0R2DV4RGR7M"))

  const paragraphRefs: (HTMLDivElement | undefined)[] = []
  
  return (
    <For each={paragraph().blocks}>{(id: string, index) =>
      <BlockBase id={id} />}
    </For>
  )
}

export default Paragraph
