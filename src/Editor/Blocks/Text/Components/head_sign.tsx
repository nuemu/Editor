import { Component, createEffect, createSignal, onMount } from 'solid-js';

const style = {
  visible: {
    "color": "grey",
    "display": "inline-block",
  },
  invisible: {
    "color": "grey",
    "display": "inline-block",
    height: '0px',
    width: '0px',
    opacity: 0,
    overflow: 'hidden'
  }
}

const HeadSign: Component<TextBlockProps> = (props: TextBlockProps) => {
  const {branch} = props

  const [visibility, setVisibility] = createSignal(style.visible)

  createEffect(() => {
    if(props.caret() <= branch.content.length) setVisibility(style.visible)
    else setVisibility(style.invisible)
    if(!props.focus){
      setVisibility(style.invisible)
    }
  })

  return <pre style={{display: 'inline-block', margin: '0'}}><span
      ref={branch.ref}
      class="head-sign"
      style={visibility()}
      innerHTML={branch.content}
    /></pre>
}

export default HeadSign
