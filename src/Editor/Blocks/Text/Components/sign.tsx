import { Component, createEffect, createSignal } from 'solid-js';

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

const Sign: Component<TextBlockProps> = (props: TextBlockProps) => {
  const {branch} = props

  const [visibility, setVisibility] = createSignal(style.visible)

  createEffect(() => {
    if(props.visible()) setVisibility(style.visible)
    else setVisibility(style.invisible)
  })

  return (
    <span
      ref={branch.ref}
      class="inline-sign"
      style={visibility()}
    >
      {branch.content}
    </span>)
}

export default Sign
