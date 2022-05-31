import { Component, createSignal, untrack } from 'solid-js';
import katex from 'katex'
import 'katex/dist/katex.min.css';

const equationBlock:any = {
  position: 'relative'
}

const equationInputStyle:any = {
  position: 'absolute',
  border: 'solid',
  top: '12pt',
  left: '0',
}

const Equation: Component = (props: any) => {
  const {index, block, setBlock} = props
  const [equation, setEquation] = createSignal(block[index].content)

  const katexRender = () => {
    return katex.renderToString(equation(), {
      throwOnError: false
    });
  }

  const handleInput = (e: InputEvent) => {
    const element = e.target as HTMLElement
    setEquation(element.innerText)
  }

  return (
    <span
      style={equationBlock}
    >
      <span
        innerHTML={katexRender()}
        tabIndex={1}
      />
      <span
        contentEditable={true}
        style={equationInputStyle}
        innerText={block[index].content}
        onInput={(e: InputEvent) => handleInput(e)}
      />
    </span>
  )
}

export default Equation
