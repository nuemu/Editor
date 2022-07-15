import { createSignal, Accessor, Setter, children } from 'solid-js'
import highlighter from '../../Utils/Highlighter'

type node = {
  content: string
  color: string
  ref: HTMLSpanElement|undefined
}

export default class Nodes{
  parsed: Accessor<{color: string, children:node[]}>
  setParsed: Setter<{color: string, children:node[]}>
  constructor(code: string, lang: string){
    [this.parsed, this.setParsed] = createSignal(this.parser(code, lang))
  }

  list = () => {
    return this.parsed()
  }

  set = (lang: string) => {
    this.setParsed(this.parser(this.innerText(), lang))
  }

  refs = () => {
    return this.parsed().children.map(node => node.ref)
  }

  innerText = () => {
    return this.parsed().children.map(node => document.contains(node.ref!) ? node.ref!.innerText : '').join('')
  }

  private parser = (code: string, lang: string) => {
    const html = (<span innerHTML={highlighter.parse(code, lang)} /> as HTMLSpanElement)
    const nodes = Array.from(html.getElementsByClassName('line').item(0)!.children) as HTMLSpanElement[]
    const node = {color: html.getElementsByTagName('pre')[0].style.backgroundColor, children: nodes.map(node => {return {color: node.style.color, content: node.innerText, ref: undefined}})}
    return node
  }
}