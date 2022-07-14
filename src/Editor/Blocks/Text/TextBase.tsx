import { Component, createEffect, createMemo, onMount, untrack } from 'solid-js';

import BlocksStore from '../../../Store/Blocks'

import Nodes from './Nodes'
import Systems from '../../../Store/Systems'
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

const TextBase: Component<BlockBaseProps> = (props: BlockBaseProps) => {
  const { block_getters } = BlocksStore
  const block = createMemo(() => block_getters('get')(props.id))
  const node = new Nodes(block().data.text)
  const { caret, focus } = Systems

  /******************** handle Something Methods ********************/

  const handleInput = () => {
    caret.preserveOffset(node.list() as HTMLSpanElement[])
    node.set() // Update
    caret.setPosition(node.innerText(), node.list() as HTMLSpanElement[])
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if(e.key === 'Enter'){
    }

    if(e.key === 'Backspace'){
    }
        
    if(e.key === 'ArrowLeft'){
    }

    if(e.key === 'ArrowRight'){
    }

    if(e.key === 'ArrowUp'){
      e.preventDefault()
    }

    if(e.key === 'ArrowDown'){
      e.preventDefault()
    }
  }

  const handleClick = () => {
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
      <Separator node={node.tree()} caret={caret.offset()} />
    </div>
  )
}

export default TextBase