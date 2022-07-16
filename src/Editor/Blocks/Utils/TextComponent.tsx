import { Component, For } from "solid-js"
import Separator from "../Text/Separator"

export const Code: Component<{node: any}> = (props: {node: any}) => {
  return (
    <For each={props.node.tree().children}>{(node: any) => <pre style={{display: 'inline'}}><span ref={node.ref} style={{'color': node.color}}>{node.content}</span></pre>}</For>
  )
}

export const Markdown: Component<{node: any, caret: number, focusing: boolean}> = (props: {node: any, caret: number, focusing: boolean}) => {
  return <Separator node={props.node.tree()} caret={props.caret} focusing={props.focusing} />
}
