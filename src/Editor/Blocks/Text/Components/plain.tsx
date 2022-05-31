import { Component, mergeProps } from 'solid-js';

const Plain: Component = (props: any) => {
  const {index, block} = props

  return block[index].content
}

export default Plain
