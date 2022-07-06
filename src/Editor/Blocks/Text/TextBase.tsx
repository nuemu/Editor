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

type lengthTree = {
  start: number,
  end: number,
  children: lengthTree[]
}

const lengthList = (branch: Branch, start: number = 0) => {
  const nodeLength = (node: Branch) => {
    if(node.sign) return 2 * node.sign.length + node.content.length
    return node.content.length
  }

  var node: lengthTree = {
    start: start,
    end: start + nodeLength(branch),
    children: []
  }

  var newStart = start ? start : 0
  node.children = branch.children.map((child, index: number) => {
    newStart += (index > 0 ? nodeLength(branch.children[index-1]) : 0)
    return lengthList(child, newStart)
  })

  return node
}

const TextBase: Component<{id: string}> = (props: {id: string}) => {
  // Stores
  const { block_getters, block_mutations } = BlocksStore
  const { paragraph_getters, paragraph_mutations } = ParagraphStore
  const { system_getters, system_mutations } = SystemStore

  // Signals
  const block = createMemo(() => block_getters('get')(props.id))
  const [tree, setTree] = createSignal(Lexer({type: 'root', content: block().data.text, children: []}))
  
  const [caret, setCaret] = createSignal(0)
  const [lengthTree, setLengthTree] = createSignal(lengthList(tree()))

  // Non Reactive Variables
  var baseRef: HTMLDivElement|undefined = undefined

  createEffect(() => {
    if(system_getters('focus')() === props.id) baseRef?.focus()
  })

  // Clean Up DOM
  createEffect(() => {
    tree()
    baseRef!.childNodes.forEach(child => {
      if(child.nodeName.includes('BR')) baseRef?.removeChild(child)
      if(child.nodeType === 3) baseRef?.removeChild(child)
    })
  })

  onMount(() => {
    setLengthTree(lengthList(tree()))
  })

  /******************** Caret Methods ********************/

  const setCaretNumber = (diff?: number) => {
    const caretPosition = diff ? getCaretPosition() + diff : getCaretPosition()
    setCaret(caretPosition)
    system_mutations('patchCaretPosition')(caretPosition)
  }

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

  const setCaretPosition = () => {
    const selection = window.getSelection()
    const range = document.createRange()
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

  /******************** handle Something Methods ********************/

  const handleInput = () => {
    setCaretNumber()
    block_mutations('patch')(props.id, {text: baseRef!.innerText})
    setTree(Lexer({type: 'root', content: baseRef!.innerText, children: []}))
    setCaretPosition()
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if(e.key === 'Enter'){
      e.preventDefault()
      const id = ulid()
      if(caret() !== baseRef!.innerText.length){
        block_mutations('add')(id, 'Text', baseRef!.innerText.substring(caret()))
        block_mutations('patch')(props.id, {text: baseRef!.innerText.substring(0, caret())})
        setTree(Lexer({type: 'root', content: baseRef!.innerText.substring(0, caret()), children: []}))
        setCaretPosition()
      }
      else block_mutations('add')(id, 'Text')
      paragraph_mutations('add')("01G5KAR1FY949SY0R2DV4RGR7M", props.id, id)
    }

    if(e.key === 'Backspace'){
      if(getCaretPosition() === 0 && window.getSelection()?.anchorOffset === window.getSelection()?.focusOffset){
        e.preventDefault()
        console.log(paragraph_getters('previous')(props.id))
      }
    }

    if(e.key === 'ArrowLeft'){
      if(getCaretPosition() > 0) setCaretNumber(-1)
    }

    if(e.key === 'ArrowRight'){
      if(getCaretPosition() < baseRef!.innerText.length) setCaretNumber(1)
    }

    if(e.key === 'ArrowUp'){
      
    }

    if(e.key === 'ArrowDown'){

    }
  }

  const handleClick = () => {
    setCaretNumber()
  }

  return (
    <div class="text-block-base" style={style.base}>
      <div
        ref={baseRef}
        contentEditable
        class="text-block-textarea"
        style={style.textarea}
        onFocus={() => system_mutations('patchFocus')(props.id)}
        onInput={() => handleInput()}
        onKeyDown={(e) => handleKeyDown(e)}
        onClick={() => handleClick()}
      >
        <For each={tree().children}>
          {(branch, index) => 
            <Dynamic
              component={components['./Components/textarea/'+branch.type+'.tsx'].default}
              branch={branch}
              caret={caret}
              lengthTree={lengthTree().children[index()]}
            />
          }
        </For>
      </div>
    </div>
  )
}

export default TextBase