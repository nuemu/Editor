import { Component, For } from "solid-js"
import Wrapper from "./Decorator"
import Textarea from "./Textarea"

const Separator: Component<TextBlockProps> = (props: TextBlockProps) => {
  return (
    <For each={props.node.children}>
      {(node) => {
        if(node.type !== 'text' && node.type !== 'sign' && node.type !== 'head_sign'){
          return <Wrapper node={node} caret={props.caret}/>
        }
        else return <Textarea node={node} caret={props.caret}/>
      }}
    </For>)
}

export default Separator