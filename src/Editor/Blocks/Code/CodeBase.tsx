import { Component, createEffect, createMemo, createResource, createSignal } from "solid-js"

import * as shiki from 'shiki'
shiki.setCDN("/node_modules/shiki/");

const generateHighlighter = async () => {
  return await shiki.getHighlighter({
    theme: 'nord'
  })
}

const Code: Component = () => {
  const [code, setCode] = createSignal(`console.log('shiki');  // Code Block In Progress`)
  const [highlight, setHighlight]= createSignal('')
  const [highlighter, {mutate, refetch}] = createResource(generateHighlighter)
  const [caret, setCaret] = createSignal(0)
  const [inputiing, setInputting] = createSignal(false)

  var codeRef: HTMLDivElement | undefined

  createEffect(() => {
    if(!highlighter.loading) setHighlight(highlighter()!.codeToHtml(code(), { lang: 'js' }))
  })

  const getCaretPosition = () => {
    const selection = window.getSelection()
    const currentElement = selection?.anchorNode?.parentElement!
    const collection = codeRef?.getElementsByTagName('code').item(0)?.children!
    var position = 0
    Array.from(collection).forEach(child => {
      if(child.contains(currentElement)){
        for(const grand_child of Array.from(child.children)){
          if(grand_child.contains(currentElement)){
            position += selection!.anchorOffset
            break;
          }
          else position += (grand_child as HTMLSpanElement).innerText.length
        }
      }
      else position += (child as HTMLSpanElement).innerText.length
    })
    return position
  }

  const getNodeCaretOn = () => {
    const collection = codeRef?.getElementsByTagName('code').item(0)?.children!
    var lengthSum = 0
    var previousLengthSum = 0
    var node: Node | undefined
    Array.from(collection).forEach(child => {
      if(lengthSum <= caret()){
        for(const grand_child of Array.from(child.children)){
          lengthSum += (grand_child as HTMLSpanElement).innerText.length
          if(lengthSum >= caret()){
            node = (grand_child as HTMLSpanElement).childNodes[0]
            break;
          }
          previousLengthSum += (grand_child as HTMLSpanElement).innerText.length
        }
      }
      lengthSum += 1 // \n
    })

    return node
  }

  const getCaretPositionOnNode = () => {
    const collection = codeRef?.getElementsByTagName('code').item(0)?.children!
    var lengthSum = 0
    var previousLengthSum = 0
    var position = 0
    for(const child of collection){
      if(lengthSum <= caret()){
        for(const grand_child of Array.from(child.children)){
          lengthSum += (grand_child as HTMLSpanElement).innerText.length
          if(lengthSum >= caret()){
            position = caret() - previousLengthSum
            break;
          }
          previousLengthSum += (grand_child as HTMLSpanElement).innerText.length
        }
      }
    }

    return position
  }

  const setCaretNumber = () => {
    setCaret(getCaretPosition())
  }

  const setCaretPosition = () => {
    const range = document.createRange()
    range.setStart(getNodeCaretOn()!, getCaretPositionOnNode())
    range.collapse(true)
    const selection = window.getSelection()
    selection!.removeAllRanges()
    selection!.addRange(range)
  }

  const handleInput = () => {
    if(!inputiing()){
      setCaretNumber()
      setCode(codeRef?.innerText!)
      setCaretPosition()
    }
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    /*if(e.key === 'Enter' && !inputiing()){
      //e.preventDefault()
      setCode(codeRef!.innerText)
    }*/
  }
  
  return <div
    class="code-block-base"
    ref={codeRef}
    contentEditable
    style={{outline: 'none'}}
    onInput={() => handleInput()}
    onCompositionStart={() => setInputting(true)}
    onCompositionEnd={() => setInputting(false)}
    onKeyDown={(e) => handleKeyDown(e)}
    innerHTML={highlight()}
  />
}

export default Code