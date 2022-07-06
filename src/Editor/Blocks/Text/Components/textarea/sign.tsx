import { Component } from 'solid-js';

const Sign: Component = (props: any) => {
  const {branch} = props

  return (
    <span
      ref={branch.ref}
      class="inline-sign"
      style={{"color": "grey", "display": "inline-block"}}
    >
      {branch.content}
    </span>)
}

export default Sign
