import { Component, createEffect, createSignal, untrack } from 'solid-js';
import { createStore } from "solid-js/store";
import { Dynamic } from "solid-js/web"

const components = import.meta.globEager('./Components/*.tsx')

const style = {
  outline: 'none',
}

const TextBase: Component = () => {
  var [block, setBlock] = createStore({data: [
    {type: 'plain', content: 'PLAIN '},
    {type: 'bold', content: 'BOLD '},
    {type: 'equation', content: 'c=\\pm\\sqrt{a^2+b^2}'},
  ]})

  var [focus, setFocus] = createSignal(-1)

  let refs: HTMLSpanElement[] = []
  createEffect(() => {
    block.data
    untrack(() => {if(focus() >= 0 && focus()+1 < block.data.length) forceFocus(focus()+1)})
  })

  const forceFocus = (index: number) => {
    refs[index].focus()
  }

  const removeElement = (index: number) => {
    setBlock('data', () => block.data.slice(index, 1))
  }

  return (
    <div
      style={style}
      class="text-block-base"
    >
      {block.data.map((data: {type:string, content:string}, index: number) => (
        <Dynamic
          component={components['./Components/'+data.type+'.tsx'].default}
          ref={refs[index]}
          setFocus={setFocus}
          forceFocus={forceFocus}
          index={index}
          block={block.data}
          setBlock={setBlock}
        />
      ))}
    </div>
  )
}

export default TextBase
