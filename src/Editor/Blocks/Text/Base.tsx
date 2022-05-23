import { Component, createSignal } from 'solid-js';

const style = {
  outline: 'none',
}

const TextBase: Component = () => {
  var [text, setText] = createSignal("sample")

  const handleInput = (e: InputEvent) => {
    var element =  e.target as HTMLElement
    setText(element.innerText)
  }

  return (
    <div
      contentEditable={true}
      style={style}
      onInput={(e) => {handleInput(e)}}
    >
      {<div>{text}</div>}
    </div>
  )
}

export default TextBase
