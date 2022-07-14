import { Component, createEffect } from "solid-js"

const styles: text_styles = {
  sign: {
    "display": "inline-block",
    "color": "grey",
  },
  head_sign: {
    "color": "grey",
  }
}

const Textarea: Component<TextBlockProps> = (props: TextBlockProps) => {
  return <span style={styles[props.node.type]} ref={props.node.ref}>{props.node.content}</span>
}

export default Textarea