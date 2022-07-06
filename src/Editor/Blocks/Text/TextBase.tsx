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
  if(branch.type === 'text'){
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
  const { block_getters, block_mutations } = BlocksStore
  const { paragraph_getters, paragraph_mutations } = ParagraphStore
  const { system_getters, system_mutations } = SystemStore

  const block = createMemo(() => block_getters('get')(props.id))
  const [text, setText] = createSignal(block().data.text)
  const tree = createMemo(() => Lexer({type: 'root', content: text(), children: []}))
  
  const [caret, setCaret] = createSignal(0)

  var baseRef: HTMLDivElement|undefined = undefined

  onMount(() => {
    baseRef?.focus()
  })

  createEffect(() => {
    system_getters('focus')();
    untrack(() => setText(block_getters('get')(props.id).data.text));
  })

  const getElementPosition = () => {
    var textLength: number = 0
    var currentElement: HTMLSpanElement | undefined
    const list = refList(tree())
    var index = 0
    for(const ref of list){
      textLength += ref?.innerText.length || 0
      if(textLength > caret()){
        if(index !== 0) currentElement = list[index]
        else currentElement = list[0]
        break
      }
      index ++
    }

    return currentElement
  }

  const getNewCaretPosition = () => {
    var length: number = 0
    var textLength: number = 0
    var caretPosition: number = 0
    const list = refList(tree())
    var index = 0
    for(const ref of list){
      textLength += ref?.innerText.length || 0
      if(textLength > caret()){
        caretPosition = caret()-length
        break
      }
      length += ref?.innerText.length || 0
      index ++
    }

    return caretPosition
  }

  const setCaretPositioin = () => {
    const selection = window.getSelection()
    const range = document.createRange()
    range.setStart(getElementPosition()!.childNodes[0], getNewCaretPosition())
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
        caretPosition = textLength + (selection?.anchorOffset || 0)
      }
      textLength += ref?.innerText.length || 0
    })

    return caretPosition
  }

  const handleInput = () => {
    setCaret(getCaretPosition())
    setText(baseRef!.innerText)
    setCaretPositioin()
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    console.log(getCaretPosition())
    if(e.key === 'Enter'){
      e.preventDefault()
      const id = ulid()
      block_mutations('add')(id, 'Text')
      paragraph_mutations('add')("01G5KAR1FY949SY0R2DV4RGR7M", props.id, id)
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
