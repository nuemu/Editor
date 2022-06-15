import { Component, createSignal, createMemo, onMount } from 'solid-js';
import { Dynamic } from "solid-js/web"
import { ulid } from 'ulid';
import { checkHeadOfSentence, Lexer, removeHeadOfSentence, reverseLexer } from '../../../Components/Lexer';

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

const TextBase: Component<{id: string}> = (props: {id: string}) => {
  const {block_getters, block_mutations} = BlocksStore
  const {paragraph_getters, paragraph_mutations} = ParagraphStore
  const {getters} = SystemStore
  const [block, setBlock] = createSignal(block_getters('get')(props.id))
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
      newBlock.data.text = removeHeadOfSentence(reverseLexer(baseRef!), key)
      block_mutations('patch')(props.id, newBlock)
    }
    else{
      const newBlock = JSON.parse(JSON.stringify(block()))
      newBlock.data.text = reverseLexer(baseRef!)
      setBlock(newBlock)
      block_mutations('patchData')(props.id, {text: baseRef!.innerText})
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

    if(e.key === 'Enter'){
      e.preventDefault()
      const id = ulid()
      block_mutations('add')(id, 'Text')
      paragraph_mutations('add')("01G5KAR1FY949SY0R2DV4RGR7M", props.id, id)
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
