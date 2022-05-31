import { Component, createSignal, createEffect } from 'solid-js';
import katex from 'katex'
import 'katex/dist/katex.min.css';

const Equation: Component = (props: any) => {
  const {ref, setFocus, forceFocus, index, block, setBlock} = props
  const [equation, setEquation] = createSignal(block[index].content)
  const [display, setDisplay] = createSignal('none')

  let inputArea: HTMLSpanElement

  createEffect(() => {
    display()
    inputArea.focus()
  })

  const equationBlock:any = {
    position: 'relative',
    display: 'inline-block'
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
    setFocus(index)
    setDisplay('block')
  }

  const handleBlur = (e: FocusEvent) => {
    var element =  e.target as HTMLElement
    const newBlock = JSON.parse(JSON.stringify(block))
    if(element.innerText === ''){
      newBlock.splice(index, 1)
      setBlock('data', () => newBlock)
    }
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    const range = window.getSelection()?.getRangeAt(0)
    const length = range!.endContainer.nodeValue!.length
    const carretPos = range?.endOffset

    if(e.key === 'ArrowRight'){
      if(length === carretPos && block.length-1 > index){
        forceFocus(index+1)
      }
    }

    if(e.key === 'ArrowLeft'){
      if(carretPos === 0 && index !== 0){
        forceFocus(index-1)
      }
    }

    if(e.key === 'Enter'){
      inputArea.blur()
    }
  }

  return (
    <span
      ref={ref}
      style={equationBlock}
      tabIndex={0}
      onFocus={() => handleFocus()}
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
        onKeyDown={(e) => handleKeyDown(e)}
      />
    </span>
  )
}

export default Equation
