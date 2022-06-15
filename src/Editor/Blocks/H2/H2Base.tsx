import { Component, createSignal, createMemo, onMount } from 'solid-js';

import TextBase from '../Text/TextBase';

const style: any = {
  base:{
    width: '100%',
    display: 'flex',
    'font-size': '1.5em',
    'margin-block-start': '0.83em',
    'margin-block-end': '0.83em',
    'margin-inline-start': '0px',
    'margin-inline-end': '0px',
    'font-weight': 'bold'
  },
  textarea:{
    width: '100%',
    outline: 'none',
    position: 'relative',
    zIndex: '1',
  }
}

const Base: Component<{id: string}> = (props: {id: string}) => {
  return (
    <div class="head2-block-base" style={style.base}>
      <TextBase id={props.id} />
    </div>
  )
}

export default Base
