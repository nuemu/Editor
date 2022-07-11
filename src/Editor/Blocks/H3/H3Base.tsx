import { Component } from "solid-js"
import TextBase from "../Text/TextBase"

const H3: Component<BlockBaseProps> = (props: BlockBaseProps) => {
  
  return (
    <div
      class="h3-block-base"
      style={{outline: 'none', "font-weight": "bolder", "font-size": "1.2rem"}}
    >
      <TextBase id={props.id} paragraph_id={props.paragraph_id}/>
    </div>)
}

export default H3