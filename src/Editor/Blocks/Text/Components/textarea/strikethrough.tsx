import { Component, createEffect, createSignal } from 'solid-js';
import { Dynamic } from "solid-js/web"

const components = import.meta.globEager('./*.tsx')

const style: any = {
  'text-decoration': 'line-through'
}

const Strikethrough: Component<TextBlockProps> = (props: TextBlockProps) => {
  const [visible, setVisible] = createSignal(false)

  createEffect(() => {
    if(props.lengthTree){
      if(props.lengthTree.start <= props.caret() && props.lengthTree.end >= props.caret()) setVisible(true)
      else setVisible(false)
    }
  })

  return (
    <span
      class="strikethrough"
      style={style}
    >
      {props.branch.children.map((child: {type:string, content:string, children: any[]}, index: number) => (
        <Dynamic
          component={components['./'+child.type+'.tsx'].default}
          branch={child}
          caret={props.caret}
          lengthTree={props.lengthTree.children[index]}
          visible={visible}
        />
      ))}
    </span>
  )
}

export default Strikethrough