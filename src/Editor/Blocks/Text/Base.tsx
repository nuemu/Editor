import { Component, createEffect, createSignal } from 'solid-js';
import { lexer } from '../../../Components/lexer';

const style = {
  outline: 'none',
}

const TextBase: Component = () => {
  var [text, setText] = createSignal("sample")

  const textRef = JSON.parse(JSON.stringify(text()))

  const handleInput = (e: InputEvent) => {
    var element =  e.target as HTMLElement
    lexer(element.innerText)
    setText(element.innerText)
  }

  return (
    <div
      contentEditable={true}
      style={style}
      onInput={(e) => {handleInput(e)}}
    >
      {<div>{textRef}</div>}
    </div>
  )
}

export default TextBase
