import { Component } from 'solid-js';

const Text: Component = (props: any) => {
  const {branch} = props

  return <>{branch.content}</>
}

export default Text
