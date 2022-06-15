import { Component, createSignal, createMemo, onMount } from 'solid-js';
import { Dynamic } from "solid-js/web"
import { checkHeadOfSentence, Lexer, reverseLexer } from '../../../Components/Lexer';

const components = import.meta.globEager('./Components/textarea/*.tsx')

import BlocksStore from '../../../Store/Blocks'

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

const TextBase: Component = () => {
  const {getters, mutations} = BlocksStore
  const [block, setBlock] = createSignal(getters('get')("01G4FQHW27SQ4AYTNTQV1E7PND"))
  const [text, setText] = createSignal(block().data.text)
  const [indent, setIndent] = createSignal(block().config.indent)
  const tree = createMemo(() => Lexer({type: 'root', content: text(), children: []}))

  var baseRef: HTMLDivElement|undefined = undefined

  onMount(() => {
    baseRef?.focus()
  })

  const handleInput = () => {
    const key = checkHeadOfSentence(reverseLexer(baseRef!))
    if(key){
      const newBlock = JSON.parse(JSON.stringify(block()))
      newBlock.config.type = key
      mutations('patch')("01G4FQHW27SQ4AYTNTQV1E7PND", newBlock)
    }
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if(e.key === 'Tab' && !e.shiftKey){
      e.preventDefault()
      setIndent(indent()+1)
    }

    if(e.key === 'Tab' && e.shiftKey){
      e.preventDefault()
      if(indent() > 0) setIndent(indent()-1)
    }
  }

  return (
    <div class="text-block-base" style={style.base}>
      <div style={{'margin-left': 3*indent()+'%'}}/>
      <div
        class="text-block-textarea"
        ref={baseRef}
        style={style.textarea}
        contentEditable={true}
        onInput={() => handleInput()}
        onKeyDown={(e) => handleKeyDown(e)}
      >
        {tree().children.map((branch: {type:string, content:string, children: any[]}, index: number) => (
          <Dynamic
            component={components['./Components/textarea/'+branch.type+'.tsx'].default}
            branch={branch}
          />
        ))}
      </div>
    </div>
  )
}

export default TextBase
