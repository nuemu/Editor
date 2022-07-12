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

  private extractRefs = (branch: Branch) => {
    var refs: (HTMLSpanElement|undefined)[] = []
    if(branch.type === 'text' || branch.type === 'sign' || branch.type === 'head_sign'){
      refs.push(branch.ref)
    }
  
    if(branch.children.length > 0){
      branch.children.forEach(child => {
        refs = refs.concat(this.extractRefs(child))
      })
    }
  
    return refs
  }
}