import { Component, createSignal } from "solid-js"

import * as shiki from 'shiki'
shiki.setCDN("/node_modules/shiki/");

const Code: Component = () => {
  const [highligh, setHighlight] = createSignal('')
  shiki
    .getHighlighter({
      theme: 'nord'
    })
    .then(highlighter => {
      setHighlight(highlighter.codeToHtml(`console.log('shiki');  // Code Block In Progress`, { lang: 'js' }))
    })
  return <div class="code-block-base" innerHTML={highligh()} />
}

export default Code