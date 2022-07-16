import { Component, createEffect, createMemo, untrack, For } from 'solid-js';

import Store from '../../Store/Store'

import TextBase from '../Utils/TextBase'

import Nodes from './Nodes'
import highlighter from '../../Utils/Highlighter'

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

const CodeComponent: Component<{node: any}> = (props: {node: any}) => {
  return (
    <div style={{'background-color': props.node.tree().color}}>
      <For each={props.node.tree().children}>{(node: any) => <span ref={node.ref} style={{'color': node.color}}>{node.content}</span>}</For>
    </div>
  )
}

const Base: Component<BlockBaseProps> = (props: BlockBaseProps) => {
  const { blocks } = Store
  const block = createMemo(() => blocks.get(props.id)!)
  const code = createMemo(() => 'js')

  const node = new Nodes(block().data.text, code())

  createEffect(() => {
    if(!highlighter.loading) untrack(() => node.set())
  })
  
  return (
    <TextBase id={props.id} paragraph_id={props.paragraph_id} node={node} component={CodeComponent} />
  )
}

export default Base