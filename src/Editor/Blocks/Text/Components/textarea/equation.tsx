import { Component, createEffect, createSignal, onMount } from 'solid-js';
import { Dynamic } from "solid-js/web"

const components = import.meta.globEager('./*.tsx')

import katex from 'katex'
import 'katex/dist/katex.css'

const Equation: Component<TextBlockProps> = (props: TextBlockProps) => {
  const [visible, setVisible] = createSignal(false)

  createEffect(() => {
    if(props.lengthTree){
      if(props.lengthTree.start <= props.caret() && props.lengthTree.end >= props.caret()) setVisible(true)
      else setVisible(false)
    }
  })

  return (
    <span
      class="equation"
      style={{position: 'relative'}}
    >
      <span
        class="katex-base"
        contentEditable={false}
        innerHTML={katex.renderToString(props.branch.content, {
          throwOnError: false
        })}
      />
      {props.branch.children.map((child: {type:string, content:string, children: any[]}, index: number) => (
        <Dynamic
          component={components['./'+child.type+'.tsx'].default}
          branch={child}
          caret={props.caret}
          lengthTree={props.lengthTree ? props.lengthTree.children[index] : null}
          visible={visible}
        />
      ))}
    </span>
  )
}

export default Equation
