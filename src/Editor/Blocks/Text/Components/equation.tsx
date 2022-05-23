import { Component, createSignal, untrack } from 'solid-js';

const style = {
  outline: 'none',
}

const Equation: Component = () => {
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

export default Equation
