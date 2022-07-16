import { Component, createEffect, createMemo, createSignal, For, Switch} from 'solid-js';
import { Dynamic, Match } from 'solid-js/web';

import Store from './Store/Store'

const Blocks = import.meta.globEager('./Blocks/*/*Base.tsx');

const Paragraph: Component = () => {
  const { blocks, paragraphs } = Store

  const [blocks_in_paragraph, setBlocks] = createSignal(paragraphs.get("01G5KAR1FY949SY0R2DV4RGR7M")!.blocks.map((id: string) => {return {id: id, type: blocks.get(id)!.config.type}}))

  createEffect(() => {
    const news = paragraphs.get("01G5KAR1FY949SY0R2DV4RGR7M")!.blocks.map((id: string) => blocks.get(id)!.config.type)
    if(JSON.stringify(news) !== JSON.stringify(blocks_in_paragraph().map((block: {id: string, type: string}) => block.type))){
      setBlocks(paragraphs.get("01G5KAR1FY949SY0R2DV4RGR7M")!.blocks.map((id: string) => {return {id: id, type: blocks.get(id)!.config.type}}))
    }
  })

  // Should be more short & clear Code
  const types = createMemo(() => {
    var code = false
    var block_types: {id: string, type: string}[] = []
    var codetexts: {id: string, type: string}[] = []

    blocks_in_paragraph().forEach((block: {id: string, type: string}, index: number) => {
      block_types.push(block)
      if(block.type === 'Code') code = !code
      if(code && block.type !== 'Code') codetexts.push({id: block.id, type: 'CodeText'})

      if(!code && codetexts.length !== 0){
        block_types.splice(index-codetexts.length, codetexts.length, ...codetexts)
        codetexts = []
      }
    })

    return block_types
  })

  return (
    <For each={types()}>
      {(block: {id: string, type: string}) =>
        <Dynamic component={Blocks['./Blocks/'+block.type+'/Base.tsx'].default} id={block.id} paragraph_id={"01G5KAR1FY949SY0R2DV4RGR7M"}/>
      }
    </For>
  )
}

export default Paragraph
