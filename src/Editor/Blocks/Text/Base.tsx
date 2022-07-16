import { Component, createEffect, createMemo, onMount, untrack } from 'solid-js';

import Store from '../../Store/Store';

import Nodes from './Nodes'

import TextBase from '../Utils/TextBase'

const style: text_styles = {
  base:{
    width: '100%',
    display: 'flex',
  },
  textarea:{
    width: '100%',
    outline: 'none',
    position: 'relative',
    zIndex: '1',
  }
}

const Base: Component<BlockBaseProps> = (props: BlockBaseProps) => {
  const { blocks } = Store
  const block = createMemo(() => blocks.get(props.id)!)
  const node = new Nodes(block().data.text)

  /******************** handle Something Methods ********************/

  return (
    <TextBase id={props.id} paragraph_id={props.paragraph_id} node={node} component={'Markdown'}/>
  )
}

export default Base