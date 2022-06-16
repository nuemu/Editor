import { Component, createEffect, createMemo, createSignal, onMount, untrack, For } from 'solid-js';

import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';

import BlocksStore from '../../../Store/Blocks';
import SystemStore from '../../../Store/System';

const Base: Component<{id: string}> = (props: {id: string}) => {
  const { block_getters, block_mutations } = BlocksStore
  const { system_getters, system_mutations } = SystemStore
  const block = createMemo(() => block_getters('get')(props.id))
  const [text, setText] = createSignal(block().data.text)

  const [language, setLanguage] = createSignal('bash')
  const [code, setCode] = createSignal(hljs.highlight(text(), {language: language()}).value)

  if(block().data.language){
    setLanguage(block().data.language)
    setCode(hljs.highlight(text(), {language: block().data.language}).value)
  }
 
  var baseRef: HTMLDivElement|undefined = undefined

  const handleInput = () => {
    block_mutations('patchData')(props.id, {text: baseRef!.innerText})
    setCode(hljs.highlight(baseRef!.innerText, {language: language()}).value)
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    
    if(e.key === 'Enter'){
      e.preventDefault()
      const selection = window.getSelection()
      const range = selection?.getRangeAt(0)

      const node = document.createTextNode("\n");
      range?.insertNode(node)
      setCode(hljs.highlight(baseRef!.innerText, {language: language()}).value)

      selection?.removeAllRanges();
      const newRange = new Range();
      newRange.setStart(range?.startContainer.nextSibling!, 1)
      selection?.addRange(newRange);
    }

    if(e.key === 'Tab'){
      e.preventDefault()
      const selection = window.getSelection()
      const range = selection?.getRangeAt(0)

      const node = document.createTextNode("  ");
      range?.insertNode(node)
      setCode(hljs.highlight(baseRef!.innerText, {language: language()}).value)

      selection?.removeAllRanges();
      const newRange = new Range();
      newRange.setStart(range?.startContainer.nextSibling!, 2)
      selection?.addRange(newRange);
    }
  }

  const handleLanguageSelect = (e: Event) => {
    const target = e.target as HTMLSelectElement
    setLanguage(target.value)
    setCode(hljs.highlight(baseRef!.innerText, {language: target.value}).value)
  }

  return (
    <>
      <div class="code-block-caption">
        <select onChange={(e) => handleLanguageSelect(e)}>
          {hljs.listLanguages().map(option_language => (<option value={option_language} selected={option_language===language()}>{option_language}</option>))}
        </select>
      </div>
      <pre
        class="code-block-base"
        style={{position: 'relative'}}
        onMouseOver={() => system_mutations('patchFocus')(props.id)}
      >
        <code
          class={"hljs language-"+language()}
          style={{outline: 'none', width: '100%', "white-space": "pre-wrap"}}
          innerHTML={code()}
        />
        <code
          ref={baseRef}
          class="hljs code-block-textarea"
          style={{position: 'absolute', top: 0, left: 0, outline: 'none', width: '100%', "white-space": "pre-wrap", color: 'rgba( 255, 255, 255, 0)', 'caret-color': 'rgba(255, 255, 255)', "background-color": 'rgba( 255, 255, 255, 0)'}}
          contentEditable={true}
          onInput={() => handleInput()}
          onKeyDown={(e) => handleKeyDown(e)}
          innerHTML={text()}
        />
      </pre>
    </>
  )
}

export default Base
