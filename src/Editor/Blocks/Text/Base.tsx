import { Component, createSignal, createMemo, onMount } from 'solid-js';
import { Dynamic } from "solid-js/web"
import { additionalLexer, Lexer, reverseLexer } from '../../../Components/Lexer';

import { getBlock } from '../../../Store/Blocks'

const components = import.meta.globEager('./Components/*.tsx')

const style: any = {
  outline: 'none',
  position: 'relative',
  zIndex: '1',
}

const countBranches = (branch: any) => {
  var sum = 0;
  branch.children.forEach((child: any) => {
    if(child.children.length === 0) sum += 1
    else sum += countBranches(child)
  })
  return sum
}

const TextBase: Component = () => {
  const block = {data: 'loading...'}

  onMount(() => {
    (async () =>  {
      const block = await getBlock("01G4FQHW27SQ4AYTNTQV1E7PND")
      setText(block.data)
    })()
  })

  const [text, setText] = createSignal(block!.data)
  const tree = createMemo(() => Lexer({type: 'root', content: text(), children: []}))

  var baseRef: HTMLDivElement|undefined = undefined

  const handleInput = () => {
    var previousTree = JSON.parse(JSON.stringify(tree()))
    const newTree = additionalLexer(baseRef!, previousTree)
    
    if(countBranches(newTree) !== countBranches(tree())){
      setText(reverseLexer(baseRef!))
    }
  }

  return (
    <div
      ref={baseRef}
      style={style}
      class="text-block-base"
      contentEditable={true}
      onInput={() => handleInput()}
    >
      {tree().children.map((branch: {type:string, content:string, children: any[]}, index: number) => (
        <Dynamic
          component={components['./Components/'+branch.type+'.tsx'].default}
          branch={branch}
        />
      ))}
    </div>
  )
}

export default TextBase
