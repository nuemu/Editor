import { Component } from "solid-js"
import TextBase from "../Text/TextBase"

const H1: Component<BlockBaseProps> = (props: BlockBaseProps) => {
  
  return (
    <div
      class="h1-block-base"
      style={{outline: 'none', "font-weight": "bolder"}}
    >
      <TextBase id={props.id} paragraph_id={props.paragraph_id}/>
    </div>)
}

export default H1