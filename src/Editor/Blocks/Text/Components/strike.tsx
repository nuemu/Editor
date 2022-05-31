import { Component } from 'solid-js';

const style: any = {
  outline: 'none',
  'text-decoration': 'line-through'
}

const Strikethrough: Component = (props: any) => {
  const {ref, index, block} = props

  return (
    <span
      class="strike"
      ref={ref}
      style={style}
      innerHTML={block[index].content}
    />
  )
}

export default Strikethrough
