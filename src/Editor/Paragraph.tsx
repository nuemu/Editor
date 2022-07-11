import { Component, createEffect, createMemo, createSignal, For, Switch} from 'solid-js';
import { Dynamic, Match } from 'solid-js/web';

import BlocksStore from '../Store/Blocks'
import ParagraphStore from '../Store/Paragraphs';

const Blocks = import.meta.globEager('./Blocks/*/*Base.tsx');

const Paragraph: Component = () => {
  const { block_getters } = BlocksStore
  const { paragraph_getters } = ParagraphStore

  const [blocks, setBlocks] = createSignal(paragraph_getters('get')("01G5KAR1FY949SY0R2DV4RGR7M").blocks.map((id: string) => {return {id: id, type: block_getters('get')(id).config.type}}))

  createEffect(() => {
    const news = paragraph_getters('get')("01G5KAR1FY949SY0R2DV4RGR7M").blocks.map((id: string) => block_getters('get')(id).config.type)
    if(JSON.stringify(news) !== JSON.stringify(blocks().map((block: {id: string, type: string}) => block.type))){
      setBlocks(paragraph_getters('get')("01G5KAR1FY949SY0R2DV4RGR7M").blocks.map((id: string) => {return {id: id, type: block_getters('get')(id).config.type}}))
    }
  })

  // Should be more short & clear Code
  const types = createMemo(() => {
    var code = false
    var block_types: {id: string, type: string}[] = []
    var codetexts: {id: string, type: string}[] = []

    blocks().forEach((block: {id: string, type: string}, index: number) => {
      block_types.push(block)
      if(block.type === 'Code') code = !code
      if(code && block.type !== 'Code') codetexts.push({id: block.id, type: 'CodeText'})

      if(!code && codetexts.length !== 0){
        block_types.splice(index-codetexts.length, codetexts.length, ...codetexts)
        codetexts = []
      }
    })
    
    var collections: {id: string, type: string}[][] = []
    var codetexts: {id: string, type: string}[] = []
    var normals: {id: string, type: string}[] = []
    block_types.forEach((block: {id: string, type: string}) => {
      if(block.type === 'CodeText'){
        codetexts.push(block)
        if(normals.length > 0){
          collections.push(normals)
          normals = []
        }
      }
      else{
        normals.push(block)
        if(codetexts.length > 0){
          collections.push(codetexts)
          codetexts = []
        }
      }
    })

    if(normals.length > 0){
      collections.push(normals)
      normals = []
    }

    return collections
  })

  return (
    <For each={types()}>
      {(blocks: {id: string, type: string}[]) =>
        <Switch>
          <Match when={blocks[0].type !== 'CodeText'}>
            <For each={blocks}>
              {(block: {id: string, type: string}) => 
                <Dynamic component={Blocks['./Blocks/'+block.type+'/'+block.type+'Base.tsx'].default} id={block.id} paragraph_id={"01G5KAR1FY949SY0R2DV4RGR7M"}/>
              }
            </For>
          </Match>
          <Match when={blocks[0].type === 'CodeText'}>
            <pre><code>
            <For each={blocks}>
              {(block: {id: string, type: string}) => 
                <Dynamic component={Blocks['./Blocks/'+block.type+'/'+block.type+'Base.tsx'].default} id={block.id} paragraph_id={"01G5KAR1FY949SY0R2DV4RGR7M"}/>
              }
            </For>
            </code></pre>
          </Match>
        </Switch>
      }
    </For>
  )
}

export default Paragraph
