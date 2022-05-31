import { Component, mergeProps } from 'solid-js';

import { inline_parser } from '../../../../Components/lexer';

const style = {
  outline: 'none',
}

const Bold: Component = (props: any) => {
  const {ref, setFocus, forceFocus, index, block, setBlock} = props
  const handleInput = (e: InputEvent) => {
    var element =  e.target as HTMLElement
    const newBlockElements = inline_parser(element.innerText)
    const newBlock = JSON.parse(JSON.stringify(block))
    newBlockElements.forEach(element => {
      if(element.type !== 'plain'){
        newBlock.splice(index, 1, ...newBlockElements)
        setBlock('data', () => newBlock)
      }
    })
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
  }

  return (
    <span
      ref={ref}
      contentEditable={true}
      style={style}
      onInput={(e) => {handleInput(e)}}
      innerHTML={'<span><strong>'+block[index].content+'</strong></span>'}
      tabIndex={0}
      onFocus={() => {setFocus(index)}}
      onBlur={(e: FocusEvent) => {handleBlur(e)}}
      onKeyDown={(e) => handleKeyDown(e)}
    />
  )
}

export default Bold
