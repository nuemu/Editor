import { Component, createSignal, createMemo, onMount } from 'solid-js';

import TextBase from '../Text/TextBase';

const style: any = {
  base:{
    width: '100%',
    display: 'flex',
  },
  list:{
    outline: 'none',
    position: 'relative',
    zIndex: '1',
  }
}

const Base: Component<{id: string}> = (props: {id: string}) => {
  return (
    <div class="list-block-base" style={style.base}>
      <div
        class="list-mark"
        style={style.list}
        contentEditable={true}
      >
        1.
      </div>
      <TextBase id={props.id}/>
    </div>
  )
}

export default Base
