import { Component, createEffect, createSignal } from 'solid-js';
import { Dynamic } from "solid-js/web"

const components = import.meta.globEager('./*.tsx')

const style: any = {
  'font-weight': 'bolder',
  outline: 'none'
}

const Emphasis: Component<TextBlockProps> = (props: TextBlockProps) => {
  const [visible, setVisible] = createSignal(false)

  createEffect(() => {
    if(props.lengthTree){
      if(props.lengthTree.start <= props.caret() && props.lengthTree.end >= props.caret()) setVisible(true)
      else setVisible(false)
    }
  })

  return (
    <span
      class="emphasis"
      style={style}
    >
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

export default Emphasis
