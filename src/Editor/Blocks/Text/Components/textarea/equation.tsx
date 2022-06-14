import { Component, createSignal, createEffect } from 'solid-js';
import katex from 'katex'
import 'katex/dist/katex.min.css';

const Equation: Component = (props: any) => {
  const {branch} = props
  const [equation, setEquation] = createSignal(branch.content)
  const [display, setDisplay] = createSignal('none')

  let inputArea: HTMLSpanElement|undefined = undefined;

  createEffect(() => {
    display()
    inputArea!.focus()
  })

  const equationBlock:any = {
    position: 'relative',
  }

  const equationInputStyle:any = () => {return{
    position: 'absolute',
    outline: 'none',
    top: '16pt',
    left: '0',
    display: display(),
  }}

  const katexRender = () => {
    return katex.renderToString(equation(), {
      throwOnError: false
    });
  }

  const handleInput = (e: InputEvent) => {
    const element = e.target as HTMLElement
    setEquation(element.innerText)
  }

  const handleFocus = () => {
    setDisplay('inline')
  }

  return (
    <span
      class="equation"
      style={equationBlock}
      tabIndex={0}
      onFocus={() => handleFocus()}
      contentEditable={false}
    >
      <span
        innerHTML={katexRender()}
      />
      <span
        ref={inputArea}
        contentEditable={true}
        style={equationInputStyle()}
        innerText={branch.content}
        onInput={(e: InputEvent) => handleInput(e)}
        onBlur={(e) => {setDisplay('none')}}
      />
    </span>
  )
}

export default Equation
