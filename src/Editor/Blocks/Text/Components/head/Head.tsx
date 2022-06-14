import { Component } from 'solid-js';

const Head: Component = (props: any) => {
  const style = {
    head: {
      outline: 'none',
    }
  }
  return (
    <div
      class="text-block-head"
      contentEditable={true}
      style={style.head}
      innerText={'sample'}
    />)
}

export default Head
