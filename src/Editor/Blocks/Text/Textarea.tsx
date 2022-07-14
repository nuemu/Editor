import { Component, createEffect } from "solid-js"
import { style } from "solid-js/web"

const styles: text_styles = {
  sign: {
    "display": "inline-block",
    "color": "grey",
  },
  head_sign: {
    "color": "grey",
  },
  invisible: {
    "position": "absolute",
    "height": "0px",
    "width": "0px",
    "opacity": 0,
  }
}

const Textarea: Component<TextBlockProps> = (props: TextBlockProps) => {
  const caret_inside = () => {
    return props.focusing && props.node.start! <= props.caret && props.node.end! >= props.caret
  }

  const styleSeparator = () => {
    return (!props.caret_on && !caret_inside()) && props.node.type !== 'text' ? 'invisible' : props.node.type
  }
  return <span style={styles[styleSeparator()]} ref={props.node.ref}>{props.node.content}</span>
}

export default Textarea