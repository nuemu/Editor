import { createSignal, Accessor, Setter } from 'solid-js'
import highlighter from '../../Utils/Highlighter'

type node = {
  content: string
  color: string
  ref: HTMLSpanElement|undefined
}

export default class Nodes{
  node: Accessor<{color: string, children:node[]}>
  setNode: Setter<{color: string, children:node[]}>
  constructor(code: string, lang: string){
    [this.node, this.setNode] = createSignal(this.parser(code, lang))
  }

  list = () => {
    return this.node()
  }

  set = (lang: string, code?: string) => {
    if(code) this.setNode(this.parser(code, lang))
    else this.setNode(this.parser(this.innerText(), lang))
  }

  refs = () => {
    return this.node().children.map(node => node.ref)
  }

  innerText = () => {
    return this.node().children.map(node => document.contains(node.ref!) ? node.ref!.innerText : '').join('')
  }

  private parser = (code: string, lang: string) => {
    const html = document.createElement('span')
    html.innerHTML = highlighter.parse(code, lang)
    if(html.getElementsByClassName('line').length > 0){
      const nodes = Array.from(html.getElementsByClassName('line').item(0)!.children) as HTMLSpanElement[]
      var children = nodes.map(node => {return {color: node.style.color, content: node.innerText, ref: undefined}})
      const node = {color: html.getElementsByTagName('pre')[0].style.backgroundColor, children: children.length !==0 ? children : [{color: '000000', content: code, ref: undefined}]}
      return node
    }
    else return {color: '000000', children: [{color: '000000', content: code, ref: undefined}]}
  }
}