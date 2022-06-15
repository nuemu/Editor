import { Component, createEffect, createSignal } from 'solid-js';
import { Dynamic } from 'solid-js/web';

const Blocks = import.meta.globEager('./*/*Base.tsx');

import BlocksStore from '../../Store/Blocks';

const Base: Component = () => {
  const {getters} = BlocksStore
  const [block, setBlock] = createSignal(getters('get')("01G4FQHW27SQ4AYTNTQV1E7PND"))

  createEffect(() => {
    setBlock(getters('get')("01G4FQHW27SQ4AYTNTQV1E7PND"))
  })

  return (
    <Dynamic component={Blocks['./'+block().config.type+'/'+block().config.type+'Base.tsx'].default} />
  )
}

export default Base
