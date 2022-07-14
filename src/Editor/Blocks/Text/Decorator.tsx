import { Component, createEffect, createSignal } from "solid-js"
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
  const caret_inside = () => {
    return props.focusing && props.node.start! <= props.caret && props.node.end! >= props.caret
  }

  return <span style={styles[props.node.type]}><Separator node={props.node} caret={props.caret} focusing={props.focusing} caret_on={caret_inside()} /></span>
}

export default Decorator