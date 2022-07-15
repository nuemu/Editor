import { Component } from "solid-js"

const styles: text_styles = {
  sign: {
    "display": "inline-block",
    "color": "grey",
  },
  head_sign: {
    "color": "grey",
  },
  invisible: {
    'display': 'inline',
    "position": "absolute",
    "height": "0px",
    "width": "0px",
    "opacity": 0,
  },
  pre: {
    'display': 'inline',
    'font-family': 'sans-serif',
    'white-space': 'pre-wrap'
  }
}

const Textarea: Component<TextBlockProps> = (props: TextBlockProps) => {
  const caret_inside = () => {
    return props.focusing && props.node.start! <= props.caret && props.node.end! >= props.caret
  }

  const text_style = () => {
    return (!props.caret_on && !caret_inside()) && props.node.type !== 'text' ? 'invisible' : props.node.type
  }

  return <pre style={styles.pre}><span style={styles[text_style()]} ref={props.node.ref}>{props.node.content}</span></pre>
}

export default Textarea