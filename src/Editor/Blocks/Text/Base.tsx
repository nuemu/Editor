import { Component, createEffect, createSignal } from 'solid-js';
import { Dynamic } from "solid-js/web"
import { inline_parser } from '../../../Components/lexer';

const components = import.meta.globEager('./Components/*.tsx')

const style = {
  outline: 'none',
}

const TextBase: Component = () => {
  var [block, setBlock] = createSignal([
    {type: 'plain', text: 'sample'},
    {type: 'equation', text: 'sample'}
  ])

  return (
    <div
      style={style}
    >
      {block().map((data: {type:string, text:string}) => (
        <Dynamic component={components['./Components/'+data.type+'.tsx'].default} />
      ))}
    </div>
  )
}

export default TextBase
