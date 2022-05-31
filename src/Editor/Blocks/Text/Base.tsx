import { Component, createEffect, createSignal, untrack } from 'solid-js';
import { createStore } from "solid-js/store";
import { Dynamic } from "solid-js/web"
import { inline_parser } from '../../../Components/lexer';

const components = import.meta.globEager('./Components/*.tsx')

const style: any = {
  outline: 'none',
  position: 'relative',
  zIndex: '1',
}

const TextBase: Component = () => {
  var [block, setBlock] = createStore({data: [
    {type: 'plain', content: 'PLAIN '},
    {type: 'bold', content: 'BOLD '},
    {type: 'equation', content: 'c=\\pm\\sqrt{a^2+b^2}'},
  ]})

  var [focus, setFocus] = createSignal(-1)

  var baseRef: HTMLDivElement|undefined = undefined
  let refs: HTMLSpanElement[] = []
  createEffect(() => {
    block.data
    untrack(() => {if(focus() >= 0 && focus()+1 < block.data.length) forceFocus(focus(), 1)})
  })

  const forceFocus = (current: number, next: number) => {
    refs[current+next].focus()
  }

  const handleInput = (e: InputEvent) => {
    const newBlock = JSON.parse(JSON.stringify(block.data))

    baseRef?.childNodes.forEach((node, index) => {
      const element = node as HTMLElement
      if(node.nodeType === 1){
        if(element.className === 'bold'){
          inline_parser(element.className, element.innerText).forEach(contents => {
            if(contents.type !== element.className) newBlock.splice(index, 1, ...inline_parser(element.className, element.innerText))
          })
        }
      }
      if(node.nodeType === 3){
        inline_parser('plain', element.nodeValue!).forEach(contents => {
          if(contents.type !== 'plain') newBlock.splice(index, 1,...inline_parser('plain', element.nodeValue!))
        })
      }
    })
    if(newBlock.length > block.data.length) setBlock('data', () => newBlock)
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    const newBlock = JSON.parse(JSON.stringify(block.data))

    const range = window.getSelection()?.getRangeAt(0)
    if(e.key == 'Backspace'){
      if(range?.startContainer.parentElement?.innerText.length === 1){
        baseRef?.childNodes.forEach((node, index) => {
          if(node === range?.startContainer.parentElement){
            newBlock.splice(index, 1)
            setBlock('data', () => newBlock)
          }
        })
      }
    }
  }

  return (
    <div
      ref={baseRef}
      style={style}
      class="text-block-base"
      contentEditable={true}
      onInput={(e) => handleInput(e)}
      onKeyDown={(e) => handleKeyDown(e)}
    >
      {block.data.map((data: {type:string, content:string}, index: number) => (
        <Dynamic
          component={components['./Components/'+data.type+'.tsx'].default}
          ref={refs[index]}
          setFocus={setFocus}
          forceFocus={forceFocus}
          index={index}
          block={block.data}
          setBlock={setBlock}
        />
      ))}
    </div>
  )
}

export default TextBase
