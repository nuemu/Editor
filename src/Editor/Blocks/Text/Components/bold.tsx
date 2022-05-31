import { Component } from 'solid-js';

const style: any = {
  outline: 'none',
  'font-weight': 'bolder'
}

const Bold: Component = (props: any) => {
  const {ref, index, block} = props

  return (
    <span
      class="bold"
      ref={ref}
      style={style}
      innerHTML={block[index].content}
    />
  )
}

export default Bold
