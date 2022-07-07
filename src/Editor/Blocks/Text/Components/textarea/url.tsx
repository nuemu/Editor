import { Component, createEffect, createSignal } from 'solid-js';
import { Dynamic } from "solid-js/web"

const components = import.meta.globEager('./*.tsx')

const URL: Component<TextBlockProps> = (props: TextBlockProps) => {
  const [visible, setVisible] = createSignal(false)

  createEffect(() => {
    if(props.lengthTree){
      if(props.lengthTree.start <= props.caret() && props.lengthTree.end >= props.caret()) setVisible(true)
      else setVisible(false)
    }
    if(!props.focus) setVisible(false)
  })

  return (
    <a
      href={props.branch.additional_content}
      class="url"
    >
      {props.branch.children.map((child: {type:string, content:string, children: any[]}, index: number) => (
        <Dynamic
          component={components['./'+child.type+'.tsx'].default}
          branch={child}
          caret={props.caret}
          lengthTree={props.lengthTree.children[index]}
          visible={visible}
          focus={props.focus}
        />
      ))}
    </a>
  )
}

export default URL
