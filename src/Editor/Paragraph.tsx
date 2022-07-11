import { Component, createEffect, createMemo, For, Show } from 'solid-js';

import BlockBase from './Blocks/BlockBase'
import BlocksStore from '../Store/Blocks'
import ParagraphStore from '../Store/Paragraphs';

const Paragraph: Component = () => {
  const { block_getters } = BlocksStore
  const { paragraph_getters } = ParagraphStore
  const paragraph = createMemo(() => paragraph_getters('get')("01G5KAR1FY949SY0R2DV4RGR7M"))

  const paragraphRefs: (HTMLDivElement | undefined)[] = []

  
  createEffect(() => {
    const block_types = paragraph().blocks.map((id: string) => block_getters('get')(id).config.type)
    console.log(block_types)
  })
  
  return (
    <For each={paragraph().blocks}>{(id: string) =>
      <Show when={block_getters('get')(id).config.type !== 'Code'}>
        <BlockBase id={id} paragraph_id={"01G5KAR1FY949SY0R2DV4RGR7M"}/>
      </Show>}
    </For>
  )
}

export default Paragraph
