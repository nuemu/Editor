import { Component, createEffect, createSignal } from "solid-js"

import Text from "../Text/TextBase"
import Systems from '../../../Store/System'

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
  const { system_getters } = Systems
  const [view, setView] = createSignal(style.visible)

  createEffect(() => {
    if(system_getters('focus')() === props.id) setView(style.visible)
    else setView(style.invisible)
  })
  
  return <div class="code-block-base" style={view()}><Text id={props.id} paragraph_id={props.paragraph_id}/></div>
}

export default Code