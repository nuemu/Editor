import { Component, createMemo, createEffect, untrack, Show, createSignal } from 'solid-js';

import katex from 'katex'

import BlocksStore from '../../../Store/Blocks';
import SystemStore from '../../../Store/System';

const Base: Component<{id: string}> = (props: {id: string}) => {
  const { block_getters, block_mutations } = BlocksStore
  const { system_getters, system_mutations } = SystemStore
  const block = createMemo(() => block_getters('get')(props.id))
  const [text, setText] = createSignal(block().data.text)
  const [html, setHtml] = createSignal(katex.renderToString(text(), {
    throwOnError: false,
    displayMode: true,
  }))

  var baseRef: HTMLDivElement|undefined = undefined

  createEffect(() => {
    system_getters('focus')();
    untrack(() => setText(block_getters('get')(props.id).data.text));
    baseRef?.focus()
  })

  const handleInput = () => {
    block_mutations('patchData')(props.id, {text: baseRef!.innerText})
    setHtml(katex.renderToString(baseRef!.innerText, {
      throwOnError: false,
      displayMode: true,
    }))
  }

  return (
    <div class="equation-block-base" style={{position: 'relative'}}>
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
          class="equation-block-view-base"
          style={{width: '100%', position: 'absolute', top: 0}}
        >
          <div
            class="equation-block-view"
            style={{width: '100%', position: 'absolute', bottom: 0, "background-color": "white", "box-shadow": "0px 0px 1px 1px black", "z-index": 2}}
            onMouseOver={() => system_mutations('patchFocus')(props.id)}
            innerHTML={html()}
          />
        </div>
        <div
          class="equation-block-view"
          style={{width: '100%', opacity: 0}}
          onMouseOver={() => system_mutations('patchFocus')(props.id)}
          innerHTML={html()}
        />
        <div
          ref={baseRef}
          class="equation-block-textarea"
          style={{outline: 'none', width: '100%', "z-index": 1, position: 'absolute', top: 0, "background-color": "white"}}
          contentEditable={true}
          onInput={() => handleInput()}
          innerText={text()}
        />
      </Show>
    </div>
  )
}

export default Base
