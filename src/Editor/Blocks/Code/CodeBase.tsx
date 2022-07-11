import { Component } from "solid-js"

const Code: Component = () => {
  
  return <pre
    class="code-block-base"
    contentEditable
    style={{outline: 'none'}}
    innerHTML={'<code>'+'sample'+'</code>'}
  />
}

export default Code