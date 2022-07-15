import { Component, createEffect, createMemo, createSignal, onMount, untrack, For } from 'solid-js';

import Store from '../../Store/Store'

import Systems from '../../Store/Systems'
import Nodes from './Nodes'


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
  const [innerText, setInnerText] = createSignal(block().data.text)
  const { caret, focus } = Systems

  const nodes = new Nodes(innerText(), 'js')

  let baseRef: HTMLSpanElement|undefined
  
  /******************** handle Something Methods ********************/
  
  const handleInput = () => {
    caret.preserveOffset(nodes.refs() as HTMLSpanElement[])
    nodes.set('js')
    caret.setPosition(nodes.innerText(), nodes.refs()as HTMLSpanElement[])
  }

  createEffect(() => {
    if(focus.now() === props.id){
      caret.setPosition(nodes.innerText(), nodes.refs() as HTMLSpanElement[])
    }
  })

  const handleKeyDown = (e: KeyboardEvent) => {
    if(e.key === 'Enter'){
    }

    if(e.key === 'Backspace'){
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
      focus.prev(props.id)
    }

    if(e.key === 'ArrowDown'){
      e.preventDefault()
      caret.preserveOffset(nodes.refs() as HTMLSpanElement[])
      focus.next(props.id)
    }
  }

  const handleClick = () => {
    caret.preserveOffset(nodes.refs() as HTMLSpanElement[])
    focus.set(props.id)
  }
  
  return (
    <div
      contentEditable
      class="code-block-textarea"
      style={style.textarea}
      onInput={() => handleInput()}
      onKeyDown={(e) => handleKeyDown(e)}
      onClick={() => handleClick()}
    >
      <For each={nodes.list().children}>{node => <span ref={node.ref} style={{'color': node.color, 'background-color': nodes.list().color}}>{node.content}</span>}</For>
    </div>
  )
}

export default Base