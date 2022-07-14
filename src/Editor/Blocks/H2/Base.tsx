import { Component } from "solid-js"
import TextBase from "../Text/Base"

const H2: Component<BlockBaseProps> = (props: BlockBaseProps) => {
  
  return (
    <div
      class="h2-block-base"
      style={{outline: 'none', "font-weight": "bolder", "font-size": "1.5rem"}}
    >
      <TextBase id={props.id} paragraph_id={props.paragraph_id}/>
    </div>)
}

export default H2