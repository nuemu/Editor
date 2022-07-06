import { Component } from 'solid-js';

const Text: Component<TextBlockProps> = (props: TextBlockProps) => {
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
