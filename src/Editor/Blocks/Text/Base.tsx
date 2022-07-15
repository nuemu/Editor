import { Component, createEffect, createMemo, onMount, untrack } from 'solid-js';

import Store from '../../Store/Store';

import Nodes from './Nodes'
import Systems from '../../Store/Systems'
import Separator from './Separator';
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
  const node = new Nodes(block().data.text)
  const { caret, focus } = Systems

  let ref: HTMLDivElement|undefined

  /******************** handle Something Methods ********************/

  const handleInput = () => {
    caret.preserveOffset(node.list() as HTMLSpanElement[])
    node.set() // Update
    caret.setPosition(node.innerText(), node.list() as HTMLSpanElement[])

    if(node.innerText().length === 0){
      caret.force(1)
      node.set(ref!.innerText)
      Array.from(ref!.childNodes).forEach(node => {
        if(node.nodeName === '#text') ref!.removeChild(node)
        if(node.nodeName === 'BR') ref!.removeChild(node)
      })
    }
  }

  createEffect(() => {
    if(focus.now() === props.id){
      if(caret.offset() > node.innerText().length) caret.force(node.innerText().length)
      caret.setPosition(node.innerText(), node.list() as HTMLSpanElement[])
    }
  })

  createEffect(() => {
    node.tree()
    Array.from(ref!.childNodes).forEach(node => {
      if(node.nodeName === '#text') ref!.removeChild(node)
      if(node.nodeName === 'BR') ref!.removeChild(node)
    })
  })

  const handleKeyDown = (e: KeyboardEvent) => {
    if(e.key === 'Enter'){
      e.preventDefault()
      const text = node.innerText().substring(0, caret.offset())
      const text_next = node.innerText().substring(caret.offset())
      blocks.update_data(props.id, {text: text})
      const id = ulid()
      blocks.add(id, 'Text', text_next)
      paragraphs.addBlock(props.paragraph_id, props.id, id)
      caret.force(0)
      focus.next()
    }

    if(e.key === 'Backspace'){
      if(caret.offset() === 0){
        e.preventDefault()
        const prevId = paragraphs.prev_block(props.id)
        blocks.update_data(prevId, {text: blocks.get(prevId)?.data.text+node.innerText()})
        caret.force(blocks.get(prevId)?.data.text.length)
        focus.prev()
        paragraphs.removeBlock(props.paragraph_id, props.id)
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
      focus.prev()
    }

    if(e.key === 'ArrowDown'){
      e.preventDefault()
      caret.preserveOffset(node.list() as HTMLSpanElement[])
      focus.next()
    }
  }

  const handleClick = () => {
    caret.preserveOffset(node.list() as HTMLSpanElement[])
    focus.set(props.id)
  }

  return (
    <div
      contentEditable
      ref={ref}
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