import { Component, createMemo } from 'solid-js';
import { Dynamic } from 'solid-js/web';

const Blocks = import.meta.globEager('./*/*Base.tsx');

import BlocksStore from '../../Store/Blocks';

const Base: Component<{id: string}> = (props: {id: string}) => {
  const {block_getters} = BlocksStore
  const block = createMemo(() => block_getters('get')(props.id))

  return (
    <Dynamic component={Blocks['./'+block().config.type+'/'+block().config.type+'Base.tsx'].default} id={props.id} />
  )
}

export default Base
