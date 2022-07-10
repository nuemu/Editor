import { Component, createSignal, createMemo, onMount, Show, createEffect, untrack, For } from 'solid-js';
import { Dynamic } from "solid-js/web"
import { ulid } from 'ulid';
import { Lexer } from '../../../Components/TextParser';

const components = import.meta.globEager('./Components/*.tsx')

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
  if(branch.type === 'text' || branch.type === 'sign' || branch.type === 'head_sign'){
    refs.push(branch.ref)
  }

  if(branch.children.length > 0){
    branch.children.forEach(child => {
      refs = refs.concat(refList(child))
    })
  }

  return refs
}

const removeBranch = (ref: HTMLSpanElement | undefined, branch: Branch) => {
  if(branch.children.length > 0){
    branch.children.forEach((child, index: number) => {
      if(child.ref === ref){
        branch.children.splice(index, 1)
      }
      else removeBranch(ref, child)
    })
  }

  return branch
}

type lengthTree = {
  start: number,
  end: number,
  children: lengthTree[]
}

const lengthList = (branch: Branch, start: number = 0) => {
  const nodeLength = (node: Branch) => {
    if(node.start_sign) return node.start_sign.length + node.content.length + node.end_sign!.length
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

const TextBase: Component<{id: string, paragraph_id: string}> = (props: {id: string, paragraph_id: string}) => {
  // Stores
  const { block_getters, block_mutations } = BlocksStore
  const { paragraph_getters, paragraph_mutations } = ParagraphStore
  const { system_getters, system_mutations } = SystemStore

  // Signals
  const block = createMemo(() => block_getters('get')(props.id))
  const [tree, setTree] = createSignal(Lexer({type: 'root', content: block().data.text, children: []}))
  const [inputting, setInputting] = createSignal(false)
  
  const [caret, setCaret] = createSignal(0)
  const [lengthTree, setLengthTree] = createSignal(lengthList(tree()))

  const [waiting, setWaiting] = createSignal(false)

  // Non Reactive Variables
  var baseRef: HTMLDivElement|undefined = undefined

  // Clean Up DOM
  createEffect(() => {
    tree()
    baseRef!.childNodes.forEach(child => {
      if(child.nodeName.includes('BR')) baseRef?.removeChild(child)
      if(child.nodeType === 3) baseRef?.removeChild(child)
    })
  })

  // Gen lengthTree after mount
  onMount(() => {
    setLengthTree(lengthList(tree()))
  })

  // When Focused
  createEffect(() => {
    if(system_getters('focus')() === props.id){
      var caret = untrack(system_getters('caret')) as number
      if(untrack(innerText).length! >= caret) untrack(() => setCaret(caret))
      else untrack(() => setCaret(innerText().length!))
      setWaiting(true)
      untrack(() => setTree(Lexer({type: 'root', content: block_getters('get')(props.id).data.text, children: []})))
    }
  })

  // After Focused
  createEffect(() => {
    if(waiting()){
      untrack(setCaretPosition)
      setWaiting(false)
    }
  })

  /******************** Caret Methods ********************/

  const setCaretNumber = (diff?: number) => {
    const caretPosition = diff ? getCaretPosition() + diff : getCaretPosition()
    system_mutations('setCaret')(caretPosition)
    setCaret(caretPosition)
  }

  const getNodeCaretOn = () => {

    const returnNode = (element: HTMLSpanElement) => {
      if(element.childNodes.length === 0) element.appendChild(document.createTextNode(''))
      return element.childNodes[0]
    }

    /***  There is only one (Text)Node in ref ***/
    const list = refList(tree())

    // When Caret is on last
    if(caret() >= innerText().length){
      return returnNode(list[list.length-1]!)
    }

    var textLengthTotal: number = 0
    var currentElement: HTMLSpanElement | undefined

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

    return returnNode(currentElement!)
  }

  const getCaretPositionOnNode = () => {
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
      else if(caret() === innerText().length){
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

  const innerText = () => {
    const newRefs = refList(tree()).filter(ref => document.contains((ref as Node)))
    var text = newRefs.map(ref => ref?.innerText).join('')

    // If input initial letter on this textblock
    if(text.length === 0){
      text = baseRef!.innerText
      if(text.length > 0) setCaret(text.length)
    }

    return text
  }

  const handleInput = () => {
    setCaretNumber()
    if(!inputting()){
      block_mutations('patch')(props.id, {text: innerText()})
      setTree(Lexer({type: 'root', content: innerText(), children: []}))
      setCaretPosition()
      setLengthTree(lengthList(tree()))
    }
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if(e.key === 'Enter' && !inputting()){
      e.preventDefault()
      const id = ulid()
      if(caret() !== innerText().length){
        block_mutations('add')(id, 'Text', innerText().substring(caret()))
        block_mutations('patchData')(props.id, {text: innerText().substring(0, caret())})
        setTree(Lexer({type: 'root', content: innerText().substring(0, caret()), children: []}))
        setCaretPosition()
      }
      else block_mutations('add')(id, 'Text')
      paragraph_mutations('add')("01G5KAR1FY949SY0R2DV4RGR7M", props.id, id)
      system_mutations('setCaret')(0)
      system_mutations('setFocus')(id)
    }

    if(e.key === 'Backspace'){
      if(getCaretPosition() === 0 && window.getSelection()?.anchorOffset === window.getSelection()?.focusOffset){
        e.preventDefault()
        const prev = paragraph_getters('prev')(props.paragraph_id, props.id)
        if(prev !== props.id){
          const newData = block_getters('get')(prev).data
          system_mutations('setCaret')(newData.text.length)
          newData.text += innerText()
          block_mutations('patchData')(prev, newData)
          paragraph_mutations('remove')(props.paragraph_id, props.id)
          system_mutations('setFocus')(prev)
        }
      }
    }
        
    if(e.key === 'ArrowLeft'){
      if(getCaretPosition() > 0) setCaretNumber(-1)
    }

    if(e.key === 'ArrowRight'){
      if(getCaretPosition() < innerText().length) setCaretNumber(1)
    }

    if(e.key === 'ArrowUp'){
      e.preventDefault()
      system_mutations('setCaret')(getCaretPosition())
      system_mutations('setFocus')(paragraph_getters('prev')(props.paragraph_id, props.id))
    }

    if(e.key === 'ArrowDown'){
      e.preventDefault()
      system_mutations('setCaret')(getCaretPosition())
      system_mutations('setFocus')(paragraph_getters('next')(props.paragraph_id, props.id))
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
        onFocus={() => system_mutations('setFocus')(props.id)}
        onInput={() => handleInput()}
        onKeyDown={(e) => handleKeyDown(e)}
        onClick={() => handleClick()}
        onCompositionStart={() => {setInputting(true)}}
        onCompositionEnd={() => {setInputting(false); handleInput()}}
      >
        <For each={tree().children}>
          {(branch, index) => 
            <Dynamic
              component={components['./Components/'+branch.type+'.tsx'].default}
              branch={branch}
              caret={caret}
              lengthTree={lengthTree().children[index()]}
              focus={system_getters('focus')() === props.id}
            />
          }
        </For>
      </div>
    </div>
  )
}

export default TextBase