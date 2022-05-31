import { Component, mergeProps } from 'solid-js';

import { inline_parser } from '../../../../Components/lexer';

const style = {
  outline: 'none',
}

const Plain: Component = (props: any) => {
  const {index, block, setBlock} = props
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

  return (
    <span
      contentEditable={true}
      style={style}
      onInput={(e) => {handleInput(e)}}
      innerHTML={'<span>'+block[index].content+'</span>'}
    />
  )
}

export default Plain
