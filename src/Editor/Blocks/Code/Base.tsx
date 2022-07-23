import { Component, createEffect, createSignal, createMemo } from "solid-js"

import TextBase from "../Utils/TextBase"
import Systems from '../../Store/Systems'

import Store from '../../Store/Store'
import Node from './Nodes'

const style = {
  visible: {
  },
  invisible: {
    position: 'absolute',
    height: '0px',
    widht: '0px',
  }
}

const Code: Component<BlockBaseProps> = (props: BlockBaseProps) => {
  const { focus } = Systems
  const [view, setView] = createSignal(style.visible)
  const { blocks } = Store
  const block = createMemo(() => blocks.get(props.id)!)

  const node = new Node(block().data.text)

  createEffect(() => {
    //if(focus.now() === props.id) setView(style.visible)
    //else setView(style.invisible)
  })
  
  return <div class="code-block-base" style={view()}><TextBase id={props.id} paragraph_id={props.paragraph_id} node={node} component={'Code'}/></div>
}

export default Code