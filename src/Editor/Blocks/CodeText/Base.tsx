import { Component, createEffect, createMemo, untrack, For } from 'solid-js';

import Store from '../../Store/Store'

import TextBase from '../Utils/TextBase'

import Nodes from './Nodes'
import highlighter from '../../Utils/Highlighter'
import Systems from '../../Store/Systems';

const Base: Component<BlockBaseProps> = (props: BlockBaseProps) => {
  const { blocks } = Store
  const { caret } = Systems
  const block = createMemo(() => blocks.get(props.id)!)
  const code = createMemo(() => 'js')

  const node = new Nodes(block().data.text, code())

  createEffect(() => {
    if(!highlighter.loading) untrack(() => {
      caret.preserveOffset(node.refs() as HTMLSpanElement[])
      node.set()
      caret.setPosition(node.innerText(), node.refs() as HTMLSpanElement[])
    })
  })
  
  return (
    <TextBase id={props.id} paragraph_id={props.paragraph_id} node={node} component={'Code'} style={{'background-color': node.tree().color, outline: 'none'}}/>
  )
}

export default Base