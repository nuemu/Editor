import { Component, createEffect, createSignal, onMount } from 'solid-js';
import { Dynamic } from "solid-js/web"

const components = import.meta.globEager('./*.tsx')

import katex from 'katex'
import 'katex/dist/katex.css'

const style: any = {
  visible: {
    position: 'absolute',
    top: '16pt',
    width: '500px',
    left: 0,
    'background-color': 'white',
    'z-index': 10
  },
  invisible: {
    display: 'inline-block',
    opacity: 0,
    width: '0px',
    height: '0px',
    overflow: 'hidden'
  }
}

const Equation: Component<TextBlockProps> = (props: TextBlockProps) => {
  const [visible, setVisible] = createSignal(false)
  const [visibility, setVisibility] = createSignal(style.invisible)

  createEffect(() => {
    if(props.lengthTree){
      if(props.lengthTree.start <= props.caret() && props.lengthTree.end >= props.caret()){
        setVisible(true)
        setVisibility(style.visible)
      }
      else{
        setVisible(false)
        setVisibility(style.invisible)
      }
    }
    if(!props.focus){
      setVisible(false)
      setVisibility(style.invisible)
    }
  })

  return (
    <span
      class="equation"
      style={{position: 'relative'}}
    >
      <span class="equation-textarea" style={visibility()}>
        {props.branch.children.map((child: {type:string, content:string, children: any[]}, index: number) => (
          <Dynamic
            component={components['./'+child.type+'.tsx'].default}
            branch={child}
            caret={props.caret}
            lengthTree={props.lengthTree ? props.lengthTree.children[index] : null}
            visible={visible}
            focus={props.focus}
          />
        ))}
      </span>
      <span
        contentEditable={false}
        innerHTML={katex.renderToString(props.branch.content, {
          throwOnError: false
        })}
        onClick={() => {setVisibility(style.visible); setVisible(true)}}
      />
    </span>
  )
}

export default Equation
