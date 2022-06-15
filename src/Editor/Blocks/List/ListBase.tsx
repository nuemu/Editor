import { Component, createSignal, createMemo, onMount } from 'solid-js';

import TextBase from '../Text/TextBase';

const countBranches = (branch: any) => {
  var sum = 0;
  branch.children.forEach((child: any) => {
    if(child.children.length === 0) sum += 1
    else sum += countBranches(child)
  })
  return sum
}

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
      <div class="list-mark" style={style.list}>
        1.
      </div>
      <TextBase id={props.id}/>
    </div>
  )
}

export default Base
