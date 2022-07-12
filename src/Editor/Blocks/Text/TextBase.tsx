import { Component, createSignal, createMemo, onMount, Show, createEffect, untrack, For } from 'solid-js';
import { Dynamic } from "solid-js/web"
import { ulid } from 'ulid';
import { Parser } from '../../../Libraries/TextParser';

const components = import.meta.globEager('./Components/*.tsx')

import BlocksStore from '../../../Store/Blocks'
import ParagraphStore from '../../../Store/Paragraphs'
import SystemStore from '../../../Store/System'

import SyntaxTree from './Modules/SyntaxTree'
import Systems from '../../../Store/Systems'

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

const TextBase: Component<BlockBaseProps> = (props: BlockBaseProps) => {
  // Stores
  const { block_getters, block_mutations } = BlocksStore
  const { paragraph_getters, paragraph_mutations } = ParagraphStore
  const { system_getters, system_mutations } = SystemStore

  // Signals
  const block = createMemo(() => block_getters('get')(props.id))
  const syntax = new SyntaxTree(block().data.text)
  const { caret, focus } = Systems
  const [inputting, setInputting] = createSignal(false)
  
  const [lengthTree, setLengthTree] = createSignal(lengthList(syntax.tree()))

  const [waiting, setWaiting] = createSignal(false)

  // Non Reactive Variables
  var baseRef: HTMLDivElement|undefined = undefined

  // Clean Up DOM
  createEffect(() => {
    syntax.tree()
    baseRef!.childNodes.forEach(child => {
      if(child.nodeName.includes('BR')) baseRef?.removeChild(child)
      if(child.nodeType === 3) baseRef?.removeChild(child)
    })
  })

  // Gen lengthTree after mount
  onMount(() => {
    setLengthTree(lengthList(syntax.tree()))
  })

  // When Focused
  createEffect(() => {
    if(system_getters('focus')() === props.id){
      //setWaiting(true)
      caret.setCaretPosition(syntax.innerText(baseRef!), syntax.refs())
    }
  })

  /******************** handle Something Methods ********************/

  const handleInput = () => {
    caret.preserveCaretOffset(syntax.refs()!)
    if(!inputting()){
      block_mutations('patchData')(props.id, {text: syntax.innerText(baseRef!)})
      const newTree = Parser({type: 'root', content: syntax.innerText(baseRef!), children: []})
      if(newTree.children[0].type === 'head_sign'){
        if(block().config.type === newTree.children[0].additional_content){
          syntax.parse(syntax.innerText(baseRef!))
          caret.setCaretPosition(syntax.innerText(baseRef!), syntax.refs())
          setLengthTree(lengthList(syntax.tree()))
        }
      }
      else{
        if(block().config.type === 'Text'){
          syntax.parse(syntax.innerText(baseRef!))
          caret.setCaretPosition(syntax.innerText(baseRef!), syntax.refs())
          setLengthTree(lengthList(syntax.tree()))
        }
      }
    }
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if(e.key === 'Enter' && !inputting()){
      e.preventDefault()
      const id = ulid()
      if(caret.offset() !== syntax.innerText(baseRef!).length){
        block_mutations('add')(id, 'Text', syntax.innerText(baseRef!).substring(caret.offset()))
        block_mutations('patchData')(props.id, {text: syntax.innerText(baseRef!).substring(0, caret.offset())})
        syntax.parse(syntax.innerText(baseRef!).substring(0, caret.offset()))
        caret.setCaretPosition(syntax.innerText(baseRef!), syntax.refs())
      }
      else block_mutations('add')(id, 'Text')
      paragraph_mutations('add')("01G5KAR1FY949SY0R2DV4RGR7M", props.id, id)
      system_mutations('setCaret')(0)
      system_mutations('setFocus')(id)
    }

    if(e.key === 'Backspace'){
      if(caret.offset() === 0 && window.getSelection()?.anchorOffset === window.getSelection()?.focusOffset){
        e.preventDefault()
        const prev = paragraph_getters('prev')(props.paragraph_id, props.id)
        if(prev !== props.id){
          const newData = block_getters('get')(prev).data
          system_mutations('setCaret')(newData.text.length)
          newData.text += syntax.innerText(baseRef!)
          block_mutations('patchData')(prev, newData)
          paragraph_mutations('remove')(props.paragraph_id, props.id)
          system_mutations('setFocus')(prev)
        }
      }
    }
        
    if(e.key === 'ArrowLeft'){
      if(caret.offset() > 0) caret.preserveCaretOffset(syntax.refs(), -1)
    }

    if(e.key === 'ArrowRight'){
      if(caret.offset() < syntax.innerText(baseRef!).length) caret.preserveCaretOffset(syntax.refs(), 1)
    }

    if(e.key === 'ArrowUp'){
      e.preventDefault()
      system_mutations('setCaret')(caret.offset())
      system_mutations('setFocus')(paragraph_getters('prev')(props.paragraph_id, props.id))
    }

    if(e.key === 'ArrowDown'){
      e.preventDefault()
      system_mutations('setCaret')(caret.offset())
      system_mutations('setFocus')(paragraph_getters('next')(props.paragraph_id, props.id))
    }
  }

  const handleClick = () => {
    caret.preserveCaretOffset(syntax.refs())
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
        <For each={syntax.tree().children}>
          {(branch, index) => 
            <Dynamic
              component={components['./Components/'+branch.type+'.tsx'].default}
              branch={branch}
              caret={caret.offset}
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