import { Component, createEffect, createMemo, onMount, untrack } from 'solid-js';

import Store from '../../Store/Store';

import Nodes from './Nodes'
import Systems from '../../Store/Systems'
import Separator from './Separator';

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
  const node = new Nodes(block().data.text)
  const { caret, focus } = Systems

  /******************** handle Something Methods ********************/

  const handleInput = () => {
    caret.preserveOffset(node.list() as HTMLSpanElement[])
    node.set() // Update
    caret.setPosition(node.innerText(), node.list() as HTMLSpanElement[])
  }

  createEffect(() => {
    if(focus.now() === props.id){
      caret.setPosition(node.innerText(), node.list() as HTMLSpanElement[])
    }
  })

  const handleKeyDown = (e: KeyboardEvent) => {
    if(e.key === 'Enter'){
      e.preventDefault()
      const text = node.innerText().substring(0, caret.offset())
      const next = node.innerText().substring(caret.offset())
    }

    if(e.key === 'Backspace'){
      if(node.innerText().length <= 1){
        e.preventDefault()
      }
    }
        
    if(e.key === 'ArrowLeft'){
      e.preventDefault()
      if(caret.offset() > 0) caret.preserveOffset(node.list() as HTMLSpanElement[], -1)
    }

    if(e.key === 'ArrowRight'){
      e.preventDefault()
      if(caret.offset() < node.innerText().length) caret.preserveOffset(node.list() as HTMLSpanElement[], 1)
    }

    if(e.key === 'ArrowUp'){
      e.preventDefault()
      caret.preserveOffset(node.list() as HTMLSpanElement[])
      focus.prev(props.id)
    }

    if(e.key === 'ArrowDown'){
      e.preventDefault()
      caret.preserveOffset(node.list() as HTMLSpanElement[])
      focus.next(props.id)
    }
  }

  const handleClick = () => {
    caret.preserveOffset(node.list() as HTMLSpanElement[])
    focus.set(props.id)
  }

  return (
    <div
      contentEditable
      class="text-block-textarea"
      style={style.textarea}
      onInput={() => handleInput()}
      onKeyDown={(e) => handleKeyDown(e)}
      onClick={() => handleClick()}
    >
      <Separator node={node.tree()} caret={caret.offset()} focusing={focus.now()===props.id} />
    </div>
  )
}

export default Base