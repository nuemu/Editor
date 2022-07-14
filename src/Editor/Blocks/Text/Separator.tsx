import { Component, For } from "solid-js"
import Wrapper from "./Decorator"
import Textarea from "./Textarea"

const Separator: Component<TextBlockProps> = (props: TextBlockProps) => {
  return (
    <For each={props.node.children}>
      {(node) => {
        if(node.type !== 'text' && node.type !== 'sign' && node.type !== 'head_sign'){
          return <Wrapper node={node} caret={props.caret} focusing={props.focusing} caret_on={props.caret_on} />
        }
        else return <Textarea node={node} caret={props.caret} focusing={props.focusing} caret_on={props.caret_on} />
      }}
    </For>)
}

export default Separator