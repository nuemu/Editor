import { Component, createSignal, createMemo, onMount, Show, createEffect, untrack } from 'solid-js';
import { Dynamic } from "solid-js/web"
import { ulid } from 'ulid';
import { checkHeadOfSentence, Lexer, removeHeadOfSentence, reverseLexer } from '../../../Components/Lexer';

const components = import.meta.globEager('./Components/textarea/*.tsx')

import BlocksStore from '../../../Store/Blocks'
import ParagraphStore from '../../../Store/Paragraphs'
import SystemStore from '../../../Store/System'

const style: any = {
  base:{
    width: '100%',
    display: 'flex',
  },
  textarea:{
    width: '100%',
    outline: 'none',
    position: 'relative',
    zIndex: '1',
  }
}

const TextBase: Component<{id: string}> = (props: {id: string}) => {
  const { block_getters, block_mutations } = BlocksStore
  const { paragraph_getters, paragraph_mutations } = ParagraphStore
  const { system_getters, system_mutations } = SystemStore
  const block = createMemo(() => block_getters('get')(props.id))
  const [text, setText] = createSignal(block().data.text)
  const [indent, setIndent] = createSignal(block().config.indent)
  const tree = createMemo(() => Lexer({type: 'root', content: text(), children: []}))

  var baseRef: HTMLDivElement|undefined = undefined

  onMount(() => {
    baseRef?.focus()
  })

  createEffect(() => {
    system_getters('focus')();
    untrack(() => setText(block_getters('get')(props.id).data.text));
  })

  const handleInput = () => {
    const key = checkHeadOfSentence(baseRef!.innerText)
    if(key){
      const newBlock = JSON.parse(JSON.stringify(block_getters('get')(props.id)))
      newBlock.config.type = key
      newBlock.data.text = removeHeadOfSentence(baseRef!.innerText, key)
      block_mutations('patch')(props.id, newBlock)
    }
    else{
      block_mutations('patchData')(props.id, {text: baseRef!.innerText})
    }
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if(e.key === 'Tab' && !e.shiftKey){
      e.preventDefault()
      setIndent(indent()+1)
    }

    if(e.key === 'Tab' && e.shiftKey){
      e.preventDefault()
      if(indent() > 0) setIndent(indent()-1)
    }

    if(e.key === 'Enter'){
      e.preventDefault()
      const id = ulid()
      block_mutations('add')(id, 'Text')
      paragraph_mutations('add')("01G5KAR1FY949SY0R2DV4RGR7M", props.id, id)
    }
  }

  return (
    <div class="text-block-base" style={style.base}>
      <div style={{'margin-left': 3*indent()+'%'}}/>
      <Show when={system_getters('focus')() === props.id} fallback={
        <Show when={text() !== ''} fallback={
          <div
            class="text-block-view"
            style={{width: '100%'}}
            onMouseOver={() => system_mutations('patchFocus')(props.id)}
          >
            &nbsp;
          </div>
        }>
        <div
          class="text-block-view"
          style={{width: '100%'}}
          onMouseOver={() => system_mutations('patchFocus')(props.id)}
        >
          {tree().children.map((branch: {type:string, content:string, children: any[]}, index: number) => (
            <Dynamic
              component={components['./Components/textarea/'+branch.type+'.tsx'].default}
              branch={branch}
            />
          ))}
        </div>
        </Show>
      }>
        <div
          class="text-block-textarea"
          ref={baseRef}
          style={style.textarea}
          contentEditable={true}
          onInput={() => handleInput()}
          onKeyDown={(e) => handleKeyDown(e)}
          innerText={text()}
        />
      </Show>
    </div>
  )
}

export default TextBase
