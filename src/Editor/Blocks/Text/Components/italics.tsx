import { Component } from 'solid-js';

const style: any = {
  outline: 'none',
  'font-style': 'italic'
}

const Italics: Component = (props: any) => {
  const {ref, index, block} = props

  return (
    <span
      class="italics"
      ref={ref}
      style={style}
      innerHTML={block[index].content}
    />
  )
}

export default Italics
