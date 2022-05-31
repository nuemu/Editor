import { Component, createEffect } from 'solid-js';
import { createStore } from "solid-js/store";
import { Dynamic } from "solid-js/web"

const components = import.meta.globEager('./Components/*.tsx')

const style = {
  outline: 'none',
}

const TextBase: Component = () => {
  var [block, setBlock] = createStore({data: [
    {type: 'plain', content: 'sample'},
    {type: 'equation', content: 'c = \\pm\\sqrt{a^2 + b^2}'},
    {type: 'plain', content: 'sample'},
  ]})

  return (
    <div
      style={style}
    >
      {block.data.map((data: {type:string, content:string}, index: number) => (
        <Dynamic
          component={components['./Components/'+data.type+'.tsx'].default}
          index={index}
          block={block.data}
          setBlock={setBlock}
        />
      ))}
    </div>
  )
}

export default TextBase
