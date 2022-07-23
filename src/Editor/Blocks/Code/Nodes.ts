import { createSignal, Accessor, Setter } from 'solid-js'

type node = {
  content: string
  ref: HTMLSpanElement|undefined
}

export default class Nodes{
  private node: Accessor<{children:node[]}>
  private setNode: Setter<{children:node[]}>
  constructor(code: string){
    [this.node, this.setNode] = createSignal(this.parser(code));
  }

  tree = () => {
    return this.node()
  }

  set = (text?: string) => {
    this.setNode(this.parser(this.innerText()))
  }

  refs = () => {
    return this.node().children.map(node => node.ref)
  }

  innerText = () => {
    return this.node().children.map(node => document.contains(node.ref!) ? node.ref!.innerText : '').join('')
  }

  private parser = (text: string) => {
    const reg = new RegExp('```')
    const split = text.split(reg)
    return {children: [{content: '```', ref: undefined}, {content: split[1], ref: undefined}]}
  }
}