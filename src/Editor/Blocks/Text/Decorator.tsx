import { Component, createSignal } from "solid-js"
import Separator from "./Separator"

const styles: text_styles = {
  emphasis: {
    'font-weight': 'bolder',
    outline: 'none'
  },
  strikethrough: {
    'text-decoration': 'line-through'
  },
}

const Decorator: Component<TextBlockProps> = (props: TextBlockProps) => {

  return <span style={styles[props.node.type]}><Separator node={props.node} caret={props.caret} /></span>
}

export default Decorator