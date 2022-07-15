import { Component, createEffect, createMemo, createSignal, onMount, untrack, For } from 'solid-js';

import Store from '../../Store/Store'
import Systems from '../../Store/Systems'

import Nodes from './Nodes'
import highlighter from '../../Utils/Highlighter'
import { ulid } from 'ulid';

const style: text_styles = {
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

const Base: Component<BlockBaseProps> = (props: BlockBaseProps) => {
  const { blocks, paragraphs } = Store
  const block = createMemo(() => blocks.get(props.id)!)
  const { caret, focus } = Systems

  const nodes = new Nodes(block().data.text, 'js')

  let ref: HTMLDivElement|undefined
  
  /******************** handle Something Methods ********************/
  
  const handleInput = () => {
    caret.preserveOffset(nodes.refs() as HTMLSpanElement[])
    nodes.set('js')
    caret.setPosition(nodes.innerText(), nodes.refs()as HTMLSpanElement[])

    if(nodes.innerText().length === 0){
      caret.force(1)
      nodes.set('js', ref!.innerText)
      Array.from(ref!.childNodes).forEach(node => {
        if(node.nodeName === '#text') ref!.removeChild(node)
        if(node.nodeName === 'BR') ref!.removeChild(node)
      })
    }
  }

  createEffect(() => {
    if(focus.now() === props.id){
      caret.setPosition(nodes.innerText(), nodes.refs() as HTMLSpanElement[])
    }
  })

  const handleKeyDown = (e: KeyboardEvent) => {
    if(e.key === 'Enter'){
      e.preventDefault()
      const text = nodes.innerText().substring(0, caret.offset())
      const text_next = nodes.innerText().substring(caret.offset())
      blocks.update_data(props.id, {text: text})
      const id = ulid()
      blocks.add(id, 'Text', text_next)
      paragraphs.addBlock(props.paragraph_id, props.id, id)
      caret.force(0)
      focus.next()
    }

    if(e.key === 'Backspace'){
      if(nodes.innerText().length === 0){
        console.log("remove")
      }
    }
        
    if(e.key === 'ArrowLeft'){
      e.preventDefault()
      if(caret.offset() > 0) caret.preserveOffset(nodes.refs() as HTMLSpanElement[], -1)
    }

    if(e.key === 'ArrowRight'){
      e.preventDefault()
      if(caret.offset() < nodes.innerText().length) caret.preserveOffset(nodes.refs() as HTMLSpanElement[], 1)
    }

    if(e.key === 'ArrowUp'){
      e.preventDefault()
      caret.preserveOffset(nodes.refs() as HTMLSpanElement[])
      focus.prev()
    }

    if(e.key === 'ArrowDown'){
      e.preventDefault()
      caret.preserveOffset(nodes.refs() as HTMLSpanElement[])
      focus.next()
    }
  }

  const handleClick = () => {
    caret.preserveOffset(nodes.refs() as HTMLSpanElement[])
    focus.set(props.id)
  }
  
  return (
    <div
      contentEditable
      ref={ref}
      class="code-block-textarea"
      style={Object.assign(style.textarea, {'background-color': nodes.list().color})}
      onInput={() => handleInput()}
      onKeyDown={(e) => handleKeyDown(e)}
      onClick={() => handleClick()}
    >
      <For each={nodes.list().children}>{node => <span ref={node.ref} style={{'color': node.color}}>{node.content}</span>}</For>
    </div>
  )
}

export default Base