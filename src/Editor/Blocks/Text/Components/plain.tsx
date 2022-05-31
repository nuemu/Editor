import { Component, createSignal } from 'solid-js';

const style = {
  outline: 'none',
}

const Plain: Component = (props) => {
  const handleInput = (e: InputEvent) => {
    var element =  e.target as HTMLElement
  }

  return (
    <span
      contentEditable={true}
      style={style}
      onInput={(e) => {handleInput(e)}}
    >
      {<span>aaaa</span>}
    </span>
  )
}

export default Plain
