import { Component, createSignal, createMemo, onMount } from 'solid-js';
import { Dynamic } from "solid-js/web"
import { additionalLexer, checkHeadOfSentence, Lexer, reverseLexer } from '../../../Components/Lexer';

import { getBlock } from '../../../Store/Blocks'

const components = import.meta.globEager('./Components/textarea/*.tsx')
import Head from './Components/head/Head'

const countBranches = (branch: any) => {
  var sum = 0;
  branch.children.forEach((child: any) => {
    if(child.children.length === 0) sum += 1
    else sum += countBranches(child)
  })
  return sum
}

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
  const block = {config: {indent: 0, type: 'Text'}, data: {text: 'loading...'}}

  onMount(() => {
    (async () =>  {
      const block = await getBlock("01G4FQHW27SQ4AYTNTQV1E7PND")
      setText(block.data.text)
    })()
  })

  const [text, setText] = createSignal(block!.data.text)
  const [type, setType] = createSignal('Text')
  const [indent, setIndent] = createSignal(block!.config.indent)
  const tree = createMemo(() => Lexer({type: 'root', content: text(), children: []}))

  var baseRef: HTMLDivElement|undefined = undefined

  const handleInput = () => {
    var previousTree = JSON.parse(JSON.stringify(tree()))
    const newTree = additionalLexer(baseRef!, previousTree)
    
    /*if(countBranches(newTree) !== countBranches(tree())){
      setText(reverseLexer(baseRef!))
    }*/

    const key = checkHeadOfSentence(reverseLexer(baseRef!))
    console.log(key)
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
      <Head />
      <div
        class="text-block-textarea"
        ref={baseRef}
        style={style.textarea}
        contentEditable={true}
        onInput={() => handleInput()}
        onKeyDown={(e) => handleKeyDown(e)}
        onFocus={() => console.log("sample")}
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
