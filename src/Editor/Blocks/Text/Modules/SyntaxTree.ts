import { createSignal, Accessor, Setter } from "solid-js";
import { Parser } from '../../../../Libraries/TextParser';

export default class SyntaxTree {
  private syntaxTree: Accessor<Branch>
  private setSyntaxTree: Setter<Branch>

  constructor(text: string){
    [this.syntaxTree, this.setSyntaxTree] = createSignal(Parser({type: 'root', content: text, children: []}))
  }

  tree = () => {
    return this.syntaxTree()
  }

  refs = () => {
    return this.extractRefs(this.tree())
  }

  parse = (text: string) => {
    this.setSyntaxTree(Parser({type: 'root', content: text, children: []}))
  }

  innerText = (baseRef: HTMLDivElement) => {
    const newRefs = this.refs().filter(ref => document.contains((ref as Node)))
    var text = newRefs.map(ref => ref?.innerText).join('')

    // If input initial letter on this textblock
    if(text.length === 0){
      text = baseRef!.innerText
    }

    return text
  }

  private extractRefs = (branch: Branch) => {
    var refs: HTMLSpanElement[] = []
    if(branch.type === 'text' || branch.type === 'sign' || branch.type === 'head_sign'){
      refs.push(branch.ref!)
    }
  
    if(branch.children.length > 0){
      branch.children.forEach(child => {
        refs = refs.concat(this.extractRefs(child))
      })
    }
  
    return refs
  }
}