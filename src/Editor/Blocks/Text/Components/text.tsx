import { Component } from 'solid-js';

const Text: Component<TextBlockProps> = (props: TextBlockProps) => {
  return (
    <span
      ref={props.branch.ref}
      class="text"
      style={{outline: 'none'}}
    >
      {props.branch.content}
    </span>)
}

export default Text
