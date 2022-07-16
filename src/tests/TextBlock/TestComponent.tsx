import { Component, For } from "solid-js";

const TestComponent: Component<{node: any}> = (props: {node: any}) => {
  if(props.node.children.length === 0) return <span ref={props.node.ref}>{props.node.content}</span>
  else return (
    <For each={props.node.children}>
      {node => <span><TestComponent node={node}/></span>}
    </For>
  )
}

export default TestComponent