import { Component, createSignal, createMemo, onMount, Show, createEffect, untrack, For } from 'solid-js';
import { Dynamic } from "solid-js/web"
import { ulid } from 'ulid';
import { Lexer } from '../../../Components/Lexer';

const components = import.meta.globEager('./Components/textarea/*.tsx')

import BlocksStore from '../../../Store/Blocks'
import ParagraphStore from '../../../Store/Paragraphs'
import SystemStore from '../../../Store/System'

const style: any = {
  base:{
    width: '100%',
    display: 'flex',
  },
  textarea:{
    width: '100%',
    outline: 'none',
    position: 'relative',
    zIndex: '1',
  }
}

type Branch = {
  type: string,
  content: string,
  sign?: string
  additional_content?: string,
  ref?: HTMLSpanElement|undefined,
  children: Branch[]
}

const refList = (branch: Branch) => {
  var refs: (HTMLSpanElement|undefined)[] = []
  if(branch.type === 'text' || branch.type === 'sign'){
    refs.push(branch.ref)
  }

  if(branch.children.length > 0){
    branch.children.forEach(child => {
      refs = refs.concat(refList(child))
    })
  }

  return refs
}

const TextBase: Component<{id: string}> = (props: {id: string}) => {
  // Stores
  const { block_getters, block_mutations } = BlocksStore
  const { paragraph_mutations } = ParagraphStore
  const { system_getters, system_mutations } = SystemStore

  // Signals
  const block = createMemo(() => block_getters('get')(props.id))
  const [text, setText] = createSignal(block().data.text)
  const tree = createMemo(() => Lexer({type: 'root', content: text(), children: []}))
  
  const [caret, setCaret] = createSignal(0)

  // Non Reactive Variables
  var baseRef: HTMLDivElement|undefined = undefined

  onMount(() => {
    baseRef?.focus()
  })

  // Clean Up DOM
  createEffect(() => {
    tree()
    baseRef!.childNodes.forEach(child => {
      if(child.nodeName.includes('BR')) baseRef?.removeChild(child)
      if(child.nodeType === 3) baseRef?.removeChild(child)
    })
  })

  const getNodeCaretOn = () => {
    /***  There is only one (Text)Node in ref ***/

    // If there is Only one Element
    if(baseRef?.childNodes.length === 1) return refList(tree())[0]?.childNodes[0]

    var textLengthTotal: number = 0
    var currentElement: HTMLSpanElement | undefined
    const list = refList(tree())
    // When Caret is on last
    if(caret() === baseRef!.innerText.length){
      return list[list.length-1]?.childNodes[0]
    }

    var index = 0
    for(const ref of list){
      textLengthTotal += ref?.innerText.length || 0
      if(textLengthTotal > caret()){
        if(index !== 0) currentElement = list[index]
        else currentElement = list[0]
        break
      }
      index ++
    }

    if(currentElement?.childNodes.length === 0) currentElement.appendChild(document.createTextNode(''))
    return currentElement?.childNodes[0]
  }

  const getCaretPositionOnNode = () => {
    // StrangeMovement of ContentEditable
    if(
      baseRef?.childNodes.length === 1 &&
      caret() === 0 &&
      baseRef?.childNodes[0].nodeValue === null
    ) return 1

    var previousTextLengthTotal: number = 0
    var textLengthTotal: number = 0
    var caretPosition: number = 0
    const list = refList(tree())
    for(const ref of list){
      textLengthTotal += ref?.innerText.length || 0
      if(textLengthTotal > caret()){
        caretPosition = caret()-previousTextLengthTotal
        break
      }
      else if(caret() === baseRef!.innerText.length){
        caretPosition = caret()-previousTextLengthTotal
      }
      previousTextLengthTotal += ref?.innerText.length || 0
    }

    return caretPosition
  }

  const setCaretPositioin = () => {
    const selection = window.getSelection()
    const range = document.createRange()
    console.log(getNodeCaretOn())
    range.setStart(getNodeCaretOn()!, getCaretPositionOnNode())
    range.collapse(true)
    selection!.removeAllRanges()
    selection!.addRange(range)
  }

  const getCaretPosition = () => {
    const selection: Selection | null = window.getSelection()
    var textLength: number = 0
    var caretPosition: number = 0

    refList(tree()).forEach(ref => {
      if(selection?.anchorNode?.parentElement === ref){
        // When delete only one letter, insert '\n' ... (Content Editable ?)
        caretPosition = textLength + (selection?.anchorNode?.nodeValue === '\n' ? 0 : selection?.anchorOffset || 0)
      }
      textLength += ref?.innerText.length || 0
    })

    return caretPosition
  }

  const handleInput = () => {
    setCaret(getCaretPosition())
    block_mutations('patch')(props.id, {text: baseRef!.innerText})
    setText(baseRef!.innerText)
    setCaretPositioin()
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if(e.key === 'Enter'){
      e.preventDefault()
      const id = ulid()
      block_mutations('add')(id, 'Text')
      paragraph_mutations('add')("01G5KAR1FY949SY0R2DV4RGR7M", props.id, id)
    }

    if(e.key === 'Backspace'){
      if(getCaretPosition() === 0 && window.getSelection()?.anchorOffset === window.getSelection()?.focusOffset){
        e.preventDefault()
      }
    }

    if(e.key === 'ArrowUp'){
    }

    if(e.key === 'ArrowDown'){
    }
  }

  return (
    <div class="text-block-base" style={style.base}>
      <div
        ref={baseRef}
        contentEditable
        class="text-block-textarea"
        style={style.textarea}
        onMouseOver={() => system_mutations('patchFocus')(props.id)}
        onInput={() => handleInput()}
        onKeyDown={(e) => handleKeyDown(e)}
      >
        <For each={tree().children}>
          {branch => 
            <Dynamic
              component={components['./Components/textarea/'+branch.type+'.tsx'].default}
              branch={branch}
            />
          }
        </For>
      </div>
    </div>
  )
}

export default TextBase