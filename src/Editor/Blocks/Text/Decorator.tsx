import { Component, createEffect, createSignal, Show } from "solid-js"
import Separator from "./Separator"

import katex from 'katex'
import 'katex/dist/katex.css'

const styles: text_styles = {
  strong: {
    'font-weight': 'bolder',
    outline: 'none'
  },
  strikethrough: {
    'text-decoration': 'line-through'
  },
  invisible: {
    'position': 'absolute',
    'height': '0px',
    'width': '0px',
    'opacity': 0
  }
}

const Decorator: Component<TextBlockProps> = (props: TextBlockProps) => {
  const caret_inside = () => {
    return props.focusing && props.node.start! <= props.caret && props.node.end! >= props.caret
  }

  const switch_style = () => {
    return !caret_inside() && (props.node.type === 'equation' || props.node.type === 'url') ?  'invisible' : props.node.type
  }

  return (
    <>
      <Show when={!caret_inside() && props.node.type==='equation'}>
        <span
          class="katex-base"
          contentEditable={false}
          innerHTML={katex.renderToString(props.node.content, {
            throwOnError: false
          })}
        />
      </Show>
      <Show when={!caret_inside() && props.node.type==='url'}>
        <a
          contentEditable={false}
          href={props.node.additional_content}
        >
          <Separator node={props.node} caret={props.caret} focusing={props.focusing} caret_on={caret_inside()} />
        </a>
      </Show>
      <span style={styles[switch_style()]}>
        <Separator node={props.node} caret={props.caret} focusing={props.focusing} caret_on={caret_inside()} />
      </span>
    </>
  )
}

export default Decorator