import { Component, createSignal, createEffect } from 'solid-js';
import katex from 'katex'
import 'katex/dist/katex.min.css';

const Equation: Component = (props: any) => {
  const {ref, setFocus, forceFocus, index, block, setBlock} = props
  const [equation, setEquation] = createSignal(block[index].content)
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

    if(element.innerText === '') forceFocus(index, -1)
  }

  const handleFocus = () => {
    setFocus(index)
    setDisplay('inline')
  }

  const handleBlur = (e: FocusEvent) => {
    var element =  e.target as HTMLElement
    const newBlock = JSON.parse(JSON.stringify(block))
    if(element.innerText === ''){
      newBlock.splice(index, 1)
      setBlock('data', () => newBlock)
    }
  }

  return (
    <span
      class="equation"
      ref={ref}
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
        innerText={block[index].content}
        onInput={(e: InputEvent) => handleInput(e)}
        onBlur={(e) => {setDisplay('none'); handleBlur(e)}}
      />
    </span>
  )
}

export default Equation
