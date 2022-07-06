import { Component } from 'solid-js';

const Text: Component = (props: any) => {
  const {branch} = props

  return (
    <span
      ref={branch.ref}
      class="text"
      style={{outline: 'none'}}
    >
      {branch.content}
    </span>)
}

export default Text
