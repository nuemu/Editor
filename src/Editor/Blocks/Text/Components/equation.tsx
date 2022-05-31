import { Component, createSignal, untrack } from 'solid-js';
import katex from 'katex'
import 'katex/dist/katex.min.css';

const style = {
  outline: 'none',
}

const Equation: Component = () => {
  const katexRender = () => {
    return katex.renderToString("c = \\pm\\sqrt{a^2 + b^2}", {
      throwOnError: false
    });
  }

  return (
    <span
      innerHTML={katexRender()}
    />
  )
}

export default Equation
