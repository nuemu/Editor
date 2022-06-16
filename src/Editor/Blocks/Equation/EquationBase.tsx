import { Component, createMemo, createEffect, untrack, Show, createSignal } from 'solid-js';

import katex from 'katex'

import BlocksStore from '../../../Store/Blocks';
import SystemStore from '../../../Store/System';

const Base: Component<{id: string}> = (props: {id: string}) => {
  const { block_getters, block_mutations } = BlocksStore
  const { system_getters, system_mutations } = SystemStore
  const block = createMemo(() => block_getters('get')(props.id))
  const [text, setText] = createSignal(block().data.text)
  const html = createMemo(() => katex.renderToString(text(), {
    throwOnError: false,
    displayMode: true,
  }))

  var baseRef: HTMLDivElement|undefined = undefined

  createEffect(() => {
    system_getters('focus')();
    untrack(() => setText(block_getters('get')(props.id).data.text));
  })

  const handleInput = () => {
    block_mutations('patchData')(props.id, {text: baseRef!.innerText})
  }

  return (
    <div class="equation-block-base">
      <Show when={system_getters('focus')() === props.id} fallback={
        <Show when={text() !== ''} fallback={
          <div
            class="equation-block-view"
            style={{width: '100%'}}
            onMouseOver={() => system_mutations('patchFocus')(props.id)}
          >
            &nbsp;
          </div>
        }>
        <div
          class="equation-block-view"
          style={{width: '100%'}}
          onMouseOver={() => system_mutations('patchFocus')(props.id)}
          innerHTML={html()}
        />
        </Show>
      }>
        <div
          ref={baseRef}
          class="equation-block-textarea"
          style={{outline: 'none', width: '100%'}}
          contentEditable={true}
          onInput={() => handleInput()}
          innerText={text()}
        />
      </Show>
    </div>
  )
}

export default Base
