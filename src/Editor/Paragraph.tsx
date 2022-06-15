import { Component, For } from 'solid-js';

import BlockBase from './Blocks/BlockBase'

const Paragraph: Component = () => {
  const paragraph = ["01G4FQHW27SQ4AYTNTQV1E7PND", "01G5JBTCC1JN8S3G4T8AA2FP2J"]
  
  return (
    <For each={paragraph}>{(id: string) =>
      <BlockBase id={id}/>}
    </For>
  )
}

export default Paragraph
